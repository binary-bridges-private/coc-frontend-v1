// ITR-2 Validation Utilities

import { VALIDATION_PATTERNS } from './constants/ItrTwoConstants.ts';

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

export const validateDIN = (din: string): boolean => {
  return VALIDATION_PATTERNS.din.test(din);
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
export const validateItrTwoStep = (stepNumber: number, formData: any): { isValid: boolean; errors: any } => {
  const errors: any = {};
  let isValid = true;

  switch (stepNumber) {
    case 1: // Personal Information
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
      if (!validateRequired(formData.mobile1)) {
        errors.mobile1 = 'Mobile number is required';
        isValid = false;
      } else if (!validateMobile(formData.mobile1)) {
        errors.mobile1 = 'Invalid mobile number format';
        isValid = false;
      }
      if (!validateRequired(formData.email1)) {
        errors.email1 = 'Email is required';
        isValid = false;
      } else if (!validateEmail(formData.email1)) {
        errors.email1 = 'Invalid email format';
        isValid = false;
      }
      break;

    case 7: // Bank Details
      if (!validateRequired(formData.bankName)) {
        errors.bankName = 'Bank name is required';
        isValid = false;
      }
      if (!validateRequired(formData.accountNumber)) {
        errors.accountNumber = 'Account number is required';
        isValid = false;
      }
      if (!validateRequired(formData.ifscCode)) {
        errors.ifscCode = 'IFSC code is required';
        isValid = false;
      } else if (!validateIFSC(formData.ifscCode)) {
        errors.ifscCode = 'Invalid IFSC code format';
        isValid = false;
      }
      break;

    case 17: // Verification
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
  const salaryIncome = parseFloat(formData.salaryUnder17_1 || '0') + 
                      parseFloat(formData.perquisitesUnder17_2 || '0') + 
                      parseFloat(formData.profitsInLieuUnder17_3 || '0');
  const propertyIncome = parseFloat(formData.netIncomeFromProperty || '0');
  const capitalGains = parseFloat(formData.shortTermGains || '0') + 
                      parseFloat(formData.longTermGains || '0');
  const otherIncome = parseFloat(formData.interestIncome || '0') + 
                     parseFloat(formData.dividendIncome || '0') + 
                     parseFloat(formData.familyPension || '0') + 
                     parseFloat(formData.incomeFromOthers || '0');
  
  return salaryIncome + propertyIncome + capitalGains + otherIncome;
};

// Calculate total deductions
export const calculateTotalDeductions = (formData: any): number => {
  const deductions = [
    'section80C', 'section80CCC', 'section80CCD', 'section80D', 'section80DD', 
    'section80DDB', 'section80E', 'section80EE', 'section80G', 'section80GGA',
    'section80TTA', 'section80TTB', 'section80U', 'otherDeductions'
  ];
  
  return deductions.reduce((total, deduction) => {
    return total + parseFloat(formData[deduction] || '0');
  }, 0);
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
