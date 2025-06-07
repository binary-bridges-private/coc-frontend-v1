import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  pan: string;
  aadhar: string;
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
  salarySection17_1: string;
  perquisitesSection17_2: string;
  profitSection17_3: string;
  notifiedCountry: string;
  retirementBenefitNotified: string;
  otherCountry: string;
  retirementBenefitOther: string;
  propertyType: string;
  grossRent: string;
  localTaxPaid: string;
  annualValue: string;
  standardDeduction: string;
  interestBorrowedCapital: string;
  arrearsRent: string;
  totalHousePropertyIncome: string;
  incomeOtherSources: string;
  agriculturalIncome: string;
  section80C: string;
  section80D: string;
  section80G: string;
  section80TTA: string;
  section80E: string;
  section80EE: string;
  section80EEA: string;
  section80EEB: string;
  section80GGA: string;
  section80GGC: string;
  section80U: string;
  totalIncome: string;
  totalDeductions: string;
  taxableIncome: string;
  taxPayable: string;
  surcharge: string;
  healthAndEducationCess: string;
  totalTaxLiability: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  verificationMethod: string;
  verificationDate: string;
  placeOfFiling: string;
  allowanceType: string;
  allowanceExemptAmount: string;
  reliefUnder89A: string;
  netSalary: string;
  standardDeduction16: string;
  entertainmentAllowance: string;
  professionalTax: string;
  totalSalaryIncome: string;
  otherIncomeType: string;
  otherIncomeAmount: string;
  q1Amount: string;
  q2Amount: string;
  q3Amount: string;
  q4Amount: string;
  familyPensionDeduction: string;
  otherIncomeRelief89A: string;
  totalOtherIncome: string;
  grossTotalSalary: string;
  grossTotalProperty: string;
  grossTotalOther: string;
  grossTotalIncome: string;
  lifeInsurancePremium: string;
  elssInvestment: string;
  ppfContribution: string;
  nscInvestment: string;
  sukanyaSamriddhi: string;
  homeLoanPrincipal: string;
  total80CDeduction: string;
  healthInsurancePremium: string;
  educationLoanInterest: string;
  donations: string;
  savingsInterest: string;
  taxableTotalIncome: string;
  section80CCD1: string;
  section80CCD2: string;
  section80CCH: string;
  section80DD: string;
  section80DDB: string;
  section80GG: string;
  section80TTB: string;
  otherDeductionParticulars: string;
  otherDeductionAmount: string;
  exemptIncomeType: string;
  exemptIncomeSection: string;
  exemptIncomeAmount: string;
  ltcgSaleConsideration: string;
  ltcgCostOfAcquisition: string;
  ltcgAmount: string;
  rebate87A: string;
  taxAfterRebate: string;
  totalTaxAndCess: string;
  relief89: string;
  interest234A: string;
  interest234B: string;
  interest234C: string;
  lateFilingFee234F: string;
  totalTaxFeeAndInterest: string;
  totalTaxesPaid: string;
  amountPayable: string;
  refund: string;
  bankAccounts: BankAccount[];
  advanceTaxPayments: AdvanceTaxPayment[];
  tdsDetails: TDSDetail[];
}

interface FormErrors {
  pan: string;
  aadhar: string;
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
  salarySection17_1: string;
  perquisitesSection17_2: string;
  profitSection17_3: string;
  notifiedCountry: string;
  retirementBenefitNotified: string;
  otherCountry: string;
  retirementBenefitOther: string;
  propertyType: string;
  grossRent: string;
  localTaxPaid: string;
  annualValue: string;
  standardDeduction: string;
  interestBorrowedCapital: string;
  arrearsRent: string;
  totalHousePropertyIncome: string;
  incomeOtherSources: string;
  agriculturalIncome: string;
  section80C: string;
  section80D: string;
  section80G: string;
  section80TTA: string;
  section80E: string;
  section80EE: string;
  section80EEA: string;
  section80EEB: string;
  section80GGA: string;
  section80GGC: string;
  section80U: string;
  totalIncome: string;
  totalDeductions: string;
  taxableIncome: string;
  taxPayable: string;
  surcharge: string;
  healthAndEducationCess: string;
  totalTaxLiability: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  verificationMethod: string;
  verificationDate: string;
  placeOfFiling: string;
  allowanceType: string;
  allowanceExemptAmount: string;
  reliefUnder89A: string;
  netSalary: string;
  standardDeduction16: string;
  entertainmentAllowance: string;
  professionalTax: string;
  totalSalaryIncome: string;
  otherIncomeType: string;
  otherIncomeAmount: string;
  q1Amount: string;
  q2Amount: string;
  q3Amount: string;
  q4Amount: string;
  familyPensionDeduction: string;
  otherIncomeRelief89A: string;
  totalOtherIncome: string;
  grossTotalSalary: string;
  grossTotalProperty: string;
  grossTotalOther: string;
  grossTotalIncome: string;
  lifeInsurancePremium: string;
  elssInvestment: string;
  ppfContribution: string;
  nscInvestment: string;
  sukanyaSamriddhi: string;
  homeLoanPrincipal: string;
  total80CDeduction: string;
  healthInsurancePremium: string;
  educationLoanInterest: string;
  donations: string;
  savingsInterest: string;
  taxableTotalIncome: string;
  section80CCD1: string;
  section80CCD2: string;
  section80CCH: string;
  section80DD: string;
  section80DDB: string;
  section80GG: string;
  section80TTB: string;
  otherDeductionParticulars: string;
  otherDeductionAmount: string;
  exemptIncomeType: string;
  exemptIncomeSection: string;
  exemptIncomeAmount: string;
  ltcgSaleConsideration: string;
  ltcgCostOfAcquisition: string;
  ltcgAmount: string;
  rebate87A: string;
  taxAfterRebate: string;
  totalTaxAndCess: string;
  relief89: string;
  interest234A: string;
  interest234B: string;
  interest234C: string;
  lateFilingFee234F: string;
  totalTaxFeeAndInterest: string;
  totalTaxesPaid: string;
  amountPayable: string;
  refund: string;
  bankAccounts: string;
  advanceTaxPayments: string;
  tdsDetails: string;
}

interface BankAccount {
  ifscCode: string;
  bankName: string;
  accountNumber: string;
  accountType: string;
  selectForRefund: boolean;
}

interface AdvanceTaxPayment {
  bsrCode: string;
  dateOfDeposit: string;
  challanSerialNumber: string;
  amountPaid: string;
}

interface TDSDetail {
  tanPanAadhar: string;
  deductorName: string;
  section: string;
  grossAmount: string;
  yearOfDeduction: string;
  taxDeducted: string;
  taxCreditClaimed: string;
}

const initialFormData: FormData = {
  pan: "",
  aadhar: "",
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
  salarySection17_1: "",
  perquisitesSection17_2: "",
  profitSection17_3: "",
  notifiedCountry: "",
  retirementBenefitNotified: "",
  otherCountry: "",
  retirementBenefitOther: "",
  propertyType: "",
  grossRent: "",
  localTaxPaid: "",
  annualValue: "",
  standardDeduction: "",
  interestBorrowedCapital: "",
  arrearsRent: "",
  totalHousePropertyIncome: "",
  incomeOtherSources: "",
  agriculturalIncome: "",
  section80C: "",
  section80D: "",
  section80G: "",
  section80TTA: "",
  section80E: "",
  section80EE: "",
  section80EEA: "",
  section80EEB: "",
  section80GGA: "",
  section80GGC: "",
  section80U: "",
  totalIncome: "",
  totalDeductions: "",
  taxableIncome: "",
  taxPayable: "",
  surcharge: "",
  healthAndEducationCess: "",
  totalTaxLiability: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  accountType: "",
  verificationMethod: "",
  verificationDate: "",
  placeOfFiling: "",
  allowanceType: "",
  allowanceExemptAmount: "",
  reliefUnder89A: "",
  netSalary: "",
  standardDeduction16: "",
  entertainmentAllowance: "",
  professionalTax: "",
  totalSalaryIncome: "",
  otherIncomeType: "",
  otherIncomeAmount: "",
  q1Amount: "",
  q2Amount: "",
  q3Amount: "",
  q4Amount: "",
  familyPensionDeduction: "",
  otherIncomeRelief89A: "",
  totalOtherIncome: "",
  grossTotalSalary: "",
  grossTotalProperty: "",
  grossTotalOther: "",
  grossTotalIncome: "",
  lifeInsurancePremium: "",
  elssInvestment: "",
  ppfContribution: "",
  nscInvestment: "",
  sukanyaSamriddhi: "",
  homeLoanPrincipal: "",
  total80CDeduction: "",
  healthInsurancePremium: "",
  educationLoanInterest: "",
  donations: "",
  savingsInterest: "",
  taxableTotalIncome: "",
  section80CCD1: "",
  section80CCD2: "",
  section80CCH: "",
  section80DD: "",
  section80DDB: "",
  section80GG: "",
  section80TTB: "",
  otherDeductionParticulars: "",
  otherDeductionAmount: "",
  exemptIncomeType: "",
  exemptIncomeSection: "",
  exemptIncomeAmount: "",
  ltcgSaleConsideration: "",
  ltcgCostOfAcquisition: "",
  ltcgAmount: "",
  rebate87A: "",
  taxAfterRebate: "",
  totalTaxAndCess: "",
  relief89: "",
  interest234A: "",
  interest234B: "",
  interest234C: "",
  lateFilingFee234F: "",
  totalTaxFeeAndInterest: "",
  totalTaxesPaid: "",
  amountPayable: "",
  refund: "",
  bankAccounts: [
    { ifscCode: '', bankName: '', accountNumber: '', accountType: '', selectForRefund: false },
    { ifscCode: '', bankName: '', accountNumber: '', accountType: '', selectForRefund: false },
    { ifscCode: '', bankName: '', accountNumber: '', accountType: '', selectForRefund: false }
  ],
  advanceTaxPayments: [
    { bsrCode: '', dateOfDeposit: '', challanSerialNumber: '', amountPaid: '' },
    { bsrCode: '', dateOfDeposit: '', challanSerialNumber: '', amountPaid: '' },
    { bsrCode: '', dateOfDeposit: '', challanSerialNumber: '', amountPaid: '' }
  ],
  tdsDetails: [
    { tanPanAadhar: '', deductorName: '', section: '', grossAmount: '', yearOfDeduction: '', taxDeducted: '', taxCreditClaimed: '' },
    { tanPanAadhar: '', deductorName: '', section: '', grossAmount: '', yearOfDeduction: '', taxDeducted: '', taxCreditClaimed: '' },
    { tanPanAadhar: '', deductorName: '', section: '', grossAmount: '', yearOfDeduction: '', taxDeducted: '', taxCreditClaimed: '' }
  ]
};

const initialErrors: FormErrors = {
  pan: "",
  aadhar: "",
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
  salarySection17_1: "",
  perquisitesSection17_2: "",
  profitSection17_3: "",
  notifiedCountry: "",
  retirementBenefitNotified: "",
  otherCountry: "",
  retirementBenefitOther: "",
  propertyType: "",
  grossRent: "",
  localTaxPaid: "",
  annualValue: "",
  standardDeduction: "",
  interestBorrowedCapital: "",
  arrearsRent: "",
  totalHousePropertyIncome: "",
  incomeOtherSources: "",
  agriculturalIncome: "",
  section80C: "",
  section80D: "",
  section80G: "",
  section80TTA: "",
  section80E: "",
  section80EE: "",
  section80EEA: "",
  section80EEB: "",
  section80GGA: "",
  section80GGC: "",
  section80U: "",
  totalIncome: "",
  totalDeductions: "",
  taxableIncome: "",
  taxPayable: "",
  surcharge: "",
  healthAndEducationCess: "",
  totalTaxLiability: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  accountType: "",
  verificationMethod: "",
  verificationDate: "",
  placeOfFiling: "",
  allowanceType: "",
  allowanceExemptAmount: "",
  reliefUnder89A: "",
  netSalary: "",
  standardDeduction16: "",
  entertainmentAllowance: "",
  professionalTax: "",
  totalSalaryIncome: "",
  otherIncomeType: "",
  otherIncomeAmount: "",
  q1Amount: "",
  q2Amount: "",
  q3Amount: "",
  q4Amount: "",
  familyPensionDeduction: "",
  otherIncomeRelief89A: "",
  totalOtherIncome: "",
  grossTotalSalary: "",
  grossTotalProperty: "",
  grossTotalOther: "",
  grossTotalIncome: "",
  lifeInsurancePremium: "",
  elssInvestment: "",
  ppfContribution: "",
  nscInvestment: "",
  sukanyaSamriddhi: "",
  homeLoanPrincipal: "",
  total80CDeduction: "",
  healthInsurancePremium: "",
  educationLoanInterest: "",
  donations: "",
  savingsInterest: "",
  taxableTotalIncome: "",
  section80CCD1: "",
  section80CCD2: "",
  section80CCH: "",
  section80DD: "",
  section80DDB: "",
  section80GG: "",
  section80TTB: "",
  otherDeductionParticulars: "",
  otherDeductionAmount: "",
  exemptIncomeType: "",
  exemptIncomeSection: "",
  exemptIncomeAmount: "",
  ltcgSaleConsideration: "",
  ltcgCostOfAcquisition: "",
  ltcgAmount: "",
  rebate87A: "",
  taxAfterRebate: "",
  totalTaxAndCess: "",
  relief89: "",
  interest234A: "",
  interest234B: "",
  interest234C: "",
  lateFilingFee234F: "",
  totalTaxFeeAndInterest: "",
  totalTaxesPaid: "",
  amountPayable: "",
  refund: "",
  bankAccounts: "",
  advanceTaxPayments: "",
  tdsDetails: ""
};

const ItrOne = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [errors, setErrors] = useState<FormErrors>({
    // PART A: General Information
    pan: "",
    aadhar: "",
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
    
    // PART B: Gross Total Income
    salarySection17_1: "",
    perquisitesSection17_2: "",
    profitSection17_3: "",
    notifiedCountry: "",
    retirementBenefitNotified: "",
    otherCountry: "",
    retirementBenefitOther: "",
    propertyType: "",
    grossRent: "",
    localTaxPaid: "",
    annualValue: "",
    standardDeduction: "",
    interestBorrowedCapital: "",
    arrearsRent: "",
    totalHousePropertyIncome: "",
    incomeOtherSources: "",
    agriculturalIncome: "",
    
    // PART C: Deductions
    section80C: "",
    section80D: "",
    section80G: "",
    section80TTA: "",
    section80E: "",
    section80EE: "",
    section80EEA: "",
    section80EEB: "",
    section80GGA: "",
    section80GGC: "",
    section80U: "",
    
    // PART D: Tax Computation
    totalIncome: "",
    totalDeductions: "",
    taxableIncome: "",
    taxPayable: "",
    surcharge: "",
    healthAndEducationCess: "",
    totalTaxLiability: "",
    
    // PART E: Other Information
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "",
    verificationMethod: "",
    verificationDate: "",
    placeOfFiling: "",
    
    // B1: Income from Salary
    allowanceType: "",
    allowanceExemptAmount: "",
    reliefUnder89A: "",
    netSalary: "",
    standardDeduction16: "",
    entertainmentAllowance: "",
    professionalTax: "",
    totalSalaryIncome: "",
    
    // Part B3: Income from Other Sources
    otherIncomeType: "",
    otherIncomeAmount: "",
    q1Amount: "",
    q2Amount: "",
    q3Amount: "",
    q4Amount: "",
    familyPensionDeduction: "",
    otherIncomeRelief89A: "",
    totalOtherIncome: "",
    // B4: Gross Total Income
    grossTotalSalary: "",
    grossTotalProperty: "",
    grossTotalOther: "",
    grossTotalIncome: "",
    lifeInsurancePremium: "",
    elssInvestment: "",
    ppfContribution: "",
    nscInvestment: "",
    sukanyaSamriddhi: "",
    homeLoanPrincipal: "",
    total80CDeduction: "",
    healthInsurancePremium: "",
    educationLoanInterest: "",
    donations: "",
    savingsInterest: "",
    taxableTotalIncome: "",
    section80CCD1: "",
    section80CCD2: "",
    section80CCH: "",
    section80DD: "",
    section80DDB: "",
    section80GG: "",
    // section80GGA: "",
    // section80GGC: "",
    // section80TTA: "",
    section80TTB: "",
    otherDeductionParticulars: "",
    otherDeductionAmount: "",
    exemptIncomeType: "",
    exemptIncomeSection: "",
    exemptIncomeAmount: "",
    ltcgSaleConsideration: "",
    ltcgCostOfAcquisition: "",
    ltcgAmount: "",
    rebate87A: "",
    taxAfterRebate: "",
    totalTaxAndCess: "",
    relief89: "",
    interest234A: "",
    interest234B: "",
    interest234C: "",
    lateFilingFee234F: "",
    totalTaxFeeAndInterest: "",
    totalTaxesPaid: "",
    amountPayable: "",
    refund: "",
    bankAccounts: "",
    advanceTaxPayments: "",
    tdsDetails: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Calculate totals when relevant fields change
      if (name === 'totalSalaryIncome') {
        newData.grossTotalSalary = value;
      }
      
      if (name === 'totalHousePropertyIncome') {
        newData.grossTotalProperty = value;
      }
      
      if (name === 'totalOtherIncome') {
        newData.grossTotalOther = value;
      }
      
      // Calculate gross total income whenever any of the components change
      if (['totalSalaryIncome', 'totalHousePropertyIncome', 'totalOtherIncome'].includes(name)) {
        const salaryTotal = Number(newData.totalSalaryIncome) || 0;
        const propertyTotal = Number(newData.totalHousePropertyIncome) || 0;
        const otherTotal = Number(newData.totalOtherIncome) || 0;
        newData.grossTotalIncome = (salaryTotal + propertyTotal + otherTotal).toString();
      }
      
      return newData;
    });
  };

  const validatePan = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan.toUpperCase());
  };

  const validateAadhar = (aadhar: string) => {
    const aadharRegex = /^[0-9]{12}$/;
    return aadharRegex.test(aadhar);
  };

  const validateStep = (stepNumber: number) => {
    console.log('Validating step:', stepNumber);
    const newErrors = { ...errors };
    let isValid = true;

    switch (stepNumber) {
      case 1:
        if (!formData.pan) {
          newErrors.pan = "PAN is required";
          isValid = false;
        } else if (!validatePan(formData.pan)) {
          newErrors.pan = "Invalid PAN format";
          isValid = false;
        }

        if (!formData.aadhar) {
          newErrors.aadhar = "Aadhar is required";
          isValid = false;
        } else if (!validateAadhar(formData.aadhar)) {
          newErrors.aadhar = "Invalid Aadhar format";
          isValid = false;
        }

        if (!formData.firstName.trim()) {
          newErrors.firstName = "First name is required";
          isValid = false;
        }

        if (!formData.lastName.trim()) {
          newErrors.lastName = "Last name is required";
          isValid = false;
        }

        if (!formData.dateOfBirth) {
          newErrors.dateOfBirth = "Date of birth is required";
          isValid = false;
        }

        if (!formData.gender) {
          newErrors.gender = "Gender is required";
          isValid = false;
        }

        if (!formData.residentialStatus) {
          newErrors.residentialStatus = "Residential status is required";
          isValid = false;
        }
        break;

      case 2:
        // B1: Income from Salary
        if (!formData.salarySection17_1) {
          console.log('Missing salarySection17_1');
          newErrors.salarySection17_1 = "Salary as per section 17(1) is required";
          isValid = false;
        }
        if (!formData.perquisitesSection17_2) {
          console.log('Missing perquisitesSection17_2');
          newErrors.perquisitesSection17_2 = "Value of perquisites as per section 17(2) is required";
          isValid = false;
        }
        if (!formData.profitSection17_3) {
          console.log('Missing profitSection17_3');
          newErrors.profitSection17_3 = "Profit in lieu of salary as per section 17(3) is required";
          isValid = false;
        }
        if (!formData.totalSalaryIncome) {
          console.log('Missing totalSalaryIncome');
          newErrors.totalSalaryIncome = "Total salary income is required";
          isValid = false;
        }

        // B2: Income from House Property
        if (!formData.propertyType) {
          console.log('Missing propertyType');
          newErrors.propertyType = "Property type is required";
          isValid = false;
        }
        if (!formData.grossRent) {
          console.log('Missing grossRent');
          newErrors.grossRent = "Gross rent is required";
          isValid = false;
        }
        if (!formData.localTaxPaid) {
          console.log('Missing localTaxPaid');
          newErrors.localTaxPaid = "Local tax paid is required";
          isValid = false;
        }
        if (!formData.annualValue) {
          console.log('Missing annualValue');
          newErrors.annualValue = "Annual value is required";
          isValid = false;
        }
        if (!formData.standardDeduction) {
          console.log('Missing standardDeduction');
          newErrors.standardDeduction = "Standard deduction is required";
          isValid = false;
        }
        if (!formData.interestBorrowedCapital) {
          console.log('Missing interestBorrowedCapital');
          newErrors.interestBorrowedCapital = "Interest on borrowed capital is required";
          isValid = false;
        }
        if (!formData.totalHousePropertyIncome) {
          console.log('Missing totalHousePropertyIncome');
          newErrors.totalHousePropertyIncome = "Total house property income is required";
          isValid = false;
        }

        // B3: Income from Other Sources
        if (!formData.otherIncomeType) {
          console.log('Missing otherIncomeType');
          newErrors.otherIncomeType = "Income type is required";
          isValid = false;
        }
        if (!formData.otherIncomeAmount) {
          console.log('Missing otherIncomeAmount');
          newErrors.otherIncomeAmount = "Income amount is required";
          isValid = false;
        }
        if (!formData.totalOtherIncome) {
          console.log('Missing totalOtherIncome');
          newErrors.totalOtherIncome = "Total other income is required";
          isValid = false;
        }

        // B4: Gross Total Income
        if (!formData.grossTotalSalary) {
          console.log('Missing grossTotalSalary');
          newErrors.grossTotalSalary = "Gross total salary is required";
          isValid = false;
        }
        if (!formData.grossTotalProperty) {
          console.log('Missing grossTotalProperty');
          newErrors.grossTotalProperty = "Gross total property income is required";
          isValid = false;
        }
        if (!formData.grossTotalOther) {
          console.log('Missing grossTotalOther');
          newErrors.grossTotalOther = "Gross total other income is required";
          isValid = false;
        }
        if (!formData.grossTotalIncome) {
          console.log('Missing grossTotalIncome');
          newErrors.grossTotalIncome = "Gross total income is required";
          isValid = false;
        }
        break;

      case 3:
        // Only validate the total fields
        if (!formData.totalDeductions) {
          newErrors.totalDeductions = "Total deductions is required";
          isValid = false;
        }
        if (!formData.taxableTotalIncome) {
          newErrors.taxableTotalIncome = "Taxable total income is required";
          isValid = false;
        }
        break;

      case 4:
        if (!formData.bankName) {
          newErrors.bankName = "Bank name is required";
          isValid = false;
        }

        if (!formData.accountNumber) {
          newErrors.accountNumber = "Account number is required";
          isValid = false;
        }

        if (!formData.ifscCode) {
          newErrors.ifscCode = "IFSC code is required";
          isValid = false;
        }

        if (!formData.accountType) {
          newErrors.accountType = "Account type is required";
          isValid = false;
        }
        break;
    }

    console.log('Validation result:', { isValid, newErrors });
    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = async () => {
    console.log('Current step:', step);
    console.log('Form data:', formData);
    console.log('Errors:', errors);
    
    const isValid = validateStep(step);
    console.log('Is step valid:', isValid);
    
    if (isValid) {
      console.log('Moving to next step...');
      if (step === 5) {
        // Final step - submit the form
        console.log('Submitting form data:', formData);
        try {
          // Here you would typically make an API call to submit the form
          // For now, we'll just log the data and show a success message
          console.log('Form submitted successfully!');
          alert('Form submitted successfully!');
        //   navigate('/practice/itr/success');
        } catch (error) {
          console.error('Error submitting form:', error);
          alert('Error submitting form. Please try again.');
        }
      } else if (step === 4) {
        setShowOtpVerification(true);
      } else {
        setStep(step + 1);
      }
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
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
          <li className="text-gray-500">ITR-1</li>
        </ul>
        </div>

      <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
        <h2 className="text-xl font-extrabold text-white">
          {`Step ${step} of 5: ${step === 1 ? "PART A: General Information" : 
                                step === 2 ? "PART B: Gross Total Income" : 
                                step === 3 ? "PART C: Deductions and Taxable Total Income" : 
                                step === 4 ? "PART D: Computation of Tax Payable" :
                                "PART E: Other Information"}`
          }
        </h2>
      </div>

      <div className="w-[60%] mb-20 p-6 mx-auto bg-white rounded-lg shadow-lg">
        {step === 1 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART A: General Information</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  PAN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  placeholder="Enter PAN number"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pan ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.pan && <p className="mt-1 text-sm text-red-500">{errors.pan}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Aadhar Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  placeholder="Enter Aadhar number"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.aadhar ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.aadhar && <p className="mt-1 text-sm text-red-500">{errors.aadhar}</p>}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.gender ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Residential Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="residentialStatus"
                  value={formData.residentialStatus}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.residentialStatus ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select residential status</option>
                  <option value="resident">Resident</option>
                  <option value="nonResident">Non-Resident</option>
                  <option value="notOrdinaryResident">Not Ordinary Resident</option>
                </select>
                {errors.residentialStatus && <p className="mt-1 text-sm text-red-500">{errors.residentialStatus}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.mobileNumber ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.mobileNumber && <p className="mt-1 text-sm text-red-500">{errors.mobileNumber}</p>}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.address ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.city ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.state ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pincode ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.pincode && <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-6 text-xl font-semibold text-gray-700">PART B: Gross Total Income</h3>
            <div className="space-y-6">
              {/* B1: Income from Salary */}
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h4 className="mb-4 text-lg font-semibold text-gray-700">B1: Income from Salary</h4>
                <div className="space-y-6">
                  {/* (i) Gross Salary */}
                  <div>
                    <label className="block mb-1 text-sm text-gray-600">
                      (i) Gross Salary (ia + ib + ic + id + ie) <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 text-sm text-gray-600">
                          (a) Salary as per section 17(1)
                        </label>
                        <input
                          type="number"
                          name="salarySection17_1"
                          value={formData.salarySection17_1}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.salarySection17_1 ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.salarySection17_1 && <p className="mt-1 text-sm text-red-500">{errors.salarySection17_1}</p>}
                      </div>

                      <div>
                        <label className="block mb-1 text-sm text-gray-600">
                          (b) Value of perquisites as per section 17(2)
                        </label>
                        <input
                          type="number"
                          name="perquisitesSection17_2"
                          value={formData.perquisitesSection17_2}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.perquisitesSection17_2 ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.perquisitesSection17_2 && <p className="mt-1 text-sm text-red-500">{errors.perquisitesSection17_2}</p>}
                      </div>

                      <div>
                        <label className="block mb-1 text-sm text-gray-600">
                          (c) Profit in lieu of salary as per section 17(3)
                        </label>
                        <input
                          type="number"
                          name="profitSection17_3"
                          value={formData.profitSection17_3}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.profitSection17_3 ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.profitSection17_3 && <p className="mt-1 text-sm text-red-500">{errors.profitSection17_3}</p>}
                      </div>

                      <div>
                        <label className="block mb-1 text-sm text-gray-600">
                          (d) Income from retirement benefit account (notified country)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            name="notifiedCountry"
                            value={formData.notifiedCountry}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.notifiedCountry ? "border-red-500" : "border-gray-300"}`}
                          >
                            <option value="">Select country</option>
                            <option value="USA">United States of America</option>
                            <option value="UK">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="New Zealand">New Zealand</option>
                          </select>
                          <input
                            type="number"
                            name="retirementBenefitNotified"
                            value={formData.retirementBenefitNotified}
                            onChange={handleChange}
                            placeholder="Amount"
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.retirementBenefitNotified ? "border-red-500" : "border-gray-300"}`}
                          />
                        </div>
                        {errors.notifiedCountry && <p className="mt-1 text-sm text-red-500">{errors.notifiedCountry}</p>}
                        {errors.retirementBenefitNotified && <p className="mt-1 text-sm text-red-500">{errors.retirementBenefitNotified}</p>}
                      </div>

                      <div>
                        <label className="block mb-1 text-sm text-gray-600">
                          (e) Income from retirement benefit account (other country)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            name="otherCountry"
                            value={formData.otherCountry}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.otherCountry ? "border-red-500" : "border-gray-300"}`}
                          >
                            <option value="">Select country</option>
                            <option value="Other">Other Country</option>
                          </select>
                          <input
                            type="number"
                            name="retirementBenefitOther"
                            value={formData.retirementBenefitOther}
                            onChange={handleChange}
                            placeholder="Amount"
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.retirementBenefitOther ? "border-red-500" : "border-gray-300"}`}
                          />
                        </div>
                        {errors.otherCountry && <p className="mt-1 text-sm text-red-500">{errors.otherCountry}</p>}
                        {errors.retirementBenefitOther && <p className="mt-1 text-sm text-red-500">{errors.retirementBenefitOther}</p>}
                      </div>
                    </div>
                  </div>

                  {/* (ii) Less allowances to the extent exempt u/s 10 */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      (ii) Less allowances to the extent exempt u/s 10 <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 text-sm text-gray-600">
                          Select allowance type
                        </label>
                        <select
                          name="allowanceType"
                          value={formData.allowanceType}
                          onChange={handleChange}
                          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.allowanceType ? "border-red-500" : "border-gray-300"}`}
                        >
                          <option value="">Select allowance type</option>
                          <option value="hra">House Rent Allowance</option>
                          <option value="travel">Travel Allowance</option>
                          <option value="medical">Medical Allowance</option>
                          <option value="other">Other Allowance</option>
                        </select>
                        {errors.allowanceType && <p className="mt-1 text-sm text-red-500">{errors.allowanceType}</p>}
                      </div>

                      <div>
                        <label className="block mb-1 text-sm text-gray-600">
                          Exempt amount
                        </label>
                        <input
                          type="number"
                          name="allowanceExemptAmount"
                          value={formData.allowanceExemptAmount}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.allowanceExemptAmount ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.allowanceExemptAmount && <p className="mt-1 text-sm text-red-500">{errors.allowanceExemptAmount}</p>}
                      </div>
                    </div>
                  </div>

                  {/* (iia) Less: Income claimed for relief from taxation u/s 89A */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      (iia) Less: Income claimed for relief from taxation u/s 89A <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="reliefUnder89A"
                      value={formData.reliefUnder89A}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.reliefUnder89A ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.reliefUnder89A && <p className="mt-1 text-sm text-red-500">{errors.reliefUnder89A}</p>}
                  </div>

                  {/* (iii) Net Salary */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      (iii) Net Salary (i - ii - iia) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="netSalary"
                      value={formData.netSalary}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.netSalary ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.netSalary && <p className="mt-1 text-sm text-red-500">{errors.netSalary}</p>}
                  </div>

                  {/* (iv) Deductions u/s 16 */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      (iv) Deductions u/s 16 (iva + ivb + ivc) <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block mb-1 text-sm text-gray-600">
                          (a) Standard deduction u/s 16(ia)
                        </label>
                        <input
                          type="number"
                          name="standardDeduction16"
                          value={formData.standardDeduction16}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.standardDeduction16 ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.standardDeduction16 && <p className="mt-1 text-sm text-red-500">{errors.standardDeduction16}</p>}
                      </div>

                      <div>
                        <label className="block mb-1 text-sm text-gray-600">
                          (b) Entertainment allowance u/s 16(ii)
                        </label>
                        <input
                          type="number"
                          name="entertainmentAllowance"
                          value={formData.entertainmentAllowance}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.entertainmentAllowance ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.entertainmentAllowance && <p className="mt-1 text-sm text-red-500">{errors.entertainmentAllowance}</p>}
                      </div>

                      <div>
                        <label className="block mb-1 text-sm text-gray-600">
                          (c) Professional tax u/s 16(iii)
                        </label>
                        <input
                          type="number"
                          name="professionalTax"
                          value={formData.professionalTax}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.professionalTax ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.professionalTax && <p className="mt-1 text-sm text-red-500">{errors.professionalTax}</p>}
                      </div>
                    </div>
                  </div>

                  {/* (v) Income chargeable under the head 'Salaries' */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      (v) Income chargeable under the head 'Salaries' (iii - iv) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="totalSalaryIncome"
                      value={formData.totalSalaryIncome}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.totalSalaryIncome ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.totalSalaryIncome && <p className="mt-1 text-sm text-red-500">{errors.totalSalaryIncome}</p>}
                  </div>
                </div>
              </div>

              {/* B2: Income from House Property */}
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h4 className="mb-4 text-lg font-semibold text-gray-700">B2: Income from House Property</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Property Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="selfOccupied"
                          name="propertyType"
                          value="selfOccupied"
                          checked={formData.propertyType === "selfOccupied"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="selfOccupied" className="ml-2 text-sm font-medium text-gray-700">
                          Self-Occupied
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="letOut"
                          name="propertyType"
                          value="letOut"
                          checked={formData.propertyType === "letOut"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="letOut" className="ml-2 text-sm font-medium text-gray-700">
                          Let Out
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="deemedLetOut"
                          name="propertyType"
                          value="deemedLetOut"
                          checked={formData.propertyType === "deemedLetOut"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="deemedLetOut" className="ml-2 text-sm font-medium text-gray-700">
                          Deemed Let Out
                        </label>
                      </div>
                    </div>
                    {errors.propertyType && <p className="mt-1 text-sm text-red-500">{errors.propertyType}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-sm text-gray-600">
                        (i) Gross rent received/receivable/lettable value
                      </label>
                      <input
                        type="number"
                        name="grossRent"
                        value={formData.grossRent}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.grossRent ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.grossRent && <p className="mt-1 text-sm text-red-500">{errors.grossRent}</p>}
                    </div>

                    <div>
                      <label className="block mb-1 text-sm text-gray-600">
                        (ii) Tax paid to local authorities
                      </label>
                      <input
                        type="number"
                        name="localTaxPaid"
                        value={formData.localTaxPaid}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.localTaxPaid ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.localTaxPaid && <p className="mt-1 text-sm text-red-500">{errors.localTaxPaid}</p>}
                    </div>

                    <div>
                      <label className="block mb-1 text-sm text-gray-600">
                        (iii) Annual Value (i - ii)
                      </label>
                      <input
                        type="number"
                        name="annualValue"
                        value={formData.annualValue}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.annualValue ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.annualValue && <p className="mt-1 text-sm text-red-500">{errors.annualValue}</p>}
                    </div>

                    <div>
                      <label className="block mb-1 text-sm text-gray-600">
                        (iv) 30% of Annual Value
                      </label>
                      <input
                        type="number"
                        name="standardDeduction"
                        value={formData.standardDeduction}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.standardDeduction ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.standardDeduction && <p className="mt-1 text-sm text-red-500">{errors.standardDeduction}</p>}
                    </div>

                    <div>
                      <label className="block mb-1 text-sm text-gray-600">
                        (v) Interest payable on borrowed capital
                      </label>
                      <input
                        type="number"
                        name="interestBorrowedCapital"
                        value={formData.interestBorrowedCapital}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.interestBorrowedCapital ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.interestBorrowedCapital && <p className="mt-1 text-sm text-red-500">{errors.interestBorrowedCapital}</p>}
                    </div>

                    <div>
                      <label className="block mb-1 text-sm text-gray-600">
                        (vi) Arrears/Unrealised rent received less 30%
                      </label>
                      <input
                        type="number"
                        name="arrearsRent"
                        value={formData.arrearsRent}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.arrearsRent ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.arrearsRent && <p className="mt-1 text-sm text-red-500">{errors.arrearsRent}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block mb-1 text-sm text-gray-600">
                        (vii) Income chargeable under 'House Property' (iii - iv - v) + vi
                      </label>
                      <input
                        type="number"
                        name="totalHousePropertyIncome"
                        value={formData.totalHousePropertyIncome}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.totalHousePropertyIncome ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.totalHousePropertyIncome && <p className="mt-1 text-sm text-red-500">{errors.totalHousePropertyIncome}</p>}
                    </div>
                  </div>

                  <div className="p-3 mt-4 text-sm text-gray-600 bg-yellow-50 rounded-md">
                    <p className="font-medium">Note:</p>
                    <p>Maximum loss from House Property that can be set-off is INR 2,00,000. To avail the benefit of carry forward and set of loss, please use ITR-2.</p>
                  </div>
                </div>
              </div>

              {/* B3: Income from Other Sources */}
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h4 className="mb-4 text-lg font-semibold text-gray-700">B3: Income from Other Sources</h4>
                <div className="space-y-8">
                  {/* Income Sources */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="mb-4 text-lg font-medium text-gray-700">Income Details</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Select Income Source <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="otherIncomeType"
                          value={formData.otherIncomeType}
                          onChange={handleChange}
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.otherIncomeType ? "border-red-500" : "border-gray-300"}`}
                        >
                          <option value="">Select income type</option>
                          <option value="savingsInterest">Interest from Savings Account</option>
                          <option value="fixedDeposit">Interest from Fixed Deposits</option>
                          <option value="dividend">Dividend Income</option>
                          <option value="familyPension">Family Pension</option>
                          <option value="retirementBenefit">Income from Retirement Benefit Account</option>
                          <option value="other">Other Income</option>
                        </select>
                        {errors.otherIncomeType && <p className="mt-1 text-sm text-red-500">{errors.otherIncomeType}</p>}
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Amount <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                          <input
                            type="number"
                            name="otherIncomeAmount"
                            value={formData.otherIncomeAmount}
                            onChange={handleChange}
                            placeholder="Enter amount"
                            className={`w-full pl-8 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.otherIncomeAmount ? "border-red-500" : "border-gray-300"}`}
                          />
                        </div>
                        {errors.otherIncomeAmount && <p className="mt-1 text-sm text-red-500">{errors.otherIncomeAmount}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Quarterly Breakup for Dividend and Retirement Benefit */}
                  {(formData.otherIncomeType === "dividend" || formData.otherIncomeType === "retirementBenefit") && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-medium text-gray-700">Quarterly Breakup</h5>
                        <span className="text-sm text-gray-500">For relief from section 234C</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            Q1 (April - June)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input
                              type="number"
                              name="q1Amount"
                              value={formData.q1Amount}
                              onChange={handleChange}
                              placeholder="Enter amount"
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            Q2 (July - September)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input
                              type="number"
                              name="q2Amount"
                              value={formData.q2Amount}
                              onChange={handleChange}
                              placeholder="Enter amount"
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            Q3 (October - December)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input
                              type="number"
                              name="q3Amount"
                              value={formData.q3Amount}
                              onChange={handleChange}
                              placeholder="Enter amount"
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            Q4 (January - March)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input
                              type="number"
                              name="q4Amount"
                              value={formData.q4Amount}
                              onChange={handleChange}
                              placeholder="Enter amount"
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Deductions and Relief */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="mb-4 text-lg font-medium text-gray-700">Deductions and Relief</h5>
                    <div className="space-y-4">
                      {/* Deduction for Family Pension */}
                      {formData.otherIncomeType === "familyPension" && (
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            Less: Deduction u/s 57(iia) (for family pension)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input
                              type="number"
                              name="familyPensionDeduction"
                              value={formData.familyPensionDeduction}
                              onChange={handleChange}
                              placeholder="Enter deduction amount"
                              className={`w-full pl-8 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.familyPensionDeduction ? "border-red-500" : "border-gray-300"}`}
                            />
                          </div>
                          {errors.familyPensionDeduction && <p className="mt-1 text-sm text-red-500">{errors.familyPensionDeduction}</p>}
                        </div>
                      )}

                      {/* Relief from Taxation u/s 89A */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Less: Income claimed for relief from taxation u/s 89A
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                          <input
                            type="number"
                            name="otherIncomeRelief89A"
                            value={formData.otherIncomeRelief89A}
                            onChange={handleChange}
                            placeholder="Enter relief amount"
                            className={`w-full pl-8 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.otherIncomeRelief89A ? "border-red-500" : "border-gray-300"}`}
                          />
                        </div>
                        {errors.otherIncomeRelief89A && <p className="mt-1 text-sm text-red-500">{errors.otherIncomeRelief89A}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Total Income */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <label className="block mb-2 text-lg font-medium text-gray-700">
                      Total Income from Other Sources <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        name="totalOtherIncome"
                        value={formData.totalOtherIncome}
                        onChange={handleChange}
                        placeholder="Enter total amount"
                        className={`w-full pl-8 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.totalOtherIncome ? "border-red-500" : "border-gray-300"}`}
                      />
                    </div>
                    {errors.totalOtherIncome && <p className="mt-1 text-sm text-red-500">{errors.totalOtherIncome}</p>}
                  </div>
                </div>
              </div>

              {/* B4: Gross Total Income */}
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h4 className="mb-4 text-lg font-semibold text-gray-700">B4: Gross Total Income</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Gross Total Salary Income <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        name="grossTotalSalary"
                        value={formData.grossTotalSalary}
                        onChange={handleChange}
                        placeholder="Enter gross total salary income"
                        className={`w-full pl-8 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.grossTotalSalary ? "border-red-500" : "border-gray-300"}`}
                      />
                    </div>
                    {errors.grossTotalSalary && <p className="mt-1 text-sm text-red-500">{errors.grossTotalSalary}</p>}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Gross Total Property Income <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        name="grossTotalProperty"
                        value={formData.grossTotalProperty}
                        onChange={handleChange}
                        placeholder="Enter gross total property income"
                        className={`w-full pl-8 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.grossTotalProperty ? "border-red-500" : "border-gray-300"}`}
                      />
                    </div>
                    {errors.grossTotalProperty && <p className="mt-1 text-sm text-red-500">{errors.grossTotalProperty}</p>}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Gross Total Other Income <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        name="grossTotalOther"
                        value={formData.grossTotalOther}
                        onChange={handleChange}
                        placeholder="Enter gross total other income"
                        className={`w-full pl-8 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.grossTotalOther ? "border-red-500" : "border-gray-300"}`}
                      />
                    </div>
                    {errors.grossTotalOther && <p className="mt-1 text-sm text-red-500">{errors.grossTotalOther}</p>}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Gross Total Income <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        name="grossTotalIncome"
                        value={formData.grossTotalIncome}
                        onChange={handleChange}
                        placeholder="Enter gross total income"
                        className={`w-full pl-8 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.grossTotalIncome ? "border-red-500" : "border-gray-300"}`}
                      />
                    </div>
                    {errors.grossTotalIncome && <p className="mt-1 text-sm text-red-500">{errors.grossTotalIncome}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-6 text-xl font-semibold text-gray-700">PART C: Deductions and Taxable Total Income</h3>
            <div className="p-4 mb-4 text-sm text-blue-800 bg-blue-50 rounded-lg">
              <p className="font-medium">Note: Please refer to the Income Tax Act for deduction limits.</p>
            </div>

            {/* Deductions Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border border-gray-300">Section</th>
                    <th className="p-3 text-left border border-gray-300">Particulars</th>
                    <th className="p-3 text-left border border-gray-300">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 80C */}
                  <tr>
                    <td className="p-3 border border-gray-300">80C</td>
                    <td className="p-3 border border-gray-300">Life Insurance, PPF, ELSS, Tax-saving FD, etc.</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80C"
                          value={formData.section80C}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.section80C ? "border-red-500" : "border-gray-300"}`}
                        />
                      </div>
                      {errors.section80C && <p className="mt-1 text-sm text-red-500">{errors.section80C}</p>}
                    </td>
                  </tr>

                  {/* 80CCD(1) */}
                  <tr>
                    <td className="p-3 border border-gray-300">80CCD(1)</td>
                    <td className="p-3 border border-gray-300">Employee contribution to NPS</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80CCD1"
                          value={formData.section80CCD1}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                  </tr>

                  {/* 80CCD(2) */}
                  <tr>
                    <td className="p-3 border border-gray-300">80CCD(2)</td>
                    <td className="p-3 border border-gray-300">Employer contribution to NPS</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80CCD2"
                          value={formData.section80CCD2}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                  </tr>

                  {/* 80CCH */}
                  <tr>
                    <td className="p-3 border border-gray-300">80CCH</td>
                    <td className="p-3 border border-gray-300">Agniveer Corpus Fund contribution</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80CCH"
                          value={formData.section80CCH}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                  </tr>

                  {/* 80D */}
                  <tr>
                    <td className="p-3 border border-gray-300">80D</td>
                    <td className="p-3 border border-gray-300">Medical insurance premium (Self/Family/Senior Citizen)</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80D"
                          value={formData.section80D}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.section80D ? "border-red-500" : "border-gray-300"}`}
                        />
                      </div>
                      {errors.section80D && <p className="mt-1 text-sm text-red-500">{errors.section80D}</p>}
                    </td>
                  </tr>

                  {/* 80DD */}
                  <tr>
                    <td className="p-3 border border-gray-300">80DD</td>
                    <td className="p-3 border border-gray-300">Maintenance for disabled dependent</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80DD"
                          value={formData.section80DD}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                  </tr>

                  {/* 80DDB */}
                  <tr>
                    <td className="p-3 border border-gray-300">80DDB</td>
                    <td className="p-3 border border-gray-300">Treatment of specified diseases</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80DDB"
                          value={formData.section80DDB}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                  </tr>

                  {/* 80E */}
                  <tr>
                    <td className="p-3 border border-gray-300">80E</td>
                    <td className="p-3 border border-gray-300">Interest on Education Loan</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80E"
                          value={formData.section80E}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.section80E ? "border-red-500" : "border-gray-300"}`}
                        />
                      </div>
                      {errors.section80E && <p className="mt-1 text-sm text-red-500">{errors.section80E}</p>}
                    </td>
                  </tr>

                  {/* 80EE */}
                  <tr>
                    <td className="p-3 border border-gray-300">80EE</td>
                    <td className="p-3 border border-gray-300">Interest on home loan (first-time buyers – before 31 Mar 2017)</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80EE"
                          value={formData.section80EE}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.section80EE ? "border-red-500" : "border-gray-300"}`}
                        />
                      </div>
                      {errors.section80EE && <p className="mt-1 text-sm text-red-500">{errors.section80EE}</p>}
                    </td>
                  </tr>

                  {/* 80EEA */}
                  <tr>
                    <td className="p-3 border border-gray-300">80EEA</td>
                    <td className="p-3 border border-gray-300">Interest on home loan for affordable housing (FY 2019–20 onward)</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80EEA"
                          value={formData.section80EEA}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.section80EEA ? "border-red-500" : "border-gray-300"}`}
                        />
                      </div>
                      {errors.section80EEA && <p className="mt-1 text-sm text-red-500">{errors.section80EEA}</p>}
                    </td>
                  </tr>

                  {/* 80EEB */}
                  <tr>
                    <td className="p-3 border border-gray-300">80EEB</td>
                    <td className="p-3 border border-gray-300">Interest on electric vehicle loan</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80EEB"
                          value={formData.section80EEB}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.section80EEB ? "border-red-500" : "border-gray-300"}`}
                        />
                      </div>
                      {errors.section80EEB && <p className="mt-1 text-sm text-red-500">{errors.section80EEB}</p>}
                    </td>
                  </tr>

                  {/* 80G */}
                  <tr>
                    <td className="p-3 border border-gray-300">80G</td>
                    <td className="p-3 border border-gray-300">Donations to charitable institutions</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80G"
                          value={formData.section80G}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.section80G ? "border-red-500" : "border-gray-300"}`}
                        />
                      </div>
                      {errors.section80G && <p className="mt-1 text-sm text-red-500">{errors.section80G}</p>}
                    </td>
                  </tr>

                  {/* 80GG */}
                  <tr>
                    <td className="p-3 border border-gray-300">80GG</td>
                    <td className="p-3 border border-gray-300">Rent paid when HRA is not received</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80GG"
                          value={formData.section80GG}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                  </tr>

                  {/* 80GGA */}
                  <tr>
                    <td className="p-3 border border-gray-300">80GGA</td>
                    <td className="p-3 border border-gray-300">Donations for scientific/rural development</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80GGA"
                          value={formData.section80GGA}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.section80GGA ? "border-red-500" : "border-gray-300"}`}
                        />
                      </div>
                      {errors.section80GGA && <p className="mt-1 text-sm text-red-500">{errors.section80GGA}</p>}
                    </td>
                  </tr>

                  {/* 80GGC */}
                  <tr>
                    <td className="p-3 border border-gray-300">80GGC</td>
                    <td className="p-3 border border-gray-300">Donations to political parties</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80GGC"
                          value={formData.section80GGC}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.section80GGC ? "border-red-500" : "border-gray-300"}`}
                        />
                      </div>
                      {errors.section80GGC && <p className="mt-1 text-sm text-red-500">{errors.section80GGC}</p>}
                    </td>
                  </tr>

                  {/* 80TTA */}
                  <tr>
                    <td className="p-3 border border-gray-300">80TTA</td>
                    <td className="p-3 border border-gray-300">Interest from savings bank account (non-senior citizens)</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80TTA"
                          value={formData.section80TTA}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className={`w-full pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.section80TTA ? "border-red-500" : "border-gray-300"}`}
                        />
                      </div>
                      {errors.section80TTA && <p className="mt-1 text-sm text-red-500">{errors.section80TTA}</p>}
                    </td>
                  </tr>

                  {/* 80TTB */}
                  <tr>
                    <td className="p-3 border border-gray-300">80TTB</td>
                    <td className="p-3 border border-gray-300">Interest from deposits (senior citizens only)</td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="section80TTB"
                          value={formData.section80TTB}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                  </tr>

                  {/* Other Deductions */}
                  <tr>
                    <td className="p-3 border border-gray-300">Other (Specify)</td>
                    <td className="p-3 border border-gray-300">
                      <input
                        type="text"
                        name="otherDeductionParticulars"
                        value={formData.otherDeductionParticulars}
                        onChange={handleChange}
                        placeholder="Specify other deduction"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-3 border border-gray-300">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          name="otherDeductionAmount"
                          value={formData.otherDeductionAmount}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Summary Section */}
            <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h4 className="mb-4 text-lg font-semibold text-gray-700">Summary</h4>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    C1 – Total Deductions <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="totalDeductions"
                      value={formData.totalDeductions}
                      onChange={handleChange}
                      placeholder="Enter total deductions"
                      className={`w-full pl-8 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.totalDeductions ? "border-red-500" : "border-gray-300"}`}
                    />
                  </div>
                  {errors.totalDeductions && <p className="mt-1 text-sm text-red-500">{errors.totalDeductions}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    C2 – Taxable Total Income <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="taxableTotalIncome"
                      value={formData.taxableTotalIncome}
                      onChange={handleChange}
                      placeholder="Enter taxable total income"
                      className={`w-full pl-8 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.taxableTotalIncome ? "border-red-500" : "border-gray-300"}`}
                    />
                  </div>
                  {errors.taxableTotalIncome && <p className="mt-1 text-sm text-red-500">{errors.taxableTotalIncome}</p>}
                </div>
              </div>
            </div>

            {/* Exempt Income Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Exempt Income For Reporting Purpose</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nature of Exempt Income
                  </label>
                  <select
                    name="exemptIncomeType"
                    value={formData.exemptIncomeType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="agricultural">Agricultural Income</option>
                    <option value="dividend">Dividend Income</option>
                    <option value="interest">Interest Income</option>
                    <option value="other">Other Exempt Income</option>
                  </select>
                  {errors.exemptIncomeType && (
                    <p className="text-red-500 text-sm mt-1">{errors.exemptIncomeType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relevant Section/Clause
                  </label>
                  <input
                    type="text"
                    name="exemptIncomeSection"
                    value={formData.exemptIncomeSection}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter section/clause"
                  />
                  {errors.exemptIncomeSection && (
                    <p className="text-red-500 text-sm mt-1">{errors.exemptIncomeSection}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="exemptIncomeAmount"
                      value={formData.exemptIncomeAmount}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.exemptIncomeAmount && (
                    <p className="text-red-500 text-sm mt-1">{errors.exemptIncomeAmount}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Long Term Capital Gains Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Long Term Capital Gains u/s 112A</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Sale Consideration
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="ltcgSaleConsideration"
                      value={formData.ltcgSaleConsideration}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.ltcgSaleConsideration && (
                    <p className="text-red-500 text-sm mt-1">{errors.ltcgSaleConsideration}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Cost of Acquisition
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="ltcgCostOfAcquisition"
                      value={formData.ltcgCostOfAcquisition}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.ltcgCostOfAcquisition && (
                    <p className="text-red-500 text-sm mt-1">{errors.ltcgCostOfAcquisition}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Long Term Capital Gains (u/s 112A)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="ltcgAmount"
                      value={formData.ltcgAmount}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.ltcgAmount && (
                    <p className="text-red-500 text-sm mt-1">{errors.ltcgAmount}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Deductions Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Additional Deductions</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section 80CCD(1) - NPS Contribution
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="section80CCD1"
                      value={formData.section80CCD1}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.section80CCD1 && (
                    <p className="text-red-500 text-sm mt-1">{errors.section80CCD1}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section 80CCD(2) - Employer's NPS Contribution
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="section80CCD2"
                      value={formData.section80CCD2}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.section80CCD2 && (
                    <p className="text-red-500 text-sm mt-1">{errors.section80CCD2}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section 80CCH - Health Insurance Premium
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="section80CCH"
                      value={formData.section80CCH}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.section80CCH && (
                    <p className="text-red-500 text-sm mt-1">{errors.section80CCH}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section 80DD - Disability Deduction
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="section80DD"
                      value={formData.section80DD}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.section80DD && (
                    <p className="text-red-500 text-sm mt-1">{errors.section80DD}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section 80DDB - Medical Treatment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="section80DDB"
                      value={formData.section80DDB}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.section80DDB && (
                    <p className="text-red-500 text-sm mt-1">{errors.section80DDB}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section 80GG - Rent Paid
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="section80GG"
                      value={formData.section80GG}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.section80GG && (
                    <p className="text-red-500 text-sm mt-1">{errors.section80GG}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section 80TTB - Interest on Deposits
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="section80TTB"
                      value={formData.section80TTB}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.section80TTB && (
                    <p className="text-red-500 text-sm mt-1">{errors.section80TTB}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Total Deductions and Taxable Income */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Total Deductions and Taxable Income</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Deductions
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="totalDeductions"
                      value={formData.totalDeductions}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.totalDeductions && (
                    <p className="text-red-500 text-sm mt-1">{errors.totalDeductions}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Taxable Total Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="taxableTotalIncome"
                      value={formData.taxableTotalIncome}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  {errors.taxableTotalIncome && (
                    <p className="text-red-500 text-sm mt-1">{errors.taxableTotalIncome}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART D: Computation of Tax Payable</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-semibold">Code</div>
                <div className="font-semibold">Field Description</div>
                <div className="font-semibold">Amount (₹)</div>
              </div>

              {/* D1 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="font-semibold">D1</div>
                <div>Tax payable on total income</div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="taxPayable"
                    value={formData.taxPayable}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* D2 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="font-semibold">D2</div>
                <div>Rebate under Section 87A</div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="rebate87A"
                    value={formData.rebate87A}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* D3 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="font-semibold">D3</div>
                <div>Tax after Rebate (D1 - D2)</div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="taxAfterRebate"
                    value={formData.taxAfterRebate}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* D4 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="font-semibold">D4</div>
                <div>Health and Education Cess @ 4% on D3</div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="healthAndEducationCess"
                    value={formData.healthAndEducationCess}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* D5 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="font-semibold">D5</div>
                <div>Total Tax and Cess (D3 + D4)</div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="totalTaxAndCess"
                    value={formData.totalTaxAndCess}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* D6 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="font-semibold">D6</div>
                <div>Relief under Section 89 (submit Form 10E to claim this relief)</div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="relief89"
                    value={formData.relief89}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* D7 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="font-semibold">D7</div>
                <div>Interest under Section 234A (for delay in filing return)</div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="interest234A"
                    value={formData.interest234A}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* D8 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="font-semibold">D8</div>
                <div>Interest under Section 234B (for default in advance tax payment)</div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="interest234B"
                    value={formData.interest234B}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* D9 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="font-semibold">D9</div>
                <div>Interest under Section 234C (for deferment of advance tax)</div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="interest234C"
                    value={formData.interest234C}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* D10 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="font-semibold">D10</div>
                <div>Late filing Fee under Section 234F</div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="lateFilingFee234F"
                    value={formData.lateFilingFee234F}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* D11 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="font-semibold">D11</div>
                <div>Total Tax, Fee and Interest (D5 + D7 + D8 + D9 + D10 - D6)</div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="totalTaxFeeAndInterest"
                    value={formData.totalTaxFeeAndInterest}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* D12 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="font-semibold">D12</div>
                <div>Total Taxes Paid (Advance tax + TDS + TCS + Self-assessment tax)</div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="totalTaxesPaid"
                    value={formData.totalTaxesPaid}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* D13 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="font-semibold">D13</div>
                <div>Amount Payable (if D11 &gt; D12): D11 - D12</div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="amountPayable"
                    value={formData.amountPayable}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* D14 */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="font-semibold">D14</div>
                <div>Refund (if D12 &gt; D11): D12 - D11</div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    name="refund"
                    value={formData.refund}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART E: Other Information</h3>
            
            {/* 1. Bank Account Details */}
            <div className="mb-8">
              <h4 className="mb-4 text-md font-semibold text-gray-700">1. Bank Account Details (Excluding Dormant Accounts)</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border border-gray-300">S.No.</th>
                      <th className="px-4 py-2 border border-gray-300">IFS Code</th>
                      <th className="px-4 py-2 border border-gray-300">Bank Name</th>
                      <th className="px-4 py-2 border border-gray-300">Account Number</th>
                      <th className="px-4 py-2 border border-gray-300">Account Type</th>
                      <th className="px-4 py-2 border border-gray-300">Select for Refund</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.bankAccounts.map((account, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={account.ifscCode}
                            onChange={(e) => {
                              const newAccounts = [...formData.bankAccounts];
                              newAccounts[index].ifscCode = e.target.value;
                              setFormData({ ...formData, bankAccounts: newAccounts });
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter IFSC Code"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={account.bankName}
                            onChange={(e) => {
                              const newAccounts = [...formData.bankAccounts];
                              newAccounts[index].bankName = e.target.value;
                              setFormData({ ...formData, bankAccounts: newAccounts });
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter Bank Name"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={account.accountNumber}
                            onChange={(e) => {
                              const newAccounts = [...formData.bankAccounts];
                              newAccounts[index].accountNumber = e.target.value;
                              setFormData({ ...formData, bankAccounts: newAccounts });
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter Account Number"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <select
                            value={account.accountType}
                            onChange={(e) => {
                              const newAccounts = [...formData.bankAccounts];
                              newAccounts[index].accountType = e.target.value;
                              setFormData({ ...formData, bankAccounts: newAccounts });
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            <option value="">Select Type</option>
                            <option value="Savings">Savings</option>
                            <option value="Current">Current</option>
                          </select>
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="checkbox"
                            checked={account.selectForRefund}
                            onChange={(e) => {
                              const newAccounts = [...formData.bankAccounts];
                              newAccounts[index].selectForRefund = e.target.checked;
                              setFormData({ ...formData, bankAccounts: newAccounts });
                            }}
                            className="w-4 h-4"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Note: Report all active accounts held in India anytime during the financial year. At least one account must be marked as "Select for Refund".
                If multiple are selected, CPC will choose one validated account for credit.
              </p>
            </div>

            {/* 2. Schedule-IT – Advance Tax and Self-Assessment Tax Payments */}
            <div className="mb-8">
              <h4 className="mb-4 text-md font-semibold text-gray-700">2. Schedule-IT – Advance Tax and Self-Assessment Tax Payments</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border border-gray-300">S.No.</th>
                      <th className="px-4 py-2 border border-gray-300">BSR Code</th>
                      <th className="px-4 py-2 border border-gray-300">Date of Deposit</th>
                      <th className="px-4 py-2 border border-gray-300">Challan Serial Number</th>
                      <th className="px-4 py-2 border border-gray-300">Amount Paid (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.advanceTaxPayments.map((payment, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={payment.bsrCode}
                            onChange={(e) => {
                              const newPayments = [...formData.advanceTaxPayments];
                              newPayments[index].bsrCode = e.target.value;
                              setFormData({ ...formData, advanceTaxPayments: newPayments });
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter BSR Code"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="date"
                            value={payment.dateOfDeposit}
                            onChange={(e) => {
                              const newPayments = [...formData.advanceTaxPayments];
                              newPayments[index].dateOfDeposit = e.target.value;
                              setFormData({ ...formData, advanceTaxPayments: newPayments });
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={payment.challanSerialNumber}
                            onChange={(e) => {
                              const newPayments = [...formData.advanceTaxPayments];
                              newPayments[index].challanSerialNumber = e.target.value;
                              setFormData({ ...formData, advanceTaxPayments: newPayments });
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter Challan Serial Number"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input
                              type="number"
                              value={payment.amountPaid}
                              onChange={(e) => {
                                const newPayments = [...formData.advanceTaxPayments];
                                newPayments[index].amountPaid = e.target.value;
                                setFormData({ ...formData, advanceTaxPayments: newPayments });
                              }}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md"
                              placeholder="0.00"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Schedule-TDS – TDS/TCS Details */}
            <div className="mb-8">
              <h4 className="mb-4 text-md font-semibold text-gray-700">3. Schedule-TDS – TDS/TCS Details</h4>
              <p className="mb-4 text-sm text-gray-600">
                (As per Form 16/16A/16C/27D issued by Deductor/Collector/Employer)
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border border-gray-300">S.No.</th>
                      <th className="px-4 py-2 border border-gray-300">TAN / PAN / Aadhaar of Deductor / Collector</th>
                      <th className="px-4 py-2 border border-gray-300">Name of Deductor / Collector</th>
                      <th className="px-4 py-2 border border-gray-300">Section</th>
                      <th className="px-4 py-2 border border-gray-300">Gross Payment / Receipt (₹)</th>
                      <th className="px-4 py-2 border border-gray-300">Year of Deduction / Collection</th>
                      <th className="px-4 py-2 border border-gray-300">Tax Deducted / Collected (₹)</th>
                      <th className="px-4 py-2 border border-gray-300">Tax Credit Claimed (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.tdsDetails.map((detail, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={detail.tanPanAadhar}
                            onChange={(e) => {
                              const newDetails = [...formData.tdsDetails];
                              newDetails[index].tanPanAadhar = e.target.value;
                              setFormData({ ...formData, tdsDetails: newDetails });
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter TAN/PAN/Aadhaar"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={detail.deductorName}
                            onChange={(e) => {
                              const newDetails = [...formData.tdsDetails];
                              newDetails[index].deductorName = e.target.value;
                              setFormData({ ...formData, tdsDetails: newDetails });
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter Name"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={detail.section}
                            onChange={(e) => {
                              const newDetails = [...formData.tdsDetails];
                              newDetails[index].section = e.target.value;
                              setFormData({ ...formData, tdsDetails: newDetails });
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="e.g., 192, 194C"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input
                              type="number"
                              value={detail.grossAmount}
                              onChange={(e) => {
                                const newDetails = [...formData.tdsDetails];
                                newDetails[index].grossAmount = e.target.value;
                                setFormData({ ...formData, tdsDetails: newDetails });
                              }}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md"
                              placeholder="0.00"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <input
                            type="text"
                            value={detail.yearOfDeduction}
                            onChange={(e) => {
                              const newDetails = [...formData.tdsDetails];
                              newDetails[index].yearOfDeduction = e.target.value;
                              setFormData({ ...formData, tdsDetails: newDetails });
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="YYYY"
                          />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input
                              type="number"
                              value={detail.taxDeducted}
                              onChange={(e) => {
                                const newDetails = [...formData.tdsDetails];
                                newDetails[index].taxDeducted = e.target.value;
                                setFormData({ ...formData, tdsDetails: newDetails });
                              }}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md"
                              placeholder="0.00"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input
                              type="number"
                              value={detail.taxCreditClaimed}
                              onChange={(e) => {
                                const newDetails = [...formData.tdsDetails];
                                newDetails[index].taxCreditClaimed = e.target.value;
                                setFormData({ ...formData, tdsDetails: newDetails });
                              }}
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md"
                              placeholder="0.00"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Previous
            </button>
          )}
          <button
            type="button"
            onClick={handleNextStep}
            disabled={isLoading}
            className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : step === 5 ? (
              "Submit"
            ) : (
              "Next"
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

export default ItrOne;