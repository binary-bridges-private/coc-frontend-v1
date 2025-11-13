import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';


const partAGeneralSchema = z.object({
  
  a1_firstName: z.string().min(1, 'First name is required').regex(/^[a-zA-Z\s.]+$/, 'First name should contain only letters'),
  a2_middleName: z.string().optional().or(z.literal('')).refine((val) => !val || /^[a-zA-Z\s.]+$/.test(val), {
    message: 'Middle name should contain only letters',
  }),
  a3_lastName: z.string().min(1, 'Last name is required').regex(/^[a-zA-Z\s.]+$/, 'Last name should contain only letters'),
  a4_pan: z.string().min(1, 'PAN is required').length(10, 'PAN must be exactly 10 characters').regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i, 'Invalid PAN format (e.g., ABCDE1234F)'),

  
  a5_flatDoorBlockNo: z.string().optional().or(z.literal('')),
  a6_premisesName: z.string().optional().or(z.literal('')),
  a14_status: z.enum(['Individual', 'HUF', '']).refine((val) => val !== '', { message: 'Status is required' }),
  a7_roadStreetPostOffice: z.string().optional().or(z.literal('')),
  a8_dateOfBirth: z.string().min(1, 'Date of Birth is required').regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Invalid date format. Use DD/MM/YYYY'),
  a15_businessCommencementDate: z.string().optional().or(z.literal('')).refine((val) => !val || /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(val), {
    message: 'Invalid date format. Use DD/MM/YYYY',
  }),
  a9_areaLocality: z.string().optional().or(z.literal('')),
  a16_aadhaar: z.string().min(1, 'Aadhaar is required').length(12, 'Aadhaar must be exactly 12 digits').regex(/^[2-9][0-9]{11}$/, 'Invalid Aadhaar number (must start with 2-9)'),
  a10_townCityDistrict: z.string().min(1, 'Town/City is required').regex(/^[a-zA-Z\s]+$/, 'Town/City should contain only letters'),
  a11_state: z.string().min(1, 'State is required').regex(/^[a-zA-Z\s]+$/, 'State should contain only letters'),
  a12_pinCode: z.string().min(1, 'PIN Code is required').length(6, 'PIN Code must be exactly 6 digits').regex(/^[1-9][0-9]{5}$/, 'Invalid PIN Code (cannot start with 0)'),
  a13_country: z.string().optional().or(z.literal('')),
  a17_phoneNo: z.string().optional().or(z.literal('')).refine((val) => !val || /^[6-9][0-9]{9}$/.test(val), {
    message: 'Phone number must be 10 digits starting with 6-9',
  }),
  a17_mobileNo1: z.string().min(1, 'At least one mobile number is required').regex(/^[6-9][0-9]{9}$/, 'Mobile number must be 10 digits starting with 6-9'),
  a17_mobileNo2: z.string().optional().or(z.literal('')).refine((val) => !val || /^[6-9][0-9]{9}$/.test(val), {
    message: 'Mobile number must be 10 digits starting with 6-9',
  }),
  a18_email1: z.string().min(1, 'Email address is required').email('Invalid email format'),
  a18_email2: z.string().optional().or(z.literal('')).refine((val) => !val || z.string().email().safeParse(val).success, {
    message: 'Invalid email format',
  }),

  
  a19_filingDueDate: z.enum(['31st July', '31st October', '30th November', '']).refine((val) => val !== '', { 
    message: 'Filing due date is required' 
  }),
  a19_filingStatus: z.string().min(1, 'Filing status is required'),

  
  a19b_taxRegimeOption: z.enum(['Yes', 'No', 'NotApplicable']).optional().or(z.literal('')),
  a19b_continueOptOut: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  a19b_form10IEADate: z.string().optional().or(z.literal('')),
  a19b_form10IEAAckNumber: z.string().optional().or(z.literal('')),
  a19b_newTaxRegimeSetB: z.enum(['Yes', 'No']).optional().or(z.literal('')),

  
  c_seventhProviso: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  ci_depositExceeding1Cr: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  ci_amount: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, { message: 'Amount must be a valid positive number' }),
  cii_foreignTravel: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  cii_amount: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, { message: 'Amount must be a valid positive number' }),
  ciii_electricityExpense: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  ciii_amount: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, { message: 'Amount must be a valid positive number' }),
  civ_otherCondition: z.enum(['Yes', 'No']).optional().or(z.literal('')),

  
  d_revised: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  d_receiptNo: z.string().optional().or(z.literal('')),
  d_receiptDate: z.string().optional().or(z.literal('')),
  e_notice: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  e_noticeNumber: z.string().optional().or(z.literal('')),
  e_noticeDate: z.string().optional().or(z.literal('')),

  
  f_residentialStatus: z.enum(['Resident', 'ResidentNotOrdinary', 'NonResident', '']).refine((val) => val !== '', { 
    message: 'Residential status is required' 
  }),
  f_residency_days: z.string().optional().or(z.literal('')),
  f_residency_4years: z.string().optional().or(z.literal('')),

  
  g_section115H: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  h_portugueseCivilCode: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  i_representativeAssessee: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  i_representativeName: z.string().optional().or(z.literal('')),
  i_representativeCapacity: z.string().optional().or(z.literal('')),
  i_representativeAddress: z.string().optional().or(z.literal('')),
  i_representativePAN: z.string().optional().or(z.literal('')),

  j_director: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  k_partner: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  l_unlistedShares: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  m_permanentEstablishment: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  n_significantEconomicPresence: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  o_internationalFinancialServices: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  p_fpi: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  p_sebiRegNo: z.string().optional().or(z.literal('')),
  q_lei: z.string().optional().or(z.literal('')),
  q_leiValidUptoDate: z.string().optional().or(z.literal('')),

  
  a1_accountsRequired: z.enum(['Yes', 'No', '']).refine((val) => val !== '', { 
    message: 'This field is required' 
  }),
  a2_presumptiveIncome: z.enum(['Yes', 'No', '']).refine((val) => val !== '', { 
    message: 'This field is required' 
  }),
  a2i_turnoverBetween: z.enum(['Yes', 'No', 'NoNotExceed1Cr', 'NoExceeds10Cr']).optional().or(z.literal('')),
  a2ii_cashPayments: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  a2iii_cashReceipts: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  b_auditLiable: z.enum(['Yes', 'No', '']).refine((val) => val !== '', { 
    message: 'This field is required' 
  }),
  bi_salesExceedLimit: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  bii_presumptiveSection: z.string().optional().or(z.literal('')),
  biii_otherCondition: z.string().optional().or(z.literal('')),
  c_auditedByAccountant: z.enum(['Yes', 'No']).optional().or(z.literal('')),

  
  auditReportDate: z.string().optional().or(z.literal('')),
  auditorName: z.string().optional().or(z.literal('')),
  auditorMembershipNo: z.string().optional().or(z.literal('')),
  auditorFirmName: z.string().optional().or(z.literal('')),
  auditorFirmRegNo: z.string().optional().or(z.literal('')),
  auditorPAN: z.string().optional().or(z.literal('')),
  auditReportDate2: z.string().optional().or(z.literal('')),
  auditReportAckNumber: z.string().optional().or(z.literal('')),
  auditReportUDIN: z.string().optional().or(z.literal('')),

  
  di_audit92E: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  dii_audited92E: z.enum(['Yes', 'No']).optional().or(z.literal('')),
  dii_auditDate: z.string().optional().or(z.literal('')),
  dii_ackNumber: z.string().optional().or(z.literal('')),
  diii_otherAudit: z.enum(['Yes', 'No']).optional().or(z.literal('')),

  
  businessNature1Code: z.string().optional().or(z.literal('')),
  businessNature1Name: z.string().optional().or(z.literal('')),
  businessNature1Description: z.string().optional().or(z.literal('')),
  businessNature2Code: z.string().optional().or(z.literal('')),
  businessNature2Name: z.string().optional().or(z.literal('')),
  businessNature2Description: z.string().optional().or(z.literal('')),
  businessNature3Code: z.string().optional().or(z.literal('')),
  businessNature3Name: z.string().optional().or(z.literal('')),
  businessNature3Description: z.string().optional().or(z.literal('')),
}).superRefine((data, ctx) => {
  
  // Filing Status Format Validation
  if (data.a19_filingStatus && data.a19_filingStatus.trim() !== '') {
    const filingRegex = /^139\([1-9]\)$|^142\(1\)$|^148$/;
    if (!filingRegex.test(data.a19_filingStatus)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid filing status format. Use 139(1), 139(4), 142(1), or 148',
        path: ['a19_filingStatus'],
      });
    }
  }

  
  if (data.a19b_taxRegimeOption === 'Yes' || data.a19b_taxRegimeOption === 'No') {
    if (!data.a19b_continueOptOut || data.a19b_continueOptOut.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please specify if you wish to opt out for current AY',
        path: ['a19b_continueOptOut'],
      });
    }
  }

  
  if (data.c_seventhProviso === 'Yes') {
    
    if (data.ci_depositExceeding1Cr === 'Yes') {
      if (!data.ci_amount || data.ci_amount.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Amount is required when deposit exceeds Rs. 1 Crore',
          path: ['ci_amount'],
        });
      } else {
        const amount = parseFloat(data.ci_amount);
        if (isNaN(amount) || amount <= 10000000) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Amount must be greater than Rs. 1 Crore (10,000,000)',
            path: ['ci_amount'],
          });
        }
      }
    }

    
    if (data.cii_foreignTravel === 'Yes') {
      if (!data.cii_amount || data.cii_amount.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Amount is required when foreign travel exceeds Rs. 2 Lakh',
          path: ['cii_amount'],
        });
      } else {
        const amount = parseFloat(data.cii_amount);
        if (isNaN(amount) || amount <= 200000) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Amount must be greater than Rs. 2 Lakh (2,00,000)',
            path: ['cii_amount'],
          });
        }
      }
    }

    
    if (data.ciii_electricityExpense === 'Yes') {
      if (!data.ciii_amount || data.ciii_amount.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Amount is required when electricity expense exceeds Rs. 1 Lakh',
          path: ['ciii_amount'],
        });
      } else {
        const amount = parseFloat(data.ciii_amount);
        if (isNaN(amount) || amount <= 100000) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Amount must be greater than Rs. 1 Lakh (1,00,000)',
            path: ['ciii_amount'],
          });
        }
      }
    }
  }

  
  if (data.a2_presumptiveIncome === 'No') {
    if (!data.a2i_turnoverBetween || data.a2i_turnoverBetween.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Turnover specification is required',
        path: ['a2i_turnoverBetween'],
      });
    }

    
    if (data.a2i_turnoverBetween === 'Yes') {
      if (!data.a2ii_cashPayments || data.a2ii_cashPayments.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Cash receipts specification is required',
          path: ['a2ii_cashPayments'],
        });
      }
      if (!data.a2iii_cashReceipts || data.a2iii_cashReceipts.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Cash payments specification is required',
          path: ['a2iii_cashReceipts'],
        });
      }
    }
  }

  
  if (data.b_auditLiable === 'Yes') {
    if (!data.c_auditedByAccountant || data.c_auditedByAccountant.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please specify if audited by accountant',
        path: ['c_auditedByAccountant'],
      });
    }

    
    if (data.c_auditedByAccountant === 'Yes') {
      
      if (!data.auditReportDate || data.auditReportDate.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Audit report date is required',
          path: ['auditReportDate'],
        });
      } else {
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!dateRegex.test(data.auditReportDate)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid date format. Use DD/MM/YYYY',
            path: ['auditReportDate'],
          });
        }
      }

      
      if (!data.auditorName || data.auditorName.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Auditor name is required',
          path: ['auditorName'],
        });
      } else {
        const nameRegex = /^[a-zA-Z\s.]+$/;
        if (!nameRegex.test(data.auditorName)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Auditor name should contain only letters',
            path: ['auditorName'],
          });
        }
      }

      
      if (!data.auditorMembershipNo || data.auditorMembershipNo.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Auditor membership number is required',
          path: ['auditorMembershipNo'],
        });
      } else {
        const membershipRegex = /^[A-Z0-9]{6,10}$/;
        if (!membershipRegex.test(data.auditorMembershipNo.toUpperCase())) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid membership number format (6-10 alphanumeric characters)',
            path: ['auditorMembershipNo'],
          });
        }
      }

      
      if (!data.auditReportUDIN || data.auditReportUDIN.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'UDIN is required',
          path: ['auditReportUDIN'],
        });
      } else {
        const udinRegex = /^[0-9]{14}[A-Z]{4}$/;
        if (!udinRegex.test(data.auditReportUDIN.toUpperCase())) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Invalid UDIN format. Must be exactly 18 characters: 14 digits followed by 4 letters (e.g., 12345678901234ABCD). You entered: ${data.auditReportUDIN.length} characters`,
            path: ['auditReportUDIN'],
          });
        }
      }

      
      if (data.auditorPAN && data.auditorPAN.trim() !== '') {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        const aadhaarRegex = /^[2-9][0-9]{11}$/;
        if (!panRegex.test(data.auditorPAN.toUpperCase()) && !aadhaarRegex.test(data.auditorPAN)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid PAN/Aadhaar format',
            path: ['auditorPAN'],
          });
        }
      }
    }
  }

  
  if (data.di_audit92E === 'Yes') {
    if (!data.dii_audited92E || data.dii_audited92E.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please specify if audited u/s 92E',
        path: ['dii_audited92E'],
      });
    }

    
    if (data.dii_audited92E === 'Yes') {
      
      if (!data.dii_auditDate || data.dii_auditDate.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Audit date is required',
          path: ['dii_auditDate'],
        });
      } else {
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!dateRegex.test(data.dii_auditDate)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid date format. Use DD/MM/YYYY',
            path: ['dii_auditDate'],
          });
        }
      }

      
      if (!data.dii_ackNumber || data.dii_ackNumber.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Acknowledgement number is required',
          path: ['dii_ackNumber'],
        });
      } else {
        const ackRegex = /^[0-9]{15}$/;
        if (!ackRegex.test(data.dii_ackNumber)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Acknowledgement number must be 15 digits',
            path: ['dii_ackNumber'],
          });
        }
      }
    }
  }

  
  if (data.i_representativeAssessee === 'Yes') {
    
    if (!data.i_representativeName || data.i_representativeName.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Representative name is required',
        path: ['i_representativeName'],
      });
    } else {
      const nameRegex = /^[a-zA-Z\s.]+$/;
      if (!nameRegex.test(data.i_representativeName)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Name should contain only letters',
          path: ['i_representativeName'],
        });
      }
    }

    
    if (!data.i_representativePAN || data.i_representativePAN.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Representative PAN/Aadhaar is required',
        path: ['i_representativePAN'],
      });
    } else {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      const aadhaarRegex = /^[2-9][0-9]{11}$/;
      if (!panRegex.test(data.i_representativePAN.toUpperCase()) && !aadhaarRegex.test(data.i_representativePAN)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid PAN/Aadhaar format',
          path: ['i_representativePAN'],
        });
      }
    }
  }

  
  if (data.p_fpi === 'Yes') {
    if (!data.p_sebiRegNo || data.p_sebiRegNo.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'SEBI Registration Number is required for FPI',
        path: ['p_sebiRegNo'],
      });
    } else {
      const sebiRegex = /^[A-Z]{3}\/[A-Z]{2}\/\d{6}\/\d{4}$/;
      if (!sebiRegex.test(data.p_sebiRegNo.toUpperCase())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid SEBI Registration format (e.g., INP/FP/123456/2023)',
          path: ['p_sebiRegNo'],
        });
      }
    }
  }

  
  if (data.q_lei && data.q_lei.trim() !== '') {
    const leiRegex = /^[A-Z0-9]{20}$/;
    if (!leiRegex.test(data.q_lei.toUpperCase())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid LEI format (must be 20 alphanumeric characters)',
        path: ['q_lei'],
      });
    }

    
    if (data.q_leiValidUptoDate && data.q_leiValidUptoDate.trim() !== '') {
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      if (!dateRegex.test(data.q_leiValidUptoDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid date format. Use DD/MM/YYYY',
          path: ['q_leiValidUptoDate'],
        });
      }
    }
  }

  
  if (data.businessNature1Code && data.businessNature1Code.trim() !== '') {
    const codeRegex = /^[0-9]{5}$/;
    if (!codeRegex.test(data.businessNature1Code)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Business code must be 5 digits',
        path: ['businessNature1Code'],
      });
    }
  }

  if (data.businessNature2Code && data.businessNature2Code.trim() !== '') {
    const codeRegex = /^[0-9]{5}$/;
    if (!codeRegex.test(data.businessNature2Code)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Business code must be 5 digits',
        path: ['businessNature2Code'],
      });
    }
  }

  if (data.businessNature3Code && data.businessNature3Code.trim() !== '') {
    const codeRegex = /^[0-9]{5}$/;
    if (!codeRegex.test(data.businessNature3Code)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Business code must be 5 digits',
        path: ['businessNature3Code'],
      });
    }
  }
});

export type PartAGeneralFormData = z.infer<typeof partAGeneralSchema>;

interface PartAGeneralProps {
  onNext: () => void;
  onBack: () => void;
  onSave?: (data: PartAGeneralFormData) => void;
  initialData?: Partial<PartAGeneralFormData>;
}

const ItrThreePartAGeneral: React.FC<PartAGeneralProps> = ({
  onNext,
  onBack,
  onSave,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PartAGeneralFormData>({
    resolver: zodResolver(partAGeneralSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: PartAGeneralFormData) => {
    console.log('✅ Form validation passed! Submitting data:', data);
    if (onSave) {
      onSave(data);
    }
    onNext();
  };

  const onError = (errors: any) => {
    console.error('❌ Form validation failed!');
    console.error('Total errors:', Object.keys(errors).length);
    console.error('Error details:', errors);
    
    // Log each error with field name and message
    Object.entries(errors).forEach(([field, error]: [string, any]) => {
      console.error(`  - ${field}: ${error.message}`);
    });
  };

  const handleSaveProgress = () => {
    const data = watch();
    if (onSave) {
      onSave(data as PartAGeneralFormData);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;
  
  // Log errors whenever they change
  React.useEffect(() => {
    if (hasErrors) {
      console.warn('⚠️ Form has validation errors:', errors);
    }
  }, [hasErrors, errors]);
  const seventhProviso = watch('c_seventhProviso');
  const ci_depositExceeding1Cr = watch('ci_depositExceeding1Cr');
  const cii_foreignTravel = watch('cii_foreignTravel');
  const ciii_electricityExpense = watch('ciii_electricityExpense');
  const a2i_turnoverBetween = watch('a2i_turnoverBetween');
  const a2_presumptiveIncome = watch('a2_presumptiveIncome');
  const auditedByAccountant = watch('c_auditedByAccountant');
  const a19b_taxRegimeOption = watch('a19b_taxRegimeOption');

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Part A - General Information
        </h2>
        <p className="text-sm text-gray-600">
          Personal details, address, filing status, residential information, and audit details
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        {/* Error Summary Banner */}
        {hasErrors && (
          <div className="rounded-xl border-2 border-red-300 bg-red-50 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-900">
                  Please correct the following errors ({Object.keys(errors).length})
                </h3>
                <div className="mt-2 max-h-40 overflow-y-auto">
                  <ul className="list-disc pl-5 space-y-1">
                    {Object.entries(errors).map(([field, error]: [string, any]) => (
                      <li key={field} className="text-xs text-red-800">
                        <span className="font-medium">{field.replace(/_/g, ' ')}:</span> {error.message}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Personal Details Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Personal Details</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A1) First Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  {...register('a1_firstName')} 
                  placeholder="First name" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a1_firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a1_firstName && (
                  <p className="mt-1 text-xs text-red-600">{errors.a1_firstName.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">(A2) Middle Name</label>
                <input 
                  type="text" 
                  {...register('a2_middleName')} 
                  placeholder="Middle name" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a2_middleName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a2_middleName && (
                  <p className="mt-1 text-xs text-red-600">{errors.a2_middleName.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A3) Last Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  {...register('a3_lastName')} 
                  placeholder="Last name" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a3_lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a3_lastName && (
                  <p className="mt-1 text-xs text-red-600">{errors.a3_lastName.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A4) PAN <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  {...register('a4_pan')} 
                  placeholder="AAAAA0000A" 
                  maxLength={10}
                  className={`w-full rounded-lg border px-3 py-2 text-sm uppercase ${errors.a4_pan ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a4_pan && (
                  <p className="mt-1 text-xs text-red-600">{errors.a4_pan.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Address Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">(A5) Flat/Door/Block No.</label>
                <input 
                  type="text" 
                  {...register('a5_flatDoorBlockNo')} 
                  placeholder="Flat/Door/Block No." 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a5_flatDoorBlockNo ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a5_flatDoorBlockNo && (
                  <p className="mt-1 text-xs text-red-600">{errors.a5_flatDoorBlockNo.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">(A6) Name of Premises/Building/Village</label>
                <input 
                  type="text" 
                  {...register('a6_premisesName')} 
                  placeholder="Building/Village name" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a6_premisesName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a6_premisesName && (
                  <p className="mt-1 text-xs text-red-600">{errors.a6_premisesName.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">(A7) Road/Street/Post Office</label>
                <input 
                  type="text" 
                  {...register('a7_roadStreetPostOffice')} 
                  placeholder="Road/Street" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a7_roadStreetPostOffice ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a7_roadStreetPostOffice && (
                  <p className="mt-1 text-xs text-red-600">{errors.a7_roadStreetPostOffice.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">(A9) Area/Locality</label>
                <input 
                  type="text" 
                  {...register('a9_areaLocality')} 
                  placeholder="Area/Locality" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a9_areaLocality ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a9_areaLocality && (
                  <p className="mt-1 text-xs text-red-600">{errors.a9_areaLocality.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A10) Town/City/District <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  {...register('a10_townCityDistrict')} 
                  placeholder="Town/City" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a10_townCityDistrict ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a10_townCityDistrict && (
                  <p className="mt-1 text-xs text-red-600">{errors.a10_townCityDistrict.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A11) State <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  {...register('a11_state')} 
                  placeholder="State" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a11_state ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a11_state && (
                  <p className="mt-1 text-xs text-red-600">{errors.a11_state.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A12) PIN Code/ZIP Code <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  {...register('a12_pinCode')} 
                  placeholder="123456" 
                  maxLength={6}
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a12_pinCode ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a12_pinCode && (
                  <p className="mt-1 text-xs text-red-600">{errors.a12_pinCode.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">(A13) Country</label>
                <input 
                  type="text" 
                  {...register('a13_country')} 
                  placeholder="Country" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a13_country ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a13_country && (
                  <p className="mt-1 text-xs text-red-600">{errors.a13_country.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status & Dates */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Status & Important Dates</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A14) Status <span className="text-red-500">*</span>
                </label>
                <select 
                  {...register('a14_status')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a14_status ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select Status</option>
                  <option value="Individual">Individual</option>
                  <option value="HUF">HUF</option>
                </select>
                {errors.a14_status && (
                  <p className="mt-1 text-xs text-red-600">{errors.a14_status.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A8) Date of Birth (DD/MM/YYYY) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  {...register('a8_dateOfBirth')} 
                  placeholder="DD/MM/YYYY" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a8_dateOfBirth ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a8_dateOfBirth && (
                  <p className="mt-1 text-xs text-red-600">{errors.a8_dateOfBirth.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">(A15) Business Commencement Date</label>
                <input 
                  type="text" 
                  {...register('a15_businessCommencementDate')} 
                  placeholder="DD/MM/YYYY" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a15_businessCommencementDate ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a15_businessCommencementDate && (
                  <p className="mt-1 text-xs text-red-600">{errors.a15_businessCommencementDate.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A16) Aadhaar Number (12 digits) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  {...register('a16_aadhaar')} 
                  placeholder="12-digit Aadhaar" 
                  maxLength={12}
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a16_aadhaar ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a16_aadhaar && (
                  <p className="mt-1 text-xs text-red-600">{errors.a16_aadhaar.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Contact Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">(A17) Phone No. (10 digits)</label>
                <input 
                  type="text" 
                  {...register('a17_phoneNo')} 
                  placeholder="10-digit phone" 
                  maxLength={10}
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a17_phoneNo ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a17_phoneNo && (
                  <p className="mt-1 text-xs text-red-600">{errors.a17_phoneNo.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Mobile No. 1 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  {...register('a17_mobileNo1')} 
                  placeholder="10-digit mobile" 
                  maxLength={10}
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a17_mobileNo1 ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a17_mobileNo1 && (
                  <p className="mt-1 text-xs text-red-600">{errors.a17_mobileNo1.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Mobile No. 2</label>
                <input 
                  type="text" 
                  {...register('a17_mobileNo2')} 
                  placeholder="10-digit mobile" 
                  maxLength={10}
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a17_mobileNo2 ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a17_mobileNo2 && (
                  <p className="mt-1 text-xs text-red-600">{errors.a17_mobileNo2.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A18) Email Address 1 (Self) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  {...register('a18_email1')} 
                  placeholder="Email address" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a18_email1 ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a18_email1 && (
                  <p className="mt-1 text-xs text-red-600">{errors.a18_email1.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Email Address 2</label>
                <input 
                  type="email" 
                  {...register('a18_email2')} 
                  placeholder="Alternate email" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a18_email2 ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a18_email2 && (
                  <p className="mt-1 text-xs text-red-600">{errors.a18_email2.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filing Status Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Filing Status</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A19.ai) Due Date for Filing Return <span className="text-red-500">*</span>
                </label>
                <select 
                  {...register('a19_filingDueDate')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a19_filingDueDate ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select Due Date</option>
                  <option value="31st July">31st July</option>
                  <option value="31st October">31st October</option>
                  <option value="30th November">30th November</option>
                </select>
                {errors.a19_filingDueDate && (
                  <p className="mt-1 text-xs text-red-600">{errors.a19_filingDueDate.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A19.aii) Filed u/s <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  {...register('a19_filingStatus')} 
                  placeholder="e.g., 139(1), 139(4), etc." 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a19_filingStatus ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.a19_filingStatus && (
                  <p className="mt-1 text-xs text-red-600">{errors.a19_filingStatus.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* New Tax Regime Option */}
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">New Tax Regime Option (Section 115BAC)</h3>
          
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Have you exercised option u/s 115BAC(6) in Form 10-IEA for AY 2024-25?</label>
              <select 
                {...register('a19b_taxRegimeOption')} 
                className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a19b_taxRegimeOption ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              >
                <option value="">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="NotApplicable">Not Applicable</option>
              </select>
              {errors.a19b_taxRegimeOption && (
                <p className="mt-1 text-xs text-red-600">{errors.a19b_taxRegimeOption.message}</p>
              )}
            </div>
            
            {(a19b_taxRegimeOption === 'Yes' || a19b_taxRegimeOption === 'No') && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Do you wish to opt out for current AY? <span className="text-red-500">*</span>
                  </label>
                  <select 
                    {...register('a19b_continueOptOut')} 
                    className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a19b_continueOptOut ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.a19b_continueOptOut && (
                    <p className="mt-1 text-xs text-red-600">{errors.a19b_continueOptOut.message}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Form 10-IEA Date</label>
                  <input 
                    type="text" 
                    {...register('a19b_form10IEADate')} 
                    placeholder="DD/MM/YYYY" 
                    className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a19b_form10IEADate ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.a19b_form10IEADate && (
                    <p className="mt-1 text-xs text-red-600">{errors.a19b_form10IEADate.message}</p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Acknowledgement No.</label>
                  <input 
                    type="text" 
                    {...register('a19b_form10IEAAckNumber')} 
                    placeholder="Acknowledgement number" 
                    className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a19b_form10IEAAckNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.a19b_form10IEAAckNumber && (
                    <p className="mt-1 text-xs text-red-600">{errors.a19b_form10IEAAckNumber.message}</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Do you wish to exercise option u/s 115BAC(6)? (Set B)</label>
              <select 
                {...register('a19b_newTaxRegimeSetB')} 
                className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a19b_newTaxRegimeSetB ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              >
                <option value="">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.a19b_newTaxRegimeSetB && (
                <p className="mt-1 text-xs text-red-600">{errors.a19b_newTaxRegimeSetB.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Seventh Proviso Conditions */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Seventh Proviso to Section 139(1)</h3>
          
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Are you filing under seventh proviso but otherwise not required to furnish return?</label>
              <select 
                {...register('c_seventhProviso')} 
                className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.c_seventhProviso ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.c_seventhProviso && (
                <p className="mt-1 text-xs text-red-600">{errors.c_seventhProviso.message}</p>
              )}
            </div>

            {seventhProviso === 'Yes' && (
              <div className="space-y-3 rounded-lg border border-purple-200 bg-purple-50 p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">(ci) Deposit exceeding Rs. 1 Crore?</label>
                    <select 
                      {...register('ci_depositExceeding1Cr')} 
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.ci_depositExceeding1Cr ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.ci_depositExceeding1Cr && (
                      <p className="mt-1 text-xs text-red-600">{errors.ci_depositExceeding1Cr.message}</p>
                    )}
                  </div>
                  {ci_depositExceeding1Cr === 'Yes' && (
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Amount (Rs.) <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="number" 
                        {...register('ci_amount')} 
                        placeholder="Enter amount greater than 10000000" 
                        min="10000001"
                        step="1"
                        className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.ci_amount ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                      />
                      {!errors.ci_amount && (
                        <p className="mt-1 text-xs text-gray-500">⚠️ Must be greater than Rs. 1 Crore (10,000,000)</p>
                      )}
                      {errors.ci_amount && (
                        <p className="mt-1 text-xs text-red-600">{errors.ci_amount.message}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">(cii) Foreign Travel exceeding Rs. 2 Lakh?</label>
                    <select 
                      {...register('cii_foreignTravel')} 
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.cii_foreignTravel ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.cii_foreignTravel && (
                      <p className="mt-1 text-xs text-red-600">{errors.cii_foreignTravel.message}</p>
                    )}
                  </div>
                  {cii_foreignTravel === 'Yes' && (
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Amount (Rs.) <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="number" 
                        {...register('cii_amount')} 
                        placeholder="Enter amount greater than 200000" 
                        min="200001"
                        step="1"
                        className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.cii_amount ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                      />
                      {!errors.cii_amount && (
                        <p className="mt-1 text-xs text-gray-500">⚠️ Must be greater than Rs. 2 Lakh (2,00,000)</p>
                      )}
                      {errors.cii_amount && (
                        <p className="mt-1 text-xs text-red-600">{errors.cii_amount.message}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">(ciii) Electricity Expense exceeding Rs. 1 Lakh?</label>
                    <select 
                      {...register('ciii_electricityExpense')} 
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.ciii_electricityExpense ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.ciii_electricityExpense && (
                      <p className="mt-1 text-xs text-red-600">{errors.ciii_electricityExpense.message}</p>
                    )}
                  </div>
                  {ciii_electricityExpense === 'Yes' && (
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Amount (Rs.) <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="number" 
                        {...register('ciii_amount')} 
                        placeholder="Enter amount greater than 100000" 
                        min="100001"
                        step="1"
                        className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.ciii_amount ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                      />
                      {!errors.ciii_amount && (
                        <p className="mt-1 text-xs text-gray-500">⚠️ Must be greater than Rs. 1 Lakh (1,00,000)</p>
                      )}
                      {errors.ciii_amount && (
                        <p className="mt-1 text-xs text-red-600">{errors.ciii_amount.message}</p>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">(civ) Any other condition</label>
                  <select 
                    {...register('civ_otherCondition')} 
                    className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.civ_otherCondition ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.civ_otherCondition && (
                    <p className="mt-1 text-xs text-red-600">{errors.civ_otherCondition.message}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Audit Information Section */}
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Audit Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  a1) Are you liable to maintain accounts u/s 44AA? <span className="text-red-500">*</span>
                </label>
                <select 
                  {...register('a1_accountsRequired')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a1_accountsRequired ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.a1_accountsRequired && (
                  <p className="mt-1 text-xs text-red-600">{errors.a1_accountsRequired.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  a2) Declaring income only u/s 44AD/44ADA/44AE? <span className="text-red-500">*</span>
                </label>
                <select 
                  {...register('a2_presumptiveIncome')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a2_presumptiveIncome ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.a2_presumptiveIncome && (
                  <p className="mt-1 text-xs text-red-600">{errors.a2_presumptiveIncome.message}</p>
                )}
              </div>
            </div>

            {a2_presumptiveIncome === 'No' && (
              <div className="space-y-3 rounded-lg border border-orange-300 bg-white p-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    a2i) Total sales/turnover between Rs. 1 Cr - Rs. 10 Cr? <span className="text-red-500">*</span>
                  </label>
                  <select 
                    {...register('a2i_turnoverBetween')} 
                    className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a2i_turnoverBetween ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="NoNotExceed1Cr">No - Turnover does not exceed 1 Crore</option>
                    <option value="NoExceeds10Cr">No - Turnover exceeds 10 Crores</option>
                  </select>
                  {errors.a2i_turnoverBetween && (
                    <p className="mt-1 text-xs text-red-600">{errors.a2i_turnoverBetween.message}</p>
                  )}
                </div>

                {a2i_turnoverBetween === 'Yes' && (
                  <>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        a2ii) Aggregate cash receipts ≤ 5% of total? <span className="text-red-500">*</span>
                      </label>
                      <select 
                        {...register('a2ii_cashPayments')} 
                        className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a2ii_cashPayments ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {errors.a2ii_cashPayments && (
                        <p className="mt-1 text-xs text-red-600">{errors.a2ii_cashPayments.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        a2iii) Aggregate cash payments ≤ 5% of total? <span className="text-red-500">*</span>
                      </label>
                      <select 
                        {...register('a2iii_cashReceipts')} 
                        className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.a2iii_cashReceipts ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {errors.a2iii_cashReceipts && (
                        <p className="mt-1 text-xs text-red-600">{errors.a2iii_cashReceipts.message}</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  b) Are you liable for audit u/s 44AB? <span className="text-red-500">*</span>
                </label>
                <select 
                  {...register('b_auditLiable')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.b_auditLiable ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.b_auditLiable && (
                  <p className="mt-1 text-xs text-red-600">{errors.b_auditLiable.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">c) Audited by accountant?</label>
                <select 
                  {...register('c_auditedByAccountant')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.c_auditedByAccountant ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.c_auditedByAccountant && (
                  <p className="mt-1 text-xs text-red-600">{errors.c_auditedByAccountant.message}</p>
                )}
              </div>
            </div>

            {auditedByAccountant === 'Yes' && (
              <div className="space-y-3 rounded-lg border border-orange-300 bg-white p-4">
                <h4 className="font-medium text-gray-900">Audit Report Details</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">
                      Audit Report Date (DD/MM/YYYY) <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      {...register('auditReportDate')} 
                      placeholder="DD/MM/YYYY" 
                      className={`w-full rounded-lg border px-2 py-1.5 text-xs ${errors.auditReportDate ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.auditReportDate && (
                      <p className="mt-1 text-xs text-red-600">{errors.auditReportDate.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">
                      Auditor Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      {...register('auditorName')} 
                      placeholder="Auditor name" 
                      className={`w-full rounded-lg border px-2 py-1.5 text-xs ${errors.auditorName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.auditorName && (
                      <p className="mt-1 text-xs text-red-600">{errors.auditorName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">
                      Membership No. <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      {...register('auditorMembershipNo')} 
                      placeholder="Membership number" 
                      className={`w-full rounded-lg border px-2 py-1.5 text-xs ${errors.auditorMembershipNo ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.auditorMembershipNo && (
                      <p className="mt-1 text-xs text-red-600">{errors.auditorMembershipNo.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">Firm Name</label>
                    <input 
                      type="text" 
                      {...register('auditorFirmName')} 
                      placeholder="Firm name" 
                      className={`w-full rounded-lg border px-2 py-1.5 text-xs ${errors.auditorFirmName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.auditorFirmName && (
                      <p className="mt-1 text-xs text-red-600">{errors.auditorFirmName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">Firm Reg. No.</label>
                    <input 
                      type="text" 
                      {...register('auditorFirmRegNo')} 
                      placeholder="Registration number" 
                      className={`w-full rounded-lg border px-2 py-1.5 text-xs ${errors.auditorFirmRegNo ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.auditorFirmRegNo && (
                      <p className="mt-1 text-xs text-red-600">{errors.auditorFirmRegNo.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">PAN/Aadhaar</label>
                    <input 
                      type="text" 
                      {...register('auditorPAN')} 
                      placeholder="PAN/Aadhaar" 
                      className={`w-full rounded-lg border px-2 py-1.5 text-xs ${errors.auditorPAN ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.auditorPAN && (
                      <p className="mt-1 text-xs text-red-600">{errors.auditorPAN.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">
                      UDIN <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      {...register('auditReportUDIN')} 
                      placeholder="e.g., 12345678901234ABCD (18 chars)" 
                      maxLength={18}
                      className={`w-full rounded-lg border px-2 py-1.5 text-xs uppercase ${errors.auditReportUDIN ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {!errors.auditReportUDIN && (
                      <p className="mt-0.5 text-xs text-gray-500">Format: 14 digits + 4 letters</p>
                    )}
                    {errors.auditReportUDIN && (
                      <p className="mt-1 text-xs text-red-600">{errors.auditReportUDIN.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">Ack. Number</label>
                    <input 
                      type="text" 
                      {...register('auditReportAckNumber')} 
                      placeholder="Acknowledgement" 
                      className={`w-full rounded-lg border px-2 py-1.5 text-xs ${errors.auditReportAckNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.auditReportAckNumber && (
                      <p className="mt-1 text-xs text-red-600">{errors.auditReportAckNumber.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Return Filing Details */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Return Filing Details</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">d) Is this return being filed as a revised return u/s 139(5)?</label>
                <select 
                  {...register('d_revised')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.d_revised ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.d_revised && (
                  <p className="mt-1 text-xs text-red-600">{errors.d_revised.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Receipt No.</label>
                <input 
                  type="text" 
                  {...register('d_receiptNo')} 
                  placeholder="Receipt number" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.d_receiptNo ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.d_receiptNo && (
                  <p className="mt-1 text-xs text-red-600">{errors.d_receiptNo.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Receipt Date (DD/MM/YYYY)</label>
                <input 
                  type="text" 
                  {...register('d_receiptDate')} 
                  placeholder="DD/MM/YYYY" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.d_receiptDate ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.d_receiptDate && (
                  <p className="mt-1 text-xs text-red-600">{errors.d_receiptDate.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">e) Is this return being filed in response to notice u/s 139(9)?</label>
                <select 
                  {...register('e_notice')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.e_notice ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.e_notice && (
                  <p className="mt-1 text-xs text-red-600">{errors.e_notice.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Notice Number</label>
                <input 
                  type="text" 
                  {...register('e_noticeNumber')} 
                  placeholder="Notice number" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.e_noticeNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.e_noticeNumber && (
                  <p className="mt-1 text-xs text-red-600">{errors.e_noticeNumber.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Notice Date (DD/MM/YYYY)</label>
                <input 
                  type="text" 
                  {...register('e_noticeDate')} 
                  placeholder="DD/MM/YYYY" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.e_noticeDate ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.e_noticeDate && (
                  <p className="mt-1 text-xs text-red-600">{errors.e_noticeDate.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Residential Status */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Residential Status</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  f) Residential Status <span className="text-red-500">*</span>
                </label>
                <select 
                  {...register('f_residentialStatus')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.f_residentialStatus ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select Status</option>
                  <option value="Resident">Resident</option>
                  <option value="ResidentNotOrdinary">Resident but Not Ordinarily Resident</option>
                  <option value="NonResident">Non-Resident</option>
                </select>
                {errors.f_residentialStatus && (
                  <p className="mt-1 text-xs text-red-600">{errors.f_residentialStatus.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Number of days in India during the year</label>
                <input 
                  type="number" 
                  {...register('f_residency_days')} 
                  placeholder="Days" 
                  min="0"
                  max="366"
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.f_residency_days ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.f_residency_days && (
                  <p className="mt-1 text-xs text-red-600">{errors.f_residency_days.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">In India for 365 days or more in 4 preceding years?</label>
                <input 
                  type="text" 
                  {...register('f_residency_4years')} 
                  placeholder="Number of days" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.f_residency_4years ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.f_residency_4years && (
                  <p className="mt-1 text-xs text-red-600">{errors.f_residency_4years.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Additional Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">g) Whether opting for taxation u/s 115H?</label>
                <select 
                  {...register('g_section115H')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.g_section115H ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.g_section115H && (
                  <p className="mt-1 text-xs text-red-600">{errors.g_section115H.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">h) Whether governed by Portuguese Civil Code?</label>
                <select 
                  {...register('h_portugueseCivilCode')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.h_portugueseCivilCode ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.h_portugueseCivilCode && (
                  <p className="mt-1 text-xs text-red-600">{errors.h_portugueseCivilCode.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">i) Whether filing as a representative assessee?</label>
              <select 
                {...register('i_representativeAssessee')} 
                className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.i_representativeAssessee ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.i_representativeAssessee && (
                <p className="mt-1 text-xs text-red-600">{errors.i_representativeAssessee.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">j) Are you a Director in a company?</label>
                <select 
                  {...register('j_director')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.j_director ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.j_director && (
                  <p className="mt-1 text-xs text-red-600">{errors.j_director.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">k) Are you a partner in a firm?</label>
                <select 
                  {...register('k_partner')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.k_partner ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.k_partner && (
                  <p className="mt-1 text-xs text-red-600">{errors.k_partner.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">l) Do you hold unlisted equity shares?</label>
                <select 
                  {...register('l_unlistedShares')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.l_unlistedShares ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.l_unlistedShares && (
                  <p className="mt-1 text-xs text-red-600">{errors.l_unlistedShares.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">m) Do you have a permanent establishment in India?</label>
                <select 
                  {...register('m_permanentEstablishment')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.m_permanentEstablishment ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.m_permanentEstablishment && (
                  <p className="mt-1 text-xs text-red-600">{errors.m_permanentEstablishment.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">n) Do you have significant economic presence in India?</label>
                <select 
                  {...register('n_significantEconomicPresence')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.n_significantEconomicPresence ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.n_significantEconomicPresence && (
                  <p className="mt-1 text-xs text-red-600">{errors.n_significantEconomicPresence.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">o) Operating in International Financial Services Centre?</label>
                <select 
                  {...register('o_internationalFinancialServices')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.o_internationalFinancialServices ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.o_internationalFinancialServices && (
                  <p className="mt-1 text-xs text-red-600">{errors.o_internationalFinancialServices.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">p) Are you a Foreign Portfolio Investor (FPI)?</label>
                <select 
                  {...register('p_fpi')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.p_fpi ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.p_fpi && (
                  <p className="mt-1 text-xs text-red-600">{errors.p_fpi.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">SEBI Registration No.</label>
                <input 
                  type="text" 
                  {...register('p_sebiRegNo')} 
                  placeholder="SEBI Registration" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.p_sebiRegNo ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.p_sebiRegNo && (
                  <p className="mt-1 text-xs text-red-600">{errors.p_sebiRegNo.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">q) LEI (Legal Entity Identifier)</label>
                <input 
                  type="text" 
                  {...register('q_lei')} 
                  placeholder="20 alphanumeric characters" 
                  maxLength={20}
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.q_lei ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.q_lei && (
                  <p className="mt-1 text-xs text-red-600">{errors.q_lei.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">LEI Valid Up to Date (DD/MM/YYYY)</label>
                <input 
                  type="text" 
                  {...register('q_leiValidUptoDate')} 
                  placeholder="DD/MM/YYYY" 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.q_leiValidUptoDate ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.q_leiValidUptoDate && (
                  <p className="mt-1 text-xs text-red-600">{errors.q_leiValidUptoDate.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Nature of Business */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Nature of Business (3 Main Activities)</h3>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4">
                <h4 className="mb-3 font-medium text-gray-900">Business {i}</h4>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div>
                    <input 
                      type="text" 
                      {...register(`businessNature${i}Code` as any)} 
                      placeholder="5-digit code" 
                      maxLength={5}
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${errors[`businessNature${i}Code` as keyof typeof errors] ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors[`businessNature${i}Code` as keyof typeof errors] && (
                      <p className="mt-1 text-xs text-red-600">{errors[`businessNature${i}Code` as keyof typeof errors]?.message}</p>
                    )}
                  </div>
                  <div>
                    <input 
                      type="text" 
                      {...register(`businessNature${i}Name` as any)} 
                      placeholder="Trade name" 
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${errors[`businessNature${i}Name` as keyof typeof errors] ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors[`businessNature${i}Name` as keyof typeof errors] && (
                      <p className="mt-1 text-xs text-red-600">{errors[`businessNature${i}Name` as keyof typeof errors]?.message}</p>
                    )}
                  </div>
                  <div>
                    <input 
                      type="text" 
                      {...register(`businessNature${i}Description` as any)} 
                      placeholder="Description" 
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${errors[`businessNature${i}Description` as keyof typeof errors] ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors[`businessNature${i}Description` as keyof typeof errors] && (
                      <p className="mt-1 text-xs text-red-600">{errors[`businessNature${i}Description` as keyof typeof errors]?.message}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <button type="button" onClick={onBack} className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
            ← Back
          </button>
          <div className="flex gap-3">
            <button type="button" onClick={handleSaveProgress} className="rounded-lg border border-blue-300 bg-blue-50 px-6 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100">
              💾 Save Progress
            </button>
            <button type="submit" className="rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
              Next →
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ItrThreePartAGeneral;
