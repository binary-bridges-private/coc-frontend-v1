// ITR-1 (SAHAJ) Validation Utilities

import { VALIDATION_PATTERNS } from './constants/ItrOneConstants.ts';

// Official validation functions for ITR-1
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

// Form validation function
export const validateItrOneForm = (formData: any): { isValid: boolean; errors: any } => {
  const errors: any = {};
  let isValid = true;

  // PAN validation
  if (!validateRequired(formData.pan)) {
    errors.pan = "PAN is required";
    isValid = false;
  } else if (!validatePAN(formData.pan)) {
    errors.pan = "Invalid PAN format";
    isValid = false;
  }

  // Aadhar validation
  if (!validateRequired(formData.aadhar)) {
    errors.aadhar = "Aadhar is required";
    isValid = false;
  } else if (!validateAadhar(formData.aadhar)) {
    errors.aadhar = "Invalid Aadhar format";
    isValid = false;
  }

  // Name validation
  if (!validateRequired(formData.firstName)) {
    errors.firstName = "First name is required";
    isValid = false;
  }

  if (!validateRequired(formData.lastName)) {
    errors.lastName = "Last name is required";
    isValid = false;
  }

  // Date of birth validation
  if (!validateRequired(formData.dateOfBirth)) {
    errors.dateOfBirth = "Date of birth is required";
    isValid = false;
  } else if (!validateDate(formData.dateOfBirth)) {
    errors.dateOfBirth = "Invalid date format (DD/MM/YYYY)";
    isValid = false;
  }

  // Email validation
  if (!validateRequired(formData.email)) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!validateEmail(formData.email)) {
    errors.email = "Invalid email format";
    isValid = false;
  }

  // Mobile validation
  if (!validateRequired(formData.mobileNumber)) {
    errors.mobileNumber = "Mobile number is required";
    isValid = false;
  } else if (!validateMobile(formData.mobileNumber)) {
    errors.mobileNumber = "Invalid mobile number format";
    isValid = false;
  }

  // Address validation
  if (!validateRequired(formData.address)) {
    errors.address = "Address is required";
    isValid = false;
  }

  if (!validateRequired(formData.city)) {
    errors.city = "City is required";
    isValid = false;
  }

  if (!validateRequired(formData.state)) {
    errors.state = "State is required";
    isValid = false;
  }

  if (!validateRequired(formData.pincode)) {
    errors.pincode = "Pincode is required";
    isValid = false;
  } else if (!validatePincode(formData.pincode)) {
    errors.pincode = "Invalid pincode format";
    isValid = false;
  }

  // Bank details validation
  if (!validateRequired(formData.bankName)) {
    errors.bankName = "Bank name is required";
    isValid = false;
  }

  if (!validateRequired(formData.accountNumber)) {
    errors.accountNumber = "Account number is required";
    isValid = false;
  }

  if (!validateRequired(formData.ifscCode)) {
    errors.ifscCode = "IFSC code is required";
    isValid = false;
  } else if (!validateIFSC(formData.ifscCode)) {
    errors.ifscCode = "Invalid IFSC code format";
    isValid = false;
  }

  // Gender validation
  if (!validateRequired(formData.gender)) {
    errors.gender = "Gender is required";
    isValid = false;
  }

  // Residential status validation
  if (!validateRequired(formData.residentialStatus)) {
    errors.residentialStatus = "Residential status is required";
    isValid = false;
  }

  // Verification method validation
  if (!validateRequired(formData.verificationMethod)) {
    errors.verificationMethod = "Verification method is required";
    isValid = false;
  }

  // Place of filing validation
  if (!validateRequired(formData.placeOfFiling)) {
    errors.placeOfFiling = "Place of filing is required";
    isValid = false;
  }

  // Date validations for additional fields
  if (formData.form10IEADate && !validateDate(formData.form10IEADate)) {
    errors.form10IEADate = "Invalid date format (DD/MM/YYYY)";
    isValid = false;
  }
  if (formData.originalFilingDate && !validateDate(formData.originalFilingDate)) {
    errors.originalFilingDate = "Invalid date format (DD/MM/YYYY)";
    isValid = false;
  }
  if (formData.noticeDate && !validateDate(formData.noticeDate)) {
    errors.noticeDate = "Invalid date format (DD/MM/YYYY)";
    isValid = false;
  }

  // Amount validations for all financial fields
  const amountFields = [
    'salarySection17_1', 'perquisitesSection17_2', 'profitSection17_3', 'houseRentAllowance',
    'grossRent', 'localTaxPaid', 'interestBorrowedCapital', 'arrearsRent', 'totalDividendIncome',
    'agriculturalIncome', 'section80C', 'section80CCC', 'section80CCD1', 'section80CCD1B',
    'section80CCD2', 'section80CCG', 'section80D', 'section80DD', 'section80DDB', 'section80E',
    'section80EE', 'section80EEA', 'section80EEB', 'section80G', 'section80GG', 'section80GGA',
    'section80GGC', 'section80QQB', 'section80RRB', 'section80TTB', 'section80U', 'section80CCH',
    'anyOtherDeductions', 'ltcg112ATotalSaleConsideration', 'ltcg112ATotalCostOfAcquisition',
    'relief89', 'relief89A'
  ];

  amountFields.forEach(field => {
    if (formData[field] && !validateAmount(formData[field])) {
      errors[field] = "Invalid amount format";
      isValid = false;
    }
  });

  // Array field validations
  if (formData.exemptAllowances) {
    formData.exemptAllowances.forEach((allowance: any, index: number) => {
      if (allowance.amount && !validateAmount(allowance.amount)) {
        errors[`exemptAllowances_${index}_amount`] = "Invalid amount format";
        isValid = false;
      }
    });
  }

  if (formData.otherSourcesIncome) {
    formData.otherSourcesIncome.forEach((income: any, index: number) => {
      if (income.amount && !validateAmount(income.amount)) {
        errors[`otherSourcesIncome_${index}_amount`] = "Invalid amount format";
        isValid = false;
      }
    });
  }

  if (formData.exemptIncome) {
    formData.exemptIncome.forEach((income: any, index: number) => {
      if (income.amount && !validateAmount(income.amount)) {
        errors[`exemptIncome_${index}_amount`] = "Invalid amount format";
        isValid = false;
      }
    });
  }

  if (formData.dividendIncomeQuarterly) {
    formData.dividendIncomeQuarterly.forEach((dividend: any, index: number) => {
      if (dividend.amount && !validateAmount(dividend.amount)) {
        errors[`dividendIncomeQuarterly_${index}_amount`] = "Invalid amount format";
        isValid = false;
      }
    });
  }

  if (formData.bankAccounts) {
    formData.bankAccounts.forEach((account: any, index: number) => {
      if (account.ifscCode && !validateIFSC(account.ifscCode)) {
        errors[`bankAccounts_${index}_ifscCode`] = "Invalid IFSC code format";
        isValid = false;
      }
    });
  }

  return { isValid, errors };
};

// Calculate total income
export const calculateTotalIncome = (formData: any): number => {
  const salaryIncome = parseFloat(formData.incomeChargeableSalaries || '0');
  const propertyIncome = parseFloat(formData.totalHousePropertyIncome || '0');
  const otherIncome = parseFloat(formData.totalDividendIncome || '0') + 
                     parseFloat(formData.agriculturalIncome || '0');
  
  return salaryIncome + propertyIncome + otherIncome;
};

// Calculate total deductions
export const calculateTotalDeductions = (formData: any): number => {
  const deductions = [
    'section80C', 'section80CCC', 'section80CCD1', 'section80CCD1B', 'section80CCD2',
    'section80CCG', 'section80D', 'section80DD', 'section80DDB', 'section80E',
    'section80EE', 'section80EEA', 'section80EEB', 'section80G', 'section80GG',
    'section80GGA', 'section80GGC', 'section80QQB', 'section80RRB', 'section80TTA',
    'section80TTB', 'section80U', 'section80CCH', 'anyOtherDeductions'
  ];
  
  return deductions.reduce((total, deduction) => {
    return total + parseFloat(formData[deduction] || '0');
  }, 0);
};

// Calculate tax payable
export const calculateTaxPayable = (totalIncome: number, totalDeductions: number): number => {
  const taxableIncome = Math.max(0, totalIncome - totalDeductions);
  
  // Basic tax calculation (simplified) - Fixed progressive tax calculation
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

