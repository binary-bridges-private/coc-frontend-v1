import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation Schema for Part A - General Information with Conditional Validation
const partAGeneralSchema = z.object({
  // A1-A3: Name
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional().or(z.literal('')),
  lastName: z.string().min(1, 'Last name is required'),
  
  // A4: Permanent Account Number (PAN)
  pan: z.string()
    .length(10, 'PAN must be exactly 10 characters')
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/i, 'Invalid PAN format (e.g., ABCDE1234F)'),
  
  // A5: Date of Birth/Formation
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  
  // A6: Flat/Door/Block No
  flatDoorBlock: z.string().optional().or(z.literal('')),
  
  // A7: Name of Premises/Building/Village
  premisesBuildingVillage: z.string().optional().or(z.literal('')),
  
  // A8: Road/Street/Post Office
  roadStreetPostOffice: z.string().optional().or(z.literal('')),
  
  // A9: Area/Locality
  areaLocality: z.string().optional().or(z.literal('')),
  
  // A10: Town/City/District
  townCityDistrict: z.string().min(1, 'Town/City/District is required'),
  
  // A11: State
  state: z.string().min(1, 'State is required'),
  
  // A12: Country
  country: z.string().min(1, 'Country is required'),
  
  // A13: PIN Code/ZIP Code
  pinCode: z.string()
    .regex(/^\d{6}$/, 'PIN code must be 6 digits')
    .min(1, 'PIN code is required'),
  
  // A14: Aadhaar Number
  aadhaarNumber: z.string()
    .optional()
    .or(z.literal(''))
    .refine((val) => {
      if (val && val.length > 0) {
        return /^\d{12}$/.test(val);
      }
      return true;
    }, 'Aadhaar must be 12 digits'),
  
  // A15: Status
  status: z.enum(['individual', 'huf', 'firm']).optional().or(z.literal(''))
    .refine((val) => val !== undefined && val !== '', {
      message: 'Please select status',
    }),
  
  // A16: Residential/Office Phone with STD code
  residentialPhone: z.string().optional().or(z.literal('')),
  
  // A17: Mobile No. 1
  mobileNo1: z.string()
    .min(1, 'Mobile number is required')
    .regex(/^\d{10}$/, 'Mobile number must be 10 digits'),
  
  // A18: Mobile No. 2
  mobileNo2: z.string()
    .optional()
    .or(z.literal(''))
    .refine((val) => {
      if (val && val.length > 0) {
        return /^\d{10}$/.test(val);
      }
      return true;
    }, 'Mobile number must be 10 digits'),
  
  // A19: Email Address-1
  emailAddress1: z.string()
    .min(1, 'Email address is required')
    .email('Invalid email address'),
  
  // A20: Email Address-2
  emailAddress2: z.string()
    .optional()
    .or(z.literal(''))
    .refine((val) => {
      if (val && val.length > 0) {
        return z.string().email().safeParse(val).success;
      }
      return true;
    }, 'Invalid email address'),
  
  // A21: Nature of Employment
  natureOfEmployment: z.enum(['central-govt', 'state-govt', 'psu', 'pensioners-cg', 'pensioners-sg', 'pensioners-psu', 'pensioners-others', 'others', 'not-applicable']).optional().or(z.literal(''))
    .refine((val) => val !== undefined && val !== '', {
      message: 'Please select nature of employment',
    }),
  
  // A22: Filing Status
  filingStatus: z.enum(['139(1)-on-or-before-due-date', '139(4)-after-due-date', '139(5)-revised', '119(2)(b)-after-condonation']).optional().or(z.literal(''))
    .refine((val) => val !== undefined && val !== '', {
      message: 'Please select filing status',
    }),
  
  // A23: If revised/defective, enter Receipt No. and Date
  receiptNo: z.string().optional().or(z.literal('')),
  receiptDate: z.string().optional().or(z.literal('')),
  
  // A24: If filed in response to notice
  filedInResponse: z.enum(['139(9)', '142(1)', '148', '153C', '119(2)(b)']).optional().or(z.literal('')),
  
  // A25: DIN for response to notice
  din: z.string().optional().or(z.literal('')),
  dinDate: z.string().optional().or(z.literal('')),
  
  // A23: New Tax Regime Options (115BAC(6))
  taxRegimeOption: z.enum(['yes-exercised', 'no-wish-to-continue', 'no-wish-to-opt-out', 'not-applicable']).optional().or(z.literal('')),
  form10IEADateFiled: z.string().optional().or(z.literal('')),
  form10IEAAcknowledgement: z.string().optional().or(z.literal('')),
  wishToOptOutCurrentYear: z.enum(['yes', 'no']).optional().or(z.literal('')),
  form10IEADateFiled2025: z.string().optional().or(z.literal('')),
  form10IEAAcknowledgement2025: z.string().optional().or(z.literal('')),
  
  // A24: Return filed by person required u/s 139(1)?
  filedByPersonRequired139: z.enum(['yes', 'no']).optional().or(z.literal('')),
  
  // Note: If filled only if a person...
  depositExceeding1Crore: z.enum(['yes', 'no']).optional().or(z.literal('')),
  depositAmount1Crore: z.string().optional().or(z.literal('')),
  expenditure2LakhsForeign: z.enum(['yes', 'no']).optional().or(z.literal('')),
  expenditureAmount2Lakhs: z.string().optional().or(z.literal('')),
  expenditure1LakhElectricity: z.enum(['yes', 'no']).optional().or(z.literal('')),
  expenditureAmount1Lakh: z.string().optional().or(z.literal('')),
  requiredToFileConditions: z.enum(['yes', 'no']).optional().or(z.literal('')),
  
  // A25: Representative Information
  filedByRepresentative: z.enum(['yes', 'no']).optional().or(z.literal('')),
  representativeName: z.string().optional().or(z.literal('')),
  representativeCapacity: z.string().optional().or(z.literal('')),
  representativeAddress: z.string().optional().or(z.literal('')),
  representativePAN: z.string().optional().or(z.literal('')),
  representativeAadhaar: z.string().optional().or(z.literal('')),
}).superRefine((data, ctx) => {
  // Conditional validation for revised returns (A22 -> A23)
  if (data.filingStatus === '139(5)-revised') {
    if (!data.receiptNo || data.receiptNo.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Receipt number is required for revised returns',
        path: ['receiptNo'],
      });
    }
    if (!data.receiptDate || data.receiptDate.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Receipt date is required for revised returns',
        path: ['receiptDate'],
      });
    }
  }

  // Conditional validation for response to notice (A24 -> A25 DIN)
  if (data.filedInResponse) {
    if (!data.din || data.din.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'DIN is required when filing in response to notice',
        path: ['din'],
      });
    }
    if (!data.dinDate || data.dinDate.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'DIN date is required when filing in response to notice',
        path: ['dinDate'],
      });
    }
  }

  // Conditional validation for Tax Regime Option (A23)
  if (data.taxRegimeOption && data.taxRegimeOption !== 'not-applicable') {
    if (!data.form10IEADateFiled || data.form10IEADateFiled.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Form 10-IEA filing date is required',
        path: ['form10IEADateFiled'],
      });
    }
    if (!data.form10IEAAcknowledgement || data.form10IEAAcknowledgement.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Form 10-IEA acknowledgement number is required',
        path: ['form10IEAAcknowledgement'],
      });
    }

    // If wish to opt out for current year
    if (data.wishToOptOutCurrentYear === 'yes') {
      if (!data.form10IEADateFiled2025 || data.form10IEADateFiled2025.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Form 10-IEA filing date for AY 2025-26 is required',
          path: ['form10IEADateFiled2025'],
        });
      }
      if (!data.form10IEAAcknowledgement2025 || data.form10IEAAcknowledgement2025.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Form 10-IEA acknowledgement for AY 2025-26 is required',
          path: ['form10IEAAcknowledgement2025'],
        });
      }
    }
  }

  // Conditional validation for deposit exceeding 1 crore
  if (data.depositExceeding1Crore === 'yes') {
    if (!data.depositAmount1Crore || data.depositAmount1Crore.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Deposit amount is required',
        path: ['depositAmount1Crore'],
      });
    }
  }

  // Conditional validation for foreign travel expenditure
  if (data.expenditure2LakhsForeign === 'yes') {
    if (!data.expenditureAmount2Lakhs || data.expenditureAmount2Lakhs.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Expenditure amount is required',
        path: ['expenditureAmount2Lakhs'],
      });
    }
  }

  // Conditional validation for electricity expenditure
  if (data.expenditure1LakhElectricity === 'yes') {
    if (!data.expenditureAmount1Lakh || data.expenditureAmount1Lakh.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Expenditure amount is required',
        path: ['expenditureAmount1Lakh'],
      });
    }
  }

  // Conditional validation for representative information (A25)
  if (data.filedByRepresentative === 'yes') {
    if (!data.representativeName || data.representativeName.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Representative name is required',
        path: ['representativeName'],
      });
    }
    if (!data.representativeCapacity || data.representativeCapacity.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Representative capacity is required',
        path: ['representativeCapacity'],
      });
    }
    if (!data.representativeAddress || data.representativeAddress.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Representative address is required',
        path: ['representativeAddress'],
      });
    }
    if (!data.representativePAN || data.representativePAN.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Representative PAN is required',
        path: ['representativePAN'],
      });
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(data.representativePAN)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid PAN format (e.g., ABCDE1234F)',
        path: ['representativePAN'],
      });
    }
    
    // Aadhaar validation if provided
    if (data.representativeAadhaar && data.representativeAadhaar.trim() !== '') {
      if (!/^\d{12}$/.test(data.representativeAadhaar)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Aadhaar must be 12 digits',
          path: ['representativeAadhaar'],
        });
      }
    }
  }
});

export type PartAGeneralFormData = z.infer<typeof partAGeneralSchema>;

interface ItrFourPartAGeneralProps {
  onComplete: (data: PartAGeneralFormData) => void;
  onCancel?: () => void;
  initialData?: Partial<PartAGeneralFormData>;
}

const ItrFourPartAGeneral: React.FC<ItrFourPartAGeneralProps> = ({
  onComplete,
  onCancel,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PartAGeneralFormData>({
    resolver: zodResolver(partAGeneralSchema),
    defaultValues: initialData || {
      country: 'India',
      status: 'individual',
      natureOfEmployment: 'not-applicable',
      filingStatus: '139(1)-on-or-before-due-date',
    },
  });

  const filingStatus = watch('filingStatus');
  const showReceiptFields = filingStatus === '139(5)-revised';
  const showNoticeFields = watch('filedInResponse');

  const onSubmit = (data: PartAGeneralFormData) => {
    console.log('Part A General Information:', data);
    onComplete(data);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Part A - General Information</h2>
          <p className="mt-1 text-sm text-gray-600">
            Please provide your personal and contact information as per official records
          </p>
        </div>

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
                <ul className="mt-2 space-y-1 text-xs text-red-800">
                  {Object.entries(errors).slice(0, 5).map(([key, error]) => (
                    <li key={key} className="flex items-start gap-2">
                      <span className="mt-0.5">•</span>
                      <span>
                        <strong className="font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}:</strong>{' '}
                        {error?.message as string}
                      </span>
                    </li>
                  ))}
                  {Object.keys(errors).length > 5 && (
                    <li className="text-red-700">
                      ... and {Object.keys(errors).length - 5} more error(s)
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Personal Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">Personal Information</h3>
          
          <div className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A1) First Name *
                </label>
                <input
                  type="text"
                  {...register('firstName')}
                  placeholder="Enter first name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A2) Middle Name
                </label>
                <input
                  type="text"
                  {...register('middleName')}
                  placeholder="Enter middle name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A3) Last Name *
                </label>
                <input
                  type="text"
                  {...register('lastName')}
                  placeholder="Enter last name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* PAN and DOB */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A4) Permanent Account Number (PAN) *
                </label>
                <input
                  type="text"
                  {...register('pan')}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  style={{ textTransform: 'uppercase' }}
                  onBlur={(e) => { e.target.value = e.target.value.trim(); }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.pan && (
                  <p className="mt-1 text-xs text-red-600">{errors.pan.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A5) Date of Birth/Formation (DD/MM/YYYY) *
                </label>
                <input
                  type="date"
                  {...register('dateOfBirth')}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-xs text-red-600">{errors.dateOfBirth.message}</p>
                )}
              </div>
            </div>

            {/* Aadhaar and Status */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A14) Aadhaar Number (12 digits)
                </label>
                <input
                  type="text"
                  {...register('aadhaarNumber')}
                  placeholder="123456789012"
                  maxLength={12}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.aadhaarNumber && (
                  <p className="mt-1 text-xs text-red-600">{errors.aadhaarNumber.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A15) Status *
                </label>
                <select
                  {...register('status')}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="individual">Individual</option>
                  <option value="huf">HUF</option>
                  <option value="firm">Firm (other than LLP)</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-xs text-red-600">{errors.status.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">Address Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A6) Flat/Door/Block No.
                </label>
                <input
                  type="text"
                  {...register('flatDoorBlock')}
                  placeholder="Enter flat/door/block number"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A7) Name of Premises/Building/Village
                </label>
                <input
                  type="text"
                  {...register('premisesBuildingVillage')}
                  placeholder="Enter premises/building/village"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A8) Road/Street/Post Office
                </label>
                <input
                  type="text"
                  {...register('roadStreetPostOffice')}
                  placeholder="Enter road/street/post office"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A9) Area/Locality
                </label>
                <input
                  type="text"
                  {...register('areaLocality')}
                  placeholder="Enter area/locality"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A10) Town/City/District *
                </label>
                <input
                  type="text"
                  {...register('townCityDistrict')}
                  placeholder="Enter town/city/district"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.townCityDistrict && (
                  <p className="mt-1 text-xs text-red-600">{errors.townCityDistrict.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A11) State *
                </label>
                <input
                  type="text"
                  {...register('state')}
                  placeholder="Enter state"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.state && (
                  <p className="mt-1 text-xs text-red-600">{errors.state.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A12) Country *
                </label>
                <input
                  type="text"
                  {...register('country')}
                  placeholder="Enter country"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.country && (
                  <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                (A13) PIN Code/ZIP Code *
              </label>
              <input
                type="text"
                {...register('pinCode')}
                placeholder="Enter 6-digit PIN code"
                maxLength={6}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-1/3"
              />
              {errors.pinCode && (
                <p className="mt-1 text-xs text-red-600">{errors.pinCode.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">Contact Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A16) Residential/Office Phone Number with STD code
                </label>
                <input
                  type="text"
                  {...register('residentialPhone')}
                  placeholder="e.g., 011-12345678"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A17) Mobile No. 1 *
                </label>
                <input
                  type="text"
                  {...register('mobileNo1')}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.mobileNo1 && (
                  <p className="mt-1 text-xs text-red-600">{errors.mobileNo1.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A18) Mobile No. 2
                </label>
                <input
                  type="text"
                  {...register('mobileNo2')}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.mobileNo2 && (
                  <p className="mt-1 text-xs text-red-600">{errors.mobileNo2.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A19) Email Address-1 (self) *
                </label>
                <input
                  type="email"
                  {...register('emailAddress1')}
                  placeholder="example@email.com"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.emailAddress1 && (
                  <p className="mt-1 text-xs text-red-600">{errors.emailAddress1.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  (A20) Email Address-2
                </label>
                <input
                  type="email"
                  {...register('emailAddress2')}
                  placeholder="example@email.com"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.emailAddress2 && (
                  <p className="mt-1 text-xs text-red-600">{errors.emailAddress2.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Employment and Filing Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">Employment & Filing Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                (A21) Nature of Employment *
              </label>
              <select
                {...register('natureOfEmployment')}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="central-govt">Central Govt.</option>
                <option value="state-govt">State Govt.</option>
                <option value="psu">Public Sector Undertaking</option>
                <option value="pensioners-cg">Pensioners-CG</option>
                <option value="pensioners-sg">Pensioners-SG</option>
                <option value="pensioners-psu">Pensioners-PSU</option>
                <option value="pensioners-others">Pensioners-Others</option>
                <option value="others">Others</option>
                <option value="not-applicable">Not Applicable (e.g., Family Pension etc.)</option>
              </select>
              {errors.natureOfEmployment && (
                <p className="mt-1 text-xs text-red-600">{errors.natureOfEmployment.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                (A22) Filing Status *
              </label>
              <select
                {...register('filingStatus')}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="139(1)-on-or-before-due-date">139(1) - On or before due date</option>
                <option value="139(4)-after-due-date">139(4) - After due date</option>
                <option value="139(5)-revised">139(5) - Revised Return</option>
                <option value="119(2)(b)-after-condonation">119(2)(b) - After Condonation of delay</option>
              </select>
              {errors.filingStatus && (
                <p className="mt-1 text-xs text-red-600">{errors.filingStatus.message}</p>
              )}
            </div>

            {showReceiptFields && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="mb-3 text-sm font-medium text-blue-900">
                  (A23) If revised/defective then enter Receipt No. and Date of filing of original return (DD/MM/YYYY)
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Receipt Number
                    </label>
                    <input
                      type="text"
                      {...register('receiptNo')}
                      placeholder="Enter receipt number"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Receipt Date
                    </label>
                    <input
                      type="date"
                      {...register('receiptDate')}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                (A24) If filed in response to notice u/s 139(9)/142(1)/148/153C or order u/s 119(2)(b)
              </label>
              <select
                {...register('filedInResponse')}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Not applicable</option>
                <option value="139(9)">139(9)</option>
                <option value="142(1)">142(1)</option>
                <option value="148">148</option>
                <option value="153C">153C</option>
                <option value="119(2)(b)">119(2)(b)</option>
              </select>
            </div>

            {showNoticeFields && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="mb-3 text-sm font-medium text-amber-900">
                  (A25) Enter Unique Number / Document Identification Number (DIN) & Date of such Notice or Order
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      DIN
                    </label>
                    <input
                      type="text"
                      {...register('din')}
                      placeholder="Enter DIN"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Date of Notice/Order
                    </label>
                    <input
                      type="date"
                      {...register('dinDate')}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* A23: New Tax Regime Options (115BAC(6)) */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">
            (A23) Have you exercised the option u/s 115BAC(6) of Opting out of new tax regime in Form 10-IEA in AY 2024-25?
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Select Option
              </label>
              <div className="space-y-2">
                <label className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 hover:bg-gray-100">
                  <input
                    type="radio"
                    {...register('taxRegimeOption')}
                    value="yes-exercised"
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">(a) Yes</p>
                    <p className="mt-1 text-xs text-gray-600">
                      (If 'Yes', please furnish date of filing and Acknowledgement number of Form 10-IEA for AY 2024-25)
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 hover:bg-gray-100">
                  <input
                    type="radio"
                    {...register('taxRegimeOption')}
                    value="no-wish-to-continue"
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">(b) No</p>
                    <p className="mt-1 text-xs text-gray-600">
                      Do you wish to continue to opt out of New Tax Regime for current assessment year ☐ Yes ☐ No
                      <br />
                      (If 'No', please furnish date of filing and Acknowledgement number of Form 10-IEA for AY 2025-26)
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 hover:bg-gray-100">
                  <input
                    type="radio"
                    {...register('taxRegimeOption')}
                    value="no-wish-to-opt-out"
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">(b) No (Please select 'No', even if Form 10IEA was filed after due date for AY 2024-25)</p>
                    <p className="mt-1 text-xs text-gray-600">
                      Do you wish to opt out of New Tax Regime for current assessment year ☐ Yes ☐ No
                      <br />
                      (If 'Yes', please furnish date of filing and Acknowledgement number of Form 10-IEA for AY 2025-26)
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 hover:bg-gray-100">
                  <input
                    type="radio"
                    {...register('taxRegimeOption')}
                    value="not-applicable"
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">(c) Not Applicable (Return was filed in ITR Form 1/ Form 2 for AY 2024-25)</p>
                    <p className="mt-1 text-xs text-gray-600">
                      Do you wish to opt out of New Tax Regime for current assessment year ☐ Yes ☐ No
                      <br />
                      (If 'Yes', please furnish date of filing and Acknowledgement number of Form 10-IEA for AY 2025-26)
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {watch('taxRegimeOption') && watch('taxRegimeOption') !== 'not-applicable' && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Date of Filing Form 10-IEA
                    </label>
                    <input
                      type="date"
                      {...register('form10IEADateFiled')}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Acknowledgement Number of Form 10-IEA
                    </label>
                    <input
                      type="text"
                      {...register('form10IEAAcknowledgement')}
                      placeholder="Enter acknowledgement number"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Do you wish to opt out for AY 2025-26?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register('wishToOptOutCurrentYear')}
                        value="yes"
                      />
                      <span className="text-sm text-gray-900">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register('wishToOptOutCurrentYear')}
                        value="no"
                      />
                      <span className="text-sm text-gray-900">No</span>
                    </label>
                  </div>
                </div>

                {watch('wishToOptOutCurrentYear') === 'yes' && (
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Date of Filing Form 10-IEA for AY 2025-26
                      </label>
                      <input
                        type="date"
                        {...register('form10IEADateFiled2025')}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Acknowledgement Number for AY 2025-26
                      </label>
                      <input
                        type="text"
                        {...register('form10IEAAcknowledgement2025')}
                        placeholder="Enter acknowledgement number"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4">
              <p className="text-xs text-amber-900">
                <strong>Note:</strong> Option under section 115BAC(6) should be exercised in Form 10IEA on or before the due date for filing return u/s 139(1).
              </p>
            </div>
          </div>
        </div>

        {/* A24: Additional Information for Filing Requirements */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">
            (A24) Are you filing a return of income under Seventh proviso to section 139(1) but otherwise not required to furnish return of income?
          </h3>
          <p className="mb-4 text-sm text-gray-600">(Not applicable in case of firm) - (Tick) ☐ Yes ☐ No</p>

          <div className="mb-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register('filedByPersonRequired139')}
                  value="yes"
                />
                <span className="text-sm text-gray-900">Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register('filedByPersonRequired139')}
                  value="no"
                />
                <span className="text-sm text-gray-900">No</span>
              </label>
            </div>
          </div>

          {watch('filedByPersonRequired139') === 'yes' && (
            <div className="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm font-medium text-blue-900">
                If yes, please furnish following information as provided in e-filing utility
              </p>
              <p className="text-xs text-blue-800">
                <strong>Note:</strong> This is filled only if a person referred to in seventh proviso to section 139(1) is not required to furnish return of income under section 139(1) but filing return of income due to fulfilling one or more conditions mentioned in the seventh proviso to section 139(1)]
              </p>

              <div className="space-y-4">
                {/* Question (i) */}
                <div className="rounded-lg bg-white p-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    (i) Have you deposited an amount or aggregate of amount exceeding Rs. 1 Crore or more in one or more current account during the previous year? (Yes/No)
                  </label>
                  <div className="mb-3 flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register('depositExceeding1Crore')}
                        value="yes"
                      />
                      <span className="text-sm text-gray-900">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register('depositExceeding1Crore')}
                        value="no"
                      />
                      <span className="text-sm text-gray-900">No</span>
                    </label>
                  </div>
                  {watch('depositExceeding1Crore') === 'yes' && (
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Amount (Rs) (If Yes)
                      </label>
                      <input
                        type="number"
                        {...register('depositAmount1Crore')}
                        placeholder="Enter amount"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>

                {/* Question (ii) */}
                <div className="rounded-lg bg-white p-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    (ii) Have you incurred expenditure of amount or aggregate of amount exceeding Rs. 2 lakhs for travel to a foreign country for yourself or for any other person? (Yes/No)
                  </label>
                  <div className="mb-3 flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register('expenditure2LakhsForeign')}
                        value="yes"
                      />
                      <span className="text-sm text-gray-900">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register('expenditure2LakhsForeign')}
                        value="no"
                      />
                      <span className="text-sm text-gray-900">No</span>
                    </label>
                  </div>
                  {watch('expenditure2LakhsForeign') === 'yes' && (
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Amount (Rs) (If Yes)
                      </label>
                      <input
                        type="number"
                        {...register('expenditureAmount2Lakhs')}
                        placeholder="Enter amount"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>

                {/* Question (iii) */}
                <div className="rounded-lg bg-white p-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    (iii) Have you incurred expenditure of amount or aggregate of amount exceeding Rs. 1 lakh on consumption of electricity during the previous year? (Yes/No)
                  </label>
                  <div className="mb-3 flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register('expenditure1LakhElectricity')}
                        value="yes"
                      />
                      <span className="text-sm text-gray-900">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register('expenditure1LakhElectricity')}
                        value="no"
                      />
                      <span className="text-sm text-gray-900">No</span>
                    </label>
                  </div>
                  {watch('expenditure1LakhElectricity') === 'yes' && (
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Amount (Rs) (If Yes)
                      </label>
                      <input
                        type="number"
                        {...register('expenditureAmount1Lakh')}
                        placeholder="Enter amount"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>

                {/* Question (iv) */}
                <div className="rounded-lg bg-white p-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    (iv) Are you required to file a return as per other conditions prescribed under clause (iv) of seventh proviso to section 139(1)? (If yes, please select the applicable condition from the drop down menu)
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register('requiredToFileConditions')}
                        value="yes"
                      />
                      <span className="text-sm text-gray-900">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register('requiredToFileConditions')}
                        value="no"
                      />
                      <span className="text-sm text-gray-900">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* A25: Representative Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">
            (A25) Whether this return is being filed by a representative assessée? (Tick) ☑ Yes ☐ No
          </h3>

          <div className="mb-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register('filedByRepresentative')}
                  value="yes"
                />
                <span className="text-sm text-gray-900">Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register('filedByRepresentative')}
                  value="no"
                />
                <span className="text-sm text-gray-900">No</span>
              </label>
            </div>
          </div>

          {watch('filedByRepresentative') === 'yes' && (
            <div className="space-y-4 rounded-lg border border-purple-200 bg-purple-50 p-4">
              <p className="text-sm font-medium text-purple-900">
                If yes, please furnish following information -
              </p>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    (1) Name of the representative
                  </label>
                  <input
                    type="text"
                    {...register('representativeName')}
                    placeholder="Enter representative name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    (2) Capacity of the representative
                  </label>
                  <input
                    type="text"
                    {...register('representativeCapacity')}
                    placeholder="e.g., Guardian, Trustee, etc."
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    (3) Address of the representative
                  </label>
                  <textarea
                    {...register('representativeAddress')}
                    placeholder="Enter complete address"
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      (4) Permanent Account Number (PAN) of the representative
                    </label>
                    <input
                      type="text"
                      {...register('representativePAN')}
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      style={{ textTransform: 'uppercase' }}
                      onBlur={(e) => { e.target.value = e.target.value.trim(); }}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.representativePAN && (
                      <p className="mt-1 text-xs text-red-600">{errors.representativePAN.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Aadhaar No. of the representative
                    </label>
                    <input
                      type="text"
                      {...register('representativeAadhaar')}
                      placeholder="123456789012"
                      maxLength={12}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.representativeAadhaar && (
                      <p className="mt-1 text-xs text-red-600">{errors.representativeAadhaar.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrFourPartAGeneral;
