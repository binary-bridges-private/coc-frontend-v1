// ITR-3 Validation Utilities

import { VALIDATION_PATTERNS } from './constants/ItrThreeConstants.ts';

// Individual validation functions
export const validatePAN = (pan: string): boolean => {
  return VALIDATION_PATTERNS.pan.test(pan);
};

export const validateAadhar = (aadhar: string): boolean => {
  return VALIDATION_PATTERNS.aadhar.test(aadhar);
};

export const validateMobile = (mobile: string): boolean => {
  return VALIDATION_PATTERNS.mobile.test(mobile);
};

export const validateEmail = (email: string): boolean => {
  return VALIDATION_PATTERNS.email.test(email);
};

export const validateIFSC = (ifsc: string): boolean => {
  return VALIDATION_PATTERNS.ifsc.test(ifsc);
};

export const validatePincode = (pincode: string): boolean => {
  return VALIDATION_PATTERNS.pincode.test(pincode);
};

export const validateTAN = (tan: string): boolean => {
  return VALIDATION_PATTERNS.tan.test(tan);
};

// Date validation
export const validateDate = (date: string): boolean => {
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!dateRegex.test(date)) return false;
  
  const [, day, month, year] = date.match(dateRegex) || [];
  const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  
  return dateObj.getDate() === parseInt(day) &&
         dateObj.getMonth() === parseInt(month) - 1 &&
         dateObj.getFullYear() === parseInt(year);
};

// Amount validation
export const validateAmount = (amount: string): boolean => {
  const amountRegex = /^\d+(\.\d{1,2})?$/;
  return amountRegex.test(amount) && parseFloat(amount) >= 0;
};

// Required field validation
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

// Step-specific validation
export const validateItrThreeStep = (stepNumber: number, formData: any): { isValid: boolean; errors: any } => {
  const errors: any = {};
  let isValid = true;

  switch (stepNumber) {
    case 1: // General Information
      if (!validateRequired(formData.firstName)) {
        errors.firstName = 'First name is required';
        isValid = false;
      }
      if (!validateRequired(formData.lastName)) {
        errors.lastName = 'Last name is required';
        isValid = false;
      }
      if (!validateRequired(formData.pan)) {
        errors.pan = 'PAN is required';
        isValid = false;
      } else if (!validatePAN(formData.pan)) {
        errors.pan = 'Invalid PAN format';
        isValid = false;
      }
      if (!validateRequired(formData.dateOfBirth)) {
        errors.dateOfBirth = 'Date of birth is required';
        isValid = false;
      } else if (!validateDate(formData.dateOfBirth)) {
        errors.dateOfBirth = 'Invalid date format (DD/MM/YYYY)';
        isValid = false;
      }
      if (!validateRequired(formData.mobileNumber)) {
        errors.mobileNumber = 'Mobile number is required';
        isValid = false;
      } else if (!validateMobile(formData.mobileNumber)) {
        errors.mobileNumber = 'Invalid mobile number format';
        isValid = false;
      }
      if (!validateRequired(formData.emailAddress)) {
        errors.emailAddress = 'Email is required';
        isValid = false;
      } else if (!validateEmail(formData.emailAddress)) {
        errors.emailAddress = 'Invalid email format';
        isValid = false;
      }
      break;

    case 2: // Filing Status
      if (!validateRequired(formData.filingSection)) {
        errors.filingSection = 'Filing section is required';
        isValid = false;
      }
      break;

    case 16: // Bank Accounts
      if (formData.bankAccounts.length > 0) {
        formData.bankAccounts.forEach((account: any, index: number) => {
          if (!validateRequired(account.bankName)) {
            errors[`bankAccounts_${index}_bankName`] = 'Bank name is required';
            isValid = false;
          }
          if (!validateRequired(account.accountNumber)) {
            errors[`bankAccounts_${index}_accountNumber`] = 'Account number is required';
            isValid = false;
          }
          if (!validateRequired(account.ifscCode)) {
            errors[`bankAccounts_${index}_ifscCode`] = 'IFSC code is required';
            isValid = false;
          } else if (!validateIFSC(account.ifscCode)) {
            errors[`bankAccounts_${index}_ifscCode`] = 'Invalid IFSC code format';
            isValid = false;
          }
        });
      }
      break;

    case 20: // Verification
      if (!validateRequired(formData.verificationName)) {
        errors.verificationName = 'Verification name is required';
        isValid = false;
      }
      if (!validateRequired(formData.capacity)) {
        errors.capacity = 'Capacity is required';
        isValid = false;
      }
      if (!validateRequired(formData.declarationPlace)) {
        errors.declarationPlace = 'Declaration place is required';
        isValid = false;
      }
      if (!validateRequired(formData.declarationDate)) {
        errors.declarationDate = 'Declaration date is required';
        isValid = false;
      } else if (!validateDate(formData.declarationDate)) {
        errors.declarationDate = 'Invalid date format (DD/MM/YYYY)';
        isValid = false;
      }
      break;

    default:
      // For other steps, no validation required
      break;
  }

  return { isValid, errors };
};

// Calculate total income
export const calculateTotalIncome = (formData: any): number => {
  const businessIncome = formData.profitLossDetails.reduce((total: number, pl: any) => total + (pl.netProfit || 0), 0);
  const propertyIncome = formData.housePropertyDetails.reduce((total: number, hp: any) => total + (hp.netIncome || 0), 0);
  const capitalGains = formData.capitalGainDetails.reduce((total: number, cg: any) => total + (cg.capitalGain || 0), 0);
  const otherIncome = formData.otherSourceDetails.reduce((total: number, os: any) => total + (os.netAmount || 0), 0);
  
  return businessIncome + propertyIncome + capitalGains + otherIncome;
};

// Calculate total deductions
export const calculateTotalDeductions = (formData: any): number => {
  return formData.deductionDetails.reduce((total: number, deduction: any) => total + (deduction.eligibleAmount || 0), 0);
};

// Calculate tax payable
export const calculateTaxPayable = (totalIncome: number, totalDeductions: number): number => {
  const taxableIncome = Math.max(0, totalIncome - totalDeductions);
  
  // Progressive tax calculation
  let tax = 0;
  let remainingIncome = taxableIncome;
  
  if (remainingIncome > 1000000) {
    tax += (remainingIncome - 1000000) * 0.30;
    remainingIncome = 1000000;
  }
  if (remainingIncome > 500000) {
    tax += (remainingIncome - 500000) * 0.20;
    remainingIncome = 500000;
  }
  if (remainingIncome > 250000) {
    tax += (remainingIncome - 250000) * 0.05;
  }
  
  return tax;
};
