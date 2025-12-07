export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
  NotSpecified = "NotSpecified",
}

export enum FilingSection {
  Sec139_1 = "139(1)",
  Sec139_4 = "139(4)",
  Sec139_5 = "139(5)",
  Sec119_2b = "119(2)(b)",
  Response139_9 = "139(9)",
  Response142_1 = "142(1)",
  Response148 = "148",
  Response153C = "153C",
  NotApplicable = "NotApplicable",
}

export enum FilingStatus {
  OnOrBeforeDueDate = "On or before due date",
  Belated = "Belated",
  Revised = "Revised",
  ModifiedReturn = "Modified Return u/s 170A",
  DefectiveReturn = "Defective u/s 139(9)",
}

export enum TaxRegime {
  Old = "Old Regime",
  New115BAC = "New Regime u/s 115BAC",
}

export enum AccountType {
  Savings = "Savings",
  Current = "Current",
  Other = "Other",
}

export enum PropertyType {
  SelfOccupied = "Self-Occupied",
  LetOut = "Let Out",
  DeemedLetOut = "Deemed Let Out",
}

export interface ExemptAllowance {
  slNo: number;
  natureOfExemptAllowance: string;
  description?: string;

  amount: number | string;
}

export interface OtherSourceIncome {
  slNo: number;
  natureOfIncome: string;
  description?: string;
  amount: number | string;
}

export interface RetirementBenefitQuarterly {
  period: string;
  amount: number | string;
}

export interface DividendIncomeQuarterly {
  period: string;
  amount: number | string;
}

export interface ExemptIncome {
  slNo: number;
  natureOfIncome: string;
  description?: string;
  amount: number | string;
}

export interface BankAccount {
  ifscCode?: string;
  bankName?: string;
  accountNumber?: string;
  accountType?: AccountType | string;
  selectForRefund?: boolean;
}

export interface AdvanceTaxPayment {
  assessmentYear?: string;
  challanSerialNumber?: string;
  amountPaid?: number | string;
  dateOfDeposit?: string;
  bsrCode?: string;
}

export interface TDSDetail {
  tanPanAadhar?: string;
  deductorName?: string;
  section?: string;
  grossAmount?: number | string;
  yearOfDeduction?: string;
  taxDeducted?: number | string;
  taxCreditClaimed?: number | string;
}

export type StepStatus = "pending" | "in-progress" | "completed";

export interface ItrStep {
  id: number;
  title: string;
  caption?: string;
}

export interface ItrSummarySection {
  id: string;
  title: string;
  description: string;
  amountLabel?: string;
  amountValue?: string;
  statusText?: string;
  status: StepStatus;
}

export interface ItrOneFormData {
  pan?: string;
  aadhar?: string;
  aadhaarEnrolmentId?: string;

  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: string;

  gender?: Gender | string;
  residentialStatus?: string;

  email?: string;
  mobileNumber?: string;

  address?: string;
  flatDoorBlockNo?: string;
  nameOfPremises?: string;
  roadStreetPostOffice?: string;
  areaLocality?: string;
  city?: string;
  state?: string;
  pincode?: string;
  noZipCode?: boolean;
  zipCode?: string;
  country?: string;

  natureOfEmployment?: string;

  optingOut115BAC?: boolean;
  form10IEADate?: string;
  form10IEAAckNumber?: string;

  filingUnderSeventhProviso?: boolean;
  depositedOver1Crore?: boolean;
  depositedAmount?: number | string;
  foreignTravelOver2Lakh?: boolean;
  foreignTravelAmount?: number | string;
  foreignTravelExpenditure?: number | string;
  electricityOver1Lakh?: boolean;
  electricityAmount?: number | string;
  electricityExpenditure?: number | string;
  otherSeventhProvisoConditions?: string;

  filingUnderOtherSeventhProvisoConditions?: boolean;
  tdsTcsAggregate25ThousandOrMore?: boolean;
  savingsBankDeposit50LakhOrMore?: boolean;

  businessTurnoverOver60Lakh?: boolean;
  professionReceiptsOver10Lakh?: boolean;
  tdsTcsOver25Thousand?: boolean;
  savingsDepositOver50Lakh?: boolean;

  filedUnderSection?: FilingSection | string;
  filedInResponseToNotice?: FilingSection | string;
  receiptNumber?: string;
  originalFilingDate?: string;
  noticeDIN?: string;
  noticeDate?: string;
  dueDateOfFiling?: string;

  salarySection17_1?: number | string;
  perquisitesSection17_2?: number | string;
  profitSection17_3?: number | string;
  retirementBenefitNotified?: number | string;
  retirementBenefitOther?: number | string;

  retirementBenefitNotifiedCountry?: string;
  retirementBenefitNotifiedAmount?: number | string;
  retirementBenefitOtherCountry?: string;
  retirementBenefitOtherAmount?: number | string;
  retirementBenefitNotifiedQuarterly?: RetirementBenefitQuarterly[];

  exemptAllowances?: number | string;
  exemptAllowancesDetailed?: ExemptAllowance[];
  reliefFromTaxation89A?: number | string;

  netSalary?: number | string;

  standardDeduction16?: number | string;
  entertainmentAllowance?: number | string;
  professionalTax?: number | string;

  incomeChargeableSalaries?: number | string;

  propertyType?: PropertyType | string;

  grossRent?: number | string;

  localTaxPaid?: number | string;

  annualValue?: number | string;

  standardDeduction30Percent?: number | string;

  interestBorrowedCapital?: number | string;

  arrearsUnrealisedRent?: number | string;

  totalHousePropertyIncome?: number | string;

  otherSourcesIncome?: number | string;
  otherSourcesIncomeDetailed?: OtherSourceIncome[];

  otherSource1Nature?: string;
  otherSource1Description?: string;
  otherSource1Amount?: number | string;
  otherSource2Nature?: string;
  otherSource2Description?: string;
  otherSource2Amount?: number | string;
  otherSource3Nature?: string;
  otherSource3Description?: string;
  otherSource3Amount?: number | string;
  otherSource4Nature?: string;
  otherSource4Description?: string;
  otherSource4Amount?: number | string;

  retirementBenefitNonNotifiedCountry?: number | string;

  retirementBenefitUSA?: number | string;
  retirementBenefitUK?: number | string;
  retirementBenefitCanada?: number | string;

  retirementBenefitQ1?: number | string;
  retirementBenefitQ2?: number | string;
  retirementBenefitQ3?: number | string;
  retirementBenefitQ4?: number | string;
  retirementBenefitQ5?: number | string;

  dividendQ1?: number | string;
  dividendQ2?: number | string;
  dividendQ3?: number | string;
  dividendQ4?: number | string;
  dividendQ5?: number | string;

  reliefFromTaxation89AOtherSources?: number | string;

  deduction57iia?: number | string;

  grossTotalIncome?: number | string;

  agriculturalIncome?: number | string;

  section80C?: number | string;
  section80CCC?: number | string;
  section80CCD1?: number | string;
  section80CCD1B?: number | string;
  pranTaxpayer?: string;
  section80CCD2?: number | string;
  section80CCG?: number | string;
  pranTaxpayer80CCG?: string;

  section80D?: number | string;
  section80DHealthInsurance?: number | string;
  section80DMedicalExpenditure?: number | string;
  section80DPreventiveCheckup?: number | string;

  section80DD?: number | string;
  section80DDB?: number | string;
  specifiedDiseaseName?: string;

  section80E?: number | string;
  section80EE?: number | string;
  section80EEA?: number | string;
  section80EEB?: number | string;
  section80G?: number | string;
  section80GG?: number | string;
  form10BAAckNumber?: string;
  section80GGA?: number | string;
  section80GGC?: number | string;
  section80QQB?: number | string;
  section80RRB?: number | string;
  section80TTA?: number | string;
  section80TTB?: number | string;
  section80U?: number | string;
  section80CCH?: number | string;
  anyOtherDeductions?: number | string;

  grossTotalIncomeWith112A?: number | string;
  totalDeductions?: number | string;
  totalIncome?: number | string;

  exemptIncome?: ExemptIncome[];
  totalExemptIncome?: number | string;

  ltcg112ATotalSaleConsideration?: number | string;
  ltcg112ATotalCostOfAcquisition?: number | string;
  ltcg112ALongTermCapitalGains?: number | string;

  taxPayableOnTotalIncome?: number | string;
  rebate87A?: number | string;
  taxPayableAfterRebate?: number | string;
  healthAndEducationCess?: number | string;
  totalTaxAndCess?: number | string;
  relief89?: number | string;
  relief89A?: number | string;
  balanceTaxAfterRelief?: number | string;

  interest234A?: number | string;
  interest234B?: number | string;
  interest234C?: number | string;
  fee234F?: number | string;
  totalInterestFeePayable?: number | string;
  totalTaxFeeAndInterest?: number | string;

  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  accountType?: AccountType | string;

  bankAccounts?: BankAccount[];

  verificationMethod?: string;
  verificationDate?: string;
  verificationMonth?: string;
  verificationYear?: string;
  placeOfFiling?: string;

  advanceTaxPayments?: AdvanceTaxPayment[];
  tdsDetails?: TDSDetail[];
}
