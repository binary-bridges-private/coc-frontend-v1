// ITR-4 Type Definitions - Based on Official ITR-4 Structure
// ITR-4 is for individuals and HUFs having income from a proprietary business or profession
// (Presumptive taxation under sections 44AD, 44ADA, 44AE)

export interface BusinessProfessionDetail {
  businessName: string;
  businessAddress: string;
  businessPAN: string;
  businessType: string;
  natureOfBusiness: string;
  registrationNumber: string;
  registrationDate: string;
  commencementDate: string;
  closureDate: string;
  isActive: boolean;
  presumptiveSection: string; // 44AD, 44ADA, 44AE
  grossReceipts: number;
  presumptiveIncome: number;
  actualIncome: number;
  optedForPresumptive: boolean;
}

export interface HousePropertyDetail {
  propertyAddress: string;
  propertyType: string;
  annualValue: number;
  municipalTaxes: number;
  standardDeduction: number;
  interestOnBorrowedCapital: number;
  netIncome: number;
}

export interface CapitalGainDetail {
  assetDescription: string;
  dateOfAcquisition: string;
  dateOfTransfer: string;
  costOfAcquisition: number;
  costOfImprovement: number;
  saleConsideration: number;
  expensesOnTransfer: number;
  indexedCost: number;
  capitalGain: number;
  capitalLoss: number;
  isLongTerm: boolean;
}

export interface OtherSourceDetail {
  sourceDescription: string;
  amount: number;
  tdsDeducted: number;
  netAmount: number;
}

export interface DeductionDetail {
  section: string;
  description: string;
  amount: number;
  eligibleAmount: number;
}

export interface TdsDetail {
  deductorName: string;
  deductorTAN: string;
  section: string;
  amount: number;
  tdsDeducted: number;
}

export interface AdvanceTaxDetail {
  installmentDate: string;
  amount: number;
  bsrCode: string;
  challanNumber: string;
}

export interface SelfAssessmentTaxDetail {
  paymentDate: string;
  amount: number;
  bsrCode: string;
  challanNumber: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  isPrimary: boolean;
}

export interface PresumptiveTaxDetail {
  section: string;
  grossReceipts: number;
  presumptiveRate: number;
  presumptiveIncome: number;
  actualIncome: number;
  optedForPresumptive: boolean;
}

export interface AuditDetail {
  isAuditRequired: boolean;
  auditorName: string;
  auditorPAN: string;
  auditReportDate: string;
  auditReportNumber: string;
}

// Main ITR-4 Form Data Interface
export interface ItrFourFormData {
  // Part A - General Information
  firstName: string;
  middleName: string;
  lastName: string;
  pan: string;
  aadharNumber: string;
  dateOfBirth: string;
  gender: string;
  residentialStatus: string;
  fatherName: string;
  motherName: string;
  spouseName: string;
  spousePAN: string;
  
  // Address
  flatDoorBlock: string;
  buildingName: string;
  roadStreet: string;
  localityArea: string;
  cityDistrict: string;
  state: string;
  pinCode: string;
  country: string;
  mobileNumber: string;
  emailAddress: string;
  
  // Filing Status
  filingSection: string;
  isRevisedReturn: boolean;
  originalAckNumber: string;
  originalFilingDate: string;
  isUpdatedReturn: boolean;
  updatedReturnAckNumber: string;
  
  // Business/Profession Details
  businessProfessionDetails: BusinessProfessionDetail[];
  
  // Presumptive Tax Details
  presumptiveTaxDetails: PresumptiveTaxDetail[];
  
  // Schedule HP - House Property
  housePropertyDetails: HousePropertyDetail[];
  
  // Schedule CG - Capital Gains
  capitalGainDetails: CapitalGainDetail[];
  
  // Schedule OS - Other Sources
  otherSourceDetails: OtherSourceDetail[];
  
  // Schedule VI-A - Deductions
  deductionDetails: DeductionDetail[];
  
  // TDS Details
  tdsDetails: TdsDetail[];
  
  // Advance Tax Details
  advanceTaxDetails: AdvanceTaxDetail[];
  
  // Self Assessment Tax Details
  selfAssessmentTaxDetails: SelfAssessmentTaxDetail[];
  
  // Bank Accounts
  bankAccounts: BankAccount[];
  
  // Audit Information
  auditDetails: AuditDetail;
  
  // Computation of Total Income
  grossTotalIncome: number;
  totalDeductions: number;
  totalIncome: number;
  
  // Tax Computation
  taxOnTotalIncome: number;
  rebateUnder87A: number;
  taxAfterRebate: number;
  healthAndEducationCess: number;
  totalTaxAndCess: number;
  reliefUnder89: number;
  reliefUnder90: number;
  reliefUnder90A: number;
  reliefUnder91: number;
  totalRelief: number;
  balanceTaxAfterRelief: number;
  interestUnder234A: number;
  interestUnder234B: number;
  interestUnder234C: number;
  interestUnder234F: number;
  totalInterestAndFee: number;
  totalTaxFeeInterest: number;
  totalTaxPaid: number;
  refundDue: number;
  balancePayable: number;
  
  // Verification
  verificationName: string;
  capacity: string;
  declarationPlace: string;
  declarationDate: string;
}

// Form Errors Interface
export interface ItrFourFormErrors {
  [key: string]: string;
}

// Form Steps Interface
export interface ItrFourStep {
  id: number;
  title: string;
  description: string;
  fields: string[];
}

