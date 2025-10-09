// ITR-1 (SAHAJ) Type Definitions - Based on Official CSV Structure

export interface ExemptAllowance {
  slNo: number;
  natureOfExemptAllowance: string;
  description: string;
  amount: string;
}

export interface OtherSourceIncome {
  slNo: number;
  natureOfIncome: string;
  description: string;
  amount: string;
}

export interface RetirementBenefitQuarterly {
  period: string;
  amount: string;
}

export interface DividendIncomeQuarterly {
  period: string;
  amount: string;
}

export interface ExemptIncome {
  slNo: number;
  natureOfIncome: string;
  description: string;
  amount: string;
}

export interface BankAccount {
  ifscCode: string;
  bankName: string;
  accountNumber: string;
  accountType: string;
  selectForRefund: boolean;
}

export interface AdvanceTaxPayment {
  assessmentYear: string;
  challanSerialNumber: string;
  amountPaid: string;
}

export interface TDSDetail {
  tanPanAadhar: string;
  deductorName: string;
  section: string;
  grossAmount: string;
  yearOfDeduction: string;
  taxDeducted: string;
  taxCreditClaimed: string;
}

// Main ITR-1 Form Data Interface
export interface ItrOneFormData {
  // Part A - General Information
  pan: string;
  aadhar: string;
  aadhaarEnrolmentId: string; // New field from CSV
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  residentialStatus: string;
  email: string;
  mobileNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string; // New field from CSV
  natureOfEmployment: string; // New field from CSV
  
  // New Tax Regime Options (115BAC) - Missing from current implementation
  optingOut115BAC: string; // Yes/No option
  form10IEADate: string;
  form10IEAAckNumber: string;
  
  // Seventh Proviso Conditions - Missing from current implementation
  filingUnderSeventhProviso: string; // Yes/No
  depositedOver1Crore: string; // Yes/No
  depositedAmount: string;
  foreignTravelOver2Lakh: string; // Yes/No
  foreignTravelAmount: string;
  electricityOver1Lakh: string; // Yes/No
  electricityAmount: string;
  otherSeventhProvisoConditions: string; // Yes/No
  businessTurnoverOver60Lakh: string; // Yes/No
  professionReceiptsOver10Lakh: string; // Yes/No
  tdsTcsOver25Thousand: string; // Yes/No
  savingsDepositOver50Lakh: string; // Yes/No
  
  // Filing Status - Enhanced from CSV
  filedUnderSection: string;
  filedInResponseToNotice: string;
  receiptNumber: string;
  originalFilingDate: string;
  noticeDIN: string;
  noticeDate: string;
  dueDateOfFiling: string;
  
  // Part B - Gross Total Income
  // B1 - Salaries - Enhanced from CSV
  salarySection17_1: string;
  perquisitesSection17_2: string;
  profitSection17_3: string;
  
  // Retirement Benefit Accounts - Enhanced from CSV
  retirementBenefitNotifiedCountry: string; // USA, UK, Canada
  retirementBenefitNotifiedAmount: string;
  retirementBenefitOtherCountry: string;
  retirementBenefitOtherAmount: string;
  
  // Allowances to the extent exempt u/s 10 - Missing from current implementation
  exemptAllowances: ExemptAllowance[];
  
  // Section 10(13A) - House Rent Allowance - Missing from current implementation
  houseRentAllowance: string;
  
  // Relief from taxation u/s 89A - Missing from current implementation
  reliefFromTaxation89A: string;
  
  // Net Salary calculation - Enhanced
  netSalary: string;
  
  // Deductions u/s 16 - Enhanced from CSV
  standardDeduction16: string;
  entertainmentAllowance: string;
  professionalTax: string;
  
  // Income chargeable under Head Salaries
  incomeChargeableSalaries: string;
  
  // B2 - Income from House Property
  propertyType: string;
  grossRent: string;
  localTaxPaid: string;
  annualValue: string;
  standardDeduction: string;
  interestBorrowedCapital: string;
  arrearsRent: string;
  totalHousePropertyIncome: string;
  
  // B3 - Income from Other Sources - Enhanced from CSV
  otherSourcesIncome: OtherSourceIncome[];
  
  // Retirement benefit account maintained in other than notified country u/s 89A
  retirementBenefitOtherCountry89A: string;
  
  // Retirement benefit account maintained in notified country u/s 89A - Quarterly breakup
  retirementBenefitNotifiedQuarterly: RetirementBenefitQuarterly[];
  
  // Dividend income - Quarterly breakup - Missing from current implementation
  dividendIncomeQuarterly: DividendIncomeQuarterly[];
  
  // Total dividend income
  totalDividendIncome: string;
  
  // Less: Income claimed for relief from taxation u/s 89A
  reliefFromTaxation89AOtherSources: string;
  
  // Less: Deduction u/s 57(iia) - Family pension only
  familyPensionDeduction57: string;
  
  agriculturalIncome: string;
  
  // Part C - Deductions - Enhanced from CSV
  section80C: string;
  section80CCC: string; // Payment in respect Pension Fund
  section80CCD1: string; // Contribution to pension scheme of Central Government
  section80CCD1B: string; // Additional contribution to pension scheme
  pranTaxpayer: string; // PRAN of the taxpayer
  section80CCD2: string; // Contribution by employer
  section80CCG: string; // Investment under equity savings scheme
  pranTaxpayer80CCG: string; // PRAN for 80CCG
  
  // Section 80D - Enhanced with sub-sections
  section80D: string;
  section80DHealthInsurance: string; // Health insurance premium
  section80DMedicalExpenditure: string; // Medical expenditure
  section80DPreventiveCheckup: string; // Preventive health check-up
  
  section80DD: string; // Maintenance of dependent with disability
  section80DDB: string; // Medical treatment of specified disease
  specifiedDiseaseName: string; // Name of specified disease
  
  section80E: string; // Interest on loan for higher education
  section80EE: string; // Interest on loan for residential house property
  section80EEA: string; // Interest on loan for certain house property
  section80EEB: string; // Purchase of electric vehicle
  section80G: string; // Donations to certain funds, charitable institutions
  section80GG: string; // Rent paid
  form10BAAckNumber: string; // Acknowledgement number of Form 10BA
  section80GGA: string; // Donations for scientific research or rural development
  section80GGC: string; // Contribution to Political party
  section80QQB: string; // Royalty income of authors of certain books
  section80RRB: string; // Royalty on patents
  section80TTA: string; // Interest on saving bank accounts (non-senior citizens)
  section80TTB: string; // Interest on deposits (senior citizens)
  section80U: string; // Person with disability
  section80CCH: string; // Contribution to Agnipath Scheme
  anyOtherDeductions: string; // Any other deductions
  
  // Part D - Total Income - Enhanced from CSV
  grossTotalIncome: string; // Gross Total Income (1+2+3)
  grossTotalIncomeWith112A: string; // Gross Total Income (1+2+3+7a(iii))
  totalDeductions: string;
  totalIncome: string; // Total Income (4 - 6)
  
  // Exempt Income - Missing from current implementation
  exemptIncome: ExemptIncome[];
  totalExemptIncome: string;
  
  // Long Term Capital Gains u/s 112A - Missing from current implementation
  ltcg112ATotalSaleConsideration: string;
  ltcg112ATotalCostOfAcquisition: string;
  ltcg112ALongTermCapitalGains: string;
  
  // Part E - Tax Computation - Enhanced from CSV
  taxPayableOnTotalIncome: string; // Tax Payable on Total Income
  rebate87A: string; // Rebate u/s 87A
  taxPayableAfterRebate: string; // Tax payable after Rebate
  healthAndEducationCess: string; // Health and Education Cess @4%
  totalTaxAndCess: string; // Total Tax and Cess
  relief89: string; // Relief u/s 89 (Form 10E required)
  relief89A: string; // Relief u/s 89A
  balanceTaxAfterRelief: string; // Balance Tax after Relief
  
  // Interest and Fee Calculations - Missing from current implementation
  interest234A: string; // Interest u/s 234A
  interest234B: string; // Interest u/s 234B
  interest234C: string; // Interest u/s 234C
  fee234F: string; // Fee u/s 234F
  totalInterestFeePayable: string; // Total Interest, Fee Payable
  totalTaxFeeAndInterest: string; // Total Tax, Fee and Interest
  
  // Part F - Bank Details
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  
  // Part G - Verification - Enhanced from CSV
  verificationMethod: string;
  verificationDate: string;
  verificationMonth: string;
  verificationYear: string;
  placeOfFiling: string;
  
  // Additional fields for calculations and arrays
  bankAccounts: BankAccount[];
  advanceTaxPayments: AdvanceTaxPayment[];
  tdsDetails: TDSDetail[];
}

// Form Errors Interface
export interface ItrOneFormErrors {
  // Part A - General Information
  pan: string;
  aadhar: string;
  aadhaarEnrolmentId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  residentialStatus: string;
  email: string;
  mobileNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  natureOfEmployment: string;
  
  // New Tax Regime Options (115BAC)
  optingOut115BAC: string;
  form10IEADate: string;
  form10IEAAckNumber: string;
  
  // Seventh Proviso Conditions
  filingUnderSeventhProviso: string;
  depositedOver1Crore: string;
  depositedAmount: string;
  foreignTravelOver2Lakh: string;
  foreignTravelAmount: string;
  electricityOver1Lakh: string;
  electricityAmount: string;
  otherSeventhProvisoConditions: string;
  businessTurnoverOver60Lakh: string;
  professionReceiptsOver10Lakh: string;
  tdsTcsOver25Thousand: string;
  savingsDepositOver50Lakh: string;
  
  // Filing Status
  filedUnderSection: string;
  filedInResponseToNotice: string;
  receiptNumber: string;
  originalFilingDate: string;
  noticeDIN: string;
  noticeDate: string;
  dueDateOfFiling: string;
  
  // Part B - Gross Total Income
  salarySection17_1: string;
  perquisitesSection17_2: string;
  profitSection17_3: string;
  retirementBenefitNotifiedCountry: string;
  retirementBenefitNotifiedAmount: string;
  retirementBenefitOtherCountry: string;
  retirementBenefitOtherAmount: string;
  houseRentAllowance: string;
  reliefFromTaxation89A: string;
  netSalary: string;
  standardDeduction16: string;
  entertainmentAllowance: string;
  professionalTax: string;
  incomeChargeableSalaries: string;
  
  // House Property
  propertyType: string;
  grossRent: string;
  localTaxPaid: string;
  annualValue: string;
  standardDeduction: string;
  interestBorrowedCapital: string;
  arrearsRent: string;
  totalHousePropertyIncome: string;
  
  // Other Sources
  retirementBenefitOtherCountry89A: string;
  reliefFromTaxation89AOtherSources: string;
  familyPensionDeduction57: string;
  totalDividendIncome: string;
  agriculturalIncome: string;
  
  // Deductions
  section80C: string;
  section80CCC: string;
  section80CCD1: string;
  section80CCD1B: string;
  pranTaxpayer: string;
  section80CCD2: string;
  section80CCG: string;
  pranTaxpayer80CCG: string;
  section80D: string;
  section80DHealthInsurance: string;
  section80DMedicalExpenditure: string;
  section80DPreventiveCheckup: string;
  section80DD: string;
  section80DDB: string;
  specifiedDiseaseName: string;
  section80E: string;
  section80EE: string;
  section80EEA: string;
  section80EEB: string;
  section80G: string;
  section80GG: string;
  form10BAAckNumber: string;
  section80GGA: string;
  section80GGC: string;
  section80QQB: string;
  section80RRB: string;
  section80TTA: string;
  section80TTB: string;
  section80U: string;
  section80CCH: string;
  anyOtherDeductions: string;
  
  // Total Income
  grossTotalIncome: string;
  grossTotalIncomeWith112A: string;
  totalDeductions: string;
  totalIncome: string;
  totalExemptIncome: string;
  ltcg112ATotalSaleConsideration: string;
  ltcg112ATotalCostOfAcquisition: string;
  ltcg112ALongTermCapitalGains: string;
  
  // Tax Computation
  taxPayableOnTotalIncome: string;
  rebate87A: string;
  taxPayableAfterRebate: string;
  healthAndEducationCess: string;
  totalTaxAndCess: string;
  relief89: string;
  relief89A: string;
  balanceTaxAfterRelief: string;
  interest234A: string;
  interest234B: string;
  interest234C: string;
  fee234F: string;
  totalInterestFeePayable: string;
  totalTaxFeeAndInterest: string;
  
  // Bank Details
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  
  // Verification
  verificationMethod: string;
  verificationDate: string;
  verificationMonth: string;
  verificationYear: string;
  placeOfFiling: string;
}

