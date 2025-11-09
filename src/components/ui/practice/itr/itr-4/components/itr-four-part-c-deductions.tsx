import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define the schema for Part C - Deductions and Taxable Total Income
const partCDeductionsSchema = z.object({
  // C1: 80C
  c1_80c: z.string().optional().or(z.literal('')),
  
  // C2: 80CCC
  c2_80ccc: z.string().optional().or(z.literal('')),
  
  // C3: 80CCD(1)
  c3_80ccd1: z.string().optional().or(z.literal('')),
  
  // C4: 80CCD(1B)
  c4_80ccd1b: z.string().optional().or(z.literal('')),
  
  // C5: 80CCD(2)
  c5_80ccd2: z.string().optional().or(z.literal('')),
  
  // C6: 80D
  c6_80d: z.string().optional().or(z.literal('')),
  
  // C7: 80DD
  c7_80dd: z.string().optional().or(z.literal('')),
  
  // C8: 80DDB
  c8_80ddb: z.string().optional().or(z.literal('')),
  
  // C9: 80E
  c9_80e: z.string().optional().or(z.literal('')),
  
  // C10: 80EE
  c10_80ee: z.string().optional().or(z.literal('')),
  
  // C11: 80EEA
  c11_80eea: z.string().optional().or(z.literal('')),
  
  // C12: 80EEB
  c12_80eeb: z.string().optional().or(z.literal('')),
  
  // C13: 80G
  c13_80g: z.string().optional().or(z.literal('')),
  
  // C14: 80GG
  c14_80gg: z.string().optional().or(z.literal('')),
  
  // C15: 80GGC
  c15_80ggc: z.string().optional().or(z.literal('')),
  
  // C16: 80TTA
  c16_80tta: z.string().optional().or(z.literal('')),
  
  // C17: 80TTB
  c17_80ttb: z.string().optional().or(z.literal('')),
  
  // C18: 80U
  c18_80u: z.string().optional().or(z.literal('')),
  
  // C18a: 80CCH
  c18a_80cch: z.string().optional().or(z.literal('')),
  
  // C18b: Any Other
  c18b_anyOther: z.string().optional().or(z.literal('')),
  
  // C19: Total deductions (Auto-calculated)
  c19_totalDeductions: z.string().optional().or(z.literal('')),
  
  // C20: Taxable Total Income (Auto-calculated)
  c20_taxableTotalIncome: z.string().optional().or(z.literal('')),
}).superRefine((data, ctx) => {
  // Validate numeric fields when provided
  const numericFields = [
    { field: data.c1_80c, path: 'c1_80c', name: '80C' },
    { field: data.c2_80ccc, path: 'c2_80ccc', name: '80CCC' },
    { field: data.c3_80ccd1, path: 'c3_80ccd1', name: '80CCD(1)' },
    { field: data.c4_80ccd1b, path: 'c4_80ccd1b', name: '80CCD(1B)' },
    { field: data.c5_80ccd2, path: 'c5_80ccd2', name: '80CCD(2)' },
    { field: data.c6_80d, path: 'c6_80d', name: '80D' },
    { field: data.c7_80dd, path: 'c7_80dd', name: '80DD' },
    { field: data.c8_80ddb, path: 'c8_80ddb', name: '80DDB' },
    { field: data.c9_80e, path: 'c9_80e', name: '80E' },
    { field: data.c10_80ee, path: 'c10_80ee', name: '80EE' },
    { field: data.c11_80eea, path: 'c11_80eea', name: '80EEA' },
    { field: data.c12_80eeb, path: 'c12_80eeb', name: '80EEB' },
    { field: data.c13_80g, path: 'c13_80g', name: '80G' },
    { field: data.c14_80gg, path: 'c14_80gg', name: '80GG' },
    { field: data.c15_80ggc, path: 'c15_80ggc', name: '80GGC' },
    { field: data.c16_80tta, path: 'c16_80tta', name: '80TTA' },
    { field: data.c17_80ttb, path: 'c17_80ttb', name: '80TTB' },
    { field: data.c18_80u, path: 'c18_80u', name: '80U' },
    { field: data.c18a_80cch, path: 'c18a_80cch', name: '80CCH' },
    { field: data.c18b_anyOther, path: 'c18b_anyOther', name: 'Any Other' },
  ];

  numericFields.forEach(({ field, path, name }) => {
    if (field && field.trim() !== '') {
      const numValue = parseFloat(field);
      if (isNaN(numValue)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${name} must be a valid number`,
          path: [path],
        });
      } else if (numValue < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${name} cannot be negative`,
          path: [path],
        });
      }
    }
  });
});

export type PartCDeductionsFormData = z.infer<typeof partCDeductionsSchema>;

interface ItrFourPartCDeductionsProps {
  onNext: () => void;
  onBack: () => void;
  initialData?: Partial<PartCDeductionsFormData>;
  onSave?: (data: PartCDeductionsFormData) => void;
  grossTotalIncome?: string;
}

const ItrFourPartCDeductions: React.FC<ItrFourPartCDeductionsProps> = ({
  onNext,
  onBack,
  initialData,
  onSave,
  grossTotalIncome = '0',
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PartCDeductionsFormData>({
    resolver: zodResolver(partCDeductionsSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: PartCDeductionsFormData) => {
    if (onSave) {
      onSave(data);
    }
    onNext();
  };

  const handleSaveProgress = () => {
    const data = watch();
    if (onSave) {
      onSave(data as PartCDeductionsFormData);
    }
  };

  // Auto-calculate Total Deductions (C19)
  React.useEffect(() => {
    const deductions = [
      watch('c1_80c'),
      watch('c2_80ccc'),
      watch('c3_80ccd1'),
      watch('c4_80ccd1b'),
      watch('c5_80ccd2'),
      watch('c6_80d'),
      watch('c7_80dd'),
      watch('c8_80ddb'),
      watch('c9_80e'),
      watch('c10_80ee'),
      watch('c11_80eea'),
      watch('c12_80eeb'),
      watch('c13_80g'),
      watch('c14_80gg'),
      watch('c15_80ggc'),
      watch('c16_80tta'),
      watch('c17_80ttb'),
      watch('c18_80u'),
      watch('c18a_80cch'),
      watch('c18b_anyOther'),
    ];

    const total = deductions.reduce((sum, val) => {
      return sum + parseFloat(val || '0');
    }, 0);

    setValue('c19_totalDeductions', total.toFixed(2));
  }, [
    watch('c1_80c'), watch('c2_80ccc'), watch('c3_80ccd1'), watch('c4_80ccd1b'),
    watch('c5_80ccd2'), watch('c6_80d'), watch('c7_80dd'), watch('c8_80ddb'),
    watch('c9_80e'), watch('c10_80ee'), watch('c11_80eea'), watch('c12_80eeb'),
    watch('c13_80g'), watch('c14_80gg'), watch('c15_80ggc'), watch('c16_80tta'),
    watch('c17_80ttb'), watch('c18_80u'), watch('c18a_80cch'), watch('c18b_anyOther'),
    setValue, watch,
  ]);

  // Auto-calculate Taxable Total Income (C20)
  // Formula: C20 = B5 - C19
  React.useEffect(() => {
    const gti = parseFloat(grossTotalIncome || '0');
    const totalDeductions = parseFloat(watch('c19_totalDeductions') || '0');
    
    const taxableIncome = gti - totalDeductions;
    setValue('c20_taxableTotalIncome', taxableIncome.toFixed(2));
  }, [grossTotalIncome, watch('c19_totalDeductions'), setValue, watch]);

  const hasErrors = Object.keys(errors).length > 0;

  const deductionSections = [
    { id: 'c1', name: '80C', field: 'c1_80c', note: '(Details are to be filled in the drop down to be provided in e-filing utility)' },
    { id: 'c2', name: '80CCC', field: 'c2_80ccc', note: '(Details are to be filled in the drop down to be provided in e-filing utility)' },
    { id: 'c3', name: '80CCD(1)', field: 'c3_80ccd1', note: '(Details are to be filled in the drop down to be provided in e-filing utility)' },
    { id: 'c4', name: '80CCD(1B)', field: 'c4_80ccd1b', note: '(Details are to be filled in the drop down to be provided in e-filing utility)' },
    { id: 'c5', name: '80CCD(2)', field: 'c5_80ccd2', note: '(Details are to be filled in the drop down to be provided in e-filing utility)' },
    { id: 'c6', name: '80D', field: 'c6_80d', note: '(Details are to be filled in drop down to be provided in e-filing utility)' },
    { id: 'c7', name: '80DD', field: 'c7_80dd', note: '(Details to be filled in drop down to be provided in e-filing utility)' },
    { id: 'c8', name: '80DDB', field: 'c8_80ddb', note: '(Details to be filled in drop down to be provided in e-filing utility)' },
    { id: 'c9', name: '80E', field: 'c9_80e', note: '(Details are to be filled in the drop down to be provided in e-filing utility)' },
    { id: 'c10', name: '80EE', field: 'c10_80ee', note: '(Details are to be filled in the drop down to be provided in e-filing utility)' },
    { id: 'c11', name: '80EEA', field: 'c11_80eea', note: '(Details are to be filled in the drop down to be provided in e-filing utility)' },
    { id: 'c12', name: '80EEB', field: 'c12_80eeb', note: '(Details are to be filled in the drop down to be provided in e-filing utility)' },
    { id: 'c13', name: '80G', field: 'c13_80g', note: '(Details to be filled in drop down to be provided in e-filing utility)' },
    { id: 'c14', name: '80GG', field: 'c14_80gg', note: '(Details are to be filled in the drop down to be provided in e-filing utility)' },
    { id: 'c15', name: '80GGC', field: 'c15_80ggc', note: '(Details are to be filled in the drop down to be provided in e-filing utility)' },
    { id: 'c16', name: '80TTA', field: 'c16_80tta', note: '(Details to be filled in the drop down to be provided in e-filing utility)' },
    { id: 'c17', name: '80TTB', field: 'c17_80ttb', note: '' },
    { id: 'c18', name: '80U', field: 'c18_80u', note: '(Details to be filled in the drop down to be provided in e-filing utility)' },
    { id: 'c18a', name: '80CCH', field: 'c18a_80cch', note: '' },
    { id: 'c18b', name: 'Any Other', field: 'c18b_anyOther', note: '(Details are to be filled in the drop down to be provided in e-filing utility)' },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-xl border border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Part C - Deductions and Taxable Total Income
        </h2>
        <p className="text-sm text-gray-600">
          (Refer to instructions for Deductions limits as per Income-tax Act)
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Enter deduction amounts under various sections (80C to 80U)
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        <strong className="font-medium">{key.replace(/([A-Z_])/g, ' $1').trim()}:</strong>{' '}
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

        {/* Gross Total Income Reference */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">Gross Total Income (from Part B)</p>
              <p className="text-xs text-blue-700">This amount will be used to calculate Taxable Total Income</p>
            </div>
            <p className="text-2xl font-bold text-blue-900">₹ {parseFloat(grossTotalIncome || '0').toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Deductions Grid */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Chapter VI-A Deductions</h3>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {deductionSections.map((section) => (
              <div key={section.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900">
                      {section.id.toUpperCase()}: {section.name}
                    </label>
                    {section.note && (
                      <p className="mt-1 text-xs text-gray-600">{section.note}</p>
                    )}
                  </div>
                </div>
                <input
                  type="number"
                  {...register(section.field as keyof PartCDeductionsFormData)}
                  placeholder="0"
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors[section.field as keyof PartCDeductionsFormData] && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors[section.field as keyof PartCDeductionsFormData]?.message as string}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* C19: Total Deductions */}
        <div className="rounded-xl border-2 border-purple-300 bg-gradient-to-r from-purple-50 to-purple-100 p-6 shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                C19 - Total Deductions (Add items C1 to C18b)
              </h3>
              <p className="mt-1 text-xs text-gray-600">
                Sum of all deductions claimed under Chapter VI-A
              </p>
            </div>
            <span className="rounded-lg bg-purple-200 px-3 py-1.5 text-base font-bold text-purple-900">
              C19
            </span>
          </div>
          
          <input
            type="number"
            {...register('c19_totalDeductions')}
            placeholder="0"
            readOnly
            className="w-full rounded-lg border-2 border-purple-300 bg-white px-4 py-3 text-lg font-bold text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* C20: Taxable Total Income */}
        <div className="rounded-xl border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                C20 - Taxable Total Income (B5 - C19)
              </h3>
              <p className="mt-1 text-xs text-gray-600">
                Gross Total Income minus Total Deductions
              </p>
            </div>
            <span className="rounded-lg bg-green-200 px-3 py-1.5 text-base font-bold text-green-900">
              C20
            </span>
          </div>
          
          <input
            type="number"
            {...register('c20_taxableTotalIncome')}
            placeholder="0"
            readOnly
            className="w-full rounded-lg border-2 border-green-300 bg-white px-4 py-3 text-lg font-bold text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            ← Back
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSaveProgress}
              className="rounded-lg border border-blue-300 bg-blue-50 px-6 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              💾 Save Progress
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save & Continue →
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ItrFourPartCDeductions;
