// ITR-2 Constants - Based on Official ITR-2 Structure

import { ItrTwoFormData, ItrTwoFormErrors } from '../types/ItrTwoTypes';

// Initial Form Data
export const initialItrTwoFormData: ItrTwoFormData = {
  // Step 1: Personal Information
  firstName: "",
  middleName: "",
  lastName: "",
  pan: "",
  name: "",
  status: "",
  dateOfBirth: "",
  aadharNumber: "",
  
  // Address
  flatDoorBlock: "",
  buildingName: "",
  roadStreet: "",
  localityArea: "",
  cityDistrict: "",
  state: "",
  pinCode: "",
  country: "India",
  mobile1: "",
  mobile2: "",
  
  // Step 2: Filing Status
  email1: "",
  email2: "",
  filingSection: "",
  returnFileSectionReason: "",
  filedInResponseTo: [],
  optingOut115BAC: "",
  filingUnder7thProviso: "",
  depositedOver1Cr: "",
  depositedAmount: "",
  spentOver2LakhForeign: "",
  foreignTravelAmount: "",
  spentOver1LakhElectricity: "",
  electricityAmount: "",
  otherConditions: "",
  
  // Step 3: Revised/Defective/Modified Return
  isRevisedReturn: false,
  originalAckNumber: "",
  originalFilingDate: "",
  receiptNumber: "",
  noticeDIN: "",
  noticeDate: "",
  
  // Step 4: Residential Status
  residentialStatus: [],
  jurisdiction: "",
  daysInIndiaCurrentYear: "",
  daysInIndiaLast4Years: "",
  passportNumber: "",
  issuedByCountry: "",
  tin: "",
  
  // Step 5: Additional Declarations
  claimBenefit115H: "",
  governedByPortugueseCivilCode: "",
  isFPI: "",
  sebiRegnNo: "",
  filingByRepresentative: "",
  representativeName: "",
  representativeCapacity: "",
  representativeAddress: "",
  representativePAN: "",
  
  // Step 6: Company Involvement
  isDirector: "",
  directorDIN: "",
  directorCompanyPAN: "",
  directorCompanyName: "",
  isListed: "",
  heldUnlistedShares: "",
  unlistedShares: [],
  
  // Partner in Firm Details
  isPartnerInFirm: "",
  firmName: "",
  firmPAN: "",
  
  // Step 7: Bank Details
  ifscCode: "",
  bankName: "",
  accountNumber: "",
  accountType: "",
  primaryRefundAccount: false,
  
  // Step 8: Schedule S - Income from Salary
  employerName: "",
  employerCategory: "",
  employerTAN: "",
  employerAddress: "",
  salaryUnder17_1: "",
  perquisitesUnder17_2: "",
  profitsInLieuUnder17_3: "",
  retirementIncome89A: "",
  reliefClaimed89A: "",
  allowancesUnderSection10: "",
  standardDeduction: "",
  entertainmentAllowance: "",
  professionalTax: "",
  
  // Step 9: Schedule HP - Income from House Property
  propertyType: "",
  propertyAddress: "",
  isCoOwned: "",
  coOwnerDetails: [],
  ownershipShare: "",
  tenantName: "",
  tenantPAN: "",
  grossRentReceived: "",
  unrealizedRent: "",
  localTaxesPaid: "",
  annualValue: "",
  interestOnBorrowedCapital: "",
  interestPreConstruction: "",
  arrearsReceived: "",
  netIncomeFromProperty: "",
  
  // Step 10: Schedule CG - Capital Gains
  capitalGainsSchedule: [],
  shortTermGains: "",
  longTermGains: "",
  exemptionSection54: "",
  exemptionSection54EC: "",
  exemptionSection54F: "",
  
  // Step 11: Schedule OS - Income from Other Sources
  interestIncome: "",
  dividendIncome: "",
  winnings: "",
  familyPension: "",
  incomeFromOthers: "",
  deductionsAgainstOS: "",
  
  // Step 12: Schedule VI-A - Deductions
  section80C: "",
  section80CCC: "",
  section80CCD: "",
  section80D: "",
  section80DD: "",
  section80DDB: "",
  section80E: "",
  section80EE: "",
  section80G: "",
  section80GGA: "",
  section80TTA: "",
  section80TTB: "",
  section80U: "",
  otherDeductions: "",
  
  // Step 12A: Schedule CYLA/BFLA/CFL/AMT/AMTC - Loss and AMT Details
  currentYearLossSetOff: "",
  broughtForwardLossSetOff: "",
  carryForwardLossesAmount: "",
  amtPayable: "",
  amtCreditCarriedForward: "",
  
  // Step 13: Taxes Paid
  tdsSalary: "",
  tdsOthers: "",
  tcs: "",
  advanceTax: "",
  selfAssessmentTax: "",
  
  // Detailed TDS/TCS/Tax Payment Arrays
  tdsSalaryDetails: [],
  tdsOtherDetails: [],
  tcsDetails: [],
  advanceTaxDetails: [],
  selfAssessmentTaxDetails: [],
  
  // Step 14: Enhanced Bank Accounts
  bankAccounts: [] as Array<{
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    accountType: string;
    primaryRefundAccount: boolean;
    selectForRefund: boolean;
  }>,
  
  // Step 15: Schedule AL - Assets and Liabilities
  immovableAssets: "",
  movableAssets: "",
  financialAssets: "",
  totalAssets: "",
  totalLiabilities: "",
  
  // Detailed Asset & Liability Breakdown
  immovableAssetsDetails: {
    landBuildings: "",
    otherImmovable: "",
  },
  movableAssetsDetails: {
    cashInHand: "",
    jewelryBullion: "",
    vehicles: "",
    bankDeposits: "",
    sharesSecurities: "",
    otherMovable: "",
  },
  liabilitiesDetails: {
    securedLoans: "",
    unsecuredLoans: "",
    otherLiabilities: "",
  },
  
  // Step 16: Schedule FA - Foreign Assets
  foreignBankAccounts: "",
  foreignDeposits: "",
  foreignImmovableProperty: "",
  foreignTrusts: "",
  foreignTaxPaid: "",
  
  // Detailed Foreign Asset Arrays
  foreignBankAccountDetails: [],
  foreignImmovablePropertyDetails: [],
  
  // Step 17: Enhanced Verification
  verificationName: "",
  fatherName: "",
  capacity: "",
  declarationPlace: "",
  declarationDate: "",
  
  // Additional Schedules - Missing from current implementation
  // Schedule 112A - Long-term capital gains on equity shares
  schedule112ADetails: [],
  
  // Schedule 115AD - Capital gains on foreign assets
  schedule115ADDetails: [],
  
  // Schedule CYLA - Current Year Loss Adjustment
  currentYearLosses: [],
  
  // Schedule BFLA - Brought Forward Loss Adjustment
  broughtForwardLosses: [],
  
  // Schedule CFL - Carry Forward Losses
  carryForwardLosses: [],
  
  // Schedule 80G - Donations
  schedule80GDetails: [],
  
  // Schedule 80GGA - Donations for scientific research
  schedule80GGADetails: [],
  
  // Schedule AMT - Alternate Minimum Tax
  amtDetails: {
    adjustedTotalIncome: 0,
    deductionUnderVI_A: 0,
    deductionUnder10AA: 0,
    deductionUnder80IA: 0,
    deductionUnder80IAB: 0,
    deductionUnder80IB: 0,
    deductionUnder80IC: 0,
    deductionUnder80ID: 0,
    deductionUnder80IE: 0,
    deductionUnder80JJA: 0,
    deductionUnder80JJAA: 0,
    deductionUnder80LA: 0,
    deductionUnder80P: 0,
    deductionUnder80QQB: 0,
    deductionUnder80RRB: 0,
    deductionUnder80U: 0,
    totalDeductions: 0,
    adjustedTotalIncomeAfterDeductions: 0,
    alternateMinimumTax: 0,
    regularTax: 0,
    amtPayable: 0
  },
  
  // Schedule AMTC - AMT Credit
  amtcDetails: [],
  
  // Schedule SPI - Income of Specified Persons
  specifiedPersonIncomes: [],
  
  // Schedule SI - Special Income
  specialIncomes: [],
  
  // Schedule EI - Exempt Income
  exemptIncomes: [],
  
  // Schedule PTI - Pass Through Income
  passThroughIncomes: [],
  
  // Schedule FSI - Foreign Source Income
  foreignSourceIncomes: [],
  
  // Schedule TR - Tax Relief
  taxReliefs: [],
  
  // Schedule 5A - Portuguese Civil Code
  portugueseCivilCodeDetails: {
    spouseName: "",
    spousePAN: "",
    totalIncome: 0,
    apportionedIncome: 0,
    taxPayable: 0
  },
  
  // Part B - Total Income Computation
  grossTotalIncome: "",
  totalDeductionsUnderVI_A: "",
  totalIncome: "",
  agriculturalIncome: "",
  
  // Part B-TTI - Tax Liability on Total Income
  taxOnTotalIncome: "",
  rebateUnder87A: "",
  taxAfterRebate: "",
  healthAndEducationCess: "",
  totalTaxAndCess: "",
  reliefUnder89: "",
  reliefUnder90: "",
  reliefUnder90A: "",
  reliefUnder91: "",
  totalRelief: "",
  balanceTaxAfterRelief: "",
  interestUnder234A: "",
  interestUnder234B: "",
  interestUnder234C: "",
  interestUnder234F: "",
  totalInterestAndFee: "",
  totalTaxFeeInterest: "",
  totalTaxPaid: "",
  refundDue: "",
  balancePayable: "",
};

// Initial Form Errors
export const initialItrTwoFormErrors: ItrTwoFormErrors = {};

// Dropdown Options
export const ITR_TWO_OPTIONS = {
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
  
  // Filing Section
  filingSection: [
    { value: "139(1)-On or before due date", label: "139(1)-On or before due date" },
    { value: "139(4)-After due date", label: "139(4)-After due date" },
    { value: "139(5)-Revised return", label: "139(5)-Revised return" },
    { value: "139(8A)-Updated return", label: "139(8A)-Updated return" }
  ],
  
  // Yes/No Options
  yesNoOptions: [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" }
  ],
  
  // Property Type
  propertyType: [
    { value: "Self Occupied", label: "Self Occupied" },
    { value: "Let Out", label: "Let Out" },
    { value: "Deemed Let Out", label: "Deemed Let Out" }
  ],
  
  // Employer Category
  employerCategory: [
    { value: "Government", label: "Government" },
    { value: "Private", label: "Private" },
    { value: "Public Sector", label: "Public Sector" },
    { value: "Other", label: "Other" }
  ],
  
  // Capital Asset Type
  capitalAssetType: [
    { value: "Land", label: "Land" },
    { value: "Building", label: "Building" },
    { value: "Equity Shares", label: "Equity Shares" },
    { value: "Debentures", label: "Debentures" },
    { value: "Mutual Funds", label: "Mutual Funds" },
    { value: "Bonds", label: "Bonds" },
    { value: "Other", label: "Other" }
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
  tan: /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/,
  din: /^[0-9]{8}$/
};

// Form Steps Configuration
export const ITR_TWO_STEPS = [
  {
    id: 1,
    title: "Personal Information",
    description: "Basic personal details and address"
  },
  {
    id: 2,
    title: "Filing Status",
    description: "Filing section and special conditions"
  },
  {
    id: 3,
    title: "Revised/Defective Return",
    description: "Details for revised or defective returns"
  },
  {
    id: 4,
    title: "Residential Status",
    description: "Residential status and foreign details"
  },
  {
    id: 5,
    title: "Additional Declarations",
    description: "Special declarations and representative details"
  },
  {
    id: 6,
    title: "Company Involvement",
    description: "Directorship and partnership details"
  },
  {
    id: 7,
    title: "Bank Details",
    description: "Primary bank account information"
  },
  {
    id: 8,
    title: "Schedule S - Salary",
    description: "Income from salary and pension"
  },
  {
    id: 9,
    title: "Schedule HP - House Property",
    description: "Income from house property"
  },
  {
    id: 10,
    title: "Schedule CG - Capital Gains",
    description: "Capital gains and losses"
  },
  {
    id: 11,
    title: "Schedule 112A - LTCG on Equity",
    description: "Long-term capital gains on equity shares"
  },
  {
    id: 12,
    title: "Schedule 115AD - Foreign Assets",
    description: "Capital gains on foreign assets"
  },
  {
    id: 13,
    title: "Schedule OS - Other Sources",
    description: "Income from other sources"
  },
  {
    id: 14,
    title: "Schedule CYLA/BFLA/CFL",
    description: "Current year and brought forward losses"
  },
  {
    id: 15,
    title: "Schedule VI-A - Deductions",
    description: "Deductions under Chapter VI-A"
  },
  {
    id: 16,
    title: "Schedule 80G/80GGA",
    description: "Donations and scientific research"
  },
  {
    id: 17,
    title: "Schedule AMT/AMTC",
    description: "Alternate Minimum Tax and credit"
  },
  {
    id: 18,
    title: "Schedule SPI/SI/EI",
    description: "Specified persons, special and exempt income"
  },
  {
    id: 19,
    title: "Schedule PTI/FSI/TR",
    description: "Pass-through, foreign source income and tax relief"
  },
  {
    id: 20,
    title: "Schedule 5A - Portuguese Civil Code",
    description: "Income apportionment between spouses"
  },
  {
    id: 21,
    title: "Part B - Total Income",
    description: "Computation of total income"
  },
  {
    id: 22,
    title: "Part B-TTI - Tax Liability",
    description: "Tax liability computation"
  },
  {
    id: 23,
    title: "Taxes Paid",
    description: "TDS, TCS, and advance tax details"
  },
  {
    id: 24,
    title: "Bank Accounts",
    description: "Multiple bank account details"
  },
  {
    id: 25,
    title: "Schedule AL - Assets & Liabilities",
    description: "Assets and liabilities (if income > ₹50L)"
  },
  {
    id: 26,
    title: "Schedule FA - Foreign Assets",
    description: "Foreign assets and income"
  },
  {
    id: 27,
    title: "Verification",
    description: "Final verification and submission"
  }
];
