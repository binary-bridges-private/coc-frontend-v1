// ITR-1 (SAHAJ) Constants - Based on Official CSV Structure

import { ItrOneFormData, ItrOneFormErrors } from '../types/ItrOneTypes';

// Initial Form Data
export const initialItrOneFormData: ItrOneFormData = {
  // Part A - General Information
  pan: "",
  aadhar: "",
  aadhaarEnrolmentId: "",
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  residentialStatus: "",
  email: "",
  mobileNumber: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  natureOfEmployment: "",
  
  // New Tax Regime Options (115BAC)
  optingOut115BAC: "No",
  form10IEADate: "",
  form10IEAAckNumber: "",
  
  // Seventh Proviso Conditions
  filingUnderSeventhProviso: "No",
  depositedOver1Crore: "No",
  depositedAmount: "",
  foreignTravelOver2Lakh: "No",
  foreignTravelAmount: "",
  electricityOver1Lakh: "No",
  electricityAmount: "",
  otherSeventhProvisoConditions: "No",
  businessTurnoverOver60Lakh: "No",
  professionReceiptsOver10Lakh: "No",
  tdsTcsOver25Thousand: "No",
  savingsDepositOver50Lakh: "No",
  
  // Filing Status
  filedUnderSection: "139(1)-On or before due date",
  filedInResponseToNotice: "",
  receiptNumber: "",
  originalFilingDate: "",
  noticeDIN: "",
  noticeDate: "",
  dueDateOfFiling: "31/07/2025",
  
  // Part B - Gross Total Income
  salarySection17_1: "",
  perquisitesSection17_2: "",
  profitSection17_3: "",
  
  // Retirement Benefit Accounts
  retirementBenefitNotifiedCountry: "",
  retirementBenefitNotifiedAmount: "",
  retirementBenefitOtherCountry: "",
  retirementBenefitOtherAmount: "",
  
  // Allowances to the extent exempt u/s 10
  exemptAllowances: [],
  
  // Section 10(13A) - House Rent Allowance
  houseRentAllowance: "",
  
  // Relief from taxation u/s 89A
  reliefFromTaxation89A: "",
  
  // Net Salary calculation
  netSalary: "",
  
  // Deductions u/s 16
  standardDeduction16: "",
  entertainmentAllowance: "",
  professionalTax: "",
  
  // Income chargeable under Head Salaries
  incomeChargeableSalaries: "",
  
  // House Property
  propertyType: "",
  grossRent: "",
  localTaxPaid: "",
  annualValue: "",
  standardDeduction: "",
  interestBorrowedCapital: "",
  arrearsRent: "",
  totalHousePropertyIncome: "",
  
  // Other Sources
  otherSourcesIncome: [],
  retirementBenefitOtherCountry89A: "",
  retirementBenefitNotifiedQuarterly: [],
  dividendIncomeQuarterly: [],
  totalDividendIncome: "",
  reliefFromTaxation89AOtherSources: "",
  familyPensionDeduction57: "",
  agriculturalIncome: "",
  
  // Deductions
  section80C: "",
  section80CCC: "",
  section80CCD1: "",
  section80CCD1B: "",
  pranTaxpayer: "",
  section80CCD2: "",
  section80CCG: "",
  pranTaxpayer80CCG: "",
  section80D: "",
  section80DHealthInsurance: "",
  section80DMedicalExpenditure: "",
  section80DPreventiveCheckup: "",
  section80DD: "",
  section80DDB: "",
  specifiedDiseaseName: "",
  section80E: "",
  section80EE: "",
  section80EEA: "",
  section80EEB: "",
  section80G: "",
  section80GG: "",
  form10BAAckNumber: "",
  section80GGA: "",
  section80GGC: "",
  section80QQB: "",
  section80RRB: "",
  section80TTA: "",
  section80TTB: "",
  section80U: "",
  section80CCH: "",
  anyOtherDeductions: "",
  
  // Total Income
  grossTotalIncome: "",
  grossTotalIncomeWith112A: "",
  totalDeductions: "",
  totalIncome: "",
  exemptIncome: [],
  totalExemptIncome: "",
  ltcg112ATotalSaleConsideration: "",
  ltcg112ATotalCostOfAcquisition: "",
  ltcg112ALongTermCapitalGains: "",
  
  // Tax Computation
  taxPayableOnTotalIncome: "",
  rebate87A: "",
  taxPayableAfterRebate: "",
  healthAndEducationCess: "",
  totalTaxAndCess: "",
  relief89: "",
  relief89A: "",
  balanceTaxAfterRelief: "",
  interest234A: "",
  interest234B: "",
  interest234C: "",
  fee234F: "",
  totalInterestFeePayable: "",
  totalTaxFeeAndInterest: "",
  
  // Bank Details
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  accountType: "",
  
  // Verification
  verificationMethod: "",
  verificationDate: "",
  verificationMonth: "",
  verificationYear: "",
  placeOfFiling: "",
  
  // Arrays
  bankAccounts: [],
  advanceTaxPayments: [],
  tdsDetails: []
};

// Initial Form Errors
export const initialItrOneFormErrors: ItrOneFormErrors = {
  // Part A - General Information
  pan: "",
  aadhar: "",
  aadhaarEnrolmentId: "",
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  residentialStatus: "",
  email: "",
  mobileNumber: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
  natureOfEmployment: "",
  
  // New Tax Regime Options (115BAC)
  optingOut115BAC: "",
  form10IEADate: "",
  form10IEAAckNumber: "",
  
  // Seventh Proviso Conditions
  filingUnderSeventhProviso: "",
  depositedOver1Crore: "",
  depositedAmount: "",
  foreignTravelOver2Lakh: "",
  foreignTravelAmount: "",
  electricityOver1Lakh: "",
  electricityAmount: "",
  otherSeventhProvisoConditions: "",
  businessTurnoverOver60Lakh: "",
  professionReceiptsOver10Lakh: "",
  tdsTcsOver25Thousand: "",
  savingsDepositOver50Lakh: "",
  
  // Filing Status
  filedUnderSection: "",
  filedInResponseToNotice: "",
  receiptNumber: "",
  originalFilingDate: "",
  noticeDIN: "",
  noticeDate: "",
  dueDateOfFiling: "",
  
  // Part B - Gross Total Income
  salarySection17_1: "",
  perquisitesSection17_2: "",
  profitSection17_3: "",
  retirementBenefitNotifiedCountry: "",
  retirementBenefitNotifiedAmount: "",
  retirementBenefitOtherCountry: "",
  retirementBenefitOtherAmount: "",
  houseRentAllowance: "",
  reliefFromTaxation89A: "",
  netSalary: "",
  standardDeduction16: "",
  entertainmentAllowance: "",
  professionalTax: "",
  incomeChargeableSalaries: "",
  
  // House Property
  propertyType: "",
  grossRent: "",
  localTaxPaid: "",
  annualValue: "",
  standardDeduction: "",
  interestBorrowedCapital: "",
  arrearsRent: "",
  totalHousePropertyIncome: "",
  
  // Other Sources
  retirementBenefitOtherCountry89A: "",
  reliefFromTaxation89AOtherSources: "",
  familyPensionDeduction57: "",
  totalDividendIncome: "",
  agriculturalIncome: "",
  
  // Deductions
  section80C: "",
  section80CCC: "",
  section80CCD1: "",
  section80CCD1B: "",
  pranTaxpayer: "",
  section80CCD2: "",
  section80CCG: "",
  pranTaxpayer80CCG: "",
  section80D: "",
  section80DHealthInsurance: "",
  section80DMedicalExpenditure: "",
  section80DPreventiveCheckup: "",
  section80DD: "",
  section80DDB: "",
  specifiedDiseaseName: "",
  section80E: "",
  section80EE: "",
  section80EEA: "",
  section80EEB: "",
  section80G: "",
  section80GG: "",
  form10BAAckNumber: "",
  section80GGA: "",
  section80GGC: "",
  section80QQB: "",
  section80RRB: "",
  section80TTA: "",
  section80TTB: "",
  section80U: "",
  section80CCH: "",
  anyOtherDeductions: "",
  
  // Total Income
  grossTotalIncome: "",
  grossTotalIncomeWith112A: "",
  totalDeductions: "",
  totalIncome: "",
  totalExemptIncome: "",
  ltcg112ATotalSaleConsideration: "",
  ltcg112ATotalCostOfAcquisition: "",
  ltcg112ALongTermCapitalGains: "",
  
  // Tax Computation
  taxPayableOnTotalIncome: "",
  rebate87A: "",
  taxPayableAfterRebate: "",
  healthAndEducationCess: "",
  totalTaxAndCess: "",
  relief89: "",
  relief89A: "",
  balanceTaxAfterRelief: "",
  interest234A: "",
  interest234B: "",
  interest234C: "",
  fee234F: "",
  totalInterestFeePayable: "",
  totalTaxFeeAndInterest: "",
  
  // Bank Details
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  accountType: "",
  
  // Verification
  verificationMethod: "",
  verificationDate: "",
  verificationMonth: "",
  verificationYear: "",
  placeOfFiling: ""
};

// Dropdown Options
export const ITR_ONE_OPTIONS = {
  // Residential Status
  residentialStatus: [
    { value: "Resident", label: "Resident" },
    { value: "Non-Resident", label: "Non-Resident" },
    { value: "Resident but Not Ordinarily Resident", label: "Resident but Not Ordinarily Resident" }
  ],
  
  // Gender
  gender: [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" }
  ],
  
  // Nature of Employment
  natureOfEmployment: [
    { value: "Government", label: "Government" },
    { value: "Private", label: "Private" },
    { value: "Self Employed", label: "Self Employed" },
    { value: "Retired", label: "Retired" },
    { value: "Other", label: "Other" }
  ],
  
  // New Tax Regime Options
  optingOut115BAC: [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" }
  ],
  
  // Seventh Proviso Conditions
  seventhProvisoOptions: [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" }
  ],
  
  // Filing Status
  filedUnderSection: [
    { value: "139(1)-On or before due date", label: "139(1)-On or before due date" },
    { value: "139(4)-After due date", label: "139(4)-After due date" },
    { value: "139(5)-Revised return", label: "139(5)-Revised return" },
    { value: "139(8A)-Updated return", label: "139(8A)-Updated return" }
  ],
  
  // Property Type
  propertyType: [
    { value: "Self Occupied", label: "Self Occupied" },
    { value: "Let Out", label: "Let Out" },
    { value: "Deemed Let Out", label: "Deemed Let Out" }
  ],
  
  // Retirement Benefit Countries
  retirementBenefitCountries: [
    { value: "United States of America", label: "United States of America" },
    { value: "United Kingdom of Great Britain and Northern Ireland", label: "United Kingdom of Great Britain and Northern Ireland" },
    { value: "Canada", label: "Canada" }
  ],
  
  // Exempt Allowance Types
  exemptAllowanceTypes: [
    { value: "House Rent Allowance", label: "House Rent Allowance" },
    { value: "Transport Allowance", label: "Transport Allowance" },
    { value: "Medical Allowance", label: "Medical Allowance" },
    { value: "Any Other", label: "Any Other" }
  ],
  
  // Other Source Income Types
  otherSourceIncomeTypes: [
    { value: "Interest on Savings Bank Account", label: "Interest on Savings Bank Account" },
    { value: "Interest on Fixed Deposits", label: "Interest on Fixed Deposits" },
    { value: "Dividend Income", label: "Dividend Income" },
    { value: "Family Pension", label: "Family Pension" },
    { value: "Any Other", label: "Any Other" }
  ],
  
  // Exempt Income Types
  exemptIncomeTypes: [
    { value: "Agricultural Income", label: "Agricultural Income" },
    { value: "Interest on Tax Free Bonds", label: "Interest on Tax Free Bonds" },
    { value: "Any Other", label: "Any Other" }
  ],
  
  // Account Types
  accountType: [
    { value: "Savings", label: "Savings" },
    { value: "Current", label: "Current" }
  ],
  
  // Verification Methods
  verificationMethod: [
    { value: "Digital Signature", label: "Digital Signature" },
    { value: "Aadhaar OTP", label: "Aadhaar OTP" },
    { value: "Electronic Verification Code", label: "Electronic Verification Code" }
  ]
};

// Validation Patterns
export const VALIDATION_PATTERNS = {
  pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  aadhar: /^[0-9]{12}$/,
  mobile: /^[6-9]\d{9}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  pincode: /^[0-9]{6}$/
};

// Form Steps Configuration
export const ITR_ONE_STEPS = [
  {
    id: 1,
    title: "General Information",
    description: "Personal details and filing status"
  },
  {
    id: 2,
    title: "New Tax Regime & Seventh Proviso",
    description: "Tax regime options and proviso conditions"
  },
  {
    id: 3,
    title: "Income from Salary",
    description: "Salary, allowances, and deductions"
  },
  {
    id: 4,
    title: "Income from House Property",
    description: "Property income and deductions"
  },
  {
    id: 5,
    title: "Income from Other Sources",
    description: "Other income and retirement benefits"
  },
  {
    id: 6,
    title: "Deductions",
    description: "Chapter VI-A deductions"
  },
  {
    id: 7,
    title: "Tax Computation",
    description: "Tax calculation and relief"
  },
  {
    id: 8,
    title: "Bank Details & Verification",
    description: "Bank information and verification"
  }
];

