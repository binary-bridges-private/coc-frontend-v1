export interface ITR1ExportData {
  // Personal Information
  assessmentYear?: string;
  pan?: string;
  aadhar?: string;
  aadhaarEnrolmentId?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  residentialStatus?: string;
  email?: string;
  mobileNumber?: string;
  
  // Address Details
  flatDoorBlockNo?: string;
  nameOfPremises?: string;
  roadStreetPostOffice?: string;
  areaLocality?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  noZipCode?: boolean;
  zipCode?: string;
  
  // Bank Details
  bankName?: string;
  bankAccountNumber?: string;
  bankIFSCCode?: string;
  
  // Employment & Filing Details
  natureOfEmployment?: string;
  filingStatus?: string;
  taxRegime?: string;
  filedInResponseToNotice?: boolean;
  responseNoticeSection?: string;
  isRevisedOrDefective?: boolean;
  originalReceiptNumber?: string;
  originalFilingDate?: string;
  noticeUniqueDIN?: string;
  optingOut115BAC?: boolean;
  form10IEAckNumber?: string;
  form10IEAckDate?: string;
  
  // Seventh Proviso Details
  filingUnderSeventhProviso?: boolean;
  foreignTravelExpenditure?: number;
  electricityExpenditure?: number;
  filingUnderOtherSeventhProvisoConditions?: boolean;
  tdsTcsAggregate25ThousandOrMore?: boolean;
  savingsBankDeposit50LakhOrMore?: boolean;
  
  // Salary Income (Section 17)
  salarySection17_1?: number;
  perquisitesSection17_2?: number;
  profitSection17_3?: number;
  retirementBenefitNotified?: number;
  retirementBenefitOther?: number;
  
  // Exempt Allowances
  exemptAllowances?: number;
  reliefFromTaxation89A?: number;
  
  // Salary Deductions (Section 16)
  standardDeduction16?: number;
  entertainmentAllowance?: number;
  professionalTax?: number;
  
  // House Property Income
  propertySelfOccupied?: boolean;
  propertyLetOut?: boolean;
  propertyDeemedLetOut?: boolean;
  grossRent?: number;
  localTaxPaid?: number;
  annualValue?: number;
  standardDeduction30Percent?: number;
  interestBorrowedCapital?: number;
  arrearsUnrealisedRent?: number;
  
  // Other Sources Income
  otherSource1Nature?: string;
  otherSource1Description?: string;
  otherSource1Amount?: number;
  otherSource2Nature?: string;
  otherSource2Description?: string;
  otherSource2Amount?: number;
  otherSource3Nature?: string;
  otherSource3Description?: string;
  otherSource3Amount?: number;
  otherSource4Nature?: string;
  otherSource4Description?: string;
  otherSource4Amount?: number;
  
  // Retirement Benefits
  retirementBenefitNonNotifiedCountry?: number;
  retirementBenefitUSA?: number;
  retirementBenefitUK?: number;
  retirementBenefitCanada?: number;
  retirementBenefitQ1?: number;
  retirementBenefitQ2?: number;
  retirementBenefitQ3?: number;
  retirementBenefitQ4?: number;
  retirementBenefitQ5?: number;
  
  // Dividend Income (Quarterly)
  dividendQ1?: number;
  dividendQ2?: number;
  dividendQ3?: number;
  dividendQ4?: number;
  dividendQ5?: number;
  
  // Other Sources Deductions
  reliefFromTaxation89AOtherSources?: number;
  deduction57iia?: number;
  
  // Agricultural Income
  agriculturalIncome?: number;
  
  // Section 80C Deductions
  section80C?: number;
  section80CCC?: number;
  section80CCD1?: number;
  section80CCD1B?: number;
  pranTaxpayer?: string;
  section80CCD2?: number;
  
  // Health & Medical Deductions
  section80D?: number;
  section80DD?: number;
  section80DDB?: number;
  specifiedDiseaseName?: string;
  
  // Interest on Loan Deductions
  section80E?: number;
  section80EE?: number;
  section80EEA?: number;
  section80EEB?: number;
  
  // Donation & Rent Deductions
  section80G?: number;
  section80GG?: number;
  form10BAAckNumber?: string;
  section80GGA?: number;
  section80GGC?: number;
  
  // Interest Income Deductions
  section80TTA?: number;
  section80TTB?: number;
  
  // Other Deductions
  section80U?: number;
  section80CCH?: number;
  anyOtherDeductions?: number;
  
  // Calculated Totals
  grossSalaryIncome?: number;
  netSalaryIncome?: number;
  housePropertyIncome?: number;
  otherSourcesIncome?: number;
  grossTotalIncome?: number;
  totalDeductions?: number;
  totalIncome?: number;
  
  // Tax Computation
  taxPayableOnTotalIncome?: number;
  rebate87A?: number;
  taxPayableAfterRebate?: number;
  healthAndEducationCess?: number;
  totalTaxAndCess?: number;
  relief89?: number;
  balanceTaxAfterRelief?: number;
  
  // Interest and Fees
  interest234A?: number;
  interest234B?: number;
  interest234C?: number;
  fee234F?: number;
  totalInterestFee?: number;
  totalTaxFeeInterest?: number;
  
  // LTCG u/s 112A
  ltcgSaleConsideration112A?: number;
  ltcgCostOfAcquisition112A?: number;
  
  // Exempt Income
  exemptIncomeNature1?: string;
  exemptIncomeDescription1?: string;
  exemptIncome1?: number;
  exemptIncomeNature2?: string;
  exemptIncomeDescription2?: string;
  exemptIncome2?: number;
}


export const convertToCSV = (data: ITR1ExportData): string => {
  const headers = [
    // Section A - Personal Information
    "Assessment Year",
    "PAN",
    "Aadhaar Number",
    "Aadhaar Enrolment ID",
    "First Name",
    "Middle Name",
    "Last Name",
    "Date of Birth",
    "Gender",
    "Residential Status",
    "Email",
    "Mobile Number",
    
    // Address
    "Flat/Door/Block No",
    "Name of Premises/Building",
    "Road/Street/Post Office",
    "Area/Locality",
    "City",
    "State",
    "Pincode",
    "Country",
    "No Zip Code",
    "Zip Code",
    
    // Bank Details
    "Bank Name",
    "Bank Account Number",
    "Bank IFSC Code",
    
    // Employment & Filing
    "Nature of Employment",
    "Filing Status",
    "Tax Regime",
    "Filed in Response to Notice",
    "Response Notice Section",
    "Is Revised/Defective",
    "Original Receipt Number",
    "Original Filing Date",
    "Notice Unique DIN",
    "Opting Out 115BAC",
    "Form 10-IE Ack Number",
    "Form 10-IE Ack Date",
    
    // Seventh Proviso
    "Filing Under Seventh Proviso",
    "Foreign Travel Expenditure",
    "Electricity Expenditure",
    "Other Seventh Proviso Conditions",
    "TDS/TCS Aggregate ≥25,000",
    "Savings Bank Deposit ≥50 Lakh",
    
    // Salary Income
    "Salary u/s 17(1)",
    "Perquisites u/s 17(2)",
    "Profits in Lieu u/s 17(3)",
    "Retirement Benefit (Notified)",
    "Retirement Benefit (Other)",
    
    // Exempt Allowances
    "Exempt Allowances Total",
    "Relief from Taxation u/s 89A",
    
    // Salary Deductions
    "Standard Deduction u/s 16(ia)",
    "Entertainment Allowance u/s 16(ii)",
    "Professional Tax u/s 16(iii)",
    
    // House Property
    "Property Self-Occupied",
    "Property Let-Out",
    "Property Deemed Let-Out",
    "Gross Rent Received",
    "Local Tax Paid",
    "Annual Value",
    "30% Standard Deduction",
    "Interest on Borrowed Capital",
    "Arrears/Unrealised Rent",
    
    // Other Sources - Table Entries
    "Other Source 1 - Nature",
    "Other Source 1 - Description",
    "Other Source 1 - Amount",
    "Other Source 2 - Nature",
    "Other Source 2 - Description",
    "Other Source 2 - Amount",
    "Other Source 3 - Nature",
    "Other Source 3 - Description",
    "Other Source 3 - Amount",
    "Other Source 4 - Nature",
    "Other Source 4 - Description",
    "Other Source 4 - Amount",
    
    // Retirement Benefits
    "Retirement Benefit (Non-Notified Country)",
    "Retirement Benefit (USA)",
    "Retirement Benefit (UK)",
    "Retirement Benefit (Canada)",
    "Retirement Benefit Q1",
    "Retirement Benefit Q2",
    "Retirement Benefit Q3",
    "Retirement Benefit Q4",
    "Retirement Benefit Q5",
    
    // Dividend Income
    "Dividend Q1 (Upto 15-Jun)",
    "Dividend Q2 (16-Jun to 15-Sep)",
    "Dividend Q3 (16-Sep to 15-Dec)",
    "Dividend Q4 (16-Dec to 15-Mar)",
    "Dividend Q5 (16-Mar to 31-Mar)",
    
    // Other Sources Deductions
    "Relief u/s 89A (Other Sources)",
    "Deduction u/s 57(iia)",
    
    // Agricultural Income
    "Agricultural Income",
    
    // Deductions - Section 80C
    "Section 80C",
    "Section 80CCC",
    "Section 80CCD(1)",
    "Section 80CCD(1B)",
    "PRAN Taxpayer",
    "Section 80CCD(2)",
    
    // Deductions - Health
    "Section 80D",
    "Section 80DD",
    "Section 80DDB",
    "Specified Disease Name",
    
    // Deductions - Interest
    "Section 80E",
    "Section 80EE",
    "Section 80EEA",
    "Section 80EEB",
    
    // Deductions - Donations
    "Section 80G",
    "Section 80GG",
    "Form 10BA Ack Number",
    "Section 80GGA",
    "Section 80GGC",
    
    // Deductions - Interest Income
    "Section 80TTA",
    "Section 80TTB",
    
    // Deductions - Other
    "Section 80U",
    "Section 80CCH",
    "Any Other Deductions",
    
    // Calculated Totals
    "Gross Salary Income",
    "Net Salary Income",
    "House Property Income",
    "Other Sources Income",
    "Gross Total Income",
    "Total Deductions",
    "Total Income (After Deductions)",
    
    // Tax Computation
    "Tax Payable on Total Income",
    "Rebate u/s 87A",
    "Tax Payable After Rebate",
    "Health & Education Cess (4%)",
    "Total Tax and Cess",
    "Relief u/s 89",
    "Balance Tax After Relief",
    
    // Interest and Fees
    "Interest u/s 234A",
    "Interest u/s 234B",
    "Interest u/s 234C",
    "Fee u/s 234F",
    "Total Interest & Fee",
    "Total Tax, Fee & Interest",
    
    // LTCG
    "LTCG Sale Consideration u/s 112A",
    "LTCG Cost of Acquisition u/s 112A",
    
    // Exempt Income
    "Exempt Income 1 - Nature",
    "Exempt Income 1 - Description",
    "Exempt Income 1 - Amount",
    "Exempt Income 2 - Nature",
    "Exempt Income 2 - Description",
    "Exempt Income 2 - Amount",
  ];

  const values = [
    // Personal Information
    data.assessmentYear || "",
    data.pan || "",
    data.aadhar || "",
    data.aadhaarEnrolmentId || "",
    data.firstName || "",
    data.middleName || "",
    data.lastName || "",
    data.dateOfBirth || "",
    data.gender || "",
    data.residentialStatus || "",
    data.email || "",
    data.mobileNumber || "",
    
    // Address
    data.flatDoorBlockNo || "",
    data.nameOfPremises || "",
    data.roadStreetPostOffice || "",
    data.areaLocality || "",
    data.city || "",
    data.state || "",
    data.pincode || "",
    data.country || "",
    data.noZipCode ? "Yes" : "No",
    data.zipCode || "",
    
    // Bank Details
    data.bankName || "",
    data.bankAccountNumber || "",
    data.bankIFSCCode || "",
    
    // Employment & Filing
    data.natureOfEmployment || "",
    data.filingStatus || "",
    data.taxRegime || "",
    data.filedInResponseToNotice ? "Yes" : "No",
    data.responseNoticeSection || "",
    data.isRevisedOrDefective ? "Yes" : "No",
    data.originalReceiptNumber || "",
    data.originalFilingDate || "",
    data.noticeUniqueDIN || "",
    data.optingOut115BAC ? "Yes" : "No",
    data.form10IEAckNumber || "",
    data.form10IEAckDate || "",
    
    // Seventh Proviso
    data.filingUnderSeventhProviso ? "Yes" : "No",
    data.foreignTravelExpenditure || 0,
    data.electricityExpenditure || 0,
    data.filingUnderOtherSeventhProvisoConditions ? "Yes" : "No",
    data.tdsTcsAggregate25ThousandOrMore ? "Yes" : "No",
    data.savingsBankDeposit50LakhOrMore ? "Yes" : "No",
    
    // Salary Income
    data.salarySection17_1 || 0,
    data.perquisitesSection17_2 || 0,
    data.profitSection17_3 || 0,
    data.retirementBenefitNotified || 0,
    data.retirementBenefitOther || 0,
    
    // Exempt Allowances
    data.exemptAllowances || 0,
    data.reliefFromTaxation89A || 0,
    
    // Salary Deductions
    data.standardDeduction16 || 0,
    data.entertainmentAllowance || 0,
    data.professionalTax || 0,
    
    // House Property
    data.propertySelfOccupied ? "Yes" : "No",
    data.propertyLetOut ? "Yes" : "No",
    data.propertyDeemedLetOut ? "Yes" : "No",
    data.grossRent || 0,
    data.localTaxPaid || 0,
    data.annualValue || 0,
    data.standardDeduction30Percent || 0,
    data.interestBorrowedCapital || 0,
    data.arrearsUnrealisedRent || 0,
    
    // Other Sources
    data.otherSource1Nature || "",
    data.otherSource1Description || "",
    data.otherSource1Amount || 0,
    data.otherSource2Nature || "",
    data.otherSource2Description || "",
    data.otherSource2Amount || 0,
    data.otherSource3Nature || "",
    data.otherSource3Description || "",
    data.otherSource3Amount || 0,
    data.otherSource4Nature || "",
    data.otherSource4Description || "",
    data.otherSource4Amount || 0,
    
    // Retirement Benefits
    data.retirementBenefitNonNotifiedCountry || 0,
    data.retirementBenefitUSA || 0,
    data.retirementBenefitUK || 0,
    data.retirementBenefitCanada || 0,
    data.retirementBenefitQ1 || 0,
    data.retirementBenefitQ2 || 0,
    data.retirementBenefitQ3 || 0,
    data.retirementBenefitQ4 || 0,
    data.retirementBenefitQ5 || 0,
    
    // Dividend Income
    data.dividendQ1 || 0,
    data.dividendQ2 || 0,
    data.dividendQ3 || 0,
    data.dividendQ4 || 0,
    data.dividendQ5 || 0,
    
    // Other Sources Deductions
    data.reliefFromTaxation89AOtherSources || 0,
    data.deduction57iia || 0,
    
    // Agricultural Income
    data.agriculturalIncome || 0,
    
    // Deductions
    data.section80C || 0,
    data.section80CCC || 0,
    data.section80CCD1 || 0,
    data.section80CCD1B || 0,
    data.pranTaxpayer || "",
    data.section80CCD2 || 0,
    data.section80D || 0,
    data.section80DD || 0,
    data.section80DDB || 0,
    data.specifiedDiseaseName || "",
    data.section80E || 0,
    data.section80EE || 0,
    data.section80EEA || 0,
    data.section80EEB || 0,
    data.section80G || 0,
    data.section80GG || 0,
    data.form10BAAckNumber || "",
    data.section80GGA || 0,
    data.section80GGC || 0,
    data.section80TTA || 0,
    data.section80TTB || 0,
    data.section80U || 0,
    data.section80CCH || 0,
    data.anyOtherDeductions || 0,
    
    // Calculated Totals
    data.grossSalaryIncome || 0,
    data.netSalaryIncome || 0,
    data.housePropertyIncome || 0,
    data.otherSourcesIncome || 0,
    data.grossTotalIncome || 0,
    data.totalDeductions || 0,
    data.totalIncome || 0,
    
    // Tax Computation
    data.taxPayableOnTotalIncome || 0,
    data.rebate87A || 0,
    data.taxPayableAfterRebate || 0,
    data.healthAndEducationCess || 0,
    data.totalTaxAndCess || 0,
    data.relief89 || 0,
    data.balanceTaxAfterRelief || 0,
    
    // Interest and Fees
    data.interest234A || 0,
    data.interest234B || 0,
    data.interest234C || 0,
    data.fee234F || 0,
    data.totalInterestFee || 0,
    data.totalTaxFeeInterest || 0,
    
    // LTCG
    data.ltcgSaleConsideration112A || 0,
    data.ltcgCostOfAcquisition112A || 0,
    
    // Exempt Income
    data.exemptIncomeNature1 || "",
    data.exemptIncomeDescription1 || "",
    data.exemptIncome1 || 0,
    data.exemptIncomeNature2 || "",
    data.exemptIncomeDescription2 || "",
    data.exemptIncome2 || 0,
  ];

 
  const escapeCSVValue = (value: any): string => {
    if (value === null || value === undefined) return "";
    const stringValue = String(value);
    if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  const csvHeaders = headers.map(escapeCSVValue).join(",");
  const csvValues = values.map(escapeCSVValue).join(",");

  return `${csvHeaders}\n${csvValues}`;
};

export const downloadCSV = (csvContent: string, filename: string = "ITR-1-Form-Data.csv"): void => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};


export const exportITR1ToCSV = (formData: ITR1ExportData): void => {
  const csvContent = convertToCSV(formData);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
  const filename = `ITR-1_${formData.pan || "Unknown"}_${timestamp}.csv`;
  downloadCSV(csvContent, filename);
};
