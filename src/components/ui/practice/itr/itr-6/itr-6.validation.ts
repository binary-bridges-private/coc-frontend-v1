import { z } from "zod";
import { FilingStatus, TaxRegime, CompanyType, AccountType, FilingSection } from "./itr-6.types.ts";

export const companyInformationSchema = z.object({
  assessmentYear: z.string().min(1, "Assessment year is required"),
  pan: z.string()
    .length(10, "PAN must be exactly 10 characters")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN format should be like ABCDE1234F"),
  cin: z.string()
    .length(21, "CIN must be exactly 21 characters")
    .regex(/^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/, "Invalid CIN format"),
  companyName: z.string().min(2, "Company name is required"),
  companyType: z.nativeEnum(CompanyType),
  dateOfIncorporation: z.string().min(1, "Date of incorporation is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  email: z.string().email("Invalid email address"),
  email2: z.string().email("Invalid email address").optional().or(z.literal("")),
  mobileNumber: z.string()
    .length(10, "Mobile number must be exactly 10 digits")
    .regex(/^[6-9][0-9]{9}$/, "Invalid mobile number format"),
  mobileNumber2: z.string().optional().or(z.literal("")),
  officePhone: z.string().optional().or(z.literal("")),
  registeredAddress: z.string().min(5, "Registered address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string()
    .length(6, "Pincode must be exactly 6 digits")
    .regex(/^[1-9][0-9]{5}$/, "Invalid pincode format"),
  country: z.string().min(2, "Country is required"),
  bankName: z.string().min(2, "Bank name is required"),
  bankAccountNumber: z.string().min(8, "Bank account number is required"),
  bankIFSCCode: z.string()
    .length(11, "IFSC code must be exactly 11 characters")
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format"),
  accountType: z.nativeEnum(AccountType),
  filingStatus: z.nativeEnum(FilingStatus),
  taxRegime: z.nativeEnum(TaxRegime),
  dueDateForFiling: z.string().optional().or(z.literal("")),
  filedInResponseToNotice: z.boolean().optional(),
  isRevisedOrDefective: z.boolean().optional(),
  originalReceiptNumber: z.string().optional().or(z.literal("")),
  originalFilingDate: z.string().optional().or(z.literal("")),
  responseNoticeSection: z.string().optional().or(z.literal("")),
  noticeUniqueDIN: z.string().optional().or(z.literal("")),
  previousReturnFiled: z.boolean().optional(),
  businessOrProfessionIncome: z.boolean().optional(),
  capitalGains: z.boolean().optional(),
  otherIncome: z.boolean().optional(),
  authorizedSignatoryName: z.string().min(2, "Authorized signatory name is required"),
  designation: z.string().min(2, "Designation is required"),
  place: z.string().min(2, "Place is required"),
  dateOfSignature: z.string().optional().or(z.literal("")),
  // Manufacturing Status
  isNewManufacturingCoop: z.boolean().optional(),
  exercisedOption115BAE: z.boolean().optional(),
  form10IADate: z.string().optional().or(z.literal("")),
  form10IANumber: z.string().optional().or(z.literal("")),
  // Entity Status & Recognition
  residentialStatus: z.string().optional().or(z.literal("")),
  hasUnitOnIFSC: z.boolean().optional(),
  ifscUnitRegistration: z.string().optional().or(z.literal("")),
  isRecognizedStartup: z.boolean().optional(),
  startupRegistration: z.string().optional().or(z.literal("")),
  isRecognizedMSME: z.boolean().optional(),
  msmeRegistration: z.string().optional().or(z.literal("")),
  // International Operations
  hasPermanentEstablishmentAbroad: z.boolean().optional(),
  peCountry: z.string().optional().or(z.literal("")),
  peNature: z.string().optional().or(z.literal("")),
  hasSignificantEconomicPresence: z.boolean().optional(),
  sepDetails: z.string().optional().or(z.literal("")),
  isFIIOrFPI: z.boolean().optional(),
  sebiRegistration: z.string().optional().or(z.literal("")),
  // Representative Assessee
  isRepresentativeAssessee: z.boolean().optional(),
  representativeAsseeName: z.string().optional().or(z.literal("")),
  representativeCapacity: z.string().optional().or(z.literal("")),
  representativeAddress: z.string().optional().or(z.literal("")),
  representativePAN: z.string().optional().or(z.literal("")),
  hasFiledDirectorCertification: z.boolean().optional(),
  directorCertificationNumber: z.string().optional().or(z.literal("")),
  // LEI Details
  leiNumber: z.string().optional().or(z.literal("")),
  leiValidUpToDate: z.string().optional().or(z.literal("")),
  // Accounting & Audit Information
  liableToMaintainAccounts44AA: z.string().optional().or(z.literal("")),
  maintainsBooksUnderSection44AD: z.boolean().optional(),
  turnoverDetailsProvided: z.boolean().optional(),
  maxTurnoverThreshold: z.string().optional().or(z.literal("")),
  capitalAccountReceipts: z.string().optional().or(z.literal("")),
  capitalAccountChequeDD: z.boolean().optional(),
  // Audit Details
  liableForAudit44AB: z.string().optional().or(z.literal("")),
  accountsAuditedByCA: z.string().optional().or(z.literal("")),
  auditReportFurnishDate: z.string().optional().or(z.literal("")),
  auditorName: z.string().optional().or(z.literal("")),
  auditorMembershipNumber: z.string().optional().or(z.literal("")),
  auditorFirmName: z.string().optional().or(z.literal("")),
  auditorFirmRegistration: z.string().optional().or(z.literal("")),
  auditorPAN: z.string().optional().or(z.literal("")),
  auditReportDate: z.string().optional().or(z.literal("")),
  auditReportAckNumber: z.string().optional().or(z.literal("")),
  auditorUDIN: z.string().optional().or(z.literal("")),
  liableForAudit927E: z.boolean().optional(),
  accountsAuditedUnder92E: z.string().optional().or(z.literal("")),
  audit92EFurnishDate: z.string().optional().or(z.literal("")),
  audit92EAckNumber: z.string().optional().or(z.literal("")),
  liableForOtherAuditReport: z.boolean().optional(),
  otherAuditReports: z.array(
    z.object({
      sectionCode: z.string().optional().or(z.literal("")),
      date: z.string().optional().or(z.literal("")),
      ackNumber: z.string().optional().or(z.literal("")),
    })
  ).optional(),
  // Partners/Members Information
  hasPartnershipChanges: z.boolean().optional(),
  partners: z.array(
    z.object({
      name: z.string().optional().or(z.literal("")),
      status: z.string().optional().or(z.literal("")),
      pan: z.string().optional().or(z.literal("")),
      admissionDate: z.string().optional().or(z.literal("")),
      remuneration: z.number().optional().or(z.literal(0)),
      sharePercentage: z.number().optional().or(z.literal(0)),
    })
  ).optional(),
  // AOP/BOI Information
  isAOPOrBOI: z.boolean().optional(),
  foreignCompanySharePercentage: z.number().optional(),
  doesForeignEntityExceedLimit: z.boolean().optional(),
  excessSharePercentage: z.number().optional(),
  // Beneficiaries & Trust Details
  hasBeneficiaryDetails: z.boolean().optional(),
  beneficiaries: z.array(
    z.object({
      nameAddress: z.string().optional().or(z.literal("")),
      sharePercentage: z.number().optional().or(z.literal(0)),
      pan: z.string().optional().or(z.literal("")),
      aadhar: z.string().optional().or(z.literal("")),
      designatedPartner: z.string().optional().or(z.literal("")),
      status: z.string().optional().or(z.literal("")),
      interestRate: z.number().optional().or(z.literal(0)),
    })
  ).optional(),
  hasTrustBenefitDeclaredOrClaimed: z.boolean().optional(),
  isBenefitOfRelativesClaimInTrust: z.boolean().optional(),
  isTrustCreatedBehalf: z.boolean().optional(),
  // Nature of Business
  businessActivities: z.array(
    z.object({
      code: z.string().optional().or(z.literal("")),
      tradeName: z.string().optional().or(z.literal("")),
      description: z.string().optional().or(z.literal("")),
    })
  ).optional(),
}).refine(
  (data) => {
    // Only validate if isRevisedOrDefective is explicitly true
    if (data.isRevisedOrDefective === true) {
      return (data.originalReceiptNumber && data.originalReceiptNumber.trim() !== "") && 
             (data.originalFilingDate && data.originalFilingDate.trim() !== "");
    }
    return true;
  },
  {
    message: "Original Receipt Number and Filing Date are required when revised/defective is selected",
    path: ["originalReceiptNumber"],
  }
).refine(
  (data) => {
    // Only validate if filedInResponseToNotice is explicitly true
    if (data.filedInResponseToNotice === true) {
      return (data.responseNoticeSection && data.responseNoticeSection.trim() !== "") && 
             (data.noticeUniqueDIN && data.noticeUniqueDIN.trim() !== "");
    }
    return true;
  },
  {
    message: "Notice Section and DIN are required when filing in response to notice",
    path: ["responseNoticeSection"],
  }
);

export const financialInformationSchema = z.object({
  revenueFromOperations: z.number().min(0, "Revenue must be positive"),
  otherIncome: z.number().min(0, "Other income must be positive"),
  totalRevenue: z.number().min(0),
  costOfMaterialsConsumed: z.number().min(0, "Cost must be positive"),
  purchasesOfStockInTrade: z.number().min(0, "Purchases must be positive"),
  changesInInventories: z.number(),
  employeeBenefitExpense: z.number().min(0, "Expense must be positive"),
  financeExpense: z.number().min(0, "Finance expense must be positive"),
  depreciationAndAmortization: z.number().min(0, "Depreciation must be positive"),
  otherExpenses: z.number().min(0, "Other expenses must be positive"),
  totalExpenses: z.number().min(0),
  profitBeforeTax: z.number(),
  taxExpense: z.number().min(0),
  profitAfterTax: z.number(),
});

export const taxComputationSchema = z.object({
  profitBeforeTax: z.number(),
  additionsUnderIncomeTaxAct: z.number().min(0),
  deductionsUnderIncomeTaxAct: z.number().min(0),
  totalIncome: z.number(),
  taxRate: z.number().min(0).max(100),
  incomeTax: z.number().min(0),
  surcharge: z.number().min(0),
  healthAndEducationCess: z.number().min(0),
  totalTaxLiability: z.number().min(0),
  advanceTaxPaid: z.number().min(0),
  tdsCredited: z.number().min(0),
  selfAssessmentTax: z.number().min(0),
  totalTaxPaid: z.number().min(0),
  taxPayable: z.number(),
  interestUnderSection234A: z.number().min(0).optional(),
  interestUnderSection234B: z.number().min(0).optional(),
  interestUnderSection234C: z.number().min(0).optional(),
});

export const shareholdingSchema = z.object({
  numberOfDirectors: z.number().min(1, "At least one director is required"),
  numberOfShareholders: z.number().min(1, "At least one shareholder is required"),
  authorizedShareCapital: z.number().min(0, "Authorized capital must be positive"),
  paidUpShareCapital: z.number().min(0, "Paid-up capital must be positive"),
  faceValuePerShare: z.number().min(0, "Face value must be positive"),
  numberOfShares: z.number().min(1, "Number of shares must be at least 1"),
  reservesAndSurplus: z.number().min(0).optional(),
});

export const balanceSheetSchema = z.object({
  // Sources of Funds - Partners/Members Fund
  partnersCapital: z.number().optional().or(z.literal(0)),
  // Reserves and Surplus
  revaluationReserve: z.number().optional().or(z.literal(0)),
  capitalReserve: z.number().optional().or(z.literal(0)),
  statutoryReserve: z.number().optional().or(z.literal(0)),
  otherReserve: z.number().optional().or(z.literal(0)),
  creditBalancePL: z.number().optional().or(z.literal(0)),
  // Loan Funds - Secured Loans
  securedLoansForex: z.number().optional().or(z.literal(0)),
  rupeeLoansFromBanks: z.number().optional().or(z.literal(0)),
  rupeeLoansFromOthers: z.number().optional().or(z.literal(0)),
  // Loan Funds - Unsecured Loans
  unsecuredLoansForex: z.number().optional().or(z.literal(0)),
  unsecuredRupeeFromBanks: z.number().optional().or(z.literal(0)),
  unsecuredRupeeFromSpecified: z.number().optional().or(z.literal(0)),
  unsecuredRupeeFromOthers: z.number().optional().or(z.literal(0)),
  // Other Liabilities
  deferredTaxLiability: z.number().optional().or(z.literal(0)),
  // Advances
  advancesFromSpecified: z.number().optional().or(z.literal(0)),
  advancesFromOthers: z.number().optional().or(z.literal(0)),
  // Application of Funds - Fixed Assets
  grossBlock: z.number().optional().or(z.literal(0)),
  depreciation: z.number().optional().or(z.literal(0)),
  netBlock: z.number().optional().or(z.literal(0)),
  capitalWIP: z.number().optional().or(z.literal(0)),
  // Investments - Long-term
  listedEquities: z.number().optional().or(z.literal(0)),
  unlistedEquities: z.number().optional().or(z.literal(0)),
  preferenceShares: z.number().optional().or(z.literal(0)),
  govSecurities: z.number().optional().or(z.literal(0)),
  debentureBonds: z.number().optional().or(z.literal(0)),
  mutualFunds: z.number().optional().or(z.literal(0)),
  otherLTInvestments: z.number().optional().or(z.literal(0)),
  // Investments - Short-term
  stListedEquities: z.number().optional().or(z.literal(0)),
  stUnlistedEquities: z.number().optional().or(z.literal(0)),
  stPreferenceShares: z.number().optional().or(z.literal(0)),
  stGovSecurities: z.number().optional().or(z.literal(0)),
  stDebentureBonds: z.number().optional().or(z.literal(0)),
  stMutualFunds: z.number().optional().or(z.literal(0)),
  otherSTInvestments: z.number().optional().or(z.literal(0)),
  // Current Assets - Inventories
  rawMaterials: z.number().optional().or(z.literal(0)),
  workInProgress: z.number().optional().or(z.literal(0)),
  finishedGoods: z.number().optional().or(z.literal(0)),
  stockInTrade: z.number().optional().or(z.literal(0)),
  storesConsumables: z.number().optional().or(z.literal(0)),
  looseTools: z.number().optional().or(z.literal(0)),
  otherInventories: z.number().optional().or(z.literal(0)),
  // Current Assets - Sundry Debtors
  sundryd1Year: z.number().optional().or(z.literal(0)),
  sundryOthers: z.number().optional().or(z.literal(0)),
  // Current Assets - Cash & Bank Balances
  balanceWithBanks: z.number().optional().or(z.literal(0)),
  cashInHand: z.number().optional().or(z.literal(0)),
  otherCashBalances: z.number().optional().or(z.literal(0)),
  // Current Assets - Other
  otherCurrentAssets: z.number().optional().or(z.literal(0)),
  // Current Assets - Loans & Advances
  advancesRecoverable: z.number().optional().or(z.literal(0)),
  // Additional Deposits & Loans
  depositsToCorpAndOthers: z.number().optional().or(z.literal(0)),
  balanceWithRevenueAuth: z.number().optional().or(z.literal(0)),
  // Loans and Advances subsections
  loansForBusiness: z.number().optional().or(z.literal(0)),
  loansNotForBusiness: z.number().optional().or(z.literal(0)),
  // Current Liabilities - Sundry Creditors
  sundryCred1Year: z.number().optional().or(z.literal(0)),
  sundryCred1YearOthers: z.number().optional().or(z.literal(0)),
  sundryCred1YearTotal: z.number().optional().or(z.literal(0)),
  // Current Liabilities - Other items
  liabilityForLeased: z.number().optional().or(z.literal(0)),
  interestAccrued: z.number().optional().or(z.literal(0)),
  interestNotDue: z.number().optional().or(z.literal(0)),
  incomeReceivedAdvance: z.number().optional().or(z.literal(0)),
  otherPayables: z.number().optional().or(z.literal(0)),
  // Provisions
  provisionIncomeTax: z.number().optional().or(z.literal(0)),
  provisionEncashment: z.number().optional().or(z.literal(0)),
  provisionOthers: z.number().optional().or(z.literal(0)),
  // Misc and Deferred Tax
  miscExpenditureNotWritten: z.number().optional().or(z.literal(0)),
  deferredTaxAsset: z.number().optional().or(z.literal(0)),
  debitBalancePL: z.number().optional().or(z.literal(0)),
});

export const manufacturingAccountSchema = z.object({
  // Opening Inventory
  openingRawMaterial: z.number().optional().or(z.literal(0)),
  openingWorkInProgress: z.number().optional().or(z.literal(0)),
  // Purchases
  purchases: z.number().optional().or(z.literal(0)),
  // Direct Wages
  directWages: z.number().optional().or(z.literal(0)),
  // Direct Expenses
  carriageInward: z.number().optional().or(z.literal(0)),
  powerAndFuel: z.number().optional().or(z.literal(0)),
  otherDirectExpenses: z.number().optional().or(z.literal(0)),
  // Factory Overheads
  indirectWages: z.number().optional().or(z.literal(0)),
  factoryRent: z.number().optional().or(z.literal(0)),
  factoryInsurance: z.number().optional().or(z.literal(0)),
  factoryFuelPower: z.number().optional().or(z.literal(0)),
  factoryGeneralExpenses: z.number().optional().or(z.literal(0)),
  factoryDepreciation: z.number().optional().or(z.literal(0)),
  // Closing Stock
  closingRawMaterial: z.number().optional().or(z.literal(0)),
  closingWorkInProgress: z.number().optional().or(z.literal(0)),
});

export const tradingAccountSchema = z.object({
  // Revenue from Operations
  saleOfGoods: z.number().optional().or(z.literal(0)),
  saleOfServices: z.number().optional().or(z.literal(0)),
  otherOperatingRevenues: z.number().optional().or(z.literal(0)),
  // Duties and Taxes Receivable
  customExciseDuties: z.number().optional().or(z.literal(0)),
  serviceTax: z.number().optional().or(z.literal(0)),
  vatSalesTax: z.number().optional().or(z.literal(0)),
  cgst: z.number().optional().or(z.literal(0)),
  sgst: z.number().optional().or(z.literal(0)),
  igst: z.number().optional().or(z.literal(0)),
  utgst: z.number().optional().or(z.literal(0)),
  otherDutiesAndTax: z.number().optional().or(z.literal(0)),
  // Total Revenue
  totalRevenueFromOperations: z.number().optional().or(z.literal(0)),
  closingStockFinishedGoods: z.number().optional().or(z.literal(0)),
  // Opening Stock and Purchases
  openingStockFinishedGoods: z.number().optional().or(z.literal(0)),
  // Duties and Taxes Payable
  customDuty: z.number().optional().or(z.literal(0)),
  countervailingDuty: z.number().optional().or(z.literal(0)),
  specialAdditionalDuty: z.number().optional().or(z.literal(0)),
  unionExciseDuty: z.number().optional().or(z.literal(0)),
  serviceTaxPayable: z.number().optional().or(z.literal(0)),
  vatSalesTaxPayable: z.number().optional().or(z.literal(0)),
  cgstPayable: z.number().optional().or(z.literal(0)),
  sgstPayable: z.number().optional().or(z.literal(0)),
  igstPayable: z.number().optional().or(z.literal(0)),
  utgstPayable: z.number().optional().or(z.literal(0)),
  otherTaxPayable: z.number().optional().or(z.literal(0)),
  // Summary fields
  costOfGoodsProduced: z.number().optional().or(z.literal(0)),
  incomeFromIntradayTrading: z.number().optional().or(z.literal(0)),
});

export type CompanyInformationFormData = z.infer<typeof companyInformationSchema>;
export type FinancialInformationFormData = z.infer<typeof financialInformationSchema>;
export type TaxComputationFormData = z.infer<typeof taxComputationSchema>;
export type ShareholdingFormData = z.infer<typeof shareholdingSchema>;
export type BalanceSheetFormData = z.infer<typeof balanceSheetSchema>;
export type ManufacturingAccountFormData = z.infer<typeof manufacturingAccountSchema>;
export type TradingAccountFormData = z.infer<typeof tradingAccountSchema>;
