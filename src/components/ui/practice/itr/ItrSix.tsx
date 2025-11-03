import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Itr6FormData {
  // Step 1: Company General Information
  companyName: string;
  pan: string;
  oldCompanyName: string;
  cin: string;
  incorporationDate: string;
  businessStartDate: string;
  flatNo: string;
  buildingName: string;
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
  
  // Step 2: Filing Status
  filingSection: string;
  filingReasonNotice: string;
  receiptNo: string;
  originalReturnDate: string;
  noticeDIN: string;
  noticeDate: string;
  
  // Step 3: Company Status & Regulatory Flags
  residentialStatus: string;
  companyType: string;
  opted115BAA: boolean;
  isAuditRequired: boolean;
  isIFSCUnit: boolean;
  isUnderLiquidation: boolean;
  isFPI: boolean;
  sebiRegNo: string;
  // New regulatory flags
  isIndAS: boolean;
  isDPIIT: boolean;
  isMSME: boolean;
  msmeRegNo: string;
  isStartup: boolean;
  startupRecognitionNo: string;
  
  // Step 4: Representative Assessee Details
  repName: string;
  repPAN: string;
  repCapacity: string;
  repAddress: string;
  
  // Step 5: Audit & Books of Account
  maintainsBooks: boolean;
  isLiableToAudit: boolean;
  auditReportDate: string;
  auditorName: string;
  auditorMembershipNo: string;
  auditFirmName: string;
  auditFirmPAN: string;
  auditUDIN: string;
  // New audit fields
  isSection44ABApplicable: boolean;
  isSection92EApplicable: boolean;
  isSection115JBApplicable: boolean;
  auditType: string;
  booksLocation: string;
  accountingMethod: string;
  valuationMethod: string;
  hasAdverseRemarks: boolean;
  adverseRemarksDetails: string;
  
  // Step 6: Holding/Subsidiary Company Info
  holdingCompanyPAN: string;
  holdingCompanyName: string;
  holdingSharePercent: string;
  holdingCountry: string;
  subsidiaryCompanyPAN: string;
  subsidiaryCompanyName: string;
  subsidiarySharePercent: string;
  subsidiaryCountry: string;
  
  // Step 7: Key Persons and Shareholders
  directorName: string;
  directorPAN: string;
  directorDIN: string;
  directorAddress: string;
  directorDesignation: string;
  directorResidentialStatus: string;
  directorVotingRights: string;
  shareholderName: string;
  shareholderPAN: string;
  sharePercent: string;
  shareholderVotingRights: string;
  
  // Step 8: Business Nature & Bank Details
  natureOfBusiness1: string;
  natureOfBusiness2: string;
  natureOfBusiness3: string;
  bankAccountNumber: string;
  bankIFSC: string;
  bankName: string;
  accountType: string;
  
  // Step 9: Balance Sheet - Sources of Funds
  paidUpShareCapital: number;
  reservesAndSurplus: number;
  securedLoans: number;
  unsecuredLoans: number;
  deferredTaxLiabilities: number;
  currentLiabilities: number;
  provisions: number;
  totalSourcesOfFunds: number;
  
  // Step 10: Balance Sheet - Application of Funds
  fixedAssets: number;
  investments: number;
  currentAssets: number;
  loansAndAdvances: number;
  deferredTaxAssets: number;
  miscellaneousExpenditures: number;
  totalApplicationOfFunds: number;
  contingentLiabilities: number;
  capitalCommitments: number;
  
  // Step 11: Manufacturing Account
  openingStockRawMaterials: number;
  purchasesRawMaterials: number;
  directWages: number;
  powerAndFuel: number;
  factoryOverheads: number;
  closingStockRawMaterials: number;
  closingStockWIP: number;
  costOfGoodsManufactured: number;
  
  // Step 12: Trading Account
  salesTurnover: number;
  openingStockFinishedGoods: number;
  purchases: number;
  directExpenses: number;
  closingStockFinishedGoods: number;
  grossProfit: number;
  grossLoss: number;
  
  // Step 13: Profit & Loss Account - Income
  revenueFromOperations: number;
  otherIncome: number;
  interestIncome: number;
  dividendIncome: number;
  rentReceived: number;
  totalIncome: number;
  
  // Step 14: Profit & Loss Account - Expenses
  employeeBenefitExpenses: number;
  depreciation: number;
  interestExpenses: number;
  rentExpenses: number;
  repairsMaintenance: number;
  advertisingExpenses: number;
  administrativeExpenses: number;
  sellingDistributionExpenses: number;
  researchDevelopmentExpenses: number;
  otherExpenses: number;
  totalExpenses: number;
  profitBeforeTax: number;
  provisionForTax: number;
  profitAfterTax: number;
  
  // Step 15: Quantitative Details
  principalProduct: string;
  unitOfMeasurement: string;
  openingStockQuantity: number;
  purchaseQuantity: number;
  salesQuantity: number;
  closingStockQuantity: number;
  
  // Step 16: Income from House Property
  annualValue: number;
  municipalTaxesPaid: number;
  standardDeduction: number;
  interestOnHousingLoan: number;
  incomeFromHouseProperty: number;
  
  // Step 17: Income from Business/Profession
  businessIncome: number;
  professionalIncome: number;
  speculativeBusinessIncome: number;
  presumptiveIncome: number;
  totalBusinessProfessionIncome: number;
  
  // Step 18: Capital Gains
  shortTermCapitalGains: number;
  longTermCapitalGains: number;
  exemptedLongTermCapitalGains: number;
  totalCapitalGains: number;
  
  // Step 19: Income from Other Sources
  interestFromDeposits: number;
  dividendFromShares: number;
  incomeFromOtherSources: number;
  totalOtherSourcesIncome: number;
  
  // Step 20: Deductions under Chapter VI-A
  section80C: number;
  section80D: number;
  section80G: number;
  section80E: number;
  section80CCD1B: number;
  section80TTA: number;
  totalDeductions: number;
  
  // Step 21: Tax Computation
  grossTotalIncome: number;
  totalDeductionsUnderVIA: number;
  totalIncomeTaxable: number;
  taxOnTotalIncome: number;
  surcharge: number;
  healthEducationCess: number;
  totalTaxLiability: number;
  advanceTaxPaid: number;
  tdsDeducted: number;
  selfAssessmentTax: number;
  totalTaxesPaid: number;
  refundDue: number;
  balanceTaxPayable: number;
  
  // Step 22: Interest and Fees
  interest234A: number;
  interest234B: number;
  interest234C: number;
  interest234F: number;
  fee234E: number;
  fee234F: number;
  totalInterestFees: number;
  
  // Step 23: Verification
  verificationPlace: string;
  verificationDate: string;
  signatoryName: string;
  signatoryDesignation: string;
  signatoryPAN: string;
  signatoryCapacity: string;
  
  // Schedule BP: Business/Professional Income Details
  scheduleBP_businessType: string;
  scheduleBP_businessDescription: string;
  scheduleBP_grossReceipts: number;
  scheduleBP_grossProfitRate: number;
  scheduleBP_netProfitRate: number;
  scheduleBP_turnoverU44AD: number;
  scheduleBP_presumptiveIncomeU44AD: number;
  scheduleBP_turnoverU44ADA: number;
  scheduleBP_presumptiveIncomeU44ADA: number;
  scheduleBP_professionalReceipts: number;
  scheduleBP_presumptiveIncomeU44AE: number;
  
  // Schedule DPM: Depreciation on Plant & Machinery
  scheduleDPM_openingWDV: number;
  scheduleDPM_additions: number;
  scheduleDPM_deductions: number;
  scheduleDPM_depreciationRate: number;
  scheduleDPM_depreciationAmount: number;
  scheduleDPM_closingWDV: number;
  
  // Schedule DOA: Depreciation on Other Assets
  scheduleDOA_land: number;
  scheduleDOA_building: number;
  scheduleDOA_furniture: number;
  scheduleDOA_vehicles: number;
  scheduleDOA_computers: number;
  scheduleDOA_otherAssets: number;
  scheduleDOA_totalDepreciation: number;
  
  // Schedule ICDS: Income Computation and Disclosure Standards
  scheduleICDS_adjustment1: number;
  scheduleICDS_adjustment2: number;
  scheduleICDS_adjustment3: number;
  scheduleICDS_adjustment4: number;
  scheduleICDS_adjustment5: number;
  scheduleICDS_totalAdjustments: number;
  scheduleICDS_description: string;
  
  // Schedule FA: Foreign Assets
  scheduleFA_hasForeignAssets: boolean;
  scheduleFA_bankAccounts: number;
  scheduleFA_custodialAccounts: number;
  scheduleFA_equityShares: number;
  scheduleFA_debtSecurities: number;
  scheduleFA_derivativeContracts: number;
  scheduleFA_otherAssets: number;
  scheduleFA_totalValue: number;
  scheduleFA_country: string;
  
  // Schedule TP: Transfer Pricing
  scheduleTP_hasInternationalTransactions: boolean;
  scheduleTP_associatedEnterprises: number;
  scheduleTP_aggregateValue: number;
  scheduleTP_method: string;
  scheduleTP_armLengthPrice: number;
  scheduleTP_actualPrice: number;
  scheduleTP_adjustment: number;
  scheduleTP_accountantReport: boolean;
  
  // Schedule SH1: Shareholding Pattern
  scheduleSH1_equityShares: number;
  scheduleSH1_preferenceShares: number;
  scheduleSH1_publicShareholders: number;
  scheduleSH1_promoterShareholders: number;
  scheduleSH1_institutionalShareholders: number;
  scheduleSH1_foreignShareholders: number;
  
  // Schedule AL1: Assets and Liabilities
  scheduleAL1_totalAssets: number;
  scheduleAL1_totalLiabilities: number;
  scheduleAL1_netWorth: number;
  scheduleAL1_workingCapital: number;
  scheduleAL1_debtEquityRatio: number;
  
  // Advanced Deduction Schedules
  schedule80IA: number;
  schedule80IB: number;
  schedule80IC: number;
  schedule80ID: number;
  schedule80IE: number;
  schedule35AD: number;
  schedule35CCA: number;
  schedule35CCB: number

  // Step 32: Schedule CG - Detailed Capital Gains
  scheduleCG_hasCapitalGains: boolean;
  scheduleCG_propertyDescription: string;
  scheduleCG_propertyAcquisitionDate: string;
  scheduleCG_propertyAcquisitionCost: number;
  scheduleCG_propertySaleDate: string;
  scheduleCG_propertySaleConsideration: number;
  scheduleCG_propertyIndexedCost: number;
  scheduleCG_propertyExemptionU54: number;
  scheduleCG_propertyExemptionU54F: number;
  scheduleCG_shareDescription: string;
  scheduleCG_shareAcquisitionDate: string;
  scheduleCG_shareAcquisitionCost: number;
  scheduleCG_shareSaleDate: string;
  scheduleCG_shareSaleConsideration: number;
  scheduleCG_shareSTT: number;
  scheduleCG_shareExemptionU54EC: number;
  scheduleCG_totalSTCG: number;
  scheduleCG_totalLTCG: number;
  
  // Step 33: Loss Set-off Provisions
  lossSetoff_broughtForwardBusinessLoss: number;
  lossSetoff_broughtForwardSTCLoss: number;
  lossSetoff_broughtForwardLTCLoss: number;
  lossSetoff_broughtForwardHouseLoss: number;
  lossSetoff_unabsorbedDepreciation: number;
  lossSetoff_currentYearBusinessLoss: number;
  lossSetoff_currentYearCapitalLoss: number;
  lossSetoff_currentYearHouseLoss: number;
  lossSetoff_businessLossSetOff: number;
  lossSetoff_capitalLossSetOff: number;
  lossSetoff_houseLossSetOff: number;
  lossSetoff_carryForwardBusinessLoss: number;
  lossSetoff_carryForwardCapitalLoss: number;
  lossSetoff_carryForwardHouseLoss: number;
  lossSetoff_carryForwardDepreciation: number;
  
  // Step 34: Tax Relief Sections 90/91
  taxRelief_hasDTAABenefit: boolean;
  taxRelief_treatyCountry: string;
  taxRelief_treatyArticle: string;
  taxRelief_foreignIncome: number;
  taxRelief_foreignTaxPaid: number;
  taxRelief_foreignTaxCredit: number;
  taxRelief_section90Relief: number;
  taxRelief_section91Relief: number;
  taxRelief_isPE: boolean;
  taxRelief_peIncome: number;
  taxRelief_peCountry: string;
  taxRelief_isSEP: boolean;
  taxRelief_sepIncome: number;
  taxRelief_sepCountry: string;
  taxRelief_totalRelief: number;
  
  // Step 35: Clubbing Provisions
  clubbing_hasSpouseIncome: boolean;
  clubbing_spouseName: string;
  clubbing_spousePAN: string;
  clubbing_spouseIncome: number;
  clubbing_hasMinorIncome: boolean;
  clubbing_minorName: string;
  clubbing_minorIncome: number;
  clubbing_hasTransferredAssets: boolean;
  clubbing_transferredAssetIncome: number;
  clubbing_transferredAssetDescription: string;
  clubbing_hasAssociateIncome: boolean;
  clubbing_associateIncome: number;
  clubbing_associateDescription: string;
  clubbing_totalClubbedIncome: number;
  
  // Step 36: Enhanced Deduction Schedules (80G to 80P)
  enhanced80G_governmentFund: number;
  enhanced80G_approvedFund: number;
  enhanced80G_donationDetails: string;
  enhanced80G_totalDonation: number;
  enhanced80GG_rentPaid: number;
  enhanced80GG_cityCategory: string;
  enhanced80GG_qualifyingConditions: boolean;
  enhanced80U_disabilityType: string;
  enhanced80U_disabilityCertificate: string;
  enhanced80U_disabilityPercentage: number;
  enhanced80U_deductionAmount: number;
  enhanced80TTA_bankInterest: number;
  enhanced80TTA_postOfficeInterest: number;
  enhanced80TTA_cooperativeInterest: number;
  enhanced80TTB_seniorCitizenInterest: number;
  enhanced80P_cooperativeSocietyIncome: number;
  enhanced80P_cooperativeSocietyType: string;
  
  // Step 37: Enhanced Bank Details
  enhancedBank_accountNumber2: string;
  enhancedBank_ifsc2: string;
  enhancedBank_bankName2: string;
  enhancedBank_accountType2: string;
  enhancedBank_nomineeName: string;
  enhancedBank_nomineeRelation: string;
  enhancedBank_nomineePAN: string;
  enhancedBank_refundMethod: string;
  enhancedBank_swiftCode: string;
  enhancedBank_iban: string;
  enhancedBank_branchAddress: string;
  enhancedBank_microCode: string;
  enhancedBank_accountHolderName: string;
  enhancedBank_jointAccountHolder: string;
  enhancedBank_accountOpeningDate: string;
}

interface Itr6FormErrors {
  [key: string]: string;
}

const ItrSix = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('itr6-current-step');
    return savedStep ? parseInt(savedStep) : 1;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Itr6FormData>(() => {
    const savedFormData = localStorage.getItem('itr6-form-data');
    return savedFormData ? JSON.parse(savedFormData) : {
      // Step 1: Company General Information
      companyName: '',
      pan: '',
      oldCompanyName: '',
      cin: '',
      incorporationDate: '',
      businessStartDate: '',
      flatNo: '',
      buildingName: '',
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
      
      // Step 2: Filing Status
      filingSection: '',
      filingReasonNotice: '',
      receiptNo: '',
      originalReturnDate: '',
      noticeDIN: '',
      noticeDate: '',
      
      // Step 3: Company Status & Regulatory Flags
      residentialStatus: '',
      companyType: '',
      opted115BAA: false,
      isAuditRequired: false,
      isIFSCUnit: false,
      isUnderLiquidation: false,
      isFPI: false,
      sebiRegNo: '',
      isIndAS: false,
      isDPIIT: false,
      isMSME: false,
      msmeRegNo: '',
      isStartup: false,
      startupRecognitionNo: '',
      
      // Step 4: Representative Assessee Details
      repName: '',
      repPAN: '',
      repCapacity: '',
      repAddress: '',
      
      // Step 5: Audit & Books of Account
      maintainsBooks: false,
      isLiableToAudit: false,
      auditReportDate: '',
      auditorName: '',
      auditorMembershipNo: '',
      auditFirmName: '',
      auditFirmPAN: '',
      auditUDIN: '',
      isSection44ABApplicable: false,
      isSection92EApplicable: false,
      isSection115JBApplicable: false,
      auditType: '',
      booksLocation: '',
      accountingMethod: '',
      valuationMethod: '',
      hasAdverseRemarks: false,
      adverseRemarksDetails: '',
      
      // Step 6: Holding/Subsidiary Company Info
      holdingCompanyPAN: '',
      holdingCompanyName: '',
      holdingSharePercent: '',
      holdingCountry: '',
      subsidiaryCompanyPAN: '',
      subsidiaryCompanyName: '',
      subsidiarySharePercent: '',
      subsidiaryCountry: '',
      
      // Step 7: Key Persons and Shareholders
      directorName: '',
      directorPAN: '',
      directorDIN: '',
      directorAddress: '',
      directorDesignation: '',
      directorResidentialStatus: '',
      directorVotingRights: '',
      shareholderName: '',
      shareholderPAN: '',
      sharePercent: '',
      shareholderVotingRights: '',
      
      // Step 8: Business Nature & Bank Details
      natureOfBusiness1: '',
      natureOfBusiness2: '',
      natureOfBusiness3: '',
      bankAccountNumber: '',
      bankIFSC: '',
      bankName: '',
      accountType: '',
      
      // Step 9: Balance Sheet - Sources of Funds
      paidUpShareCapital: 0,
      reservesAndSurplus: 0,
      securedLoans: 0,
      unsecuredLoans: 0,
      deferredTaxLiabilities: 0,
      currentLiabilities: 0,
      provisions: 0,
      totalSourcesOfFunds: 0,
      
      // Step 10: Balance Sheet - Application of Funds
      fixedAssets: 0,
      investments: 0,
      currentAssets: 0,
      loansAndAdvances: 0,
      deferredTaxAssets: 0,
      miscellaneousExpenditures: 0,
      totalApplicationOfFunds: 0,
      contingentLiabilities: 0,
      capitalCommitments: 0,
      
      // Step 11: Manufacturing Account
      openingStockRawMaterials: 0,
      purchasesRawMaterials: 0,
      directWages: 0,
      powerAndFuel: 0,
      factoryOverheads: 0,
      closingStockRawMaterials: 0,
      closingStockWIP: 0,
      costOfGoodsManufactured: 0,
      
      // Step 12: Trading Account
      salesTurnover: 0,
      openingStockFinishedGoods: 0,
      purchases: 0,
      directExpenses: 0,
      closingStockFinishedGoods: 0,
      grossProfit: 0,
      grossLoss: 0,
      
      // Step 13: Profit & Loss Account - Income
      revenueFromOperations: 0,
      otherIncome: 0,
      interestIncome: 0,
      dividendIncome: 0,
      rentReceived: 0,
      totalIncome: 0,
      
      // Step 14: Profit & Loss Account - Expenses
      employeeBenefitExpenses: 0,
      depreciation: 0,
      interestExpenses: 0,
      rentExpenses: 0,
      repairsMaintenance: 0,
      advertisingExpenses: 0,
      administrativeExpenses: 0,
      sellingDistributionExpenses: 0,
      researchDevelopmentExpenses: 0,
      otherExpenses: 0,
      totalExpenses: 0,
      profitBeforeTax: 0,
      provisionForTax: 0,
      profitAfterTax: 0,
      
      // Step 15: Quantitative Details
      principalProduct: '',
      unitOfMeasurement: '',
      openingStockQuantity: 0,
      purchaseQuantity: 0,
      salesQuantity: 0,
      closingStockQuantity: 0,
      
      // Step 16: Income from House Property
      annualValue: 0,
      municipalTaxesPaid: 0,
      standardDeduction: 0,
      interestOnHousingLoan: 0,
      incomeFromHouseProperty: 0,
      
      // Step 17: Income from Business/Profession
      businessIncome: 0,
      professionalIncome: 0,
      speculativeBusinessIncome: 0,
      presumptiveIncome: 0,
      totalBusinessProfessionIncome: 0,
      
      // Step 18: Capital Gains
      shortTermCapitalGains: 0,
      longTermCapitalGains: 0,
      exemptedLongTermCapitalGains: 0,
      totalCapitalGains: 0,
      
      // Step 19: Income from Other Sources
      interestFromDeposits: 0,
      dividendFromShares: 0,
      incomeFromOtherSources: 0,
      totalOtherSourcesIncome: 0,
      
      // Step 20: Deductions under Chapter VI-A
      section80C: 0,
      section80D: 0,
      section80G: 0,
      section80E: 0,
      section80CCD1B: 0,
      section80TTA: 0,
      totalDeductions: 0,
      
      // Step 21: Tax Computation
      grossTotalIncome: 0,
      totalDeductionsUnderVIA: 0,
      totalIncomeTaxable: 0,
      taxOnTotalIncome: 0,
      surcharge: 0,
      healthEducationCess: 0,
      totalTaxLiability: 0,
      advanceTaxPaid: 0,
      tdsDeducted: 0,
      selfAssessmentTax: 0,
      totalTaxesPaid: 0,
      refundDue: 0,
      balanceTaxPayable: 0,
      
      // Step 22: Interest and Fees
      interest234A: 0,
      interest234B: 0,
      interest234C: 0,
      interest234F: 0,
      fee234E: 0,
      fee234F: 0,
      totalInterestFees: 0,
      
      // Step 23: Verification
      verificationPlace: '',
      verificationDate: '',
      signatoryName: '',
      signatoryDesignation: '',
      signatoryPAN: '',
      signatoryCapacity: '',
      
      // Schedule BP: Business/Professional Income Details
      scheduleBP_businessType: '',
      scheduleBP_businessDescription: '',
      scheduleBP_grossReceipts: 0,
      scheduleBP_grossProfitRate: 0,
      scheduleBP_netProfitRate: 0,
      scheduleBP_turnoverU44AD: 0,
      scheduleBP_presumptiveIncomeU44AD: 0,
      scheduleBP_turnoverU44ADA: 0,
      scheduleBP_presumptiveIncomeU44ADA: 0,
      scheduleBP_professionalReceipts: 0,
      scheduleBP_presumptiveIncomeU44AE: 0,
      
      // Schedule DPM: Depreciation on Plant & Machinery
      scheduleDPM_openingWDV: 0,
      scheduleDPM_additions: 0,
      scheduleDPM_deductions: 0,
      scheduleDPM_depreciationRate: 0,
      scheduleDPM_depreciationAmount: 0,
      scheduleDPM_closingWDV: 0,
      
      // Schedule DOA: Depreciation on Other Assets
      scheduleDOA_land: 0,
      scheduleDOA_building: 0,
      scheduleDOA_furniture: 0,
      scheduleDOA_vehicles: 0,
      scheduleDOA_computers: 0,
      scheduleDOA_otherAssets: 0,
      scheduleDOA_totalDepreciation: 0,
      
      // Schedule ICDS: Income Computation and Disclosure Standards
      scheduleICDS_adjustment1: 0,
      scheduleICDS_adjustment2: 0,
      scheduleICDS_adjustment3: 0,
      scheduleICDS_adjustment4: 0,
      scheduleICDS_adjustment5: 0,
      scheduleICDS_totalAdjustments: 0,
      scheduleICDS_description: '',
      
      // Schedule FA: Foreign Assets
      scheduleFA_hasForeignAssets: false,
      scheduleFA_bankAccounts: 0,
      scheduleFA_custodialAccounts: 0,
      scheduleFA_equityShares: 0,
      scheduleFA_debtSecurities: 0,
      scheduleFA_derivativeContracts: 0,
      scheduleFA_otherAssets: 0,
      scheduleFA_totalValue: 0,
      scheduleFA_country: '',
      
      // Schedule TP: Transfer Pricing
      scheduleTP_hasInternationalTransactions: false,
      scheduleTP_associatedEnterprises: 0,
      scheduleTP_aggregateValue: 0,
      scheduleTP_method: '',
      scheduleTP_armLengthPrice: 0,
      scheduleTP_actualPrice: 0,
      scheduleTP_adjustment: 0,
      scheduleTP_accountantReport: false,
      
      // Schedule SH1: Shareholding Pattern
      scheduleSH1_equityShares: 0,
      scheduleSH1_preferenceShares: 0,
      scheduleSH1_publicShareholders: 0,
      scheduleSH1_promoterShareholders: 0,
      scheduleSH1_institutionalShareholders: 0,
      scheduleSH1_foreignShareholders: 0,
      
      // Schedule AL1: Assets and Liabilities
      scheduleAL1_totalAssets: 0,
      scheduleAL1_totalLiabilities: 0,
      scheduleAL1_netWorth: 0,
      scheduleAL1_workingCapital: 0,
      scheduleAL1_debtEquityRatio: 0,
      
      // Advanced Deduction Schedules
      schedule80IA: 0,
      schedule80IB: 0,
      schedule80IC: 0,
      schedule80ID: 0,
      schedule80IE: 0,
      schedule35AD: 0,
      schedule35CCA: 0,
      schedule35CCB: 0,

      // Step 32: Schedule CG - Detailed Capital Gains
      scheduleCG_hasCapitalGains: false,
      scheduleCG_propertyDescription: '',
      scheduleCG_propertyAcquisitionDate: '',
      scheduleCG_propertyAcquisitionCost: 0,
      scheduleCG_propertySaleDate: '',
      scheduleCG_propertySaleConsideration: 0,
      scheduleCG_propertyIndexedCost: 0,
      scheduleCG_propertyExemptionU54: 0,
      scheduleCG_propertyExemptionU54F: 0,
      scheduleCG_shareDescription: '',
      scheduleCG_shareAcquisitionDate: '',
      scheduleCG_shareAcquisitionCost: 0,
      scheduleCG_shareSaleDate: '',
      scheduleCG_shareSaleConsideration: 0,
      scheduleCG_shareSTT: 0,
      scheduleCG_shareExemptionU54EC: 0,
      scheduleCG_totalSTCG: 0,
      scheduleCG_totalLTCG: 0,
      
      // Step 33: Loss Set-off Provisions
      lossSetoff_broughtForwardBusinessLoss: 0,
      lossSetoff_broughtForwardSTCLoss: 0,
      lossSetoff_broughtForwardLTCLoss: 0,
      lossSetoff_broughtForwardHouseLoss: 0,
      lossSetoff_unabsorbedDepreciation: 0,
      lossSetoff_currentYearBusinessLoss: 0,
      lossSetoff_currentYearCapitalLoss: 0,
      lossSetoff_currentYearHouseLoss: 0,
      lossSetoff_businessLossSetOff: 0,
      lossSetoff_capitalLossSetOff: 0,
      lossSetoff_houseLossSetOff: 0,
      lossSetoff_carryForwardBusinessLoss: 0,
      lossSetoff_carryForwardCapitalLoss: 0,
      lossSetoff_carryForwardHouseLoss: 0,
      lossSetoff_carryForwardDepreciation: 0,
      
      // Step 34: Tax Relief Sections 90/91
      taxRelief_hasDTAABenefit: false,
      taxRelief_treatyCountry: '',
      taxRelief_treatyArticle: '',
      taxRelief_foreignIncome: 0,
      taxRelief_foreignTaxPaid: 0,
      taxRelief_foreignTaxCredit: 0,
      taxRelief_section90Relief: 0,
      taxRelief_section91Relief: 0,
      taxRelief_isPE: false,
      taxRelief_peIncome: 0,
      taxRelief_peCountry: '',
      taxRelief_isSEP: false,
      taxRelief_sepIncome: 0,
      taxRelief_sepCountry: '',
      taxRelief_totalRelief: 0,
      
      // Step 35: Clubbing Provisions
      clubbing_hasSpouseIncome: false,
      clubbing_spouseName: '',
      clubbing_spousePAN: '',
      clubbing_spouseIncome: 0,
      clubbing_hasMinorIncome: false,
      clubbing_minorName: '',
      clubbing_minorIncome: 0,
      clubbing_hasTransferredAssets: false,
      clubbing_transferredAssetIncome: 0,
      clubbing_transferredAssetDescription: '',
      clubbing_hasAssociateIncome: false,
      clubbing_associateIncome: 0,
      clubbing_associateDescription: '',
      clubbing_totalClubbedIncome: 0,
      
      // Step 36: Enhanced Deduction Schedules (80G to 80P)
      enhanced80G_governmentFund: 0,
      enhanced80G_approvedFund: 0,
      enhanced80G_donationDetails: '',
      enhanced80G_totalDonation: 0,
      enhanced80GG_rentPaid: 0,
      enhanced80GG_cityCategory: '',
      enhanced80GG_qualifyingConditions: false,
      enhanced80U_disabilityType: '',
      enhanced80U_disabilityCertificate: '',
      enhanced80U_disabilityPercentage: 0,
      enhanced80U_deductionAmount: 0,
      enhanced80TTA_bankInterest: 0,
      enhanced80TTA_postOfficeInterest: 0,
      enhanced80TTA_cooperativeInterest: 0,
      enhanced80TTB_seniorCitizenInterest: 0,
      enhanced80P_cooperativeSocietyIncome: 0,
      enhanced80P_cooperativeSocietyType: '',
      
      // Step 37: Enhanced Bank Details
      enhancedBank_accountNumber2: '',
      enhancedBank_ifsc2: '',
      enhancedBank_bankName2: '',
      enhancedBank_accountType2: '',
      enhancedBank_nomineeName: '',
      enhancedBank_nomineeRelation: '',
      enhancedBank_nomineePAN: '',
      enhancedBank_refundMethod: '',
      enhancedBank_swiftCode: '',
      enhancedBank_iban: '',
      enhancedBank_branchAddress: '',
      enhancedBank_microCode: '',
      enhancedBank_accountHolderName: '',
      enhancedBank_jointAccountHolder: '',
      enhancedBank_accountOpeningDate: '',
    };
  });
  const [errors, setErrors] = useState<Itr6FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => {
        const newData = { ...prev, [name]: checked };
        localStorage.setItem('itr6-form-data', JSON.stringify(newData));
        return newData;
      });
    } else if (type === 'number') {
      const numValue = value === '' ? 0 : parseFloat(value);
      setFormData(prev => {
        const newData = { ...prev, [name]: numValue };
        localStorage.setItem('itr6-form-data', JSON.stringify(newData));
        return newData;
      });
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        localStorage.setItem('itr6-form-data', JSON.stringify(newData));
        return newData;
      });
    }
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Auto-calculation functions
  const calculateTotalSourcesOfFunds = () => {
    const total = formData.paidUpShareCapital + formData.reservesAndSurplus + 
                  formData.securedLoans + formData.unsecuredLoans + 
                  formData.deferredTaxLiabilities + formData.currentLiabilities + formData.provisions;
    setFormData(prev => ({ ...prev, totalSourcesOfFunds: total }));
  };

  const calculateTotalApplicationOfFunds = () => {
    const total = formData.fixedAssets + formData.investments + formData.currentAssets + 
                  formData.loansAndAdvances + formData.deferredTaxAssets + formData.miscellaneousExpenditures;
    setFormData(prev => ({ ...prev, totalApplicationOfFunds: total }));
  };

  const calculateGrossProfit = () => {
    const grossProfit = formData.salesTurnover + formData.openingStockFinishedGoods - 
                      formData.purchases - formData.directExpenses - formData.closingStockFinishedGoods;
    setFormData(prev => ({ ...prev, grossProfit: grossProfit > 0 ? grossProfit : 0, grossLoss: grossProfit < 0 ? Math.abs(grossProfit) : 0 }));
  };

  const calculateTotalIncome = () => {
    const total = formData.revenueFromOperations + formData.otherIncome + 
                  formData.interestIncome + formData.dividendIncome + formData.rentReceived;
    setFormData(prev => ({ ...prev, totalIncome: total }));
  };

  const calculateTotalExpenses = () => {
    const total = formData.employeeBenefitExpenses + formData.depreciation + formData.interestExpenses + 
                  formData.rentExpenses + formData.repairsMaintenance + formData.advertisingExpenses + 
                  formData.administrativeExpenses + formData.sellingDistributionExpenses + 
                  formData.researchDevelopmentExpenses + formData.otherExpenses;
    setFormData(prev => ({ ...prev, totalExpenses: total }));
  };

  const calculateProfitBeforeTax = () => {
    const profit = formData.totalIncome - formData.totalExpenses;
    setFormData(prev => ({ ...prev, profitBeforeTax: profit }));
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: Itr6FormErrors = {};
    let isValid = true;

    switch (stepNumber) {
      case 1: // Company General Information
        if (!formData.companyName.trim()) {
          newErrors.companyName = 'Company name is required';
          isValid = false;
        }
        if (!formData.pan.trim()) {
          newErrors.pan = 'PAN is required';
          isValid = false;
        }
        if (!formData.incorporationDate) {
          newErrors.incorporationDate = 'Incorporation date is required';
          isValid = false;
        }
        if (!formData.state) {
          newErrors.state = 'State is required';
          isValid = false;
        }
        if (!formData.pincode) {
          newErrors.pincode = 'PIN code is required';
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
      case 2: // Filing Status
        if (!formData.filingSection) {
          newErrors.filingSection = 'Filing section is required';
          isValid = false;
        }
        break;
      case 3: // Company Status & Regulatory Flags
        if (!formData.residentialStatus) {
          newErrors.residentialStatus = 'Residential status is required';
          isValid = false;
        }
        if (!formData.companyType) {
          newErrors.companyType = 'Company type is required';
          isValid = false;
        }
        if (formData.isFPI && !formData.sebiRegNo) {
          newErrors.sebiRegNo = 'SEBI registration number is required for FPI';
          isValid = false;
        }
        if (formData.isMSME && !formData.msmeRegNo) {
          newErrors.msmeRegNo = 'MSME registration number is required';
          isValid = false;
        }
        if (formData.isStartup && !formData.startupRecognitionNo) {
          newErrors.startupRecognitionNo = 'Startup recognition number is required';
          isValid = false;
        }
        break;
      case 4: // Representative Assessee Details - Optional
        break;
      case 5: // Audit & Books of Account
        if (formData.isLiableToAudit) {
          if (!formData.auditorName) {
            newErrors.auditorName = 'Auditor name is required if liable to audit';
            isValid = false;
          }
          if (!formData.auditorMembershipNo) {
            newErrors.auditorMembershipNo = 'Auditor membership number is required';
            isValid = false;
          }
        }
        break;
      case 6: // Holding/Subsidiary Company Info - Optional
        break;
      case 7: // Key Persons and Shareholders - Optional
        break;
      case 8: // Business Nature & Bank Details
        if (!formData.natureOfBusiness1) {
          newErrors.natureOfBusiness1 = 'Nature of business is required';
          isValid = false;
        }
        if (!formData.bankAccountNumber) {
          newErrors.bankAccountNumber = 'Bank account number is required';
          isValid = false;
        }
        if (!formData.bankIFSC) {
          newErrors.bankIFSC = 'Bank IFSC is required';
          isValid = false;
        }
        if (!formData.bankName) {
          newErrors.bankName = 'Bank name is required';
          isValid = false;
        }
        if (!formData.accountType) {
          newErrors.accountType = 'Account type is required';
          isValid = false;
        }
        break;
      case 9: // Balance Sheet - Sources of Funds
        // Auto-calculate total
        calculateTotalSourcesOfFunds();
        break;
      case 10: // Balance Sheet - Application of Funds
        // Auto-calculate total
        calculateTotalApplicationOfFunds();
        break;
      case 11: // Manufacturing Account - Optional for manufacturing companies
        break;
      case 12: // Trading Account
        // Auto-calculate gross profit/loss
        calculateGrossProfit();
        break;
      case 13: // Profit & Loss Account - Income
        // Auto-calculate total income
        calculateTotalIncome();
        break;
      case 14: // Profit & Loss Account - Expenses
        // Auto-calculate total expenses and profit before tax
        calculateTotalExpenses();
        calculateProfitBeforeTax();
        break;
      case 15: // Quantitative Details - Optional
        break;
      case 16: // Income from House Property - Optional
        break;
      case 17: // Income from Business/Profession
        if (!formData.businessIncome && !formData.professionalIncome) {
          newErrors.businessIncome = 'Either business or professional income is required';
          isValid = false;
        }
        break;
      case 18: // Capital Gains - Optional
        break;
      case 19: // Income from Other Sources - Optional
        break;
      case 20: // Deductions under Chapter VI-A - Optional
        break;
      case 21: // Tax Computation
        if (!formData.grossTotalIncome) {
          newErrors.grossTotalIncome = 'Gross total income is required';
          isValid = false;
        }
        break;
      case 22: // Interest and Fees - Optional
        break;
      case 23: // Verification
        if (!formData.signatoryName) {
          newErrors.signatoryName = 'Signatory name is required';
          isValid = false;
        }
        if (!formData.signatoryPAN) {
          newErrors.signatoryPAN = 'Signatory PAN is required';
          isValid = false;
        }
        if (!formData.verificationPlace) {
          newErrors.verificationPlace = 'Verification place is required';
          isValid = false;
        }
        if (!formData.verificationDate) {
          newErrors.verificationDate = 'Verification date is required';
          isValid = false;
        }
        break;
      case 24: // Schedule BP - Business/Professional Income - Optional
        break;
      case 25: // Schedule DPM - Depreciation on Plant & Machinery - Optional
        break;
      case 26: // Schedule DOA - Depreciation on Other Assets - Optional
        break;
      case 27: // Schedule ICDS - Income Computation Standards - Optional
        break;
      case 28: // Schedule FA - Foreign Assets - Optional
        break;
      case 29: // Schedule TP - Transfer Pricing - Optional
        break;
      case 30: // Schedule SH1 & AL1 - Shareholding & Assets - Optional
        break;
      case 31: // Advanced Deduction Schedules - Optional
        break;
      case 32: // Schedule CG - Detailed Capital Gains - Optional
        break;
      case 33: // Loss Set-off Provisions - Optional
        break;
      case 34: // Tax Relief Sections 90/91 - Optional
        break;
      case 35: // Clubbing Provisions - Optional
        break;
      case 36: // Enhanced Deduction Schedules - Optional
        break;
      case 37: // Enhanced Bank Details - Optional
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = async () => {
    if (validateStep(step)) {
      if (step === 37) {
        setIsLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          localStorage.removeItem('itr6-current-step');
          localStorage.removeItem('itr6-form-data');
          navigate("/practice/itr/success");
        } catch (error) {
          setSaveError("Failed to save ITR-6. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        const nextStep = step + 1;
        setStep(nextStep);
        localStorage.setItem('itr6-current-step', nextStep.toString());
      }
    }
  };

  const handlePreviousStep = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    localStorage.setItem('itr6-current-step', prevStep.toString());
  };

  const getStepTitle = (stepNumber: number) => {
    const titles: Record<number, string> = {
      1: 'Company General Information',
      2: 'Filing Status',
      3: 'Company Status & Regulatory Flags',
      4: 'Representative Assessee Details',
      5: 'Audit & Books of Account',
      6: 'Holding/Subsidiary Company Info',
      7: 'Key Persons and Shareholders',
      8: 'Business Nature & Bank Details',
      9: 'Balance Sheet - Sources of Funds',
      10: 'Balance Sheet - Application of Funds',
      11: 'Manufacturing Account',
      12: 'Trading Account',
      13: 'Profit & Loss Account - Income',
      14: 'Profit & Loss Account - Expenses',
      15: 'Quantitative Details',
      16: 'Income from House Property',
      17: 'Income from Business/Profession',
      18: 'Capital Gains',
      19: 'Income from Other Sources',
      20: 'Deductions under Chapter VI-A',
      21: 'Tax Computation',
      22: 'Interest and Fees',
      23: 'Verification',
      24: 'Schedule BP - Business/Professional Income',
      25: 'Schedule DPM - Depreciation on Plant & Machinery',
      26: 'Schedule DOA - Depreciation on Other Assets',
      27: 'Schedule ICDS - Income Computation Standards',
      28: 'Schedule FA - Foreign Assets',
      29: 'Schedule TP - Transfer Pricing',
      30: 'Schedule SH1 & AL1 - Shareholding & Assets',
      31: 'Advanced Deduction Schedules',
      32: 'Schedule CG - Detailed Capital Gains',
      33: 'Loss Set-off Provisions',
      34: 'Tax Relief Sections 90/91',
      35: 'Clubbing Provisions',
      36: 'Enhanced Deduction Schedules (80G to 80P)',
      37: 'Enhanced Bank Details',
    };
    return titles[stepNumber] || '';
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
          <li className="text-gray-500">ITR-6</li>
        </ul>
      </div>

      <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
        <h2 className="text-xl font-extrabold text-white">
          {`Step ${step} of 37: ${getStepTitle(step)}`}
        </h2>
      </div>

      <div className="w-[60%] mb-20 p-6 mx-auto bg-white rounded-lg shadow-lg">
        {/* Step 1: Company General Information */}
        {step === 1 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Company General Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Company Name <span className="text-red-500">*</span></label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PAN <span className="text-red-500">*</span></label>
                <input type="text" name="pan" value={formData.pan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.pan && <p className="mt-1 text-sm text-red-500">{errors.pan}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Old Company Name</label>
                <input type="text" name="oldCompanyName" value={formData.oldCompanyName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">CIN (Corporate Identity Number)</label>
                <input type="text" name="cin" value={formData.cin} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Incorporation Date <span className="text-red-500">*</span></label>
                <input type="date" name="incorporationDate" value={formData.incorporationDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.incorporationDate && <p className="mt-1 text-sm text-red-500">{errors.incorporationDate}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Business Start Date</label>
                <input type="date" name="businessStartDate" value={formData.businessStartDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Flat/Door/Block No.</label>
                <input type="text" name="flatNo" value={formData.flatNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Building/Village</label>
                <input type="text" name="buildingName" value={formData.buildingName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
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
                <label className="block mb-2 text-sm font-medium text-gray-700">Town/City/District</label>
                <input type="text" name="town" value={formData.town} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">State <span className="text-red-500">*</span></label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PIN Code <span className="text-red-500">*</span></label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.pincode && <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Country <span className="text-red-500">*</span></label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number 1</label>
                <input type="text" name="phone1" value={formData.phone1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number 2</label>
                <input type="text" name="phone2" value={formData.phone2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
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

        {/* Step 2: Filing Status */}
        {step === 2 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Filing Status</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Filing Section <span className="text-red-500">*</span></label>
                <select name="filingSection" value={formData.filingSection} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option value="">Select filing section</option>
                  <option value="139(1)">139(1)</option>
                  <option value="139(4)">139(4)</option>
                  <option value="139(5)">139(5)</option>
                  <option value="92CD">92CD</option>
                  <option value="119(2)(b)">119(2)(b)</option>
                  <option value="170A">170A</option>
                </select>
                {errors.filingSection && <p className="mt-1 text-sm text-red-500">{errors.filingSection}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Filing Reason Notice</label>
                <select name="filingReasonNotice" value={formData.filingReasonNotice} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option value="">Select reason</option>
                  <option value="None">None</option>
                  <option value="139(9)">139(9)</option>
                  <option value="142(1)">142(1)</option>
                  <option value="148">148</option>
                  <option value="153C">153C</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Receipt No (if revised)</label>
                <input type="text" name="receiptNo" value={formData.receiptNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Date of original return</label>
                <input type="date" name="originalReturnDate" value={formData.originalReturnDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Document Identification Number (DIN)</label>
                <input type="text" name="noticeDIN" value={formData.noticeDIN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Notice/Order Date</label>
                <input type="date" name="noticeDate" value={formData.noticeDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Company Status & Regulatory Flags */}
        {step === 3 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Company Status & Regulatory Flags</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Residential Status <span className="text-red-500">*</span></label>
                  <select name="residentialStatus" value={formData.residentialStatus} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">Select residential status</option>
                    <option value="Resident">Resident</option>
                    <option value="Non-Resident">Non-Resident</option>
                  </select>
                  {errors.residentialStatus && <p className="mt-1 text-sm text-red-500">{errors.residentialStatus}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Company Type <span className="text-red-500">*</span></label>
                  <select name="companyType" value={formData.companyType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">Select company type</option>
                    <option value="Domestic">Domestic</option>
                    <option value="Foreign">Foreign</option>
                  </select>
                  {errors.companyType && <p className="mt-1 text-sm text-red-500">{errors.companyType}</p>}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-700">Special Provisions & Regulatory Flags</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input type="checkbox" name="opted115BAA" checked={formData.opted115BAA} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label className="ml-2 text-sm font-medium text-gray-700">Opted 115BAA</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" name="isAuditRequired" checked={formData.isAuditRequired} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label className="ml-2 text-sm font-medium text-gray-700">Is Audit Required</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" name="isIFSCUnit" checked={formData.isIFSCUnit} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label className="ml-2 text-sm font-medium text-gray-700">Is IFSC Unit</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" name="isUnderLiquidation" checked={formData.isUnderLiquidation} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label className="ml-2 text-sm font-medium text-gray-700">Is Under Liquidation</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" name="isFPI" checked={formData.isFPI} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label className="ml-2 text-sm font-medium text-gray-700">Is FPI</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" name="isIndAS" checked={formData.isIndAS} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label className="ml-2 text-sm font-medium text-gray-700">Ind-AS Applicable</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" name="isDPIIT" checked={formData.isDPIIT} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label className="ml-2 text-sm font-medium text-gray-700">DPIIT Recognized</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" name="isMSME" checked={formData.isMSME} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label className="ml-2 text-sm font-medium text-gray-700">MSME Registered</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" name="isStartup" checked={formData.isStartup} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label className="ml-2 text-sm font-medium text-gray-700">Startup</label>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {formData.isFPI && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">SEBI Registration No</label>
                    <input type="text" name="sebiRegNo" value={formData.sebiRegNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    {errors.sebiRegNo && <p className="mt-1 text-sm text-red-500">{errors.sebiRegNo}</p>}
                  </div>
                )}
                {formData.isMSME && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">MSME Registration No</label>
                    <input type="text" name="msmeRegNo" value={formData.msmeRegNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    {errors.msmeRegNo && <p className="mt-1 text-sm text-red-500">{errors.msmeRegNo}</p>}
                  </div>
                )}
                {formData.isStartup && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Startup Recognition No</label>
                    <input type="text" name="startupRecognitionNo" value={formData.startupRecognitionNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    {errors.startupRecognitionNo && <p className="mt-1 text-sm text-red-500">{errors.startupRecognitionNo}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Representative Assessee Details */}
        {step === 4 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Representative Assessee Details (If Applicable)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Representative Name</label>
                <input type="text" name="repName" value={formData.repName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PAN / Aadhaar</label>
                <input type="text" name="repPAN" value={formData.repPAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Capacity</label>
                <input type="text" name="repCapacity" value={formData.repCapacity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
                <input type="text" name="repAddress" value={formData.repAddress} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Audit & Books of Account */}
        {step === 5 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Audit & Books of Account</h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-700">Books of Account</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input type="checkbox" name="maintainsBooks" checked={formData.maintainsBooks} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label className="ml-2 text-sm font-medium text-gray-700">Maintains Books</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" name="isLiableToAudit" checked={formData.isLiableToAudit} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label className="ml-2 text-sm font-medium text-gray-700">Is Liable To Audit</label>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Accounting Method</label>
                    <select name="accountingMethod" value={formData.accountingMethod} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                      <option value="">Select method</option>
                      <option value="Cash">Cash Method</option>
                      <option value="Accrual">Accrual Method</option>
                      <option value="Hybrid">Hybrid Method</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Valuation Method</label>
                    <select name="valuationMethod" value={formData.valuationMethod} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                      <option value="">Select method</option>
                      <option value="FIFO">FIFO</option>
                      <option value="LIFO">LIFO</option>
                      <option value="Weighted Average">Weighted Average</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Books Location</label>
                    <input type="text" name="booksLocation" value={formData.booksLocation} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-700">Audit Applicability</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <input type="checkbox" name="isSection44ABApplicable" checked={formData.isSection44ABApplicable} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label className="ml-2 text-sm font-medium text-gray-700">Section 44AB</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" name="isSection92EApplicable" checked={formData.isSection92EApplicable} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label className="ml-2 text-sm font-medium text-gray-700">Section 92E</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" name="isSection115JBApplicable" checked={formData.isSection115JBApplicable} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label className="ml-2 text-sm font-medium text-gray-700">Section 115JB</label>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Audit Type</label>
                  <select name="auditType" value={formData.auditType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">Select audit type</option>
                    <option value="Statutory">Statutory Audit</option>
                    <option value="Tax">Tax Audit</option>
                    <option value="Internal">Internal Audit</option>
                    <option value="Cost">Cost Audit</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Audit Report Date</label>
                  <input type="date" name="auditReportDate" value={formData.auditReportDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Auditor Name</label>
                  <input type="text" name="auditorName" value={formData.auditorName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {errors.auditorName && <p className="mt-1 text-sm text-red-500">{errors.auditorName}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Membership No</label>
                  <input type="text" name="auditorMembershipNo" value={formData.auditorMembershipNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {errors.auditorMembershipNo && <p className="mt-1 text-sm text-red-500">{errors.auditorMembershipNo}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Firm Name</label>
                  <input type="text" name="auditFirmName" value={formData.auditFirmName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Firm PAN</label>
                  <input type="text" name="auditFirmPAN" value={formData.auditFirmPAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">UDIN</label>
                  <input type="text" name="auditUDIN" value={formData.auditUDIN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input type="checkbox" name="hasAdverseRemarks" checked={formData.hasAdverseRemarks} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                  <label className="ml-2 text-sm font-medium text-gray-700">Audit Report has Adverse Remarks</label>
                </div>
                {formData.hasAdverseRemarks && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Details of Adverse Remarks</label>
                    <textarea name="adverseRemarksDetails" value={formData.adverseRemarksDetails} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Holding/Subsidiary Company Info */}
        {step === 6 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Holding/Subsidiary Company Info</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-4">Holding Company Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Holding Company PAN/CIN</label>
                    <input type="text" name="holdingCompanyPAN" value={formData.holdingCompanyPAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Holding Company Name</label>
                    <input type="text" name="holdingCompanyName" value={formData.holdingCompanyName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Holding Share (%)</label>
                    <input type="number" name="holdingSharePercent" value={formData.holdingSharePercent} onChange={handleChange} min="0" max="100" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Country of Incorporation</label>
                    <input type="text" name="holdingCountry" value={formData.holdingCountry} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-4">Subsidiary Company Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Subsidiary Company PAN/CIN</label>
                    <input type="text" name="subsidiaryCompanyPAN" value={formData.subsidiaryCompanyPAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Subsidiary Company Name</label>
                    <input type="text" name="subsidiaryCompanyName" value={formData.subsidiaryCompanyName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Subsidiary Share (%)</label>
                    <input type="number" name="subsidiarySharePercent" value={formData.subsidiarySharePercent} onChange={handleChange} min="0" max="100" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Country of Incorporation</label>
                    <input type="text" name="subsidiaryCountry" value={formData.subsidiaryCountry} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Key Persons and Shareholders */}
        {step === 7 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Key Persons and Shareholders</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-4">Director/Key Personnel Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Director/MD Name</label>
                    <input type="text" name="directorName" value={formData.directorName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">PAN</label>
                    <input type="text" name="directorPAN" value={formData.directorPAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">DIN</label>
                    <input type="text" name="directorDIN" value={formData.directorDIN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Designation</label>
                    <select name="directorDesignation" value={formData.directorDesignation} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                      <option value="">Select designation</option>
                      <option value="Managing Director">Managing Director</option>
                      <option value="Executive Director">Executive Director</option>
                      <option value="Non-Executive Director">Non-Executive Director</option>
                      <option value="Independent Director">Independent Director</option>
                      <option value="Chairman">Chairman</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Residential Status</label>
                    <select name="directorResidentialStatus" value={formData.directorResidentialStatus} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                      <option value="">Select status</option>
                      <option value="Resident">Resident</option>
                      <option value="Non-Resident">Non-Resident</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Voting Rights (%)</label>
                    <input type="number" name="directorVotingRights" value={formData.directorVotingRights} onChange={handleChange} min="0" max="100" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
                    <textarea name="directorAddress" value={formData.directorAddress} onChange={handleChange} rows={2} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-4">Beneficial Owner/Shareholder Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Beneficial Owner Name</label>
                    <input type="text" name="shareholderName" value={formData.shareholderName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">PAN</label>
                    <input type="text" name="shareholderPAN" value={formData.shareholderPAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Shareholding (%)</label>
                    <input type="number" name="sharePercent" value={formData.sharePercent} onChange={handleChange} min="0" max="100" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Voting Rights (%)</label>
                    <input type="number" name="shareholderVotingRights" value={formData.shareholderVotingRights} onChange={handleChange} min="0" max="100" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 8: Business Nature & Bank Details */}
        {step === 8 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Business Nature & Bank Details</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-4">Nature of Business</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Nature of Business 1 <span className="text-red-500">*</span></label>
                    <input type="text" name="natureOfBusiness1" value={formData.natureOfBusiness1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    {errors.natureOfBusiness1 && <p className="mt-1 text-sm text-red-500">{errors.natureOfBusiness1}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Nature of Business 2</label>
                    <input type="text" name="natureOfBusiness2" value={formData.natureOfBusiness2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Nature of Business 3</label>
                    <input type="text" name="natureOfBusiness3" value={formData.natureOfBusiness3} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-4">Bank Account Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Account Number <span className="text-red-500">*</span></label>
                    <input type="text" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    {errors.bankAccountNumber && <p className="mt-1 text-sm text-red-500">{errors.bankAccountNumber}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Bank IFSC <span className="text-red-500">*</span></label>
                    <input type="text" name="bankIFSC" value={formData.bankIFSC} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    {errors.bankIFSC && <p className="mt-1 text-sm text-red-500">{errors.bankIFSC}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Bank Name <span className="text-red-500">*</span></label>
                    <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    {errors.bankName && <p className="mt-1 text-sm text-red-500">{errors.bankName}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Account Type <span className="text-red-500">*</span></label>
                    <select name="accountType" value={formData.accountType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                      <option value="">Select account type</option>
                      <option value="Savings">Savings</option>
                      <option value="Current">Current</option>
                    </select>
                    {errors.accountType && <p className="mt-1 text-sm text-red-500">{errors.accountType}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 9: Balance Sheet - Sources of Funds */}
        {step === 9 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Balance Sheet - Sources of Funds</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Paid-up Share Capital (₹)</label>
                  <input type="number" name="paidUpShareCapital" value={formData.paidUpShareCapital} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Reserves and Surplus (₹)</label>
                  <input type="number" name="reservesAndSurplus" value={formData.reservesAndSurplus} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Secured Loans (₹)</label>
                  <input type="number" name="securedLoans" value={formData.securedLoans} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Unsecured Loans (₹)</label>
                  <input type="number" name="unsecuredLoans" value={formData.unsecuredLoans} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Deferred Tax Liabilities (₹)</label>
                  <input type="number" name="deferredTaxLiabilities" value={formData.deferredTaxLiabilities} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Current Liabilities (₹)</label>
                  <input type="number" name="currentLiabilities" value={formData.currentLiabilities} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Provisions (₹)</label>
                  <input type="number" name="provisions" value={formData.provisions} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-blue-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-blue-700">Total Sources of Funds (₹)</label>
                  <div className="text-lg font-bold text-blue-800">₹ {formData.totalSourcesOfFunds.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 10: Balance Sheet - Application of Funds */}
        {step === 10 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Balance Sheet - Application of Funds</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Fixed Assets (₹)</label>
                  <input type="number" name="fixedAssets" value={formData.fixedAssets} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Investments (₹)</label>
                  <input type="number" name="investments" value={formData.investments} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Current Assets (₹)</label>
                  <input type="number" name="currentAssets" value={formData.currentAssets} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Loans and Advances (₹)</label>
                  <input type="number" name="loansAndAdvances" value={formData.loansAndAdvances} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Deferred Tax Assets (₹)</label>
                  <input type="number" name="deferredTaxAssets" value={formData.deferredTaxAssets} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Miscellaneous Expenditures (₹)</label>
                  <input type="number" name="miscellaneousExpenditures" value={formData.miscellaneousExpenditures} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-blue-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-blue-700">Total Application of Funds (₹)</label>
                  <div className="text-lg font-bold text-blue-800">₹ {formData.totalApplicationOfFunds.toLocaleString('en-IN')}</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-4">Notes to Balance Sheet</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Contingent Liabilities (₹)</label>
                    <input type="number" name="contingentLiabilities" value={formData.contingentLiabilities} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Capital Commitments (₹)</label>
                    <input type="number" name="capitalCommitments" value={formData.capitalCommitments} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 11: Manufacturing Account */}
        {step === 11 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Manufacturing Account</h3>
            <p className="mb-4 text-sm text-gray-600">Fill this section only if applicable to manufacturing companies</p>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Opening Stock of Raw Materials (₹)</label>
                  <input type="number" name="openingStockRawMaterials" value={formData.openingStockRawMaterials} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Purchases of Raw Materials (₹)</label>
                  <input type="number" name="purchasesRawMaterials" value={formData.purchasesRawMaterials} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Direct Wages (₹)</label>
                  <input type="number" name="directWages" value={formData.directWages} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Power and Fuel (₹)</label>
                  <input type="number" name="powerAndFuel" value={formData.powerAndFuel} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Factory Overheads (₹)</label>
                  <input type="number" name="factoryOverheads" value={formData.factoryOverheads} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Closing Stock of Raw Materials (₹)</label>
                  <input type="number" name="closingStockRawMaterials" value={formData.closingStockRawMaterials} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Closing Stock of WIP (₹)</label>
                  <input type="number" name="closingStockWIP" value={formData.closingStockWIP} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-green-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-green-700">Cost of Goods Manufactured (₹)</label>
                  <div className="text-lg font-bold text-green-800">₹ {formData.costOfGoodsManufactured.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 12: Trading Account */}
        {step === 12 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Trading Account</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Sales/Turnover (₹)</label>
                  <input type="number" name="salesTurnover" value={formData.salesTurnover} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Opening Stock of Finished Goods (₹)</label>
                  <input type="number" name="openingStockFinishedGoods" value={formData.openingStockFinishedGoods} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Purchases (₹)</label>
                  <input type="number" name="purchases" value={formData.purchases} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Direct Expenses (₹)</label>
                  <input type="number" name="directExpenses" value={formData.directExpenses} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Closing Stock of Finished Goods (₹)</label>
                  <input type="number" name="closingStockFinishedGoods" value={formData.closingStockFinishedGoods} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-green-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-green-700">Gross Profit (₹)</label>
                  <div className="text-lg font-bold text-green-800">₹ {formData.grossProfit.toLocaleString('en-IN')}</div>
                </div>
                <div className="bg-red-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-red-700">Gross Loss (₹)</label>
                  <div className="text-lg font-bold text-red-800">₹ {formData.grossLoss.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 13: Profit & Loss Account - Income */}
        {step === 13 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Profit & Loss Account - Income</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Revenue from Operations (₹)</label>
                  <input type="number" name="revenueFromOperations" value={formData.revenueFromOperations} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Other Income (₹)</label>
                  <input type="number" name="otherIncome" value={formData.otherIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Interest Income (₹)</label>
                  <input type="number" name="interestIncome" value={formData.interestIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Dividend Income (₹)</label>
                  <input type="number" name="dividendIncome" value={formData.dividendIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Rent Received (₹)</label>
                  <input type="number" name="rentReceived" value={formData.rentReceived} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-blue-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-blue-700">Total Income (₹)</label>
                  <div className="text-lg font-bold text-blue-800">₹ {formData.totalIncome.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 14: Profit & Loss Account - Expenses */}
        {step === 14 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Profit & Loss Account - Expenses</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Employee Benefit Expenses (₹)</label>
                  <input type="number" name="employeeBenefitExpenses" value={formData.employeeBenefitExpenses} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Depreciation (₹)</label>
                  <input type="number" name="depreciation" value={formData.depreciation} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Interest Expenses (₹)</label>
                  <input type="number" name="interestExpenses" value={formData.interestExpenses} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Rent Expenses (₹)</label>
                  <input type="number" name="rentExpenses" value={formData.rentExpenses} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Repairs & Maintenance (₹)</label>
                  <input type="number" name="repairsMaintenance" value={formData.repairsMaintenance} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Advertising Expenses (₹)</label>
                  <input type="number" name="advertisingExpenses" value={formData.advertisingExpenses} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Administrative Expenses (₹)</label>
                  <input type="number" name="administrativeExpenses" value={formData.administrativeExpenses} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Selling & Distribution Expenses (₹)</label>
                  <input type="number" name="sellingDistributionExpenses" value={formData.sellingDistributionExpenses} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Research & Development Expenses (₹)</label>
                  <input type="number" name="researchDevelopmentExpenses" value={formData.researchDevelopmentExpenses} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Other Expenses (₹)</label>
                  <input type="number" name="otherExpenses" value={formData.otherExpenses} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                
                <div className="bg-red-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-red-700">Total Expenses (₹)</label>
                  <div className="text-lg font-bold text-red-800">₹ {formData.totalExpenses.toLocaleString('en-IN')}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-green-700">Profit Before Tax (₹)</label>
                  <div className="text-lg font-bold text-green-800">₹ {formData.profitBeforeTax.toLocaleString('en-IN')}</div>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Provision for Tax (₹)</label>
                  <input type="number" name="provisionForTax" value={formData.provisionForTax} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-blue-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-blue-700">Profit After Tax (₹)</label>
                  <div className="text-lg font-bold text-blue-800">₹ {(formData.profitBeforeTax - formData.provisionForTax).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 15: Quantitative Details */}
        {step === 15 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Quantitative Details</h3>
            <p className="mb-4 text-sm text-gray-600">Provide quantitative details of principal products/services</p>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Principal Product/Service</label>
                  <input type="text" name="principalProduct" value={formData.principalProduct} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Unit of Measurement</label>
                  <input type="text" name="unitOfMeasurement" value={formData.unitOfMeasurement} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="e.g., Kg, Nos, MT" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Opening Stock (Quantity)</label>
                  <input type="number" name="openingStockQuantity" value={formData.openingStockQuantity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Purchase (Quantity)</label>
                  <input type="number" name="purchaseQuantity" value={formData.purchaseQuantity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Sales (Quantity)</label>
                  <input type="number" name="salesQuantity" value={formData.salesQuantity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Closing Stock (Quantity)</label>
                  <input type="number" name="closingStockQuantity" value={formData.closingStockQuantity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 16: Income from House Property */}
        {step === 16 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Income from House Property</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Annual Value (₹)</label>
                  <input type="number" name="annualValue" value={formData.annualValue} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Municipal Taxes Paid (₹)</label>
                  <input type="number" name="municipalTaxesPaid" value={formData.municipalTaxesPaid} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Standard Deduction (30%) (₹)</label>
                  <input type="number" name="standardDeduction" value={formData.standardDeduction} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Interest on Housing Loan (₹)</label>
                  <input type="number" name="interestOnHousingLoan" value={formData.interestOnHousingLoan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-blue-50 p-3 rounded-md sm:col-span-2">
                  <label className="block mb-2 text-sm font-semibold text-blue-700">Net Income from House Property (₹)</label>
                  <div className="text-lg font-bold text-blue-800">₹ {(formData.annualValue - formData.municipalTaxesPaid - formData.standardDeduction - formData.interestOnHousingLoan).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 17: Income from Business/Profession */}
        {step === 17 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Income from Business/Profession</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Business Income (₹)</label>
                  <input type="number" name="businessIncome" value={formData.businessIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {errors.businessIncome && <p className="mt-1 text-sm text-red-500">{errors.businessIncome}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Professional Income (₹)</label>
                  <input type="number" name="professionalIncome" value={formData.professionalIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Speculative Business Income (₹)</label>
                  <input type="number" name="speculativeBusinessIncome" value={formData.speculativeBusinessIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Presumptive Income (₹)</label>
                  <input type="number" name="presumptiveIncome" value={formData.presumptiveIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-blue-50 p-3 rounded-md sm:col-span-2">
                  <label className="block mb-2 text-sm font-semibold text-blue-700">Total Business/Professional Income (₹)</label>
                  <div className="text-lg font-bold text-blue-800">₹ {(formData.businessIncome + formData.professionalIncome + formData.speculativeBusinessIncome + formData.presumptiveIncome).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 18: Capital Gains */}
        {step === 18 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Capital Gains</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Short Term Capital Gains (₹)</label>
                  <input type="number" name="shortTermCapitalGains" value={formData.shortTermCapitalGains} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Long Term Capital Gains (₹)</label>
                  <input type="number" name="longTermCapitalGains" value={formData.longTermCapitalGains} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Exempted Long Term Capital Gains (₹)</label>
                  <input type="number" name="exemptedLongTermCapitalGains" value={formData.exemptedLongTermCapitalGains} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-blue-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-blue-700">Total Capital Gains (₹)</label>
                  <div className="text-lg font-bold text-blue-800">₹ {(formData.shortTermCapitalGains + formData.longTermCapitalGains + formData.exemptedLongTermCapitalGains).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 19: Income from Other Sources */}
        {step === 19 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Income from Other Sources</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Interest from Bank Deposits (₹)</label>
                  <input type="number" name="interestFromDeposits" value={formData.interestFromDeposits} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Dividend from Shares (₹)</label>
                  <input type="number" name="dividendFromShares" value={formData.dividendFromShares} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Other Income (₹)</label>
                  <input type="number" name="incomeFromOtherSources" value={formData.incomeFromOtherSources} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-blue-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-blue-700">Total Other Sources Income (₹)</label>
                  <div className="text-lg font-bold text-blue-800">₹ {(formData.interestFromDeposits + formData.dividendFromShares + formData.incomeFromOtherSources).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 20: Deductions under Chapter VI-A */}
        {step === 20 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Deductions under Chapter VI-A</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Section 80C (₹)</label>
                  <input type="number" name="section80C" value={formData.section80C} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Section 80D (₹)</label>
                  <input type="number" name="section80D" value={formData.section80D} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Section 80G (₹)</label>
                  <input type="number" name="section80G" value={formData.section80G} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Section 80E (₹)</label>
                  <input type="number" name="section80E" value={formData.section80E} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Section 80CCD(1B) (₹)</label>
                  <input type="number" name="section80CCD1B" value={formData.section80CCD1B} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Section 80TTA (₹)</label>
                  <input type="number" name="section80TTA" value={formData.section80TTA} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-blue-50 p-3 rounded-md sm:col-span-2">
                  <label className="block mb-2 text-sm font-semibold text-blue-700">Total Deductions (₹)</label>
                  <div className="text-lg font-bold text-blue-800">₹ {(formData.section80C + formData.section80D + formData.section80G + formData.section80E + formData.section80CCD1B + formData.section80TTA).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 21: Tax Computation */}
        {step === 21 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Tax Computation</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Gross Total Income (₹) <span className="text-red-500">*</span></label>
                  <input type="number" name="grossTotalIncome" value={formData.grossTotalIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {errors.grossTotalIncome && <p className="mt-1 text-sm text-red-500">{errors.grossTotalIncome}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Total Deductions u/s VI-A (₹)</label>
                  <input type="number" name="totalDeductionsUnderVIA" value={formData.totalDeductionsUnderVIA} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-green-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-green-700">Total Taxable Income (₹)</label>
                  <div className="text-lg font-bold text-green-800">₹ {(formData.grossTotalIncome - formData.totalDeductionsUnderVIA).toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Tax on Total Income (₹)</label>
                  <input type="number" name="taxOnTotalIncome" value={formData.taxOnTotalIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Surcharge (₹)</label>
                  <input type="number" name="surcharge" value={formData.surcharge} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Health & Education Cess (₹)</label>
                  <input type="number" name="healthEducationCess" value={formData.healthEducationCess} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-red-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-red-700">Total Tax Liability (₹)</label>
                  <div className="text-lg font-bold text-red-800">₹ {(formData.taxOnTotalIncome + formData.surcharge + formData.healthEducationCess).toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Advance Tax Paid (₹)</label>
                  <input type="number" name="advanceTaxPaid" value={formData.advanceTaxPaid} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">TDS Deducted (₹)</label>
                  <input type="number" name="tdsDeducted" value={formData.tdsDeducted} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Self Assessment Tax (₹)</label>
                  <input type="number" name="selfAssessmentTax" value={formData.selfAssessmentTax} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-blue-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-blue-700">Total Taxes Paid (₹)</label>
                  <div className="text-lg font-bold text-blue-800">₹ {(formData.advanceTaxPaid + formData.tdsDeducted + formData.selfAssessmentTax).toLocaleString('en-IN')}</div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-yellow-700">Balance Tax Payable/Refund (₹)</label>
                  <div className="text-lg font-bold text-yellow-800">₹ {((formData.taxOnTotalIncome + formData.surcharge + formData.healthEducationCess) - (formData.advanceTaxPaid + formData.tdsDeducted + formData.selfAssessmentTax)).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 22: Interest and Fees */}
        {step === 22 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Interest and Fees</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Interest u/s 234A (₹)</label>
                  <input type="number" name="interest234A" value={formData.interest234A} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Interest u/s 234B (₹)</label>
                  <input type="number" name="interest234B" value={formData.interest234B} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Interest u/s 234C (₹)</label>
                  <input type="number" name="interest234C" value={formData.interest234C} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Interest u/s 234F (₹)</label>
                  <input type="number" name="interest234F" value={formData.interest234F} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Fee u/s 234E (₹)</label>
                  <input type="number" name="fee234E" value={formData.fee234E} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Fee u/s 234F (₹)</label>
                  <input type="number" name="fee234F" value={formData.fee234F} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-red-50 p-3 rounded-md sm:col-span-2">
                  <label className="block mb-2 text-sm font-semibold text-red-700">Total Interest & Fees (₹)</label>
                  <div className="text-lg font-bold text-red-800">₹ {(formData.interest234A + formData.interest234B + formData.interest234C + formData.interest234F + formData.fee234E + formData.fee234F).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 23: Verification */}
        {step === 23 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Verification</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Place of Verification <span className="text-red-500">*</span></label>
                  <input type="text" name="verificationPlace" value={formData.verificationPlace} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {errors.verificationPlace && <p className="mt-1 text-sm text-red-500">{errors.verificationPlace}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Date of Verification <span className="text-red-500">*</span></label>
                  <input type="date" name="verificationDate" value={formData.verificationDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {errors.verificationDate && <p className="mt-1 text-sm text-red-500">{errors.verificationDate}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Signatory Name <span className="text-red-500">*</span></label>
                  <input type="text" name="signatoryName" value={formData.signatoryName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {errors.signatoryName && <p className="mt-1 text-sm text-red-500">{errors.signatoryName}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Designation</label>
                  <select name="signatoryDesignation" value={formData.signatoryDesignation} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">Select designation</option>
                    <option value="Managing Director">Managing Director</option>
                    <option value="Director">Director</option>
                    <option value="Company Secretary">Company Secretary</option>
                    <option value="Chief Financial Officer">Chief Financial Officer</option>
                    <option value="Authorized Representative">Authorized Representative</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Signatory PAN <span className="text-red-500">*</span></label>
                  <input type="text" name="signatoryPAN" value={formData.signatoryPAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {errors.signatoryPAN && <p className="mt-1 text-sm text-red-500">{errors.signatoryPAN}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Capacity</label>
                  <select name="signatoryCapacity" value={formData.signatoryCapacity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">Select capacity</option>
                    <option value="Self">Self</option>
                    <option value="Authorized Representative">Authorized Representative</option>
                    <option value="Legal Heir">Legal Heir</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Declaration:</strong> I solemnly declare that to the best of my knowledge and belief, the information given in this return and the schedules thereto are correct and complete and that the amount of total income and the computation of tax shown herein are in accordance with the provisions of the Income-tax Act, 1961.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 24: Schedule BP - Business/Professional Income */}
        {step === 24 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule BP - Business/Professional Income Details</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Business Type</label>
                  <select name="scheduleBP_businessType" value={formData.scheduleBP_businessType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">Select business type</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Trading">Trading</option>
                    <option value="Services">Services</option>
                    <option value="Professional">Professional</option>
                    <option value="Speculative">Speculative Business</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Business Description</label>
                  <input type="text" name="scheduleBP_businessDescription" value={formData.scheduleBP_businessDescription} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Gross Receipts (₹)</label>
                  <input type="number" name="scheduleBP_grossReceipts" value={formData.scheduleBP_grossReceipts} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Gross Profit Rate (%)</label>
                  <input type="number" name="scheduleBP_grossProfitRate" value={formData.scheduleBP_grossProfitRate} onChange={handleChange} min="0" max="100" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Net Profit Rate (%)</label>
                  <input type="number" name="scheduleBP_netProfitRate" value={formData.scheduleBP_netProfitRate} onChange={handleChange} min="0" max="100" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-4">Presumptive Income u/s 44AD</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Turnover u/s 44AD (₹)</label>
                    <input type="number" name="scheduleBP_turnoverU44AD" value={formData.scheduleBP_turnoverU44AD} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Presumptive Income u/s 44AD (₹)</label>
                    <input type="number" name="scheduleBP_presumptiveIncomeU44AD" value={formData.scheduleBP_presumptiveIncomeU44AD} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-4">Presumptive Income u/s 44ADA</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Turnover u/s 44ADA (₹)</label>
                    <input type="number" name="scheduleBP_turnoverU44ADA" value={formData.scheduleBP_turnoverU44ADA} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Presumptive Income u/s 44ADA (₹)</label>
                    <input type="number" name="scheduleBP_presumptiveIncomeU44ADA" value={formData.scheduleBP_presumptiveIncomeU44ADA} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-4">Professional Income u/s 44AE</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Professional Receipts (₹)</label>
                    <input type="number" name="scheduleBP_professionalReceipts" value={formData.scheduleBP_professionalReceipts} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Presumptive Income u/s 44AE (₹)</label>
                    <input type="number" name="scheduleBP_presumptiveIncomeU44AE" value={formData.scheduleBP_presumptiveIncomeU44AE} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 25: Schedule DPM - Depreciation on Plant & Machinery */}
        {step === 25 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule DPM - Depreciation on Plant & Machinery</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Opening WDV (₹)</label>
                  <input type="number" name="scheduleDPM_openingWDV" value={formData.scheduleDPM_openingWDV} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Additions during the year (₹)</label>
                  <input type="number" name="scheduleDPM_additions" value={formData.scheduleDPM_additions} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Deductions/Sales (₹)</label>
                  <input type="number" name="scheduleDPM_deductions" value={formData.scheduleDPM_deductions} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Depreciation Rate (%)</label>
                  <input type="number" name="scheduleDPM_depreciationRate" value={formData.scheduleDPM_depreciationRate} onChange={handleChange} min="0" max="100" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Depreciation Amount (₹)</label>
                  <input type="number" name="scheduleDPM_depreciationAmount" value={formData.scheduleDPM_depreciationAmount} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-blue-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-blue-700">Closing WDV (₹)</label>
                  <div className="text-lg font-bold text-blue-800">₹ {(formData.scheduleDPM_openingWDV + formData.scheduleDPM_additions - formData.scheduleDPM_deductions - formData.scheduleDPM_depreciationAmount).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 26: Schedule DOA - Depreciation on Other Assets */}
        {step === 26 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule DOA - Depreciation on Other Assets</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Land (₹)</label>
                  <input type="number" name="scheduleDOA_land" value={formData.scheduleDOA_land} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Building (₹)</label>
                  <input type="number" name="scheduleDOA_building" value={formData.scheduleDOA_building} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Furniture & Fixtures (₹)</label>
                  <input type="number" name="scheduleDOA_furniture" value={formData.scheduleDOA_furniture} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Vehicles (₹)</label>
                  <input type="number" name="scheduleDOA_vehicles" value={formData.scheduleDOA_vehicles} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Computers & Software (₹)</label>
                  <input type="number" name="scheduleDOA_computers" value={formData.scheduleDOA_computers} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Other Assets (₹)</label>
                  <input type="number" name="scheduleDOA_otherAssets" value={formData.scheduleDOA_otherAssets} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-blue-50 p-3 rounded-md sm:col-span-2">
                  <label className="block mb-2 text-sm font-semibold text-blue-700">Total Depreciation on Other Assets (₹)</label>
                  <div className="text-lg font-bold text-blue-800">₹ {(formData.scheduleDOA_land + formData.scheduleDOA_building + formData.scheduleDOA_furniture + formData.scheduleDOA_vehicles + formData.scheduleDOA_computers + formData.scheduleDOA_otherAssets).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 27: Schedule ICDS - Income Computation Standards */}
        {step === 27 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule ICDS - Income Computation and Disclosure Standards</h3>
            <p className="mb-4 text-sm text-gray-600">Adjustments required under Income Computation and Disclosure Standards</p>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">ICDS I - Inventory Valuation (₹)</label>
                  <input type="number" name="scheduleICDS_adjustment1" value={formData.scheduleICDS_adjustment1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">ICDS II - Revenue Recognition (₹)</label>
                  <input type="number" name="scheduleICDS_adjustment2" value={formData.scheduleICDS_adjustment2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">ICDS III - Construction Contracts (₹)</label>
                  <input type="number" name="scheduleICDS_adjustment3" value={formData.scheduleICDS_adjustment3} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">ICDS IV - Revenue from Services (₹)</label>
                  <input type="number" name="scheduleICDS_adjustment4" value={formData.scheduleICDS_adjustment4} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">ICDS V - Tangible Fixed Assets (₹)</label>
                  <input type="number" name="scheduleICDS_adjustment5" value={formData.scheduleICDS_adjustment5} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-red-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-red-700">Total ICDS Adjustments (₹)</label>
                  <div className="text-lg font-bold text-red-800">₹ {(formData.scheduleICDS_adjustment1 + formData.scheduleICDS_adjustment2 + formData.scheduleICDS_adjustment3 + formData.scheduleICDS_adjustment4 + formData.scheduleICDS_adjustment5).toLocaleString('en-IN')}</div>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Description of Adjustments</label>
                <textarea name="scheduleICDS_description" value={formData.scheduleICDS_description} onChange={handleChange} rows={4} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Describe the nature of ICDS adjustments made..." />
              </div>
            </div>
          </div>
        )}

        {/* Step 28: Schedule FA - Foreign Assets */}
        {step === 28 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule FA - Foreign Assets</h3>
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <input type="checkbox" name="scheduleFA_hasForeignAssets" checked={formData.scheduleFA_hasForeignAssets} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Company has Foreign Assets</label>
              </div>
              
              {formData.scheduleFA_hasForeignAssets && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Bank Accounts (₹)</label>
                      <input type="number" name="scheduleFA_bankAccounts" value={formData.scheduleFA_bankAccounts} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Custodial Accounts (₹)</label>
                      <input type="number" name="scheduleFA_custodialAccounts" value={formData.scheduleFA_custodialAccounts} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Equity Shares (₹)</label>
                      <input type="number" name="scheduleFA_equityShares" value={formData.scheduleFA_equityShares} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Debt Securities (₹)</label>
                      <input type="number" name="scheduleFA_debtSecurities" value={formData.scheduleFA_debtSecurities} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Derivative Contracts (₹)</label>
                      <input type="number" name="scheduleFA_derivativeContracts" value={formData.scheduleFA_derivativeContracts} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Other Assets (₹)</label>
                      <input type="number" name="scheduleFA_otherAssets" value={formData.scheduleFA_otherAssets} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Country of Assets</label>
                      <input type="text" name="scheduleFA_country" value={formData.scheduleFA_country} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <label className="block mb-2 text-sm font-semibold text-blue-700">Total Foreign Assets Value (₹)</label>
                      <div className="text-lg font-bold text-blue-800">₹ {(formData.scheduleFA_bankAccounts + formData.scheduleFA_custodialAccounts + formData.scheduleFA_equityShares + formData.scheduleFA_debtSecurities + formData.scheduleFA_derivativeContracts + formData.scheduleFA_otherAssets).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 29: Schedule TP - Transfer Pricing */}
        {step === 29 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule TP - Transfer Pricing</h3>
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <input type="checkbox" name="scheduleTP_hasInternationalTransactions" checked={formData.scheduleTP_hasInternationalTransactions} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Company has International Transactions</label>
              </div>
              
              {formData.scheduleTP_hasInternationalTransactions && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Number of Associated Enterprises</label>
                      <input type="number" name="scheduleTP_associatedEnterprises" value={formData.scheduleTP_associatedEnterprises} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Aggregate Value of Transactions (₹)</label>
                      <input type="number" name="scheduleTP_aggregateValue" value={formData.scheduleTP_aggregateValue} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Transfer Pricing Method</label>
                      <select name="scheduleTP_method" value={formData.scheduleTP_method} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                        <option value="">Select method</option>
                        <option value="CUP">Comparable Uncontrolled Price</option>
                        <option value="RPM">Resale Price Method</option>
                        <option value="CPM">Cost Plus Method</option>
                        <option value="PSM">Profit Split Method</option>
                        <option value="TNMM">Transactional Net Margin Method</option>
                        <option value="Other">Other Method</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Arm's Length Price (₹)</label>
                      <input type="number" name="scheduleTP_armLengthPrice" value={formData.scheduleTP_armLengthPrice} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Actual Transaction Price (₹)</label>
                      <input type="number" name="scheduleTP_actualPrice" value={formData.scheduleTP_actualPrice} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-md">
                      <label className="block mb-2 text-sm font-semibold text-yellow-700">Transfer Pricing Adjustment (₹)</label>
                      <div className="text-lg font-bold text-yellow-800">₹ {(formData.scheduleTP_armLengthPrice - formData.scheduleTP_actualPrice).toLocaleString('en-IN')}</div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" name="scheduleTP_accountantReport" checked={formData.scheduleTP_accountantReport} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                      <label className="ml-2 text-sm font-medium text-gray-700">Accountant's Report u/s 92E filed</label>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 30: Schedule SH1 & AL1 - Shareholding & Assets */}
        {step === 30 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule SH1 & AL1 - Shareholding Pattern & Assets/Liabilities</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-4">Schedule SH1 - Shareholding Pattern</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Equity Shares Outstanding</label>
                    <input type="number" name="scheduleSH1_equityShares" value={formData.scheduleSH1_equityShares} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Preference Shares Outstanding</label>
                    <input type="number" name="scheduleSH1_preferenceShares" value={formData.scheduleSH1_preferenceShares} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Public Shareholders (%)</label>
                    <input type="number" name="scheduleSH1_publicShareholders" value={formData.scheduleSH1_publicShareholders} onChange={handleChange} min="0" max="100" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Promoter Shareholders (%)</label>
                    <input type="number" name="scheduleSH1_promoterShareholders" value={formData.scheduleSH1_promoterShareholders} onChange={handleChange} min="0" max="100" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Institutional Shareholders (%)</label>
                    <input type="number" name="scheduleSH1_institutionalShareholders" value={formData.scheduleSH1_institutionalShareholders} onChange={handleChange} min="0" max="100" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Foreign Shareholders (%)</label>
                    <input type="number" name="scheduleSH1_foreignShareholders" value={formData.scheduleSH1_foreignShareholders} onChange={handleChange} min="0" max="100" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-4">Schedule AL1 - Assets and Liabilities Summary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Total Assets (₹)</label>
                    <input type="number" name="scheduleAL1_totalAssets" value={formData.scheduleAL1_totalAssets} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Total Liabilities (₹)</label>
                    <input type="number" name="scheduleAL1_totalLiabilities" value={formData.scheduleAL1_totalLiabilities} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <label className="block mb-2 text-sm font-semibold text-blue-700">Net Worth (₹)</label>
                    <div className="text-lg font-bold text-blue-800">₹ {(formData.scheduleAL1_totalAssets - formData.scheduleAL1_totalLiabilities).toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Working Capital (₹)</label>
                    <input type="number" name="scheduleAL1_workingCapital" value={formData.scheduleAL1_workingCapital} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Debt-Equity Ratio</label>
                    <input type="number" name="scheduleAL1_debtEquityRatio" value={formData.scheduleAL1_debtEquityRatio} onChange={handleChange} step="0.01" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 31: Advanced Deduction Schedules */}
        {step === 31 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Advanced Deduction Schedules</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-4">Infrastructure and Special Economic Zones</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Section 80-IA (₹)</label>
                    <input type="number" name="schedule80IA" value={formData.schedule80IA} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Section 80-IB (₹)</label>
                    <input type="number" name="schedule80IB" value={formData.schedule80IB} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Section 80-IC (₹)</label>
                    <input type="number" name="schedule80IC" value={formData.schedule80IC} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Section 80-ID (₹)</label>
                    <input type="number" name="schedule80ID" value={formData.schedule80ID} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Section 80-IE (₹)</label>
                    <input type="number" name="schedule80IE" value={formData.schedule80IE} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-4">Investment and Capital Expenditure Deductions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Section 35AD (₹)</label>
                    <input type="number" name="schedule35AD" value={formData.schedule35AD} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Section 35CCA (₹)</label>
                    <input type="number" name="schedule35CCA" value={formData.schedule35CCA} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Section 35CCB (₹)</label>
                    <input type="number" name="schedule35CCB" value={formData.schedule35CCB} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="bg-green-50 p-3 rounded-md">
                    <label className="block mb-2 text-sm font-semibold text-green-700">Total Advanced Deductions (₹)</label>
                    <div className="text-lg font-bold text-green-800">₹ {(formData.schedule80IA + formData.schedule80IB + formData.schedule80IC + formData.schedule80ID + formData.schedule80IE + formData.schedule35AD + formData.schedule35CCA + formData.schedule35CCB).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 32: Schedule CG - Detailed Capital Gains */}
        {step === 32 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule CG - Detailed Capital Gains</h3>
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <input type="checkbox" name="scheduleCG_hasCapitalGains" checked={formData.scheduleCG_hasCapitalGains} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Company has Capital Gains</label>
              </div>
              
              {formData.scheduleCG_hasCapitalGains && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Property Description</label>
                      <input type="text" name="scheduleCG_propertyDescription" value={formData.scheduleCG_propertyDescription} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Property Acquisition Date</label>
                      <input type="date" name="scheduleCG_propertyAcquisitionDate" value={formData.scheduleCG_propertyAcquisitionDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Property Acquisition Cost (₹)</label>
                      <input type="number" name="scheduleCG_propertyAcquisitionCost" value={formData.scheduleCG_propertyAcquisitionCost} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Property Sale Date</label>
                      <input type="date" name="scheduleCG_propertySaleDate" value={formData.scheduleCG_propertySaleDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Property Sale Consideration (₹)</label>
                      <input type="number" name="scheduleCG_propertySaleConsideration" value={formData.scheduleCG_propertySaleConsideration} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Property Indexed Cost (₹)</label>
                      <input type="number" name="scheduleCG_propertyIndexedCost" value={formData.scheduleCG_propertyIndexedCost} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Exemption under Section 54 (₹)</label>
                      <input type="number" name="scheduleCG_propertyExemptionU54" value={formData.scheduleCG_propertyExemptionU54} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Exemption under Section 54F (₹)</label>
                      <input type="number" name="scheduleCG_propertyExemptionU54F" value={formData.scheduleCG_propertyExemptionU54F} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Share Description</label>
                      <input type="text" name="scheduleCG_shareDescription" value={formData.scheduleCG_shareDescription} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Share Acquisition Date</label>
                      <input type="date" name="scheduleCG_shareAcquisitionDate" value={formData.scheduleCG_shareAcquisitionDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Share Acquisition Cost (₹)</label>
                      <input type="number" name="scheduleCG_shareAcquisitionCost" value={formData.scheduleCG_shareAcquisitionCost} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Share Sale Date</label>
                      <input type="date" name="scheduleCG_shareSaleDate" value={formData.scheduleCG_shareSaleDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Share Sale Consideration (₹)</label>
                      <input type="number" name="scheduleCG_shareSaleConsideration" value={formData.scheduleCG_shareSaleConsideration} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">STT (₹)</label>
                      <input type="number" name="scheduleCG_shareSTT" value={formData.scheduleCG_shareSTT} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Exemption under Section 54EC (₹)</label>
                      <input type="number" name="scheduleCG_shareExemptionU54EC" value={formData.scheduleCG_shareExemptionU54EC} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="bg-green-50 p-3 rounded-md">
                      <label className="block mb-2 text-sm font-semibold text-green-700">Total Short Term Capital Gains (₹)</label>
                      <div className="text-lg font-bold text-green-800">₹ {formData.scheduleCG_totalSTCG.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-md">
                      <label className="block mb-2 text-sm font-semibold text-green-700">Total Long Term Capital Gains (₹)</label>
                      <div className="text-lg font-bold text-green-800">₹ {formData.scheduleCG_totalLTCG.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 33: Loss Set-off Provisions */}
        {step === 33 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Loss Set-off Provisions</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Brought Forward Business Loss (₹)</label>
                  <input type="number" name="lossSetoff_broughtForwardBusinessLoss" value={formData.lossSetoff_broughtForwardBusinessLoss} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Brought Forward STC Loss (₹)</label>
                  <input type="number" name="lossSetoff_broughtForwardSTCLoss" value={formData.lossSetoff_broughtForwardSTCLoss} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Brought Forward LTC Loss (₹)</label>
                  <input type="number" name="lossSetoff_broughtForwardLTCLoss" value={formData.lossSetoff_broughtForwardLTCLoss} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Brought Forward House Loss (₹)</label>
                  <input type="number" name="lossSetoff_broughtForwardHouseLoss" value={formData.lossSetoff_broughtForwardHouseLoss} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Unabsorbed Depreciation (₹)</label>
                  <input type="number" name="lossSetoff_unabsorbedDepreciation" value={formData.lossSetoff_unabsorbedDepreciation} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Current Year Business Loss (₹)</label>
                  <input type="number" name="lossSetoff_currentYearBusinessLoss" value={formData.lossSetoff_currentYearBusinessLoss} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Current Year Capital Loss (₹)</label>
                  <input type="number" name="lossSetoff_currentYearCapitalLoss" value={formData.lossSetoff_currentYearCapitalLoss} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Current Year House Loss (₹)</label>
                  <input type="number" name="lossSetoff_currentYearHouseLoss" value={formData.lossSetoff_currentYearHouseLoss} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Business Loss Set-off (₹)</label>
                  <input type="number" name="lossSetoff_businessLossSetOff" value={formData.lossSetoff_businessLossSetOff} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Capital Loss Set-off (₹)</label>
                  <input type="number" name="lossSetoff_capitalLossSetOff" value={formData.lossSetoff_capitalLossSetOff} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">House Loss Set-off (₹)</label>
                  <input type="number" name="lossSetoff_houseLossSetOff" value={formData.lossSetoff_houseLossSetOff} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Carry Forward Business Loss (₹)</label>
                  <input type="number" name="lossSetoff_carryForwardBusinessLoss" value={formData.lossSetoff_carryForwardBusinessLoss} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Carry Forward Capital Loss (₹)</label>
                  <input type="number" name="lossSetoff_carryForwardCapitalLoss" value={formData.lossSetoff_carryForwardCapitalLoss} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Carry Forward House Loss (₹)</label>
                  <input type="number" name="lossSetoff_carryForwardHouseLoss" value={formData.lossSetoff_carryForwardHouseLoss} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Carry Forward Depreciation (₹)</label>
                  <input type="number" name="lossSetoff_carryForwardDepreciation" value={formData.lossSetoff_carryForwardDepreciation} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-green-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-green-700">Total Loss Set-off (₹)</label>
                  <div className="text-lg font-bold text-green-800">₹ {(formData.lossSetoff_broughtForwardBusinessLoss + formData.lossSetoff_broughtForwardSTCLoss + formData.lossSetoff_broughtForwardLTCLoss + formData.lossSetoff_broughtForwardHouseLoss + formData.lossSetoff_unabsorbedDepreciation + formData.lossSetoff_currentYearBusinessLoss + formData.lossSetoff_currentYearCapitalLoss + formData.lossSetoff_currentYearHouseLoss + formData.lossSetoff_businessLossSetOff + formData.lossSetoff_capitalLossSetOff + formData.lossSetoff_houseLossSetOff + formData.lossSetoff_carryForwardBusinessLoss + formData.lossSetoff_carryForwardCapitalLoss + formData.lossSetoff_carryForwardHouseLoss + formData.lossSetoff_carryForwardDepreciation).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 34: Tax Relief Sections 90/91 */}
        {step === 34 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Tax Relief Sections 90/91</h3>
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <input type="checkbox" name="taxRelief_hasDTAABenefit" checked={formData.taxRelief_hasDTAABenefit} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Company has DTAA Benefit</label>
              </div>
              
              {formData.taxRelief_hasDTAABenefit && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Treaty Country</label>
                      <input type="text" name="taxRelief_treatyCountry" value={formData.taxRelief_treatyCountry} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Treaty Article</label>
                      <input type="text" name="taxRelief_treatyArticle" value={formData.taxRelief_treatyArticle} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Foreign Income (₹)</label>
                      <input type="number" name="taxRelief_foreignIncome" value={formData.taxRelief_foreignIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Foreign Tax Paid (₹)</label>
                      <input type="number" name="taxRelief_foreignTaxPaid" value={formData.taxRelief_foreignTaxPaid} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Foreign Tax Credit (₹)</label>
                      <input type="number" name="taxRelief_foreignTaxCredit" value={formData.taxRelief_foreignTaxCredit} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Section 90 Relief (₹)</label>
                      <input type="number" name="taxRelief_section90Relief" value={formData.taxRelief_section90Relief} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Section 91 Relief (₹)</label>
                      <input type="number" name="taxRelief_section91Relief" value={formData.taxRelief_section91Relief} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">PE</label>
                      <input type="checkbox" name="taxRelief_isPE" checked={formData.taxRelief_isPE} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">PE Income (₹)</label>
                      <input type="number" name="taxRelief_peIncome" value={formData.taxRelief_peIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">PE Country</label>
                      <input type="text" name="taxRelief_peCountry" value={formData.taxRelief_peCountry} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">SEP</label>
                      <input type="checkbox" name="taxRelief_isSEP" checked={formData.taxRelief_isSEP} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">SEP Income (₹)</label>
                      <input type="number" name="taxRelief_sepIncome" value={formData.taxRelief_sepIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">SEP Country</label>
                      <input type="text" name="taxRelief_sepCountry" value={formData.taxRelief_sepCountry} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="bg-green-50 p-3 rounded-md">
                      <label className="block mb-2 text-sm font-semibold text-green-700">Total Tax Relief (₹)</label>
                      <div className="text-lg font-bold text-green-800">₹ {(formData.taxRelief_foreignIncome + formData.taxRelief_foreignTaxPaid + formData.taxRelief_foreignTaxCredit + formData.taxRelief_section90Relief + formData.taxRelief_section91Relief + formData.taxRelief_peIncome + formData.taxRelief_sepIncome).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 35: Clubbing Provisions */}
        {step === 35 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Clubbing Provisions</h3>
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <input type="checkbox" name="clubbing_hasSpouseIncome" checked={formData.clubbing_hasSpouseIncome} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Spouse Income</label>
              </div>
              
              {formData.clubbing_hasSpouseIncome && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Spouse Name</label>
                      <input type="text" name="clubbing_spouseName" value={formData.clubbing_spouseName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Spouse PAN</label>
                      <input type="text" name="clubbing_spousePAN" value={formData.clubbing_spousePAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Spouse Income (₹)</label>
                      <input type="number" name="clubbing_spouseIncome" value={formData.clubbing_spouseIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </>
              )}
              <div className="flex items-center mb-4">
                <input type="checkbox" name="clubbing_hasMinorIncome" checked={formData.clubbing_hasMinorIncome} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Minor Income</label>
              </div>
              
              {formData.clubbing_hasMinorIncome && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Minor Name</label>
                      <input type="text" name="clubbing_minorName" value={formData.clubbing_minorName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Minor Income (₹)</label>
                      <input type="number" name="clubbing_minorIncome" value={formData.clubbing_minorIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </>
              )}
              <div className="flex items-center mb-4">
                <input type="checkbox" name="clubbing_hasTransferredAssets" checked={formData.clubbing_hasTransferredAssets} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Transferred Assets</label>
              </div>
              
              {formData.clubbing_hasTransferredAssets && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Transferred Asset Description</label>
                      <input type="text" name="clubbing_transferredAssetDescription" value={formData.clubbing_transferredAssetDescription} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Transferred Asset Income (₹)</label>
                      <input type="number" name="clubbing_transferredAssetIncome" value={formData.clubbing_transferredAssetIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </>
              )}
              <div className="flex items-center mb-4">
                <input type="checkbox" name="clubbing_hasAssociateIncome" checked={formData.clubbing_hasAssociateIncome} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Associate Income</label>
              </div>
              
              {formData.clubbing_hasAssociateIncome && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Associate Description</label>
                      <input type="text" name="clubbing_associateDescription" value={formData.clubbing_associateDescription} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Associate Income (₹)</label>
                      <input type="number" name="clubbing_associateIncome" value={formData.clubbing_associateIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </>
              )}
              <div className="bg-green-50 p-3 rounded-md">
                <label className="block mb-2 text-sm font-semibold text-green-700">Total Clubbed Income (₹)</label>
                <div className="text-lg font-bold text-green-800">₹ {formData.clubbing_totalClubbedIncome.toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 36: Enhanced Deduction Schedules (80G to 80P) */}
        {step === 36 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Enhanced Deduction Schedules (80G to 80P)</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Government Fund (₹)</label>
                  <input type="number" name="enhanced80G_governmentFund" value={formData.enhanced80G_governmentFund} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Approved Fund (₹)</label>
                  <input type="number" name="enhanced80G_approvedFund" value={formData.enhanced80G_approvedFund} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Donation Details</label>
                  <input type="text" name="enhanced80G_donationDetails" value={formData.enhanced80G_donationDetails} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Total Donation (₹)</label>
                  <input type="number" name="enhanced80G_totalDonation" value={formData.enhanced80G_totalDonation} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Rent Paid (₹)</label>
                  <input type="number" name="enhanced80GG_rentPaid" value={formData.enhanced80GG_rentPaid} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">City Category</label>
                  <input type="text" name="enhanced80GG_cityCategory" value={formData.enhanced80GG_cityCategory} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Qualifying Conditions</label>
                  <input type="checkbox" name="enhanced80GG_qualifyingConditions" checked={formData.enhanced80GG_qualifyingConditions} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Disability Type</label>
                  <input type="text" name="enhanced80U_disabilityType" value={formData.enhanced80U_disabilityType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Disability Certificate</label>
                  <input type="text" name="enhanced80U_disabilityCertificate" value={formData.enhanced80U_disabilityCertificate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Disability Percentage</label>
                  <input type="number" name="enhanced80U_disabilityPercentage" value={formData.enhanced80U_disabilityPercentage} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Deduction Amount (₹)</label>
                  <input type="number" name="enhanced80U_deductionAmount" value={formData.enhanced80U_deductionAmount} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Bank Interest (₹)</label>
                  <input type="number" name="enhanced80TTA_bankInterest" value={formData.enhanced80TTA_bankInterest} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Post Office Interest (₹)</label>
                  <input type="number" name="enhanced80TTA_postOfficeInterest" value={formData.enhanced80TTA_postOfficeInterest} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Cooperative Interest (₹)</label>
                  <input type="number" name="enhanced80TTA_cooperativeInterest" value={formData.enhanced80TTA_cooperativeInterest} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Senior Citizen Interest (₹)</label>
                  <input type="number" name="enhanced80TTB_seniorCitizenInterest" value={formData.enhanced80TTB_seniorCitizenInterest} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Cooperative Society Income (₹)</label>
                  <input type="number" name="enhanced80P_cooperativeSocietyIncome" value={formData.enhanced80P_cooperativeSocietyIncome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Cooperative Society Type</label>
                  <input type="text" name="enhanced80P_cooperativeSocietyType" value={formData.enhanced80P_cooperativeSocietyType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="bg-green-50 p-3 rounded-md">
                  <label className="block mb-2 text-sm font-semibold text-green-700">Total Enhanced Deductions (₹)</label>
                  <div className="text-lg font-bold text-green-800">₹ {(formData.enhanced80G_governmentFund + formData.enhanced80G_approvedFund + formData.enhanced80G_totalDonation + formData.enhanced80GG_rentPaid + formData.enhanced80U_disabilityPercentage + formData.enhanced80U_deductionAmount + formData.enhanced80TTA_bankInterest + formData.enhanced80TTA_postOfficeInterest + formData.enhanced80TTA_cooperativeInterest + formData.enhanced80TTB_seniorCitizenInterest + formData.enhanced80P_cooperativeSocietyIncome).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 37: Enhanced Bank Details */}
        {step === 37 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Enhanced Bank Details</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Account Number 2</label>
                  <input type="text" name="enhancedBank_accountNumber2" value={formData.enhancedBank_accountNumber2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">IFSC 2</label>
                  <input type="text" name="enhancedBank_ifsc2" value={formData.enhancedBank_ifsc2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Bank Name 2</label>
                  <input type="text" name="enhancedBank_bankName2" value={formData.enhancedBank_bankName2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Account Type 2</label>
                  <input type="text" name="enhancedBank_accountType2" value={formData.enhancedBank_accountType2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Nominee Name</label>
                  <input type="text" name="enhancedBank_nomineeName" value={formData.enhancedBank_nomineeName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Nominee Relation</label>
                  <input type="text" name="enhancedBank_nomineeRelation" value={formData.enhancedBank_nomineeRelation} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Nominee PAN</label>
                  <input type="text" name="enhancedBank_nomineePAN" value={formData.enhancedBank_nomineePAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Refund Method</label>
                  <input type="text" name="enhancedBank_refundMethod" value={formData.enhancedBank_refundMethod} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">SWIFT Code</label>
                  <input type="text" name="enhancedBank_swiftCode" value={formData.enhancedBank_swiftCode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">IBAN</label>
                  <input type="text" name="enhancedBank_iban" value={formData.enhancedBank_iban} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Branch Address</label>
                  <input type="text" name="enhancedBank_branchAddress" value={formData.enhancedBank_branchAddress} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Micro Code</label>
                  <input type="text" name="enhancedBank_microCode" value={formData.enhancedBank_microCode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Account Holder Name</label>
                  <input type="text" name="enhancedBank_accountHolderName" value={formData.enhancedBank_accountHolderName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Joint Account Holder</label>
                  <input type="text" name="enhancedBank_jointAccountHolder" value={formData.enhancedBank_jointAccountHolder} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Account Opening Date</label>
                  <input type="date" name="enhancedBank_accountOpeningDate" value={formData.enhancedBank_accountOpeningDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
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
              step === 37 ? "Submit" : "Next"
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

export default ItrSix;