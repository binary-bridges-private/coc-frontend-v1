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

export enum CompanyType {
  Private = "Private Limited Company",
  Public = "Public Limited Company",
  OnePersonCompany = "One Person Company",
  LimitedLiabilityPartnership = "Limited Liability Partnership",
}

export interface ShareholderDetail {
  slNo: number;
  shareholderName: string;
  pan: string;
  shares: number | string;
  percentage: number | string;
}

export interface DirectorDetail {
  slNo: number;
  directorName: string;
  din: string;
  pan: string;
  designation: string;
}

export interface BankAccount {
  ifscCode?: string;
  bankName?: string;
  accountNumber?: string;
  accountType?: AccountType | string;
  selectForRefund?: boolean;
}

export interface TaxPayment {
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
