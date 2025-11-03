import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Itr5FormData {
  // PART A - GENERAL INFORMATION (Steps 1-6)
  // Step 1: Basic Entity Information
  name: string;
  pan: string;
  aadhaarNumber: string;
  oldName: string;
  llpin: string;
  formationDate: string;
  businessStartDate: string;
  flatNo: string;
  building: string;
  street: string;
  area: string;
  town: string;
  state: string;
  pincode: string;
  country: string;
  phone1: string;
  phone2: string;
  email1: string;
  email2: string;
  
  // Step 2: Status & Sub-Status
  entityStatus: string; // Partnership, LLP, AOP/BOI, etc.
  entitySubStatus: string;
  constitutionDate: string;
  registrationNo: string;
  
  // Step 3: Contact & Filing Status
  officePhone: string;
  mobileNumber: string;
  alternateEmail: string;
  filingSection: string;
  dueDate: string;
  filingType: string; // Original/Revised/Notice-based
  receiptNumber: string;
  originalFilingDate: string;
  noticeDIN: string;
  noticeDate: string;
  
  // Step 4: New Tax Regime Options
  taxRegimeOption: string; // 115BAC, 115BAD, 115BAE
  relatedFormNumber: string;
  acknowledgmentNumber: string;
  optionDate: string;
  
  // Step 5: Residential Status & Special Declarations
  residentialStatus: string;
  peTransactionValue: string;
  sepUserCount: string;
  fiiStatus: boolean;
  sebiRegNumber: string;
  hasIFSCUnit: boolean;
  isStartup: boolean;
  startupRegNo: string;
  msmeRegNo: string;
  dpittId: string;
  
  // Step 6: Representative Assessee & Entity Details
  representativeName: string;
  representativePAN: string;
  representativeRole: string;
  representativeAddress: string;
  partnerInFirmName: string;
  partnerInFirmPAN: string;
  legalEntityIdentifier: string;
  refundAmount: string;
  
  // AUDIT INFORMATION (Steps 7-8)
  // Step 7: Section 44AA & 44AB Applicability
  section44AAApplicable: boolean;
  section44ABApplicable: boolean;
  accountingStatus: string;
  turnover: string;
  cashReceiptThreshold: string;
  cashPaymentThreshold: string;
  
  // Step 8: Audit Report Details & Transfer Pricing
  isAudited: boolean;
  auditFirm: string;
  auditPAN: string;
  auditDate: string;
  auditUDIN: string;
  auditAckNumber: string;
  transferPricingAudit: boolean;
  transferPricingReportInfo: string;
  otherAuditReports: string;
  otherAuditSectionCode: string;
  otherAuditDate: string;
  otherAuditAckNumber: string;
  
  // PARTNERS/MEMBERS/TRUST INFO (Steps 9-10)
  // Step 9: Partners/Members Details
  partnersCount: string;
  partnerName1: string;
  partnerPAN1: string;
  partnerAdmissionDate1: string;
  partnerRetirementDate1: string;
  partnerRemuneration1: string;
  partnerSharePercent1: string;
  partnerName2: string;
  partnerPAN2: string;
  partnerAdmissionDate2: string;
  partnerRetirementDate2: string;
  partnerRemuneration2: string;
  partnerSharePercent2: string;
  partnerName3: string;
  partnerPAN3: string;
  partnerAdmissionDate3: string;
  partnerRetirementDate3: string;
  partnerRemuneration3: string;
  partnerSharePercent3: string;
  
  // Step 10: Trust & Special Member Information
  hasForeignMember: boolean;
  foreignMemberSharePercent: string;
  hasHighIncomeMember: boolean;
  highIncomeMemberDetails: string;
  isTrust: boolean;
  beneficiaryShares: string;
  isWillBasedTrust: boolean;
  trustExemptions: string;
  
  // NATURE OF BUSINESS (Step 11)
  // Step 11: Business Activities
  businessCode1: string;
  tradeName1: string;
  description1: string;
  businessCode2: string;
  tradeName2: string;
  description2: string;
  businessCode3: string;
  tradeName3: string;
  description3: string;
  
  // BALANCE SHEET (Steps 12-14)
  // Step 12: Sources of Funds
  capitalAccount: string;
  reservesAndSurplus: string;
  securedLoans: string;
  unsecuredLoans: string;
  advancesFromMembers: string;
  totalSourcesOfFunds: string;
  
  // Step 13: Application of Funds
  fixedAssets: string;
  investments: string;
  currentAssets: string;
  currentLiabilities: string;
  netCurrentAssets: string;
  totalApplicationOfFunds: string;
  
  // Step 14: Non-Account Case Assets/Liabilities
  debtors: string;
  creditors: string;
  stock: string;
  cash: string;
  bankBalance: string;
  otherAssets: string;
  otherLiabilities: string;
  
  // PROFIT & LOSS (Steps 15-18)
  // Step 15: Manufacturing Account
  openingStock: string;
  purchases: string;
  directWages: string;
  factoryOverheads: string;
  closingStock: string;
  costOfGoodsSold: string;
  
  // Step 16: Trading Account
  tradingOpeningStock: string;
  tradingPurchases: string;
  tradingClosingStock: string;
  grossProfit: string;
  
  // Step 17: Profit & Loss Account
  grossProfitBF: string;
  otherIncome: string;
  administrativeExpenses: string;
  sellingExpenses: string;
  financialExpenses: string;
  depreciation: string;
  netProfitBeforeTax: string;
  
  // Step 18: Income & Expenses Summary
  revenueFromOperations: string;
  otherOperatingIncome: string;
  totalIncome: string;
  costOfMaterialsConsumed: string;
  employeeBenefitExpenses: string;
  otherExpenses: string;
  totalExpenses: string;
  profitBeforeDepreciation: string;
  depreciationExpense: string;
  profitAfterDepreciation: string;
  
  // PRESUMPTIVE INCOME (Steps 19-21)
  // Step 19: Section 44AD Business
  section44ADApplicable: boolean;
  businessReceipts: string;
  cashReceipts: string;
  electronicReceipts: string;
  presumptivePercentage: string;
  presumptiveIncome44AD: string;
  
  // Step 20: Section 44ADA Professional
  section44ADAApplicable: boolean;
  professionalReceipts: string;
  professionalCashReceipts: string;
  professionalElectronicReceipts: string;
  professionalPresumptiveIncome: string;
  
  // Step 21: Section 44AE Goods Carriage
  section44AEApplicable: boolean;
  vehicleType: string;
  vehicleOwnership: string;
  tonnageCapacity: string;
  monthsUsed: string;
  goodsCarriageIncome: string;
  
  // SPECIAL INCOME SECTIONS (Steps 22-23)
  // Step 22: No Account Case (Part 65)
  businessGrossReceipts: string;
  businessExpenses: string;
  businessNetProfit: string;
  professionGrossReceipts: string;
  professionExpenses: string;
  professionNetProfit: string;
  
  // Step 23: Speculative Income (Part 66)
  speculativeTurnover: string;
  speculativeGrossProfit: string;
  speculativeExpenses: string;
  speculativeNetIncome: string;
  
  // OTHER INFORMATION (Steps 24-25)
  // Step 24: Accounting Methods & ICDS
  accountingMethod: string; // Cash/Mercantile
  methodChanges: string;
  icdsAdjustmentIncrease: string;
  icdsAdjustmentDecrease: string;
  
  // Step 25: Disallowable Expenses
  section36Disallowance: string;
  section37Disallowance: string;
  section40Disallowance: string;
  section40ADisallowance: string;
  section43BDisallowance: string;
  employeesInIndia: string;
  employeesOutsideIndia: string;
  
  // QUANTITATIVE DETAILS (Step 26)
  // Step 26: Trading/Manufacturing Stock Details
  tradingOpeningStockQty: string;
  tradingPurchasesQty: string;
  tradingSalesQty: string;
  tradingClosingStockQty: string;
  yieldPercentage: string;
  shortageQty: string;
  excessQty: string;
  
  // SCHEDULE HP (Step 27)
  // Step 27: House Property Income
  propertyAddress: string;
  propertyOwnership: string;
  annualRentReceived: string;
  localTaxesPaid: string;
  interestOnLoan: string;
  coOwnerName: string;
  coOwnerPAN: string;
  coOwnerShare: string;
  tenantName: string;
  tenantPAN: string;
  
  // UNLISTED SHARES (Step 28)
  // Step 28: Unlisted Equity Shares Schedule
  companyName1: string;
  companyPAN1: string;
  sharesAcquired1: string;
  acquisitionCost1: string;
  acquisitionDate1: string;
  sharesSold1: string;
  saleValue1: string;
  saleDate1: string;
  companyName2: string;
  companyPAN2: string;
  sharesAcquired2: string;
  acquisitionCost2: string;
  acquisitionDate2: string;
  sharesSold2: string;
  saleValue2: string;
  saleDate2: string;
  
  // SCHEDULE CG - CAPITAL GAINS (Steps 29-30)
  // Step 29: Short-term Capital Gains
  stcgAssetType1: string;
  stcgAssetDescription1: string;
  stcgDateOfAcquisition1: string;
  stcgDateOfSale1: string;
  stcgSaleConsideration1: string;
  stcgCostOfAcquisition1: string;
  stcgExpenseOnTransfer1: string;
  stcgNetGain1: string;
  stcgAssetType2: string;
  stcgAssetDescription2: string;
  stcgDateOfAcquisition2: string;
  stcgDateOfSale2: string;
  stcgSaleConsideration2: string;
  stcgCostOfAcquisition2: string;
  stcgExpenseOnTransfer2: string;
  stcgNetGain2: string;
  
  // Step 30: Long-term Capital Gains
  ltcgAssetType1: string;
  ltcgAssetDescription1: string;
  ltcgDateOfAcquisition1: string;
  ltcgDateOfSale1: string;
  ltcgSaleConsideration1: string;
  ltcgIndexedCostOfAcquisition1: string;
  ltcgExpenseOnTransfer1: string;
  ltcgExemptionClaimed1: string;
  ltcgExemptionSection1: string;
  ltcgNetGain1: string;
  ltcgAssetType2: string;
  ltcgAssetDescription2: string;
  ltcgDateOfAcquisition2: string;
  ltcgDateOfSale2: string;
  ltcgSaleConsideration2: string;
  ltcgIndexedCostOfAcquisition2: string;
  ltcgExpenseOnTransfer2: string;
  ltcgExemptionClaimed2: string;
  ltcgExemptionSection2: string;
  ltcgNetGain2: string;
  
  // SCHEDULE OS - OTHER SOURCES (Step 31)
  // Step 31: Other Sources Income
  interestFromBank: string;
  interestFromFD: string;
  dividendIncome: string;
  lotteryWinnings: string;
  familyPensionIncome: string;
  otherIncomeDescription1: string;
  otherIncomeAmount1: string;
  otherIncomeDescription2: string;
  otherIncomeAmount2: string;
  tdsOnInterest: string;
  tdsOnDividend: string;
  tdsOnOtherIncome: string;
  totalOtherSourcesIncome: string;
  
  // SCHEDULE 80G - DONATIONS (Step 32)
  // Step 32: Donations for Deduction
  donee1Name: string;
  donee1PAN: string;
  donee1Address: string;
  donee1Amount: string;
  donee1DeductionPercentage: string;
  donee1EligibleDeduction: string;
  donee2Name: string;
  donee2PAN: string;
  donee2Address: string;
  donee2Amount: string;
  donee2DeductionPercentage: string;
  donee2EligibleDeduction: string;
  donee3Name: string;
  donee3PAN: string;
  donee3Address: string;
  donee3Amount: string;
  donee3DeductionPercentage: string;
  donee3EligibleDeduction: string;
  totalDonations: string;
  totalEligibleDeduction80G: string;
  
  // SCHEDULE BP - ENHANCED BUSINESS COMPUTATION (Step 33)
  // Step 33: Business Income Computation
  netProfitAsPerBooks: string;
  additionSection28: string;
  additionSection32: string;
  additionSection35: string;
  additionSection36: string;
  additionSection37: string;
  additionSection40: string;
  additionSection40A: string;
  additionSection43B: string;
  additionOther: string;
  deductionSection80C: string;
  deductionSection80D: string;
  deductionSection80G: string;
  deductionOther: string;
  computedBusinessIncome: string;
  
  // SCHEDULE TDS/TCS (Step 34)
  // Step 34: Tax Deducted/Collected at Source
  tdsEmployer: string;
  tdsOnSalary: string;
  tdsOnInterestBank: string;
  tdsOnRent: string;
  tdsOnProfessionalFees: string;
  tdsOnCommission: string;
  tdsOther: string;
  totalTDSClaimed: string;
  tcsOnSale: string;
  tcsOnPurchase: string;
  tcsOther: string;
  totalTCSClaimed: string;
  
  // SCHEDULE IT - ADVANCE TAX (Step 35)
  // Step 35: Advance Tax and Self-Assessment
  advanceTaxPaid1stInstall: string;
  advanceTaxPaid2ndInstall: string;
  advanceTaxPaid3rdInstall: string;
  advanceTaxPaid4thInstall: string;
  totalAdvanceTaxPaid: string;
  selfAssessmentTaxPaid: string;
  interestSection234A: string;
  interestSection234B: string;
  interestSection234C: string;
  totalInterestPayable: string;
  
  // SCHEDULE FSI/TR/FA - FOREIGN ASSETS (Step 36)
  // Step 36: Foreign Income and Assets
  foreignIncomeCountry1: string;
  foreignIncomeNature1: string;
  foreignIncomeAmount1: string;
  foreignTaxPaid1: string;
  foreignIncomeCountry2: string;
  foreignIncomeNature2: string;
  foreignIncomeAmount2: string;
  foreignTaxPaid2: string;
  foreignAssetType1: string;
  foreignAssetCountry1: string;
  foreignAssetValue1: string;
  foreignAssetIncome1: string;
  foreignAssetType2: string;
  foreignAssetCountry2: string;
  foreignAssetValue2: string;
  foreignAssetIncome2: string;
  
  // SCHEDULE AL - ASSETS AND LIABILITIES (Step 37)
  // Step 37: Assets and Liabilities Disclosure
  immovablePropertyValue: string;
  jewelryValue: string;
  vehicleValue: string;
  bankAccountValue: string;
  sharesAndSecurities: string;
  insurancePolicyValue: string;
  loansAdvancesGiven: string;
  otherAssetsValue: string;
  totalAssets: string;
  borrowingsFromBanks: string;
  borrowingsFromOthers: string;
  otherLiabilitiesValue: string;
  totalLiabilities: string;
  netWorth: string;
  
  // VERIFICATION (Step 38)
  // Step 38: Enhanced Verification & Submission
  verificationPlace: string;
  verificationDate: string;
  declarantName: string;
  declarantDesignation: string;
  declarantPAN: string;
  verificationMethod: string; // DSC/OTP
  dscCertificate: string;
  otpMobile: string;
  capacityOfSigning: string;
}

interface Itr5FormErrors {
  [key: string]: string;
}

const ItrFive = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('itr5-current-step');
    return savedStep ? parseInt(savedStep) : 1;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Itr5FormData>(() => {
    const savedFormData = localStorage.getItem('itr5-form-data');
    return savedFormData ? JSON.parse(savedFormData) : {
      // PART A - GENERAL INFORMATION (Steps 1-6)
      // Step 1: Basic Entity Information
      name: '',
      pan: '',
      aadhaarNumber: '',
      oldName: '',
      llpin: '',
      formationDate: '',
      businessStartDate: '',
      flatNo: '',
      building: '',
      street: '',
      area: '',
      town: '',
      state: '',
      pincode: '',
      country: '',
      phone1: '',
      phone2: '',
      email1: '',
      email2: '',
      
      // Step 2: Status & Sub-Status
      entityStatus: '',
      entitySubStatus: '',
      constitutionDate: '',
      registrationNo: '',
      
      // Step 3: Contact & Filing Status
      officePhone: '',
      mobileNumber: '',
      alternateEmail: '',
      filingSection: '',
      dueDate: '',
      filingType: '',
      receiptNumber: '',
      originalFilingDate: '',
      noticeDIN: '',
      noticeDate: '',
      
      // Step 4: New Tax Regime Options
      taxRegimeOption: '',
      relatedFormNumber: '',
      acknowledgmentNumber: '',
      optionDate: '',
      
      // Step 5: Residential Status & Special Declarations
      residentialStatus: '',
      peTransactionValue: '',
      sepUserCount: '',
      fiiStatus: false,
      sebiRegNumber: '',
      hasIFSCUnit: false,
      isStartup: false,
      startupRegNo: '',
      msmeRegNo: '',
      dpittId: '',
      
      // Step 6: Representative Assessee & Entity Details
      representativeName: '',
      representativePAN: '',
      representativeRole: '',
      representativeAddress: '',
      partnerInFirmName: '',
      partnerInFirmPAN: '',
      legalEntityIdentifier: '',
      refundAmount: '',
      
      // AUDIT INFORMATION (Steps 7-8)
      // Step 7: Section 44AA & 44AB Applicability
      section44AAApplicable: false,
      section44ABApplicable: false,
      accountingStatus: '',
      turnover: '',
      cashReceiptThreshold: '',
      cashPaymentThreshold: '',
      
      // Step 8: Audit Report Details & Transfer Pricing
      isAudited: false,
      auditFirm: '',
      auditPAN: '',
      auditDate: '',
      auditUDIN: '',
      auditAckNumber: '',
      transferPricingAudit: false,
      transferPricingReportInfo: '',
      otherAuditReports: '',
      otherAuditSectionCode: '',
      otherAuditDate: '',
      otherAuditAckNumber: '',
      
      // PARTNERS/MEMBERS/TRUST INFO (Steps 9-10)
      // Step 9: Partners/Members Details
      partnersCount: '',
      partnerName1: '',
      partnerPAN1: '',
      partnerAdmissionDate1: '',
      partnerRetirementDate1: '',
      partnerRemuneration1: '',
      partnerSharePercent1: '',
      partnerName2: '',
      partnerPAN2: '',
      partnerAdmissionDate2: '',
      partnerRetirementDate2: '',
      partnerRemuneration2: '',
      partnerSharePercent2: '',
      partnerName3: '',
      partnerPAN3: '',
      partnerAdmissionDate3: '',
      partnerRetirementDate3: '',
      partnerRemuneration3: '',
      partnerSharePercent3: '',
      
      // Step 10: Trust & Special Member Information
      hasForeignMember: false,
      foreignMemberSharePercent: '',
      hasHighIncomeMember: false,
      highIncomeMemberDetails: '',
      isTrust: false,
      beneficiaryShares: '',
      isWillBasedTrust: false,
      trustExemptions: '',
      
      // NATURE OF BUSINESS (Step 11)
      // Step 11: Business Activities
      businessCode1: '',
      tradeName1: '',
      description1: '',
      businessCode2: '',
      tradeName2: '',
      description2: '',
      businessCode3: '',
      tradeName3: '',
      description3: '',
      
      // BALANCE SHEET (Steps 12-14)
      // Step 12: Sources of Funds
      capitalAccount: '',
      reservesAndSurplus: '',
      securedLoans: '',
      unsecuredLoans: '',
      advancesFromMembers: '',
      totalSourcesOfFunds: '',
      
      // Step 13: Application of Funds
      fixedAssets: '',
      investments: '',
      currentAssets: '',
      currentLiabilities: '',
      netCurrentAssets: '',
      totalApplicationOfFunds: '',
      
      // Step 14: Non-Account Case Assets/Liabilities
      debtors: '',
      creditors: '',
      stock: '',
      cash: '',
      bankBalance: '',
      otherAssets: '',
      otherLiabilities: '',
      
      // PROFIT & LOSS (Steps 15-18)
      // Step 15: Manufacturing Account
      openingStock: '',
      purchases: '',
      directWages: '',
      factoryOverheads: '',
      closingStock: '',
      costOfGoodsSold: '',
      
      // Step 16: Trading Account
      tradingOpeningStock: '',
      tradingPurchases: '',
      tradingClosingStock: '',
      grossProfit: '',
      
      // Step 17: Profit & Loss Account
      grossProfitBF: '',
      otherIncome: '',
      administrativeExpenses: '',
      sellingExpenses: '',
      financialExpenses: '',
      depreciation: '',
      netProfitBeforeTax: '',
      
      // Step 18: Income & Expenses Summary
      revenueFromOperations: '',
      otherOperatingIncome: '',
      totalIncome: '',
      costOfMaterialsConsumed: '',
      employeeBenefitExpenses: '',
      otherExpenses: '',
      totalExpenses: '',
      profitBeforeDepreciation: '',
      depreciationExpense: '',
      profitAfterDepreciation: '',
      
      // PRESUMPTIVE INCOME (Steps 19-21)
      // Step 19: Section 44AD Business
      section44ADApplicable: false,
      businessReceipts: '',
      cashReceipts: '',
      electronicReceipts: '',
      presumptivePercentage: '',
      presumptiveIncome44AD: '',
      
      // Step 20: Section 44ADA Professional
      section44ADAApplicable: false,
      professionalReceipts: '',
      professionalCashReceipts: '',
      professionalElectronicReceipts: '',
      professionalPresumptiveIncome: '',
      
      // Step 21: Section 44AE Goods Carriage
      section44AEApplicable: false,
      vehicleType: '',
      vehicleOwnership: '',
      tonnageCapacity: '',
      monthsUsed: '',
      goodsCarriageIncome: '',
      
      // SPECIAL INCOME SECTIONS (Steps 22-23)
      // Step 22: No Account Case (Part 65)
      businessGrossReceipts: '',
      businessExpenses: '',
      businessNetProfit: '',
      professionGrossReceipts: '',
      professionExpenses: '',
      professionNetProfit: '',
      
      // Step 23: Speculative Income (Part 66)
      speculativeTurnover: '',
      speculativeGrossProfit: '',
      speculativeExpenses: '',
      speculativeNetIncome: '',
      
      // OTHER INFORMATION (Steps 24-25)
      // Step 24: Accounting Methods & ICDS
      accountingMethod: '',
      methodChanges: '',
      icdsAdjustmentIncrease: '',
      icdsAdjustmentDecrease: '',
      
      // Step 25: Disallowable Expenses
      section36Disallowance: '',
      section37Disallowance: '',
      section40Disallowance: '',
      section40ADisallowance: '',
      section43BDisallowance: '',
      employeesInIndia: '',
      employeesOutsideIndia: '',
      
      // QUANTITATIVE DETAILS (Step 26)
      // Step 26: Trading/Manufacturing Stock Details
      tradingOpeningStockQty: '',
      tradingPurchasesQty: '',
      tradingSalesQty: '',
      tradingClosingStockQty: '',
      yieldPercentage: '',
      shortageQty: '',
      excessQty: '',
      
      // SCHEDULE HP (Step 27)
      // Step 27: House Property Income
      propertyAddress: '',
      propertyOwnership: '',
      annualRentReceived: '',
      localTaxesPaid: '',
      interestOnLoan: '',
      coOwnerName: '',
      coOwnerPAN: '',
      coOwnerShare: '',
      tenantName: '',
      tenantPAN: '',
      
      // UNLISTED SHARES (Step 28)
      // Step 28: Unlisted Equity Shares Schedule
      companyName1: '',
      companyPAN1: '',
      sharesAcquired1: '',
      acquisitionCost1: '',
      acquisitionDate1: '',
      sharesSold1: '',
      saleValue1: '',
      saleDate1: '',
      companyName2: '',
      companyPAN2: '',
      sharesAcquired2: '',
      acquisitionCost2: '',
      acquisitionDate2: '',
      sharesSold2: '',
      saleValue2: '',
      saleDate2: '',
      
      // SCHEDULE CG - CAPITAL GAINS (Steps 29-30)
      // Step 29: Short-term Capital Gains
      stcgAssetType1: '',
      stcgAssetDescription1: '',
      stcgDateOfAcquisition1: '',
      stcgDateOfSale1: '',
      stcgSaleConsideration1: '',
      stcgCostOfAcquisition1: '',
      stcgExpenseOnTransfer1: '',
      stcgNetGain1: '',
      stcgAssetType2: '',
      stcgAssetDescription2: '',
      stcgDateOfAcquisition2: '',
      stcgDateOfSale2: '',
      stcgSaleConsideration2: '',
      stcgCostOfAcquisition2: '',
      stcgExpenseOnTransfer2: '',
      stcgNetGain2: '',
      
      // Step 30: Long-term Capital Gains
      ltcgAssetType1: '',
      ltcgAssetDescription1: '',
      ltcgDateOfAcquisition1: '',
      ltcgDateOfSale1: '',
      ltcgSaleConsideration1: '',
      ltcgIndexedCostOfAcquisition1: '',
      ltcgExpenseOnTransfer1: '',
      ltcgExemptionClaimed1: '',
      ltcgExemptionSection1: '',
      ltcgNetGain1: '',
      ltcgAssetType2: '',
      ltcgAssetDescription2: '',
      ltcgDateOfAcquisition2: '',
      ltcgDateOfSale2: '',
      ltcgSaleConsideration2: '',
      ltcgIndexedCostOfAcquisition2: '',
      ltcgExpenseOnTransfer2: '',
      ltcgExemptionClaimed2: '',
      ltcgExemptionSection2: '',
      ltcgNetGain2: '',
      
      // SCHEDULE OS - OTHER SOURCES (Step 31)
      // Step 31: Other Sources Income
      interestFromBank: '',
      interestFromFD: '',
      dividendIncome: '',
      lotteryWinnings: '',
      familyPensionIncome: '',
      otherIncomeDescription1: '',
      otherIncomeAmount1: '',
      otherIncomeDescription2: '',
      otherIncomeAmount2: '',
      tdsOnInterest: '',
      tdsOnDividend: '',
      tdsOnOtherIncome: '',
      totalOtherSourcesIncome: '',
      
      // SCHEDULE 80G - DONATIONS (Step 32)
      // Step 32: Donations for Deduction
      donee1Name: '',
      donee1PAN: '',
      donee1Address: '',
      donee1Amount: '',
      donee1DeductionPercentage: '',
      donee1EligibleDeduction: '',
      donee2Name: '',
      donee2PAN: '',
      donee2Address: '',
      donee2Amount: '',
      donee2DeductionPercentage: '',
      donee2EligibleDeduction: '',
      donee3Name: '',
      donee3PAN: '',
      donee3Address: '',
      donee3Amount: '',
      donee3DeductionPercentage: '',
      donee3EligibleDeduction: '',
      totalDonations: '',
      totalEligibleDeduction80G: '',
      
      // SCHEDULE BP - ENHANCED BUSINESS COMPUTATION (Step 33)
      // Step 33: Business Income Computation
      netProfitAsPerBooks: '',
      additionSection28: '',
      additionSection32: '',
      additionSection35: '',
      additionSection36: '',
      additionSection37: '',
      additionSection40: '',
      additionSection40A: '',
      additionSection43B: '',
      additionOther: '',
      deductionSection80C: '',
      deductionSection80D: '',
      deductionSection80G: '',
      deductionOther: '',
      computedBusinessIncome: '',
      
      // SCHEDULE TDS/TCS (Step 34)
      // Step 34: Tax Deducted/Collected at Source
      tdsEmployer: '',
      tdsOnSalary: '',
      tdsOnInterestBank: '',
      tdsOnRent: '',
      tdsOnProfessionalFees: '',
      tdsOnCommission: '',
      tdsOther: '',
      totalTDSClaimed: '',
      tcsOnSale: '',
      tcsOnPurchase: '',
      tcsOther: '',
      totalTCSClaimed: '',
      
      // SCHEDULE IT - ADVANCE TAX (Step 35)
      // Step 35: Advance Tax and Self-Assessment
      advanceTaxPaid1stInstall: '',
      advanceTaxPaid2ndInstall: '',
      advanceTaxPaid3rdInstall: '',
      advanceTaxPaid4thInstall: '',
      totalAdvanceTaxPaid: '',
      selfAssessmentTaxPaid: '',
      interestSection234A: '',
      interestSection234B: '',
      interestSection234C: '',
      totalInterestPayable: '',
      
      // SCHEDULE FSI/TR/FA - FOREIGN ASSETS (Step 36)
      // Step 36: Foreign Income and Assets
      foreignIncomeCountry1: '',
      foreignIncomeNature1: '',
      foreignIncomeAmount1: '',
      foreignTaxPaid1: '',
      foreignIncomeCountry2: '',
      foreignIncomeNature2: '',
      foreignIncomeAmount2: '',
      foreignTaxPaid2: '',
      foreignAssetType1: '',
      foreignAssetCountry1: '',
      foreignAssetValue1: '',
      foreignAssetIncome1: '',
      foreignAssetType2: '',
      foreignAssetCountry2: '',
      foreignAssetValue2: '',
      foreignAssetIncome2: '',
      
      // SCHEDULE AL - ASSETS AND LIABILITIES (Step 37)
      // Step 37: Assets and Liabilities Disclosure
      immovablePropertyValue: '',
      jewelryValue: '',
      vehicleValue: '',
      bankAccountValue: '',
      sharesAndSecurities: '',
      insurancePolicyValue: '',
      loansAdvancesGiven: '',
      otherAssetsValue: '',
      totalAssets: '',
      borrowingsFromBanks: '',
      borrowingsFromOthers: '',
      otherLiabilitiesValue: '',
      totalLiabilities: '',
      netWorth: '',
      
      // VERIFICATION (Step 38)
      // Step 38: Enhanced Verification & Submission
      verificationPlace: '',
      verificationDate: '',
      declarantName: '',
      declarantDesignation: '',
      declarantPAN: '',
      verificationMethod: '',
      dscCertificate: '',
      otpMobile: '',
      capacityOfSigning: '',
    };
  });
  const [errors, setErrors] = useState<Itr5FormErrors>({});

  // Auto-calculation functions
  const calculateTotalSourcesOfFunds = () => {
    const capital = parseFloat(formData.capitalAccount) || 0;
    const reserves = parseFloat(formData.reservesAndSurplus) || 0;
    const secured = parseFloat(formData.securedLoans) || 0;
    const unsecured = parseFloat(formData.unsecuredLoans) || 0;
    const advances = parseFloat(formData.advancesFromMembers) || 0;
    return (capital + reserves + secured + unsecured + advances).toFixed(2);
  };

  const calculateTotalApplicationOfFunds = () => {
    const fixed = parseFloat(formData.fixedAssets) || 0;
    const investments = parseFloat(formData.investments) || 0;
    const netCurrent = parseFloat(formData.netCurrentAssets) || 0;
    return (fixed + investments + netCurrent).toFixed(2);
  };

  const calculateNetCurrentAssets = () => {
    const current = parseFloat(formData.currentAssets) || 0;
    const liabilities = parseFloat(formData.currentLiabilities) || 0;
    return (current - liabilities).toFixed(2);
  };

  const calculateCostOfGoodsSold = () => {
    const opening = parseFloat(formData.openingStock) || 0;
    const purchases = parseFloat(formData.purchases) || 0;
    const wages = parseFloat(formData.directWages) || 0;
    const overheads = parseFloat(formData.factoryOverheads) || 0;
    const closing = parseFloat(formData.closingStock) || 0;
    return (opening + purchases + wages + overheads - closing).toFixed(2);
  };

  const calculateGrossProfit = () => {
    const opening = parseFloat(formData.tradingOpeningStock) || 0;
    const purchases = parseFloat(formData.tradingPurchases) || 0;
    const closing = parseFloat(formData.tradingClosingStock) || 0;
    const cogs = parseFloat(formData.costOfGoodsSold) || 0;
    return (cogs - opening - purchases + closing).toFixed(2);
  };

  const calculateNetProfitBeforeTax = () => {
    const gross = parseFloat(formData.grossProfitBF) || 0;
    const other = parseFloat(formData.otherIncome) || 0;
    const admin = parseFloat(formData.administrativeExpenses) || 0;
    const selling = parseFloat(formData.sellingExpenses) || 0;
    const financial = parseFloat(formData.financialExpenses) || 0;
    const depreciation = parseFloat(formData.depreciation) || 0;
    return (gross + other - admin - selling - financial - depreciation).toFixed(2);
  };

  const calculateTotalIncome = () => {
    const revenue = parseFloat(formData.revenueFromOperations) || 0;
    const other = parseFloat(formData.otherOperatingIncome) || 0;
    return (revenue + other).toFixed(2);
  };

  const calculateTotalExpenses = () => {
    const materials = parseFloat(formData.costOfMaterialsConsumed) || 0;
    const employee = parseFloat(formData.employeeBenefitExpenses) || 0;
    const other = parseFloat(formData.otherExpenses) || 0;
    return (materials + employee + other).toFixed(2);
  };

  const calculate44ADIncome = () => {
    const receipts = parseFloat(formData.businessReceipts) || 0;
    const percentage = parseFloat(formData.presumptivePercentage) || 8;
    return (receipts * percentage / 100).toFixed(2);
  };

  const calculate44ADAIncome = () => {
    const receipts = parseFloat(formData.professionalReceipts) || 0;
    return (receipts * 0.5).toFixed(2); // 50% presumptive rate
  };

  // New calculation functions for missing schedules
  const calculateSTCGNetGain = (assetIndex: number) => {
    const saleField = assetIndex === 1 ? 'stcgSaleConsideration1' : 'stcgSaleConsideration2';
    const costField = assetIndex === 1 ? 'stcgCostOfAcquisition1' : 'stcgCostOfAcquisition2';
    const expenseField = assetIndex === 1 ? 'stcgExpenseOnTransfer1' : 'stcgExpenseOnTransfer2';
    
    const sale = parseFloat(formData[saleField as keyof typeof formData] as string) || 0;
    const cost = parseFloat(formData[costField as keyof typeof formData] as string) || 0;
    const expense = parseFloat(formData[expenseField as keyof typeof formData] as string) || 0;
    return (sale - cost - expense).toFixed(2);
  };

  const calculateLTCGNetGain = (assetIndex: number) => {
    const saleField = assetIndex === 1 ? 'ltcgSaleConsideration1' : 'ltcgSaleConsideration2';
    const costField = assetIndex === 1 ? 'ltcgIndexedCostOfAcquisition1' : 'ltcgIndexedCostOfAcquisition2';
    const expenseField = assetIndex === 1 ? 'ltcgExpenseOnTransfer1' : 'ltcgExpenseOnTransfer2';
    const exemptionField = assetIndex === 1 ? 'ltcgExemptionClaimed1' : 'ltcgExemptionClaimed2';
    
    const sale = parseFloat(formData[saleField as keyof typeof formData] as string) || 0;
    const cost = parseFloat(formData[costField as keyof typeof formData] as string) || 0;
    const expense = parseFloat(formData[expenseField as keyof typeof formData] as string) || 0;
    const exemption = parseFloat(formData[exemptionField as keyof typeof formData] as string) || 0;
    return (sale - cost - expense - exemption).toFixed(2);
  };

  const calculateTotalOtherSourcesIncome = () => {
    const bank = parseFloat(formData.interestFromBank) || 0;
    const fd = parseFloat(formData.interestFromFD) || 0;
    const dividend = parseFloat(formData.dividendIncome) || 0;
    const lottery = parseFloat(formData.lotteryWinnings) || 0;
    const pension = parseFloat(formData.familyPensionIncome) || 0;
    const other1 = parseFloat(formData.otherIncomeAmount1) || 0;
    const other2 = parseFloat(formData.otherIncomeAmount2) || 0;
    return (bank + fd + dividend + lottery + pension + other1 + other2).toFixed(2);
  };

  const calculateTotalDonations = () => {
    const donee1 = parseFloat(formData.donee1Amount) || 0;
    const donee2 = parseFloat(formData.donee2Amount) || 0;
    const donee3 = parseFloat(formData.donee3Amount) || 0;
    return (donee1 + donee2 + donee3).toFixed(2);
  };

  const calculateEligibleDeduction80G = (doneeIndex: number) => {
    const amountField = `donee${doneeIndex}Amount`;
    const percentageField = `donee${doneeIndex}DeductionPercentage`;
    const amount = parseFloat(formData[amountField as keyof typeof formData] as string) || 0;
    const percentage = parseFloat(formData[percentageField as keyof typeof formData] as string) || 100;
    return (amount * percentage / 100).toFixed(2);
  };

  const calculateTotalTDS = () => {
    const employer = parseFloat(formData.tdsEmployer) || 0;
    const salary = parseFloat(formData.tdsOnSalary) || 0;
    const interest = parseFloat(formData.tdsOnInterestBank) || 0;
    const rent = parseFloat(formData.tdsOnRent) || 0;
    const professional = parseFloat(formData.tdsOnProfessionalFees) || 0;
    const commission = parseFloat(formData.tdsOnCommission) || 0;
    const other = parseFloat(formData.tdsOther) || 0;
    return (employer + salary + interest + rent + professional + commission + other).toFixed(2);
  };

  const calculateTotalTCS = () => {
    const sale = parseFloat(formData.tcsOnSale) || 0;
    const purchase = parseFloat(formData.tcsOnPurchase) || 0;
    const other = parseFloat(formData.tcsOther) || 0;
    return (sale + purchase + other).toFixed(2);
  };

  const calculateTotalAdvanceTax = () => {
    const first = parseFloat(formData.advanceTaxPaid1stInstall) || 0;
    const second = parseFloat(formData.advanceTaxPaid2ndInstall) || 0;
    const third = parseFloat(formData.advanceTaxPaid3rdInstall) || 0;
    const fourth = parseFloat(formData.advanceTaxPaid4thInstall) || 0;
    return (first + second + third + fourth).toFixed(2);
  };

  const calculateTotalAssets = () => {
    const property = parseFloat(formData.immovablePropertyValue) || 0;
    const jewelry = parseFloat(formData.jewelryValue) || 0;
    const vehicle = parseFloat(formData.vehicleValue) || 0;
    const bank = parseFloat(formData.bankAccountValue) || 0;
    const shares = parseFloat(formData.sharesAndSecurities) || 0;
    const insurance = parseFloat(formData.insurancePolicyValue) || 0;
    const loans = parseFloat(formData.loansAdvancesGiven) || 0;
    const other = parseFloat(formData.otherAssetsValue) || 0;
    return (property + jewelry + vehicle + bank + shares + insurance + loans + other).toFixed(2);
  };

  const calculateTotalLiabilities = () => {
    const banks = parseFloat(formData.borrowingsFromBanks) || 0;
    const others = parseFloat(formData.borrowingsFromOthers) || 0;
    const other = parseFloat(formData.otherLiabilitiesValue) || 0;
    return (banks + others + other).toFixed(2);
  };

  const calculateNetWorth = () => {
    const assets = parseFloat(calculateTotalAssets()) || 0;
    const liabilities = parseFloat(calculateTotalLiabilities()) || 0;
    return (assets - liabilities).toFixed(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => {
        const newData = { ...prev, [name]: checked };
        localStorage.setItem('itr5-form-data', JSON.stringify(newData));
        return newData;
      });
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        
        // Auto-calculations based on field changes
        if (name === 'capitalAccount' || name === 'reservesAndSurplus' || name === 'securedLoans' || 
            name === 'unsecuredLoans' || name === 'advancesFromMembers') {
          newData.totalSourcesOfFunds = calculateTotalSourcesOfFunds();
        }
        
        if (name === 'currentAssets' || name === 'currentLiabilities') {
          newData.netCurrentAssets = calculateNetCurrentAssets();
        }
        
        if (name === 'fixedAssets' || name === 'investments' || name === 'netCurrentAssets') {
          newData.totalApplicationOfFunds = calculateTotalApplicationOfFunds();
        }
        
        if (name === 'openingStock' || name === 'purchases' || name === 'directWages' || 
            name === 'factoryOverheads' || name === 'closingStock') {
          newData.costOfGoodsSold = calculateCostOfGoodsSold();
        }
        
        if (name === 'businessReceipts' || name === 'presumptivePercentage') {
          newData.presumptiveIncome44AD = calculate44ADIncome();
        }
        
        if (name === 'professionalReceipts') {
          newData.professionalPresumptiveIncome = calculate44ADAIncome();
        }

        // Auto-calculations for new schedules
        if (name.includes('stcg') && (name.includes('SaleConsideration') || name.includes('CostOfAcquisition') || name.includes('ExpenseOnTransfer'))) {
          if (name.includes('1')) {
            newData.stcgNetGain1 = calculateSTCGNetGain(1);
          } else if (name.includes('2')) {
            newData.stcgNetGain2 = calculateSTCGNetGain(2);
          }
        }

        if (name.includes('ltcg') && (name.includes('SaleConsideration') || name.includes('IndexedCostOfAcquisition') || 
            name.includes('ExpenseOnTransfer') || name.includes('ExemptionClaimed'))) {
          if (name.includes('1')) {
            newData.ltcgNetGain1 = calculateLTCGNetGain(1);
          } else if (name.includes('2')) {
            newData.ltcgNetGain2 = calculateLTCGNetGain(2);
          }
        }

        if (name === 'interestFromBank' || name === 'interestFromFD' || name === 'dividendIncome' || 
            name === 'lotteryWinnings' || name === 'familyPensionIncome' || 
            name === 'otherIncomeAmount1' || name === 'otherIncomeAmount2') {
          newData.totalOtherSourcesIncome = calculateTotalOtherSourcesIncome();
        }

        if (name === 'donee1Amount' || name === 'donee2Amount' || name === 'donee3Amount') {
          newData.totalDonations = calculateTotalDonations();
        }

        if (name.includes('donee') && (name.includes('Amount') || name.includes('DeductionPercentage'))) {
          if (name.includes('1')) {
            newData.donee1EligibleDeduction = calculateEligibleDeduction80G(1);
          } else if (name.includes('2')) {
            newData.donee2EligibleDeduction = calculateEligibleDeduction80G(2);
          } else if (name.includes('3')) {
            newData.donee3EligibleDeduction = calculateEligibleDeduction80G(3);
          }
        }

        if (name.includes('tds') && !name.includes('On')) {
          newData.totalTDSClaimed = calculateTotalTDS();
        }

        if (name.includes('tcs')) {
          newData.totalTCSClaimed = calculateTotalTCS();
        }

        if (name.includes('advanceTaxPaid')) {
          newData.totalAdvanceTaxPaid = calculateTotalAdvanceTax();
        }

        if (name.includes('Value') && !name.includes('foreign') && !name.includes('sale')) {
          newData.totalAssets = calculateTotalAssets();
          newData.totalLiabilities = calculateTotalLiabilities();
          newData.netWorth = calculateNetWorth();
        }
        
        localStorage.setItem('itr5-form-data', JSON.stringify(newData));
        return newData;
      });
    }
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: Itr5FormErrors = {};
    let isValid = true;

    switch (stepNumber) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = 'Name is required';
          isValid = false;
        }
        if (!formData.pan.trim()) {
          newErrors.pan = 'PAN is required';
          isValid = false;
        }
        if (!formData.aadhaarNumber.trim()) {
          newErrors.aadhaarNumber = 'Aadhaar Number is required';
          isValid = false;
        } else if (!/^\d{12}$/.test(formData.aadhaarNumber.replace(/\s/g, ''))) {
          newErrors.aadhaarNumber = 'Please enter a valid 12-digit Aadhaar number';
          isValid = false;
        }
        if (!formData.formationDate) {
          newErrors.formationDate = 'Formation date is required';
          isValid = false;
        }
        if (!formData.state) {
          newErrors.state = 'State is required';
          isValid = false;
        }
        if (!formData.pincode) {
          newErrors.pincode = 'PIN/ZIP is required';
          isValid = false;
        }
        if (!formData.country) {
          newErrors.country = 'Country is required';
          isValid = false;
        }
        if (!formData.email1) {
          newErrors.email1 = 'Email address is required';
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email1)) {
          newErrors.email1 = 'Please enter a valid email address';
          isValid = false;
        }
        break;
      case 2:
        if (!formData.entityStatus) {
          newErrors.entityStatus = 'Entity status is required';
          isValid = false;
        }
        break;
      case 3:
        if (!formData.filingSection) {
          newErrors.filingSection = 'Filing section is required';
          isValid = false;
        }
        if (!formData.filingType) {
          newErrors.filingType = 'Filing type is required';
          isValid = false;
        }
        break;
      case 4:
        // Tax regime options are optional
        break;
      case 5:
        if (!formData.residentialStatus) {
          newErrors.residentialStatus = 'Residential status is required';
          isValid = false;
        }
        break;
      case 6:
        // Representative details are optional
        break;
      case 7:
        // Audit applicability validation
        break;
      case 8:
        // Audit details validation if applicable
        break;
      case 9:
        if (!formData.partnerName1) {
          newErrors.partnerName1 = 'At least one partner is required';
          isValid = false;
        }
        if (!formData.partnerPAN1) {
          newErrors.partnerPAN1 = 'Partner PAN is required';
          isValid = false;
        }
        break;
      case 10:
        // Trust details are conditional
        break;
      case 11:
        if (!formData.businessCode1) {
          newErrors.businessCode1 = 'At least one business activity is required';
          isValid = false;
        }
        if (!formData.tradeName1) {
          newErrors.tradeName1 = 'Trade name is required';
          isValid = false;
        }
        break;
      case 12:
        // Balance sheet sources validation
        break;
      case 13:
        // Balance sheet application validation
        break;
      case 14:
        // Non-account case validation
        break;
      case 15:
        // Manufacturing account validation
        break;
      case 16:
        // Trading account validation
        break;
      case 17:
        // P&L account validation
        break;
      case 18:
        // Income & expenses validation
        break;
      case 19:
        // Section 44AD validation
        break;
      case 20:
        // Section 44ADA validation
        break;
      case 21:
        // Section 44AE validation
        break;
      case 22:
        // No account case validation
        break;
      case 23:
        // Speculative income validation
        break;
      case 24:
        // Accounting methods validation
        break;
      case 25:
        // Disallowable expenses validation
        break;
      case 26:
        // Quantitative details validation
        break;
      case 27:
        // House property validation
        break;
      case 28:
        // Unlisted shares validation
        break;
      case 29:
        // Short-term capital gains validation
        break;
      case 30:
        // Long-term capital gains validation
        break;
      case 31:
        // Other sources validation
        break;
      case 32:
        // Donations validation
        break;
      case 33:
        // Business computation validation
        break;
      case 34:
        // TDS/TCS validation
        break;
      case 35:
        // Advance tax validation
        break;
      case 36:
        // Foreign assets validation
        break;
      case 37:
        // Assets & liabilities validation
        break;
      case 38:
        if (!formData.verificationPlace) {
          newErrors.verificationPlace = 'Verification place is required';
          isValid = false;
        }
        if (!formData.declarantName) {
          newErrors.declarantName = 'Declarant name is required';
          isValid = false;
        }
        if (!formData.verificationMethod) {
          newErrors.verificationMethod = 'Verification method is required';
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = async () => {
    if (validateStep(step)) {
      if (step === 38) {
        setIsLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          localStorage.removeItem('itr5-current-step');
          localStorage.removeItem('itr5-form-data');
          navigate("/practice/itr/success");
        } catch (error) {
          setSaveError("Failed to save ITR-5. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        const nextStep = step + 1;
        setStep(nextStep);
        localStorage.setItem('itr5-current-step', nextStep.toString());
      }
    }
  };

  const handlePreviousStep = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    localStorage.setItem('itr5-current-step', prevStep.toString());
  };

  const getStepTitle = (stepNumber: number) => {
    const titles: Record<number, string> = {
      1: 'Basic Entity Information',
      2: 'Status & Sub-Status',
      3: 'Contact & Filing Status',
      4: 'New Tax Regime Options',
      5: 'Residential Status & Special Declarations',
      6: 'Representative Assessee & Entity Details',
      7: 'Section 44AA & 44AB Applicability',
      8: 'Audit Report Details & Transfer Pricing',
      9: 'Partners/Members Details',
      10: 'Trust & Special Member Information',
      11: 'Business Activities (3 Activities)',
      12: 'Balance Sheet - Sources of Funds',
      13: 'Balance Sheet - Application of Funds',
      14: 'Non-Account Case Assets/Liabilities',
      15: 'Manufacturing Account',
      16: 'Trading Account',
      17: 'Profit & Loss Account',
      18: 'Income & Expenses Summary',
      19: 'Section 44AD Business',
      20: 'Section 44ADA Professional',
      21: 'Section 44AE Goods Carriage',
      22: 'No Account Case (Part 65)',
      23: 'Speculative Income (Part 66)',
      24: 'Accounting Methods & ICDS',
      25: 'Disallowable Expenses',
      26: 'Trading/Manufacturing Stock Details',
      27: 'House Property Income',
      28: 'Unlisted Equity Shares Schedule',
      29: 'Schedule CG - Short-term Capital Gains',
      30: 'Schedule CG - Long-term Capital Gains',
      31: 'Schedule OS - Other Sources Income',
      32: 'Schedule 80G - Donations',
      33: 'Schedule BP - Business Income Computation',
      34: 'Schedule TDS/TCS - Tax Deducted/Collected',
      35: 'Schedule IT - Advance Tax',
      36: 'Schedule FSI/TR/FA - Foreign Assets',
      37: 'Schedule AL - Assets & Liabilities',
      38: 'Enhanced Verification & Submission',
    };
    return titles[stepNumber] || '';
  };

  const formatCurrency = (value: string) => {
    if (!value) return '';
    const num = parseFloat(value);
    return isNaN(num) ? '' : `₹${num.toLocaleString('en-IN')}`;
  };

  return (
    <>
      <div className="w-[60%] mt-20 p-6 mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200">
        <ul className="flex items-center space-x-4 text-lg font-semibold text-gray-700">
          <li
            className="flex items-center transition duration-200 cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/practice")}
          >
            <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18m-6-6l6 6m-6 6l6-6"></path>
            </svg>
            Practice
          </li>
          <span className="text-gray-400">›</span>
          <li
            className="transition duration-200 cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/practice/itr")}
          >
            ITR
          </li>
          <span className="text-gray-400">›</span>
          <li className="text-gray-500">ITR-5</li>
        </ul>
      </div>

      <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
        <h2 className="text-xl font-extrabold text-white">
          {`Step ${step} of 38: ${getStepTitle(step)}`}
        </h2>
      </div>

      <div className="w-[60%] mb-20 p-6 mx-auto bg-white rounded-lg shadow-lg">
        {/* Step 1: Basic Entity Information */}
        {step === 1 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Basic Entity Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Name of Entity <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PAN <span className="text-red-500">*</span></label>
                <input type="text" name="pan" value={formData.pan} onChange={handleChange} maxLength={10} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="ABCDE1234F" />
                {errors.pan && <p className="mt-1 text-sm text-red-500">{errors.pan}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Aadhaar Number / Enrolment ID <span className="text-red-500">*</span></label>
                <input type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} maxLength={12} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="1234 5678 9012" />
                {errors.aadhaarNumber && <p className="mt-1 text-sm text-red-500">{errors.aadhaarNumber}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Old Name (if changed)</label>
                <input type="text" name="oldName" value={formData.oldName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">LLPIN (if LLP)</label>
                <input type="text" name="llpin" value={formData.llpin} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Date of Formation <span className="text-red-500">*</span></label>
                <input type="date" name="formationDate" value={formData.formationDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.formationDate && <p className="mt-1 text-sm text-red-500">{errors.formationDate}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Business Start Date</label>
                <input type="date" name="businessStartDate" value={formData.businessStartDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            
            <h5 className="mt-8 mb-4 text-lg font-semibold text-gray-700">Address Details</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Flat/Door/Block No.</label>
                <input type="text" name="flatNo" value={formData.flatNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Building/Village</label>
                <input type="text" name="building" value={formData.building} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Street/Post Office</label>
                <input type="text" name="street" value={formData.street} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Area/Locality</label>
                <input type="text" name="area" value={formData.area} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Town/City</label>
                <input type="text" name="town" value={formData.town} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">State <span className="text-red-500">*</span></label>
                <select name="state" value={formData.state} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option value="">Select State</option>
                  <option value="AN">Andaman and Nicobar Islands</option>
                  <option value="AP">Andhra Pradesh</option>
                  <option value="AR">Arunachal Pradesh</option>
                  <option value="AS">Assam</option>
                  <option value="BR">Bihar</option>
                  <option value="CG">Chhattisgarh</option>
                  <option value="CH">Chandigarh</option>
                  <option value="DH">Dadra and Nagar Haveli</option>
                  <option value="DD">Daman and Diu</option>
                  <option value="DL">Delhi</option>
                  <option value="GA">Goa</option>
                  <option value="GJ">Gujarat</option>
                  <option value="HR">Haryana</option>
                  <option value="HP">Himachal Pradesh</option>
                  <option value="JK">Jammu and Kashmir</option>
                  <option value="JH">Jharkhand</option>
                  <option value="KA">Karnataka</option>
                  <option value="KL">Kerala</option>
                  <option value="LA">Ladakh</option>
                  <option value="LD">Lakshadweep</option>
                  <option value="MP">Madhya Pradesh</option>
                  <option value="MH">Maharashtra</option>
                  <option value="MN">Manipur</option>
                  <option value="ML">Meghalaya</option>
                  <option value="MZ">Mizoram</option>
                  <option value="NL">Nagaland</option>
                  <option value="OR">Odisha</option>
                  <option value="PY">Puducherry</option>
                  <option value="PB">Punjab</option>
                  <option value="RJ">Rajasthan</option>
                  <option value="SK">Sikkim</option>
                  <option value="TN">Tamil Nadu</option>
                  <option value="TS">Telangana</option>
                  <option value="TR">Tripura</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="UK">Uttarakhand</option>
                  <option value="WB">West Bengal</option>
                </select>
                {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PIN/ZIP Code <span className="text-red-500">*</span></label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} maxLength={6} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.pincode && <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Country <span className="text-red-500">*</span></label>
                <select name="country" value={formData.country} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Country</option>
                  <option value="IN">India</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="SG">Singapore</option>
                  <option value="AE">UAE</option>
                </select>
                {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
              </div>
            </div>

            <h5 className="mt-8 mb-4 text-lg font-semibold text-gray-700">Contact Information</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number 1</label>
                <input type="tel" name="phone1" value={formData.phone1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number 2</label>
                <input type="tel" name="phone2" value={formData.phone2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email Address 1 <span className="text-red-500">*</span></label>
                <input type="email" name="email1" value={formData.email1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.email1 && <p className="mt-1 text-sm text-red-500">{errors.email1}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email Address 2</label>
                <input type="email" name="email2" value={formData.email2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Status & Sub-Status */}
        {step === 2 && (
          <div className="p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="mb-6 text-xl font-bold text-green-800">Status & Sub-Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Entity Status <span className="text-red-500">*</span></label>
                <select name="entityStatus" value={formData.entityStatus} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="">Select Entity Status</option>
                  <option value="Partnership Firm">Partnership Firm</option>
                  <option value="LLP">Limited Liability Partnership (LLP)</option>
                  <option value="AOP">Association of Persons (AOP)</option>
                  <option value="BOI">Body of Individuals (BOI)</option>
                  <option value="Artificial Juridical Person">Artificial Juridical Person</option>
                  <option value="Local Authority">Local Authority</option>
                </select>
                {errors.entityStatus && <p className="mt-1 text-sm text-red-500">{errors.entityStatus}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Entity Sub-Status</label>
                <select name="entitySubStatus" value={formData.entitySubStatus} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="">Select Sub-Status</option>
                  <option value="Registered">Registered</option>
                  <option value="Unregistered">Unregistered</option>
                  <option value="Limited">Limited</option>
                  <option value="Unlimited">Unlimited</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Constitution Date</label>
                <input type="date" name="constitutionDate" value={formData.constitutionDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Registration Number</label>
                <input type="text" name="registrationNo" value={formData.registrationNo} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact & Filing Status */}
        {step === 3 && (
          <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="mb-6 text-xl font-bold text-yellow-800">Contact & Filing Status</h3>
            
            <h4 className="mb-4 text-lg font-semibold text-gray-700">Additional Contact Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Office Phone</label>
                <input type="tel" name="officePhone" value={formData.officePhone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Mobile Number</label>
                <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Alternate Email</label>
                <input type="email" name="alternateEmail" value={formData.alternateEmail} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
            </div>

            <h4 className="mb-4 text-lg font-semibold text-gray-700">Filing Status</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Filing Under Section <span className="text-red-500">*</span></label>
                <select name="filingSection" value={formData.filingSection} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                  <option value="">Select Filing Section</option>
                  <option value="139(1)">139(1) - Regular Return</option>
                  <option value="139(4)">139(4) - Loss Return</option>
                  <option value="139(5)">139(5) - Revised Return</option>
                  <option value="92CD">92CD - Transfer Pricing</option>
                  <option value="119(2)(b)">119(2)(b) - Defective Return</option>
                  <option value="153A">153A - Search Assessment</option>
                  <option value="153C">153C - Associated Person</option>
                </select>
                {errors.filingSection && <p className="mt-1 text-sm text-red-500">{errors.filingSection}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Due Date</label>
                <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Filing Type <span className="text-red-500">*</span></label>
                <select name="filingType" value={formData.filingType} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                  <option value="">Select Filing Type</option>
                  <option value="Original">Original Filing</option>
                  <option value="Revised">Revised Filing</option>
                  <option value="Notice-based">Notice-based Filing</option>
                  <option value="Updated">Updated Return</option>
                </select>
                {errors.filingType && <p className="mt-1 text-sm text-red-500">{errors.filingType}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Receipt Number (if revised)</label>
                <input type="text" name="receiptNumber" value={formData.receiptNumber} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Original Filing Date</label>
                <input type="date" name="originalFilingDate" value={formData.originalFilingDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">DIN / Unique Number</label>
                <input type="text" name="noticeDIN" value={formData.noticeDIN} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Date of Notice/Order</label>
                <input type="date" name="noticeDate" value={formData.noticeDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: New Tax Regime Options */}
        {step === 4 && (
          <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="mb-6 text-xl font-bold text-purple-800">New Tax Regime Options</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Tax Regime Option</label>
                <select name="taxRegimeOption" value={formData.taxRegimeOption} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                  <option value="">Select Tax Regime</option>
                  <option value="115BAC">115BAC - New Tax Regime for Individuals</option>
                  <option value="115BAD">115BAD - New Tax Regime for Cooperative Societies</option>
                  <option value="115BAE">115BAE - New Tax Regime for Firms/LLP/AOP/BOI</option>
                  <option value="Regular">Regular Tax Regime</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Related Form Number</label>
                <input type="text" name="relatedFormNumber" value={formData.relatedFormNumber} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="e.g., Form 10-IE" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Acknowledgment Number</label>
                <input type="text" name="acknowledgmentNumber" value={formData.acknowledgmentNumber} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Option Date</label>
                <input type="date" name="optionDate" value={formData.optionDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Residential Status & Special Declarations */}
        {step === 5 && (
          <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-200">
            <h3 className="mb-6 text-xl font-bold text-indigo-800">Residential Status & Special Declarations</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Residential Status <span className="text-red-500">*</span></label>
                <select name="residentialStatus" value={formData.residentialStatus} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Select Residential Status</option>
                  <option value="Resident">Resident</option>
                  <option value="Non-Resident">Non-Resident</option>
                  <option value="Not Ordinarily Resident">Not Ordinarily Resident</option>
                </select>
                {errors.residentialStatus && <p className="mt-1 text-sm text-red-500">{errors.residentialStatus}</p>}
              </div>
            </div>

            {formData.residentialStatus === 'Non-Resident' && (
              <div className="mb-6 p-4 bg-indigo-100 rounded-lg">
                <h4 className="mb-4 text-lg font-semibold text-gray-700">PE and SEP Details for Non-residents</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">PE Transaction Value (₹)</label>
                    <input type="number" name="peTransactionValue" value={formData.peTransactionValue} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">SEP User Count</label>
                    <input type="number" name="sepUserCount" value={formData.sepUserCount} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
                <div className="flex items-center">
                <input type="checkbox" name="fiiStatus" checked={formData.fiiStatus} onChange={handleChange} className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">FII/FPI Status</label>
              </div>
              
              {formData.fiiStatus && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">SEBI Registration Number</label>
                  <input type="text" name="sebiRegNumber" value={formData.sebiRegNumber} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
              )}

              <div className="flex items-center">
                <input type="checkbox" name="hasIFSCUnit" checked={formData.hasIFSCUnit} onChange={handleChange} className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                  <label className="ml-2 text-sm font-medium text-gray-700">Has IFSC Unit</label>
                </div>
              
                <div className="flex items-center">
                <input type="checkbox" name="isStartup" checked={formData.isStartup} onChange={handleChange} className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                  <label className="ml-2 text-sm font-medium text-gray-700">Is Startup</label>
                </div>
              
              {formData.isStartup && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-indigo-100 rounded-lg">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Startup Registration Number</label>
                    <input type="text" name="startupRegNo" value={formData.startupRegNo} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">DPIIT ID</label>
                    <input type="text" name="dpittId" value={formData.dpittId} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">MSME Registration Number</label>
                <input type="text" name="msmeRegNo" value={formData.msmeRegNo} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Representative Assessee & Entity Details */}
        {step === 6 && (
          <div className="p-6 bg-pink-50 rounded-lg border border-pink-200">
            <h3 className="mb-6 text-xl font-bold text-pink-800">Representative Assessee & Entity Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Representative Name</label>
                <input type="text" name="representativeName" value={formData.representativeName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Representative PAN / Aadhaar</label>
                <input type="text" name="representativePAN" value={formData.representativePAN} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Representative Role</label>
                <select name="representativeRole" value={formData.representativeRole} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                  <option value="">Select Role</option>
                  <option value="Partner">Partner</option>
                  <option value="Authorized Representative">Authorized Representative</option>
                  <option value="Karta">Karta</option>
                  <option value="Manager">Manager</option>
                  <option value="Secretary">Secretary</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Representative Address</label>
                <textarea name="representativeAddress" value={formData.representativeAddress} onChange={handleChange} rows={2} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Partner in Firm Name</label>
                <input type="text" name="partnerInFirmName" value={formData.partnerInFirmName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Partner in Firm PAN</label>
                <input type="text" name="partnerInFirmPAN" value={formData.partnerInFirmPAN} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Legal Entity Identifier (LEI)</label>
                <input type="text" name="legalEntityIdentifier" value={formData.legalEntityIdentifier} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="Mandatory if refund ≥ ₹50 crore" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Expected Refund Amount (₹)</label>
                <input type="number" name="refundAmount" value={formData.refundAmount} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Section 44AA & 44AB Applicability */}
        {step === 7 && (
          <div className="p-6 bg-red-50 rounded-lg border border-red-200">
            <h3 className="mb-6 text-xl font-bold text-red-800">AUDIT INFORMATION</h3>
            <h4 className="mb-4 text-lg font-semibold text-gray-700">Section 44AA & 44AB Applicability</h4>
            <div className="space-y-6">
              <div className="flex items-center">
                <input type="checkbox" name="section44AAApplicable" checked={formData.section44AAApplicable} onChange={handleChange} className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Section 44AA Applicable (Maintenance of Books of Account)</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="section44ABApplicable" checked={formData.section44ABApplicable} onChange={handleChange} className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Section 44AB Applicable (Tax Audit)</label>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Accounting Status</label>
                <select name="accountingStatus" value={formData.accountingStatus} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option value="">Select Status</option>
                  <option value="Maintained">Books of Account Maintained</option>
                  <option value="Not Maintained">Books of Account Not Maintained</option>
                  <option value="Partially Maintained">Partially Maintained</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Total Turnover (₹)</label>
                  <input type="number" name="turnover" value={formData.turnover} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                  {formData.turnover && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.turnover)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Cash Receipt Threshold (₹)</label>
                  <input type="number" name="cashReceiptThreshold" value={formData.cashReceiptThreshold} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                  {formData.cashReceiptThreshold && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.cashReceiptThreshold)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Cash Payment Threshold (₹)</label>
                  <input type="number" name="cashPaymentThreshold" value={formData.cashPaymentThreshold} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                  {formData.cashPaymentThreshold && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.cashPaymentThreshold)}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 8: Audit Report Details & Transfer Pricing */}
        {step === 8 && (
          <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
            <h3 className="mb-6 text-xl font-bold text-orange-800">Audit Report Details & Transfer Pricing</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <input type="checkbox" name="isAudited" checked={formData.isAudited} onChange={handleChange} className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Is Audited</label>
              </div>
              
              {formData.isAudited && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-orange-100 rounded-lg">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Auditor/Firm Name</label>
                    <input type="text" name="auditFirm" value={formData.auditFirm} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Auditor PAN</label>
                    <input type="text" name="auditPAN" value={formData.auditPAN} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Audit Date</label>
                    <input type="date" name="auditDate" value={formData.auditDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">UDIN</label>
                    <input type="text" name="auditUDIN" value={formData.auditUDIN} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Acknowledgment Number</label>
                    <input type="text" name="auditAckNumber" value={formData.auditAckNumber} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <input type="checkbox" name="transferPricingAudit" checked={formData.transferPricingAudit} onChange={handleChange} className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Transfer Pricing Audit (Section 92E)</label>
            </div>

              {formData.transferPricingAudit && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Transfer Pricing Report Information</label>
                  <textarea name="transferPricingReportInfo" value={formData.transferPricingReportInfo} onChange={handleChange} rows={3} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
          </div>
        )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Other Audit Reports</label>
                  <input type="text" name="otherAuditReports" value={formData.otherAuditReports} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Section Code</label>
                  <input type="text" name="otherAuditSectionCode" value={formData.otherAuditSectionCode} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Audit Acknowledgment</label>
                  <input type="text" name="otherAuditAckNumber" value={formData.otherAuditAckNumber} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 9: Partners/Members Details */}
        {step === 9 && (
          <div className="p-6 bg-teal-50 rounded-lg border border-teal-200">
            <h3 className="mb-6 text-xl font-bold text-teal-800">PARTNERS/MEMBERS/TRUST INFO</h3>
            <h4 className="mb-4 text-lg font-semibold text-gray-700">Partners/Members Details</h4>
            
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">Total Number of Partners/Members</label>
              <input type="number" name="partnersCount" value={formData.partnersCount} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" max="10" />
            </div>

            {/* Partner 1 */}
            <div className="mb-8 p-4 bg-teal-100 rounded-lg">
              <h5 className="mb-4 text-md font-semibold text-gray-700">Partner/Member 1 <span className="text-red-500">*</span></h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                  <input type="text" name="partnerName1" value={formData.partnerName1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                  {errors.partnerName1 && <p className="mt-1 text-sm text-red-500">{errors.partnerName1}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PAN <span className="text-red-500">*</span></label>
                  <input type="text" name="partnerPAN1" value={formData.partnerPAN1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                  {errors.partnerPAN1 && <p className="mt-1 text-sm text-red-500">{errors.partnerPAN1}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Admission Date</label>
                  <input type="date" name="partnerAdmissionDate1" value={formData.partnerAdmissionDate1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
              </div>
              <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Retirement Date</label>
                  <input type="date" name="partnerRetirementDate1" value={formData.partnerRetirementDate1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
              </div>
              <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Remuneration (₹)</label>
                  <input type="number" name="partnerRemuneration1" value={formData.partnerRemuneration1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                  {formData.partnerRemuneration1 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.partnerRemuneration1)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Share Percentage (%)</label>
                  <input type="number" name="partnerSharePercent1" value={formData.partnerSharePercent1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" max="100" />
                </div>
              </div>
            </div>

            {/* Partner 2 */}
            <div className="mb-8 p-4 bg-teal-100 rounded-lg">
              <h5 className="mb-4 text-md font-semibold text-gray-700">Partner/Member 2 (Optional)</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                  <input type="text" name="partnerName2" value={formData.partnerName2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">PAN</label>
                  <input type="text" name="partnerPAN2" value={formData.partnerPAN2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Admission Date</label>
                  <input type="date" name="partnerAdmissionDate2" value={formData.partnerAdmissionDate2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Retirement Date</label>
                  <input type="date" name="partnerRetirementDate2" value={formData.partnerRetirementDate2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Remuneration (₹)</label>
                  <input type="number" name="partnerRemuneration2" value={formData.partnerRemuneration2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                  {formData.partnerRemuneration2 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.partnerRemuneration2)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Share Percentage (%)</label>
                  <input type="number" name="partnerSharePercent2" value={formData.partnerSharePercent2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" max="100" />
                </div>
              </div>
            </div>

            {/* Partner 3 */}
            <div className="mb-8 p-4 bg-teal-100 rounded-lg">
              <h5 className="mb-4 text-md font-semibold text-gray-700">Partner/Member 3 (Optional)</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                  <input type="text" name="partnerName3" value={formData.partnerName3} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">PAN</label>
                  <input type="text" name="partnerPAN3" value={formData.partnerPAN3} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Admission Date</label>
                  <input type="date" name="partnerAdmissionDate3" value={formData.partnerAdmissionDate3} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Retirement Date</label>
                  <input type="date" name="partnerRetirementDate3" value={formData.partnerRetirementDate3} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Remuneration (₹)</label>
                  <input type="number" name="partnerRemuneration3" value={formData.partnerRemuneration3} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                  {formData.partnerRemuneration3 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.partnerRemuneration3)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Share Percentage (%)</label>
                  <input type="number" name="partnerSharePercent3" value={formData.partnerSharePercent3} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" max="100" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 10: Trust & Special Member Information */}
        {step === 10 && (
          <div className="p-6 bg-cyan-50 rounded-lg border border-cyan-200">
            <h3 className="mb-6 text-xl font-bold text-cyan-800">Trust & Special Member Information</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <input type="checkbox" name="hasForeignMember" checked={formData.hasForeignMember} onChange={handleChange} className="w-4 h-4 text-cyan-600 border-gray-300 focus:ring-cyan-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Has Foreign Member</label>
              </div>

              {formData.hasForeignMember && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Foreign Member Share Percentage (%)</label>
                  <input type="number" name="foreignMemberSharePercent" value={formData.foreignMemberSharePercent} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" max="100" />
                </div>
              )}

              <div className="flex items-center">
                <input type="checkbox" name="hasHighIncomeMember" checked={formData.hasHighIncomeMember} onChange={handleChange} className="w-4 h-4 text-cyan-600 border-gray-300 focus:ring-cyan-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Has High Income Member (Exceeds Basic Exemption)</label>
              </div>

              {formData.hasHighIncomeMember && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">High Income Member Details</label>
                  <textarea name="highIncomeMemberDetails" value={formData.highIncomeMemberDetails} onChange={handleChange} rows={3} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
              )}

              <div className="flex items-center">
                <input type="checkbox" name="isTrust" checked={formData.isTrust} onChange={handleChange} className="w-4 h-4 text-cyan-600 border-gray-300 focus:ring-cyan-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Is Trust</label>
              </div>

              {formData.isTrust && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-cyan-100 rounded-lg">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Beneficiary Shares</label>
                    <textarea name="beneficiaryShares" value={formData.beneficiaryShares} onChange={handleChange} rows={2} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input type="checkbox" name="isWillBasedTrust" checked={formData.isWillBasedTrust} onChange={handleChange} className="w-4 h-4 text-cyan-600 border-gray-300 focus:ring-cyan-500" />
                      <label className="ml-2 text-sm font-medium text-gray-700">Is Will Based Trust</label>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Trust Exemptions</label>
                      <textarea name="trustExemptions" value={formData.trustExemptions} onChange={handleChange} rows={2} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 11: Business Activities */}
        {step === 11 && (
          <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-200">
            <h3 className="mb-6 text-xl font-bold text-emerald-800">NATURE OF BUSINESS</h3>
            <h4 className="mb-4 text-lg font-semibold text-gray-700">Three Main Activities/Products</h4>
            
            {/* Business Activity 1 */}
            <div className="mb-8 p-4 bg-emerald-100 rounded-lg">
              <h5 className="mb-4 text-md font-semibold text-gray-700">Business Activity 1 <span className="text-red-500">*</span></h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Business Code <span className="text-red-500">*</span></label>
                  <input type="text" name="businessCode1" value={formData.businessCode1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                  {errors.businessCode1 && <p className="mt-1 text-sm text-red-500">{errors.businessCode1}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Trade Name <span className="text-red-500">*</span></label>
                  <input type="text" name="tradeName1" value={formData.tradeName1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                  {errors.tradeName1 && <p className="mt-1 text-sm text-red-500">{errors.tradeName1}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                  <textarea name="description1" value={formData.description1} onChange={handleChange} rows={2} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
              </div>
            </div>

            {/* Business Activity 2 */}
            <div className="mb-8 p-4 bg-emerald-100 rounded-lg">
              <h5 className="mb-4 text-md font-semibold text-gray-700">Business Activity 2 (Optional)</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Business Code</label>
                  <input type="text" name="businessCode2" value={formData.businessCode2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Trade Name</label>
                  <input type="text" name="tradeName2" value={formData.tradeName2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                  <textarea name="description2" value={formData.description2} onChange={handleChange} rows={2} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
              </div>
            </div>

            {/* Business Activity 3 */}
            <div className="mb-8 p-4 bg-emerald-100 rounded-lg">
              <h5 className="mb-4 text-md font-semibold text-gray-700">Business Activity 3 (Optional)</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Business Code</label>
                  <input type="text" name="businessCode3" value={formData.businessCode3} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Trade Name</label>
                  <input type="text" name="tradeName3" value={formData.tradeName3} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                  <textarea name="description3" value={formData.description3} onChange={handleChange} rows={2} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 12: Balance Sheet - Sources of Funds */}
        {step === 12 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">BALANCE SHEET (PART A-BS)</h3>
            <h4 className="mb-4 text-lg font-semibold text-gray-700">Sources of Funds</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Capital Account (₹)</label>
                <input type="number" name="capitalAccount" value={formData.capitalAccount} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {formData.capitalAccount && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.capitalAccount)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Reserves and Surplus (₹)</label>
                <input type="number" name="reservesAndSurplus" value={formData.reservesAndSurplus} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {formData.reservesAndSurplus && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.reservesAndSurplus)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Secured Loans (₹)</label>
                <input type="number" name="securedLoans" value={formData.securedLoans} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {formData.securedLoans && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.securedLoans)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Unsecured Loans (₹)</label>
                <input type="number" name="unsecuredLoans" value={formData.unsecuredLoans} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {formData.unsecuredLoans && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.unsecuredLoans)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Advances from Members (₹)</label>
                <input type="number" name="advancesFromMembers" value={formData.advancesFromMembers} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {formData.advancesFromMembers && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.advancesFromMembers)}</p>}
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">Total Sources of Funds (₹)</label>
                <input type="text" name="totalSourcesOfFunds" value={calculateTotalSourcesOfFunds()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                <p className="mt-1 text-sm text-blue-600 font-semibold">{formatCurrency(calculateTotalSourcesOfFunds())}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 13: Balance Sheet - Application of Funds */}
        {step === 13 && (
          <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-200">
            <h3 className="mb-6 text-xl font-bold text-indigo-800">BALANCE SHEET - APPLICATION OF FUNDS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Fixed Assets (₹)</label>
                <input type="number" name="fixedAssets" value={formData.fixedAssets} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formData.fixedAssets && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.fixedAssets)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Investments (₹)</label>
                <input type="number" name="investments" value={formData.investments} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formData.investments && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.investments)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Current Assets (₹)</label>
                <input type="number" name="currentAssets" value={formData.currentAssets} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formData.currentAssets && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.currentAssets)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Current Liabilities (₹)</label>
                <input type="number" name="currentLiabilities" value={formData.currentLiabilities} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formData.currentLiabilities && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.currentLiabilities)}</p>}
              </div>
              <div className="bg-indigo-100 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">Net Current Assets (₹)</label>
                <input type="text" name="netCurrentAssets" value={calculateNetCurrentAssets()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                <p className="mt-1 text-sm text-indigo-600 font-semibold">{formatCurrency(calculateNetCurrentAssets())}</p>
              </div>
              <div className="bg-indigo-100 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">Total Application of Funds (₹)</label>
                <input type="text" name="totalApplicationOfFunds" value={calculateTotalApplicationOfFunds()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                <p className="mt-1 text-sm text-indigo-600 font-semibold">{formatCurrency(calculateTotalApplicationOfFunds())}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 14: Non-Account Case Assets/Liabilities */}
        {step === 14 && (
          <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="mb-6 text-xl font-bold text-purple-800">NON-ACCOUNT CASE ASSETS/LIABILITIES</h3>
            <h4 className="mb-4 text-lg font-semibold text-gray-700">Opening & Closing Balances</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Debtors (₹)</label>
                <input type="number" name="debtors" value={formData.debtors} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                {formData.debtors && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.debtors)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Creditors (₹)</label>
                <input type="number" name="creditors" value={formData.creditors} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                {formData.creditors && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.creditors)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Stock (₹)</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                {formData.stock && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.stock)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Cash (₹)</label>
                <input type="number" name="cash" value={formData.cash} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                {formData.cash && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.cash)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Bank Balance (₹)</label>
                <input type="number" name="bankBalance" value={formData.bankBalance} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                {formData.bankBalance && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.bankBalance)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Other Assets (₹)</label>
                <input type="number" name="otherAssets" value={formData.otherAssets} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                {formData.otherAssets && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.otherAssets)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Other Liabilities (₹)</label>
                <input type="number" name="otherLiabilities" value={formData.otherLiabilities} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                {formData.otherLiabilities && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.otherLiabilities)}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 15: Manufacturing Account */}
        {step === 15 && (
          <div className="p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="mb-6 text-xl font-bold text-green-800">MANUFACTURING ACCOUNT</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Opening Stock (₹)</label>
                <input type="number" name="openingStock" value={formData.openingStock} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                {formData.openingStock && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.openingStock)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Purchases (₹)</label>
                <input type="number" name="purchases" value={formData.purchases} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                {formData.purchases && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.purchases)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Direct Wages (₹)</label>
                <input type="number" name="directWages" value={formData.directWages} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                {formData.directWages && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.directWages)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Factory Overheads (₹)</label>
                <input type="number" name="factoryOverheads" value={formData.factoryOverheads} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                {formData.factoryOverheads && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.factoryOverheads)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Closing Stock (₹)</label>
                <input type="number" name="closingStock" value={formData.closingStock} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                {formData.closingStock && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.closingStock)}</p>}
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">Cost of Goods Sold (₹)</label>
                <input type="text" name="costOfGoodsSold" value={calculateCostOfGoodsSold()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                <p className="mt-1 text-sm text-green-600 font-semibold">{formatCurrency(calculateCostOfGoodsSold())}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 16: Trading Account */}
        {step === 16 && (
          <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="mb-6 text-xl font-bold text-yellow-800">TRADING ACCOUNT</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Trading Opening Stock (₹)</label>
                <input type="number" name="tradingOpeningStock" value={formData.tradingOpeningStock} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                {formData.tradingOpeningStock && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.tradingOpeningStock)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Trading Purchases (₹)</label>
                <input type="number" name="tradingPurchases" value={formData.tradingPurchases} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                {formData.tradingPurchases && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.tradingPurchases)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Trading Closing Stock (₹)</label>
                <input type="number" name="tradingClosingStock" value={formData.tradingClosingStock} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                {formData.tradingClosingStock && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.tradingClosingStock)}</p>}
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">Gross Profit (₹)</label>
                <input type="text" name="grossProfit" value={calculateGrossProfit()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                <p className="mt-1 text-sm text-yellow-600 font-semibold">{formatCurrency(calculateGrossProfit())}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 17: Profit & Loss Account */}
        {step === 17 && (
          <div className="p-6 bg-red-50 rounded-lg border border-red-200">
            <h3 className="mb-6 text-xl font-bold text-red-800">PROFIT & LOSS ACCOUNT</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Gross Profit B/F (₹)</label>
                <input type="number" name="grossProfitBF" value={formData.grossProfitBF} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                {formData.grossProfitBF && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.grossProfitBF)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Other Income (₹)</label>
                <input type="number" name="otherIncome" value={formData.otherIncome} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                {formData.otherIncome && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.otherIncome)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Administrative Expenses (₹)</label>
                <input type="number" name="administrativeExpenses" value={formData.administrativeExpenses} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                {formData.administrativeExpenses && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.administrativeExpenses)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Selling Expenses (₹)</label>
                <input type="number" name="sellingExpenses" value={formData.sellingExpenses} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                {formData.sellingExpenses && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.sellingExpenses)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Financial Expenses (₹)</label>
                <input type="number" name="financialExpenses" value={formData.financialExpenses} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                {formData.financialExpenses && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.financialExpenses)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Depreciation (₹)</label>
                <input type="number" name="depreciation" value={formData.depreciation} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                {formData.depreciation && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.depreciation)}</p>}
              </div>
              <div className="bg-red-100 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">Net Profit Before Tax (₹)</label>
                <input type="text" name="netProfitBeforeTax" value={calculateNetProfitBeforeTax()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                <p className="mt-1 text-sm text-red-600 font-semibold">{formatCurrency(calculateNetProfitBeforeTax())}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 18: Income & Expenses Summary */}
        {step === 18 && (
          <div className="p-6 bg-teal-50 rounded-lg border border-teal-200">
            <h3 className="mb-6 text-xl font-bold text-teal-800">INCOME & EXPENSES SUMMARY</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Revenue from Operations (₹)</label>
                <input type="number" name="revenueFromOperations" value={formData.revenueFromOperations} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                {formData.revenueFromOperations && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.revenueFromOperations)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Other Operating Income (₹)</label>
                <input type="number" name="otherOperatingIncome" value={formData.otherOperatingIncome} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                {formData.otherOperatingIncome && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.otherOperatingIncome)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Cost of Materials Consumed (₹)</label>
                <input type="number" name="costOfMaterialsConsumed" value={formData.costOfMaterialsConsumed} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                {formData.costOfMaterialsConsumed && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.costOfMaterialsConsumed)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Employee Benefit Expenses (₹)</label>
                <input type="number" name="employeeBenefitExpenses" value={formData.employeeBenefitExpenses} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                {formData.employeeBenefitExpenses && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.employeeBenefitExpenses)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Other Expenses (₹)</label>
                <input type="number" name="otherExpenses" value={formData.otherExpenses} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                {formData.otherExpenses && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.otherExpenses)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Depreciation Expense (₹)</label>
                <input type="number" name="depreciationExpense" value={formData.depreciationExpense} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                {formData.depreciationExpense && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.depreciationExpense)}</p>}
              </div>
              <div className="bg-teal-100 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">Total Income (₹)</label>
                <input type="text" name="totalIncome" value={calculateTotalIncome()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                <p className="mt-1 text-sm text-teal-600 font-semibold">{formatCurrency(calculateTotalIncome())}</p>
              </div>
              <div className="bg-teal-100 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">Total Expenses (₹)</label>
                <input type="text" name="totalExpenses" value={calculateTotalExpenses()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                <p className="mt-1 text-sm text-teal-600 font-semibold">{formatCurrency(calculateTotalExpenses())}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 19: Section 44AD Business */}
        {step === 19 && (
          <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
            <h3 className="mb-6 text-xl font-bold text-orange-800">PRESUMPTIVE INCOME - SECTION 44AD BUSINESS</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <input type="checkbox" name="section44ADApplicable" checked={formData.section44ADApplicable} onChange={handleChange} className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Section 44AD Applicable</label>
              </div>
              
              {formData.section44ADApplicable && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-orange-100 rounded-lg">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Total Business Receipts (₹)</label>
                    <input type="number" name="businessReceipts" value={formData.businessReceipts} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                    {formData.businessReceipts && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.businessReceipts)}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Cash Receipts (₹)</label>
                    <input type="number" name="cashReceipts" value={formData.cashReceipts} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                    {formData.cashReceipts && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.cashReceipts)}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Electronic Receipts (₹)</label>
                    <input type="number" name="electronicReceipts" value={formData.electronicReceipts} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                    {formData.electronicReceipts && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.electronicReceipts)}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Presumptive Percentage (%)</label>
                    <select name="presumptivePercentage" value={formData.presumptivePercentage} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                      <option value="6">6% (Cash receipts ≤ 5% of total)</option>
                      <option value="8">8% (Cash receipts &gt; 5% of total)</option>
                    </select>
                  </div>
                  <div className="bg-orange-200 p-4 rounded-lg col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Presumptive Income 44AD (₹)</label>
                    <input type="text" name="presumptiveIncome44AD" value={calculate44ADIncome()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                    <p className="mt-1 text-sm text-orange-600 font-semibold">{formatCurrency(calculate44ADIncome())}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 20: Section 44ADA Professional */}
        {step === 20 && (
          <div className="p-6 bg-pink-50 rounded-lg border border-pink-200">
            <h3 className="mb-6 text-xl font-bold text-pink-800">PRESUMPTIVE INCOME - SECTION 44ADA PROFESSIONAL</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <input type="checkbox" name="section44ADAApplicable" checked={formData.section44ADAApplicable} onChange={handleChange} className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Section 44ADA Applicable</label>
              </div>
              
              {formData.section44ADAApplicable && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-pink-100 rounded-lg">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Total Professional Receipts (₹)</label>
                    <input type="number" name="professionalReceipts" value={formData.professionalReceipts} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                    {formData.professionalReceipts && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.professionalReceipts)}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Cash Receipts (₹)</label>
                    <input type="number" name="professionalCashReceipts" value={formData.professionalCashReceipts} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                    {formData.professionalCashReceipts && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.professionalCashReceipts)}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Electronic Receipts (₹)</label>
                    <input type="number" name="professionalElectronicReceipts" value={formData.professionalElectronicReceipts} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                    {formData.professionalElectronicReceipts && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.professionalElectronicReceipts)}</p>}
                  </div>
                  <div className="bg-pink-200 p-4 rounded-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Presumptive Income 44ADA (₹)</label>
                    <input type="text" name="professionalPresumptiveIncome" value={calculate44ADAIncome()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                    <p className="mt-1 text-sm text-pink-600 font-semibold">{formatCurrency(calculate44ADAIncome())}</p>
                    <p className="mt-1 text-xs text-gray-600">50% of total receipts</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 21: Section 44AE Goods Carriage */}
        {step === 21 && (
          <div className="p-6 bg-cyan-50 rounded-lg border border-cyan-200">
            <h3 className="mb-6 text-xl font-bold text-cyan-800">PRESUMPTIVE INCOME - SECTION 44AE GOODS CARRIAGE</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <input type="checkbox" name="section44AEApplicable" checked={formData.section44AEApplicable} onChange={handleChange} className="w-4 h-4 text-cyan-600 border-gray-300 focus:ring-cyan-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Section 44AE Applicable</label>
              </div>
              
              {formData.section44AEApplicable && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-cyan-100 rounded-lg">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Vehicle Type</label>
                    <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                      <option value="">Select Vehicle Type</option>
                      <option value="Heavy Goods Vehicle">Heavy Goods Vehicle</option>
                      <option value="Medium Goods Vehicle">Medium Goods Vehicle</option>
                      <option value="Light Goods Vehicle">Light Goods Vehicle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Vehicle Ownership</label>
                    <select name="vehicleOwnership" value={formData.vehicleOwnership} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                      <option value="">Select Ownership</option>
                      <option value="Owned">Owned</option>
                      <option value="Leased">Leased</option>
                      <option value="Hired">Hired</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Tonnage Capacity</label>
                    <input type="number" name="tonnageCapacity" value={formData.tonnageCapacity} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" placeholder="In tons" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Months Used</label>
                    <input type="number" name="monthsUsed" value={formData.monthsUsed} onChange={handleChange} max="12" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                  </div>
                  <div className="bg-cyan-200 p-4 rounded-lg col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Goods Carriage Income (₹)</label>
                    <input type="number" name="goodsCarriageIncome" value={formData.goodsCarriageIncome} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                    {formData.goodsCarriageIncome && <p className="mt-1 text-sm text-cyan-600 font-semibold">{formatCurrency(formData.goodsCarriageIncome)}</p>}
                    <p className="mt-1 text-xs text-gray-600">₹1,000 per ton per month or actual income, whichever is higher</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 22: No Account Case (Part 65) */}
        {step === 22 && (
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="mb-6 text-xl font-bold text-gray-800">NO ACCOUNT CASE (PART 65)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Business Details */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="mb-4 text-lg font-semibold text-blue-800">Business Details</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Business Gross Receipts (₹)</label>
                    <input type="number" name="businessGrossReceipts" value={formData.businessGrossReceipts} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    {formData.businessGrossReceipts && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.businessGrossReceipts)}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Business Expenses (₹)</label>
                    <input type="number" name="businessExpenses" value={formData.businessExpenses} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    {formData.businessExpenses && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.businessExpenses)}</p>}
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Business Net Profit (₹)</label>
                    <input type="text" name="businessNetProfit" value={((parseFloat(formData.businessGrossReceipts) || 0) - (parseFloat(formData.businessExpenses) || 0)).toFixed(2)} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                    <p className="mt-1 text-sm text-blue-600 font-semibold">{formatCurrency(((parseFloat(formData.businessGrossReceipts) || 0) - (parseFloat(formData.businessExpenses) || 0)).toFixed(2))}</p>
                  </div>
                </div>
              </div>

              {/* Profession Details */}
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="mb-4 text-lg font-semibold text-green-800">Profession Details</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Profession Gross Receipts (₹)</label>
                    <input type="number" name="professionGrossReceipts" value={formData.professionGrossReceipts} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                    {formData.professionGrossReceipts && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.professionGrossReceipts)}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Profession Expenses (₹)</label>
                    <input type="number" name="professionExpenses" value={formData.professionExpenses} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                    {formData.professionExpenses && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.professionExpenses)}</p>}
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Profession Net Profit (₹)</label>
                    <input type="text" name="professionNetProfit" value={((parseFloat(formData.professionGrossReceipts) || 0) - (parseFloat(formData.professionExpenses) || 0)).toFixed(2)} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                    <p className="mt-1 text-sm text-green-600 font-semibold">{formatCurrency(((parseFloat(formData.professionGrossReceipts) || 0) - (parseFloat(formData.professionExpenses) || 0)).toFixed(2))}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 23: Speculative Income (Part 66) */}
        {step === 23 && (
          <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="mb-6 text-xl font-bold text-purple-800">SPECULATIVE INCOME (PART 66)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Speculative Turnover (₹)</label>
                <input type="number" name="speculativeTurnover" value={formData.speculativeTurnover} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                {formData.speculativeTurnover && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.speculativeTurnover)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Speculative Gross Profit (₹)</label>
                <input type="number" name="speculativeGrossProfit" value={formData.speculativeGrossProfit} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                {formData.speculativeGrossProfit && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.speculativeGrossProfit)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Speculative Expenses (₹)</label>
                <input type="number" name="speculativeExpenses" value={formData.speculativeExpenses} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                {formData.speculativeExpenses && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.speculativeExpenses)}</p>}
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">Speculative Net Income (₹)</label>
                <input type="text" name="speculativeNetIncome" value={((parseFloat(formData.speculativeGrossProfit) || 0) - (parseFloat(formData.speculativeExpenses) || 0)).toFixed(2)} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                <p className="mt-1 text-sm text-purple-600 font-semibold">{formatCurrency(((parseFloat(formData.speculativeGrossProfit) || 0) - (parseFloat(formData.speculativeExpenses) || 0)).toFixed(2))}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 24: Accounting Methods & ICDS */}
        {step === 24 && (
          <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-200">
            <h3 className="mb-6 text-xl font-bold text-indigo-800">ACCOUNTING METHODS & ICDS ADJUSTMENTS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Accounting Method</label>
                <select name="accountingMethod" value={formData.accountingMethod} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="">Select Method</option>
                  <option value="Cash">Cash Basis</option>
                  <option value="Mercantile">Mercantile/Accrual Basis</option>
                  <option value="Hybrid">Hybrid Method</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Method Changes</label>
                <textarea name="methodChanges" value={formData.methodChanges} onChange={handleChange} rows={2} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Describe any changes in accounting method" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">ICDS Adjustment - Increase (₹)</label>
                <input type="number" name="icdsAdjustmentIncrease" value={formData.icdsAdjustmentIncrease} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formData.icdsAdjustmentIncrease && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.icdsAdjustmentIncrease)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">ICDS Adjustment - Decrease (₹)</label>
                <input type="number" name="icdsAdjustmentDecrease" value={formData.icdsAdjustmentDecrease} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formData.icdsAdjustmentDecrease && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.icdsAdjustmentDecrease)}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 25: Disallowable Expenses */}
        {step === 25 && (
          <div className="p-6 bg-red-50 rounded-lg border border-red-200">
            <h3 className="mb-6 text-xl font-bold text-red-800">DISALLOWABLE EXPENSES</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Section 36 Disallowance (₹)</label>
                <input type="number" name="section36Disallowance" value={formData.section36Disallowance} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                {formData.section36Disallowance && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.section36Disallowance)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Section 37 Disallowance (₹)</label>
                <input type="number" name="section37Disallowance" value={formData.section37Disallowance} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                {formData.section37Disallowance && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.section37Disallowance)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Section 40 Disallowance (₹)</label>
                <input type="number" name="section40Disallowance" value={formData.section40Disallowance} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                {formData.section40Disallowance && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.section40Disallowance)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Section 40A Disallowance (₹)</label>
                <input type="number" name="section40ADisallowance" value={formData.section40ADisallowance} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                {formData.section40ADisallowance && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.section40ADisallowance)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Section 43B Disallowance (₹)</label>
                <input type="number" name="section43BDisallowance" value={formData.section43BDisallowance} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                {formData.section43BDisallowance && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.section43BDisallowance)}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Employees in India</label>
                  <input type="number" name="employeesInIndia" value={formData.employeesInIndia} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Employees Outside India</label>
                  <input type="number" name="employeesOutsideIndia" value={formData.employeesOutsideIndia} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 26: Trading/Manufacturing Stock Details */}
        {step === 26 && (
          <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-200">
            <h3 className="mb-6 text-xl font-bold text-emerald-800">QUANTITATIVE DETAILS (PART A-QD)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Trading Opening Stock Qty</label>
                <input type="number" name="tradingOpeningStockQty" value={formData.tradingOpeningStockQty} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Trading Purchases Qty</label>
                <input type="number" name="tradingPurchasesQty" value={formData.tradingPurchasesQty} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Trading Sales Qty</label>
                <input type="number" name="tradingSalesQty" value={formData.tradingSalesQty} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Trading Closing Stock Qty</label>
                <input type="number" name="tradingClosingStockQty" value={formData.tradingClosingStockQty} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Yield Percentage (%)</label>
                <input type="number" name="yieldPercentage" value={formData.yieldPercentage} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" max="100" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Shortage Qty</label>
                <input type="number" name="shortageQty" value={formData.shortageQty} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Excess Qty</label>
                <input type="number" name="excessQty" value={formData.excessQty} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 27: House Property Income */}
        {step === 27 && (
          <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="mb-6 text-xl font-bold text-yellow-800">SCHEDULE HP - HOUSE PROPERTY INCOME</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Property Address</label>
                <textarea name="propertyAddress" value={formData.propertyAddress} onChange={handleChange} rows={2} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Property Ownership</label>
                <select name="propertyOwnership" value={formData.propertyOwnership} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                  <option value="">Select Ownership</option>
                  <option value="Self Occupied">Self Occupied</option>
                  <option value="Let Out">Let Out</option>
                  <option value="Deemed Let Out">Deemed Let Out</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Annual Rent Received (₹)</label>
                <input type="number" name="annualRentReceived" value={formData.annualRentReceived} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                {formData.annualRentReceived && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.annualRentReceived)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Local Taxes Paid (₹)</label>
                <input type="number" name="localTaxesPaid" value={formData.localTaxesPaid} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                {formData.localTaxesPaid && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.localTaxesPaid)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Interest on Loan (₹)</label>
                <input type="number" name="interestOnLoan" value={formData.interestOnLoan} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                {formData.interestOnLoan && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.interestOnLoan)}</p>}
              </div>
              
              {/* Co-owner Details */}
              <div className="col-span-2 p-4 bg-yellow-100 rounded-lg">
                <h4 className="mb-4 text-lg font-semibold text-yellow-800">Co-owner & Tenant Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Co-owner Name</label>
                    <input type="text" name="coOwnerName" value={formData.coOwnerName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Co-owner PAN</label>
                    <input type="text" name="coOwnerPAN" value={formData.coOwnerPAN} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Co-owner Share (%)</label>
                    <input type="number" name="coOwnerShare" value={formData.coOwnerShare} onChange={handleChange} max="100" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Tenant Name</label>
                    <input type="text" name="tenantName" value={formData.tenantName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Tenant PAN</label>
                    <input type="text" name="tenantPAN" value={formData.tenantPAN} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 28: Unlisted Equity Shares Schedule */}
        {step === 28 && (
          <div className="p-6 bg-pink-50 rounded-lg border border-pink-200">
            <h3 className="mb-6 text-xl font-bold text-pink-800">UNLISTED EQUITY SHARES SCHEDULE</h3>
            
            {/* Company 1 */}
            <div className="mb-8 p-4 bg-pink-100 rounded-lg">
              <h4 className="mb-4 text-lg font-semibold text-pink-800">Company 1</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Company Name</label>
                  <input type="text" name="companyName1" value={formData.companyName1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
              </div>
              <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Company PAN</label>
                  <input type="text" name="companyPAN1" value={formData.companyPAN1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
              </div>
              <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Shares Acquired</label>
                  <input type="number" name="sharesAcquired1" value={formData.sharesAcquired1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
              </div>
              <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Acquisition Cost (₹)</label>
                  <input type="number" name="acquisitionCost1" value={formData.acquisitionCost1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                  {formData.acquisitionCost1 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.acquisitionCost1)}</p>}
              </div>
              <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Acquisition Date</label>
                  <input type="date" name="acquisitionDate1" value={formData.acquisitionDate1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
              </div>
              <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Shares Sold</label>
                  <input type="number" name="sharesSold1" value={formData.sharesSold1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
              </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Sale Value (₹)</label>
                  <input type="number" name="saleValue1" value={formData.saleValue1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                  {formData.saleValue1 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.saleValue1)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Sale Date</label>
                  <input type="date" name="saleDate1" value={formData.saleDate1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                </div>
              </div>
            </div>

            {/* Company 2 */}
            <div className="mb-8 p-4 bg-pink-100 rounded-lg">
              <h4 className="mb-4 text-lg font-semibold text-pink-800">Company 2 (Optional)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Company Name</label>
                  <input type="text" name="companyName2" value={formData.companyName2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Company PAN</label>
                  <input type="text" name="companyPAN2" value={formData.companyPAN2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Shares Acquired</label>
                  <input type="number" name="sharesAcquired2" value={formData.sharesAcquired2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Acquisition Cost (₹)</label>
                  <input type="number" name="acquisitionCost2" value={formData.acquisitionCost2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                  {formData.acquisitionCost2 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.acquisitionCost2)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Acquisition Date</label>
                  <input type="date" name="acquisitionDate2" value={formData.acquisitionDate2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Shares Sold</label>
                  <input type="number" name="sharesSold2" value={formData.sharesSold2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Sale Value (₹)</label>
                  <input type="number" name="saleValue2" value={formData.saleValue2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                  {formData.saleValue2 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.saleValue2)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Sale Date</label>
                  <input type="date" name="saleDate2" value={formData.saleDate2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 29: Schedule CG - Short-term Capital Gains */}
        {step === 29 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">SCHEDULE CG - SHORT-TERM CAPITAL GAINS</h3>
            
            {/* Asset 1 */}
            <div className="mb-8 p-4 bg-blue-100 rounded-lg">
              <h4 className="mb-4 text-lg font-semibold text-blue-800">Short-term Asset 1</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Asset Type</label>
                  <select name="stcgAssetType1" value={formData.stcgAssetType1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Asset Type</option>
                    <option value="Shares - Listed">Shares - Listed</option>
                    <option value="Shares - Unlisted">Shares - Unlisted</option>
                    <option value="Property">Property</option>
                    <option value="Bonds">Bonds</option>
                    <option value="Mutual Funds">Mutual Funds</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Asset Description</label>
                  <input type="text" name="stcgAssetDescription1" value={formData.stcgAssetDescription1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Date of Acquisition</label>
                  <input type="date" name="stcgDateOfAcquisition1" value={formData.stcgDateOfAcquisition1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Date of Sale</label>
                  <input type="date" name="stcgDateOfSale1" value={formData.stcgDateOfSale1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Sale Consideration (₹)</label>
                  <input type="number" name="stcgSaleConsideration1" value={formData.stcgSaleConsideration1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {formData.stcgSaleConsideration1 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.stcgSaleConsideration1)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Cost of Acquisition (₹)</label>
                  <input type="number" name="stcgCostOfAcquisition1" value={formData.stcgCostOfAcquisition1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {formData.stcgCostOfAcquisition1 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.stcgCostOfAcquisition1)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Expense on Transfer (₹)</label>
                  <input type="number" name="stcgExpenseOnTransfer1" value={formData.stcgExpenseOnTransfer1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {formData.stcgExpenseOnTransfer1 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.stcgExpenseOnTransfer1)}</p>}
                </div>
                <div className="bg-blue-200 p-3 rounded-lg">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Net Gain/Loss (₹)</label>
                  <input type="text" name="stcgNetGain1" value={calculateSTCGNetGain(1)} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                  <p className="mt-1 text-sm text-blue-600 font-semibold">{formatCurrency(calculateSTCGNetGain(1))}</p>
                </div>
              </div>
            </div>

            {/* Asset 2 */}
            <div className="mb-8 p-4 bg-blue-100 rounded-lg">
              <h4 className="mb-4 text-lg font-semibold text-blue-800">Short-term Asset 2 (Optional)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Asset Type</label>
                  <select name="stcgAssetType2" value={formData.stcgAssetType2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Asset Type</option>
                    <option value="Shares - Listed">Shares - Listed</option>
                    <option value="Shares - Unlisted">Shares - Unlisted</option>
                    <option value="Property">Property</option>
                    <option value="Bonds">Bonds</option>
                    <option value="Mutual Funds">Mutual Funds</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Asset Description</label>
                  <input type="text" name="stcgAssetDescription2" value={formData.stcgAssetDescription2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Date of Acquisition</label>
                  <input type="date" name="stcgDateOfAcquisition2" value={formData.stcgDateOfAcquisition2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Date of Sale</label>
                  <input type="date" name="stcgDateOfSale2" value={formData.stcgDateOfSale2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Sale Consideration (₹)</label>
                  <input type="number" name="stcgSaleConsideration2" value={formData.stcgSaleConsideration2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {formData.stcgSaleConsideration2 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.stcgSaleConsideration2)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Cost of Acquisition (₹)</label>
                  <input type="number" name="stcgCostOfAcquisition2" value={formData.stcgCostOfAcquisition2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {formData.stcgCostOfAcquisition2 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.stcgCostOfAcquisition2)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Expense on Transfer (₹)</label>
                  <input type="number" name="stcgExpenseOnTransfer2" value={formData.stcgExpenseOnTransfer2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {formData.stcgExpenseOnTransfer2 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.stcgExpenseOnTransfer2)}</p>}
                </div>
                <div className="bg-blue-200 p-3 rounded-lg">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Net Gain/Loss (₹)</label>
                  <input type="text" name="stcgNetGain2" value={calculateSTCGNetGain(2)} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                  <p className="mt-1 text-sm text-blue-600 font-semibold">{formatCurrency(calculateSTCGNetGain(2))}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 30: Schedule CG - Long-term Capital Gains */}
        {step === 30 && (
          <div className="p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="mb-6 text-xl font-bold text-green-800">SCHEDULE CG - LONG-TERM CAPITAL GAINS</h3>
            
            {/* Asset 1 */}
            <div className="mb-8 p-4 bg-green-100 rounded-lg">
              <h4 className="mb-4 text-lg font-semibold text-green-800">Long-term Asset 1</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Asset Type</label>
                  <select name="ltcgAssetType1" value={formData.ltcgAssetType1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select Asset Type</option>
                    <option value="Shares - Listed">Shares - Listed</option>
                    <option value="Shares - Unlisted">Shares - Unlisted</option>
                    <option value="Property">Property</option>
                    <option value="Bonds">Bonds</option>
                    <option value="Mutual Funds">Mutual Funds</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Asset Description</label>
                  <input type="text" name="ltcgAssetDescription1" value={formData.ltcgAssetDescription1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Date of Acquisition</label>
                  <input type="date" name="ltcgDateOfAcquisition1" value={formData.ltcgDateOfAcquisition1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Date of Sale</label>
                  <input type="date" name="ltcgDateOfSale1" value={formData.ltcgDateOfSale1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Sale Consideration (₹)</label>
                  <input type="number" name="ltcgSaleConsideration1" value={formData.ltcgSaleConsideration1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  {formData.ltcgSaleConsideration1 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.ltcgSaleConsideration1)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Indexed Cost of Acquisition (₹)</label>
                  <input type="number" name="ltcgIndexedCostOfAcquisition1" value={formData.ltcgIndexedCostOfAcquisition1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  {formData.ltcgIndexedCostOfAcquisition1 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.ltcgIndexedCostOfAcquisition1)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Expense on Transfer (₹)</label>
                  <input type="number" name="ltcgExpenseOnTransfer1" value={formData.ltcgExpenseOnTransfer1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  {formData.ltcgExpenseOnTransfer1 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.ltcgExpenseOnTransfer1)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Exemption Claimed (₹)</label>
                  <input type="number" name="ltcgExemptionClaimed1" value={formData.ltcgExemptionClaimed1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  {formData.ltcgExemptionClaimed1 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.ltcgExemptionClaimed1)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Exemption Section</label>
                  <select name="ltcgExemptionSection1" value={formData.ltcgExemptionSection1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select Section</option>
                    <option value="54">Section 54</option>
                    <option value="54F">Section 54F</option>
                    <option value="54EC">Section 54EC</option>
                    <option value="54GB">Section 54GB</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="bg-green-200 p-3 rounded-lg">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Net Gain/Loss (₹)</label>
                  <input type="text" name="ltcgNetGain1" value={calculateLTCGNetGain(1)} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                  <p className="mt-1 text-sm text-green-600 font-semibold">{formatCurrency(calculateLTCGNetGain(1))}</p>
                </div>
              </div>
            </div>

            {/* Asset 2 */}
            <div className="mb-8 p-4 bg-green-100 rounded-lg">
              <h4 className="mb-4 text-lg font-semibold text-green-800">Long-term Asset 2 (Optional)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Asset Type</label>
                  <select name="ltcgAssetType2" value={formData.ltcgAssetType2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select Asset Type</option>
                    <option value="Shares - Listed">Shares - Listed</option>
                    <option value="Shares - Unlisted">Shares - Unlisted</option>
                    <option value="Property">Property</option>
                    <option value="Bonds">Bonds</option>
                    <option value="Mutual Funds">Mutual Funds</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Asset Description</label>
                  <input type="text" name="ltcgAssetDescription2" value={formData.ltcgAssetDescription2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Date of Acquisition</label>
                  <input type="date" name="ltcgDateOfAcquisition2" value={formData.ltcgDateOfAcquisition2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Date of Sale</label>
                  <input type="date" name="ltcgDateOfSale2" value={formData.ltcgDateOfSale2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Sale Consideration (₹)</label>
                  <input type="number" name="ltcgSaleConsideration2" value={formData.ltcgSaleConsideration2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  {formData.ltcgSaleConsideration2 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.ltcgSaleConsideration2)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Indexed Cost of Acquisition (₹)</label>
                  <input type="number" name="ltcgIndexedCostOfAcquisition2" value={formData.ltcgIndexedCostOfAcquisition2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  {formData.ltcgIndexedCostOfAcquisition2 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.ltcgIndexedCostOfAcquisition2)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Expense on Transfer (₹)</label>
                  <input type="number" name="ltcgExpenseOnTransfer2" value={formData.ltcgExpenseOnTransfer2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  {formData.ltcgExpenseOnTransfer2 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.ltcgExpenseOnTransfer2)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Exemption Claimed (₹)</label>
                  <input type="number" name="ltcgExemptionClaimed2" value={formData.ltcgExemptionClaimed2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  {formData.ltcgExemptionClaimed2 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.ltcgExemptionClaimed2)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Exemption Section</label>
                  <select name="ltcgExemptionSection2" value={formData.ltcgExemptionSection2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">Select Section</option>
                    <option value="54">Section 54</option>
                    <option value="54F">Section 54F</option>
                    <option value="54EC">Section 54EC</option>
                    <option value="54GB">Section 54GB</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="bg-green-200 p-3 rounded-lg">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Net Gain/Loss (₹)</label>
                  <input type="text" name="ltcgNetGain2" value={calculateLTCGNetGain(2)} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                  <p className="mt-1 text-sm text-green-600 font-semibold">{formatCurrency(calculateLTCGNetGain(2))}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 31: Schedule OS - Other Sources Income */}
        {step === 31 && (
          <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="mb-6 text-xl font-bold text-yellow-800">SCHEDULE OS - OTHER SOURCES INCOME</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Interest from Bank (₹)</label>
                <input type="number" name="interestFromBank" value={formData.interestFromBank} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                {formData.interestFromBank && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.interestFromBank)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Interest from FD (₹)</label>
                <input type="number" name="interestFromFD" value={formData.interestFromFD} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                {formData.interestFromFD && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.interestFromFD)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Dividend Income (₹)</label>
                <input type="number" name="dividendIncome" value={formData.dividendIncome} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                {formData.dividendIncome && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.dividendIncome)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Lottery Winnings (₹)</label>
                <input type="number" name="lotteryWinnings" value={formData.lotteryWinnings} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                {formData.lotteryWinnings && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.lotteryWinnings)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Family Pension Income (₹)</label>
                <input type="number" name="familyPensionIncome" value={formData.familyPensionIncome} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                {formData.familyPensionIncome && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.familyPensionIncome)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Other Income 1 Description</label>
                <input type="text" name="otherIncomeDescription1" value={formData.otherIncomeDescription1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Other Income 1 Amount (₹)</label>
                <input type="number" name="otherIncomeAmount1" value={formData.otherIncomeAmount1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                {formData.otherIncomeAmount1 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.otherIncomeAmount1)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Other Income 2 Description</label>
                <input type="text" name="otherIncomeDescription2" value={formData.otherIncomeDescription2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Other Income 2 Amount (₹)</label>
                <input type="number" name="otherIncomeAmount2" value={formData.otherIncomeAmount2} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                {formData.otherIncomeAmount2 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.otherIncomeAmount2)}</p>}
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">Total Other Sources Income (₹)</label>
                <input type="text" name="totalOtherSourcesIncome" value={calculateTotalOtherSourcesIncome()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                <p className="mt-1 text-sm text-yellow-600 font-semibold">{formatCurrency(calculateTotalOtherSourcesIncome())}</p>
              </div>
            </div>
            
            <h4 className="mt-8 mb-4 text-lg font-semibold text-gray-700">TDS Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">TDS on Interest (₹)</label>
                <input type="number" name="tdsOnInterest" value={formData.tdsOnInterest} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                {formData.tdsOnInterest && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.tdsOnInterest)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">TDS on Dividend (₹)</label>
                <input type="number" name="tdsOnDividend" value={formData.tdsOnDividend} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                {formData.tdsOnDividend && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.tdsOnDividend)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">TDS on Other Income (₹)</label>
                <input type="number" name="tdsOnOtherIncome" value={formData.tdsOnOtherIncome} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                {formData.tdsOnOtherIncome && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.tdsOnOtherIncome)}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 32: Schedule 80G - Donations */}
        {step === 32 && (
          <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="mb-6 text-xl font-bold text-purple-800">SCHEDULE 80G - DONATIONS</h3>
            
            {/* Donee 1 */}
            <div className="mb-8 p-4 bg-purple-100 rounded-lg">
              <h4 className="mb-4 text-lg font-semibold text-purple-800">Donee 1</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Donee Name</label>
                  <input type="text" name="donee1Name" value={formData.donee1Name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Donee PAN</label>
                  <input type="text" name="donee1PAN" value={formData.donee1PAN} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Donee Address</label>
                  <textarea name="donee1Address" value={formData.donee1Address} onChange={handleChange} rows={2} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Donation Amount (₹)</label>
                  <input type="number" name="donee1Amount" value={formData.donee1Amount} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
                  {formData.donee1Amount && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.donee1Amount)}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Deduction Percentage (%)</label>
                  <select name="donee1DeductionPercentage" value={formData.donee1DeductionPercentage} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                    <option value="100">100% Deduction</option>
                    <option value="50">50% Deduction</option>
                  </select>
                </div>
                <div className="bg-purple-200 p-3 rounded-lg">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Eligible Deduction (₹)</label>
                  <input type="text" name="donee1EligibleDeduction" value={calculateEligibleDeduction80G(1)} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                  <p className="mt-1 text-sm text-purple-600 font-semibold">{formatCurrency(calculateEligibleDeduction80G(1))}</p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-purple-100 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">Total Donations (₹)</label>
                <input type="text" name="totalDonations" value={calculateTotalDonations()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                <p className="mt-1 text-sm text-purple-600 font-semibold">{formatCurrency(calculateTotalDonations())}</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">Total Eligible Deduction 80G (₹)</label>
                <input type="text" name="totalEligibleDeduction80G" value={calculateEligibleDeduction80G(1)} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                <p className="mt-1 text-sm text-purple-600 font-semibold">{formatCurrency(calculateEligibleDeduction80G(1))}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 33: Schedule BP - Business Income Computation */}
        {step === 33 && (
          <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-200">
            <h3 className="mb-6 text-xl font-bold text-indigo-800">SCHEDULE BP - BUSINESS INCOME COMPUTATION</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Net Profit as per Books (₹)</label>
                <input type="number" name="netProfitAsPerBooks" value={formData.netProfitAsPerBooks} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formData.netProfitAsPerBooks && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.netProfitAsPerBooks)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Addition u/s 28 (₹)</label>
                <input type="number" name="additionSection28" value={formData.additionSection28} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formData.additionSection28 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.additionSection28)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Addition u/s 36 (₹)</label>
                <input type="number" name="additionSection36" value={formData.additionSection36} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formData.additionSection36 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.additionSection36)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Addition u/s 37 (₹)</label>
                <input type="number" name="additionSection37" value={formData.additionSection37} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formData.additionSection37 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.additionSection37)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Deduction u/s 80C (₹)</label>
                <input type="number" name="deductionSection80C" value={formData.deductionSection80C} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formData.deductionSection80C && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.deductionSection80C)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Deduction u/s 80G (₹)</label>
                <input type="number" name="deductionSection80G" value={formData.deductionSection80G} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formData.deductionSection80G && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.deductionSection80G)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Other Additions (₹)</label>
                <input type="number" name="additionOther" value={formData.additionOther} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formData.additionOther && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.additionOther)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Other Deductions (₹)</label>
                <input type="number" name="deductionOther" value={formData.deductionOther} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                {formData.deductionOther && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.deductionOther)}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 34: Schedule TDS/TCS */}
        {step === 34 && (
          <div className="p-6 bg-teal-50 rounded-lg border border-teal-200">
            <h3 className="mb-6 text-xl font-bold text-teal-800">SCHEDULE TDS/TCS - TAX DEDUCTED/COLLECTED</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="mb-4 text-lg font-semibold text-teal-700">Tax Deducted at Source</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">TDS on Salary (₹)</label>
                    <input type="number" name="tdsOnSalary" value={formData.tdsOnSalary} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                    {formData.tdsOnSalary && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.tdsOnSalary)}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">TDS on Interest from Bank (₹)</label>
                    <input type="number" name="tdsOnInterestBank" value={formData.tdsOnInterestBank} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                    {formData.tdsOnInterestBank && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.tdsOnInterestBank)}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">TDS on Professional Fees (₹)</label>
                    <input type="number" name="tdsOnProfessionalFees" value={formData.tdsOnProfessionalFees} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                    {formData.tdsOnProfessionalFees && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.tdsOnProfessionalFees)}</p>}
                  </div>
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Total TDS Claimed (₹)</label>
                    <input type="text" name="totalTDSClaimed" value={calculateTotalTDS()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                    <p className="mt-1 text-sm text-teal-600 font-semibold">{formatCurrency(calculateTotalTDS())}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="mb-4 text-lg font-semibold text-teal-700">Tax Collected at Source</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">TCS on Sale (₹)</label>
                    <input type="number" name="tcsOnSale" value={formData.tcsOnSale} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                    {formData.tcsOnSale && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.tcsOnSale)}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">TCS on Purchase (₹)</label>
                    <input type="number" name="tcsOnPurchase" value={formData.tcsOnPurchase} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
                    {formData.tcsOnPurchase && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.tcsOnPurchase)}</p>}
                  </div>
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Total TCS Claimed (₹)</label>
                    <input type="text" name="totalTCSClaimed" value={calculateTotalTCS()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                    <p className="mt-1 text-sm text-teal-600 font-semibold">{formatCurrency(calculateTotalTCS())}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 35: Schedule IT - Advance Tax */}
        {step === 35 && (
          <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
            <h3 className="mb-6 text-xl font-bold text-orange-800">SCHEDULE IT - ADVANCE TAX & SELF-ASSESSMENT</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">1st Installment (₹)</label>
                <input type="number" name="advanceTaxPaid1stInstall" value={formData.advanceTaxPaid1stInstall} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                {formData.advanceTaxPaid1stInstall && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.advanceTaxPaid1stInstall)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">2nd Installment (₹)</label>
                <input type="number" name="advanceTaxPaid2ndInstall" value={formData.advanceTaxPaid2ndInstall} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                {formData.advanceTaxPaid2ndInstall && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.advanceTaxPaid2ndInstall)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Self Assessment Tax (₹)</label>
                <input type="number" name="selfAssessmentTaxPaid" value={formData.selfAssessmentTaxPaid} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                {formData.selfAssessmentTaxPaid && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.selfAssessmentTaxPaid)}</p>}
              </div>
              <div className="bg-orange-100 p-4 rounded-lg">
                <label className="block mb-2 text-sm font-medium text-gray-700">Total Advance Tax Paid (₹)</label>
                <input type="text" name="totalAdvanceTaxPaid" value={calculateTotalAdvanceTax()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                <p className="mt-1 text-sm text-orange-600 font-semibold">{formatCurrency(calculateTotalAdvanceTax())}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 36: Schedule FSI/TR/FA - Foreign Assets */}
        {step === 36 && (
          <div className="p-6 bg-red-50 rounded-lg border border-red-200">
            <h3 className="mb-6 text-xl font-bold text-red-800">SCHEDULE FSI/TR/FA - FOREIGN INCOME & ASSETS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Foreign Income Country 1</label>
                <input type="text" name="foreignIncomeCountry1" value={formData.foreignIncomeCountry1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Foreign Income Nature 1</label>
                <input type="text" name="foreignIncomeNature1" value={formData.foreignIncomeNature1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Foreign Income Amount 1 (₹)</label>
                <input type="number" name="foreignIncomeAmount1" value={formData.foreignIncomeAmount1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                {formData.foreignIncomeAmount1 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.foreignIncomeAmount1)}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Foreign Tax Paid 1 (₹)</label>
                <input type="number" name="foreignTaxPaid1" value={formData.foreignTaxPaid1} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500" />
                {formData.foreignTaxPaid1 && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.foreignTaxPaid1)}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 37: Schedule AL - Assets & Liabilities */}
        {step === 37 && (
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="mb-6 text-xl font-bold text-gray-800">SCHEDULE AL - ASSETS & LIABILITIES DISCLOSURE</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="mb-4 text-lg font-semibold text-gray-700">Assets</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Immovable Property (₹)</label>
                    <input type="number" name="immovablePropertyValue" value={formData.immovablePropertyValue} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500" />
                    {formData.immovablePropertyValue && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.immovablePropertyValue)}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Bank Account Value (₹)</label>
                    <input type="number" name="bankAccountValue" value={formData.bankAccountValue} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500" />
                    {formData.bankAccountValue && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.bankAccountValue)}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Shares & Securities (₹)</label>
                    <input type="number" name="sharesAndSecurities" value={formData.sharesAndSecurities} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500" />
                    {formData.sharesAndSecurities && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.sharesAndSecurities)}</p>}
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Total Assets (₹)</label>
                    <input type="text" name="totalAssets" value={calculateTotalAssets()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                    <p className="mt-1 text-sm text-gray-600 font-semibold">{formatCurrency(calculateTotalAssets())}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="mb-4 text-lg font-semibold text-gray-700">Liabilities</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Borrowings from Banks (₹)</label>
                    <input type="number" name="borrowingsFromBanks" value={formData.borrowingsFromBanks} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500" />
                    {formData.borrowingsFromBanks && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.borrowingsFromBanks)}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Borrowings from Others (₹)</label>
                    <input type="number" name="borrowingsFromOthers" value={formData.borrowingsFromOthers} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500" />
                    {formData.borrowingsFromOthers && <p className="mt-1 text-sm text-green-600">{formatCurrency(formData.borrowingsFromOthers)}</p>}
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Total Liabilities (₹)</label>
                    <input type="text" name="totalLiabilities" value={calculateTotalLiabilities()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                    <p className="mt-1 text-sm text-gray-600 font-semibold">{formatCurrency(calculateTotalLiabilities())}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Net Worth (₹)</label>
                    <input type="text" name="netWorth" value={calculateNetWorth()} className="w-full p-3 border border-gray-300 rounded-md bg-gray-100" readOnly />
                    <p className="mt-1 text-sm text-green-600 font-semibold">{formatCurrency(calculateNetWorth())}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 38: Enhanced Verification & Submission */}
        {step === 38 && (
          <div className="p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="mb-6 text-xl font-bold text-green-800">ENHANCED VERIFICATION & SUBMISSION</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Verification Place <span className="text-red-500">*</span></label>
                <input type="text" name="verificationPlace" value={formData.verificationPlace} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                {errors.verificationPlace && <p className="mt-1 text-sm text-red-500">{errors.verificationPlace}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Verification Date</label>
                <input type="date" name="verificationDate" value={formData.verificationDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Declarant Name <span className="text-red-500">*</span></label>
                <input type="text" name="declarantName" value={formData.declarantName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                {errors.declarantName && <p className="mt-1 text-sm text-red-500">{errors.declarantName}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Declarant Designation</label>
                <input type="text" name="declarantDesignation" value={formData.declarantDesignation} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Declarant PAN</label>
                <input type="text" name="declarantPAN" value={formData.declarantPAN} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Verification Method <span className="text-red-500">*</span></label>
                <select name="verificationMethod" value={formData.verificationMethod} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="">Select Method</option>
                  <option value="DSC">Digital Signature Certificate (DSC)</option>
                  <option value="OTP">One Time Password (OTP)</option>
                </select>
                {errors.verificationMethod && <p className="mt-1 text-sm text-red-500">{errors.verificationMethod}</p>}
              </div>
              
              {formData.verificationMethod === 'DSC' && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">DSC Certificate</label>
                  <input type="text" name="dscCertificate" value={formData.dscCertificate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
              )}
              
              {formData.verificationMethod === 'OTP' && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">OTP Mobile Number</label>
                  <input type="tel" name="otpMobile" value={formData.otpMobile} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
              )}
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Capacity of Signing</label>
                <select name="capacityOfSigning" value={formData.capacityOfSigning} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="">Select Capacity</option>
                  <option value="Self">Self</option>
                  <option value="Authorized Representative">Authorized Representative</option>
                  <option value="Partner">Partner</option>
                  <option value="Karta">Karta</option>
                  <option value="Manager">Manager</option>
                  <option value="Secretary">Secretary</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-green-100 rounded-lg">
              <h4 className="text-lg font-semibold text-green-800 mb-3">Declaration</h4>
              <p className="text-sm text-gray-700 mb-4">
                I solemnly declare that to the best of my knowledge and belief, the information given in this return and the annexures thereto is correct and complete and is in accordance with the provisions of the Income-tax Act, 1961.
              </p>
              <div className="flex items-center">
                <input type="checkbox" id="finalDeclaration" className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500" required />
                <label htmlFor="finalDeclaration" className="ml-2 text-sm font-medium text-gray-700">I accept the above declaration</label>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button onClick={handlePreviousStep} className="px-6 py-2 text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-100">Previous</button>
          )}
          <button
            onClick={handleNextStep}
            disabled={isLoading}
            className={`px-6 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              step === 38 ? "Submit" : "Next"
            )}
          </button>
        </div>
        {saveError && (
          <div className="mt-2 text-sm text-red-500">{saveError}</div>
        )}
      </div>
    </>
  );
};

export default ItrFive;