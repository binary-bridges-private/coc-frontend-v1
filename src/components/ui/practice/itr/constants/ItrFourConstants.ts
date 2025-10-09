// ITR-4 Constants - Based on Official ITR-4 Structure

import { ItrFourFormData, ItrFourFormErrors } from '../types/ItrFourTypes';

// Initial Form Data
export const initialItrFourFormData: ItrFourFormData = {
  // Part A - General Information
  firstName: "",
  middleName: "",
  lastName: "",
  pan: "",
  aadharNumber: "",
  dateOfBirth: "",
  gender: "",
  residentialStatus: "",
  fatherName: "",
  motherName: "",
  spouseName: "",
  spousePAN: "",
  
  // Address
  flatDoorBlock: "",
  buildingName: "",
  roadStreet: "",
  localityArea: "",
  cityDistrict: "",
  state: "",
  pinCode: "",
  country: "India",
  mobileNumber: "",
  emailAddress: "",
  
  // Filing Status
  filingSection: "",
  isRevisedReturn: false,
  originalAckNumber: "",
  originalFilingDate: "",
  isUpdatedReturn: false,
  updatedReturnAckNumber: "",
  
  // Business/Profession Details
  businessProfessionDetails: [],
  
  // Presumptive Tax Details
  presumptiveTaxDetails: [],
  
  // Schedule HP - House Property
  housePropertyDetails: [],
  
  // Schedule CG - Capital Gains
  capitalGainDetails: [],
  
  // Schedule OS - Other Sources
  otherSourceDetails: [],
  
  // Schedule VI-A - Deductions
  deductionDetails: [],
  
  // TDS Details
  tdsDetails: [],
  
  // Advance Tax Details
  advanceTaxDetails: [],
  
  // Self Assessment Tax Details
  selfAssessmentTaxDetails: [],
  
  // Bank Accounts
  bankAccounts: [],
  
  // Audit Information
  auditDetails: {
    isAuditRequired: false,
    auditorName: "",
    auditorPAN: "",
    auditReportDate: "",
    auditReportNumber: ""
  },
  
  // Computation of Total Income
  grossTotalIncome: 0,
  totalDeductions: 0,
  totalIncome: 0,
  
  // Tax Computation
  taxOnTotalIncome: 0,
  rebateUnder87A: 0,
  taxAfterRebate: 0,
  healthAndEducationCess: 0,
  totalTaxAndCess: 0,
  reliefUnder89: 0,
  reliefUnder90: 0,
  reliefUnder90A: 0,
  reliefUnder91: 0,
  totalRelief: 0,
  balanceTaxAfterRelief: 0,
  interestUnder234A: 0,
  interestUnder234B: 0,
  interestUnder234C: 0,
  interestUnder234F: 0,
  totalInterestAndFee: 0,
  totalTaxFeeInterest: 0,
  totalTaxPaid: 0,
  refundDue: 0,
  balancePayable: 0,
  
  // Verification
  verificationName: "",
  capacity: "",
  declarationPlace: "",
  declarationDate: "",
};

// Initial Form Errors
export const initialItrFourFormErrors: ItrFourFormErrors = {};

// Dropdown Options
export const ITR_FOUR_OPTIONS = {
  // Gender
  gender: [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" }
  ],
  
  // Residential Status
  residentialStatus: [
    { value: "Resident", label: "Resident" },
    { value: "Non-Resident", label: "Non-Resident" },
    { value: "Resident but Not Ordinarily Resident", label: "Resident but Not Ordinarily Resident" }
  ],
  
  // Filing Section
  filingSection: [
    { value: "139(1)", label: "139(1) - On or before due date" },
    { value: "139(4)", label: "139(4) - After due date" },
    { value: "139(5)", label: "139(5) - Revised return" },
    { value: "139(8A)", label: "139(8A) - Updated return" }
  ],
  
  // Business Type
  businessType: [
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Trading", label: "Trading" },
    { value: "Service", label: "Service" },
    { value: "Professional", label: "Professional" },
    { value: "Other", label: "Other" }
  ],
  
  // Nature of Business
  natureOfBusiness: [
    { value: "Retail Trade", label: "Retail Trade" },
    { value: "Wholesale Trade", label: "Wholesale Trade" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Service Provider", label: "Service Provider" },
    { value: "Professional Services", label: "Professional Services" },
    { value: "Consultancy", label: "Consultancy" },
    { value: "Other", label: "Other" }
  ],
  
  // Presumptive Sections
  presumptiveSections: [
    { value: "44AD", label: "44AD - Presumptive taxation for business" },
    { value: "44ADA", label: "44ADA - Presumptive taxation for profession" },
    { value: "44AE", label: "44AE - Presumptive taxation for goods carriage" }
  ],
  
  // Property Type
  propertyType: [
    { value: "Self Occupied", label: "Self Occupied" },
    { value: "Let Out", label: "Let Out" },
    { value: "Deemed Let Out", label: "Deemed Let Out" }
  ],
  
  // Account Type
  accountType: [
    { value: "Savings", label: "Savings" },
    { value: "Current", label: "Current" },
    { value: "Fixed Deposit", label: "Fixed Deposit" },
    { value: "Recurring Deposit", label: "Recurring Deposit" }
  ],
  
  // Verification Capacity
  verificationCapacity: [
    { value: "Self", label: "Self" },
    { value: "Authorized Representative", label: "Authorized Representative" },
    { value: "Guardian", label: "Guardian" }
  ]
};

// Validation Patterns
export const VALIDATION_PATTERNS = {
  pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  aadhar: /^[0-9]{12}$/,
  mobile: /^[6-9]\d{9}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  pincode: /^[0-9]{6}$/,
  tan: /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/
};

// Form Steps Configuration
export const ITR_FOUR_STEPS = [
  {
    id: 1,
    title: "General Information",
    description: "Personal details and address information"
  },
  {
    id: 2,
    title: "Filing Status",
    description: "Filing section and return type"
  },
  {
    id: 3,
    title: "Business/Profession Details",
    description: "Details of business or profession"
  },
  {
    id: 4,
    title: "Presumptive Tax Details",
    description: "Presumptive taxation under sections 44AD, 44ADA, 44AE"
  },
  {
    id: 5,
    title: "Schedule HP - House Property",
    description: "Income from house property"
  },
  {
    id: 6,
    title: "Schedule CG - Capital Gains",
    description: "Capital gains and losses"
  },
  {
    id: 7,
    title: "Schedule OS - Other Sources",
    description: "Income from other sources"
  },
  {
    id: 8,
    title: "Schedule VI-A - Deductions",
    description: "Deductions under Chapter VI-A"
  },
  {
    id: 9,
    title: "TDS Details",
    description: "Tax deducted at source details"
  },
  {
    id: 10,
    title: "Advance Tax Details",
    description: "Advance tax payment details"
  },
  {
    id: 11,
    title: "Self Assessment Tax",
    description: "Self assessment tax details"
  },
  {
    id: 12,
    title: "Bank Accounts",
    description: "Bank account details"
  },
  {
    id: 13,
    title: "Audit Information",
    description: "Audit details if applicable"
  },
  {
    id: 14,
    title: "Computation of Total Income",
    description: "Total income computation"
  },
  {
    id: 15,
    title: "Tax Computation",
    description: "Tax liability computation"
  },
  {
    id: 16,
    title: "Verification",
    description: "Final verification and submission"
  }
];

