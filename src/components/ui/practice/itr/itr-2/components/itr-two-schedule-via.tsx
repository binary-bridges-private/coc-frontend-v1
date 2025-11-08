import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation Schema
const scheduleVIASchema = z.object({
  // Part B: Deduction in respect of certain payments
  deduction80C: z.string().optional(),
  deduction80CDetails: z.string().optional(),
  deduction80CCC: z.string().optional(),
  deduction80CCCDetails: z.string().optional(),
  deduction80CCD1: z.string().optional(),
  deduction80CCD1Details: z.string().optional(),
  deduction80CCD1B: z.string().optional(),
  deduction80CCD1BDetails: z.string().optional(),
  deduction80CCD2: z.string().optional(),
  deduction80CCD2Details: z.string().optional(),
  deduction80D: z.string().optional(),
  deduction80DDetails: z.string().optional(),
  
  // Additional deductions
  deduction80DD: z.string().optional(),
  deduction80DDDetails: z.string().optional(),
  deduction80DDB: z.string().optional(),
  deduction80DDBDetails: z.string().optional(),
  deduction80E: z.string().optional(),
  deduction80EDetails: z.string().optional(),
  deduction80EE: z.string().optional(),
  deduction80EEDetails: z.string().optional(),
  deduction80EEA: z.string().optional(),
  deduction80EEADetails: z.string().optional(),
  deduction80EEB: z.string().optional(),
  deduction80EEBDetails: z.string().optional(),
  deduction80F: z.string().optional(),
  
  // Part C, CA and D - Deduction in respect of certain incomes/other deduction
  deduction80G: z.string().optional(),
  deduction80GG: z.string().optional(),
  deduction80GGA: z.string().optional(),
  deduction80GGC: z.string().optional(),
  deduction80QQB: z.string().optional(),
  deduction80RRB: z.string().optional(),
  deduction80TTA: z.string().optional(),
  deduction80TTB: z.string().optional(),
  deduction80U: z.string().optional(),
  deduction80CCH: z.string().optional(),
  
  // Other deductions as per e-filing utility
  anyOtherDeduction: z.string().optional(),
  
  // Total deductions
  totalDeductions: z.string().optional(),
});

export type ScheduleVIAFormData = z.infer<typeof scheduleVIASchema>;

interface ItrTwoScheduleVIAProps {
  onSave: (data: ScheduleVIAFormData) => void;
  onBack: () => void;
  initialData?: ScheduleVIAFormData;
}

const ItrTwoScheduleVIA: React.FC<ItrTwoScheduleVIAProps> = ({ onSave, onBack, initialData }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ScheduleVIAFormData>({
    resolver: zodResolver(scheduleVIASchema),
    defaultValues: initialData || {
      deduction80C: '',
      deduction80CDetails: '',
      deduction80CCC: '',
      deduction80CCCDetails: '',
      deduction80CCD1: '',
      deduction80CCD1Details: '',
      deduction80CCD1B: '',
      deduction80CCD1BDetails: '',
      deduction80CCD2: '',
      deduction80CCD2Details: '',
      deduction80D: '',
      deduction80DDetails: '',
      deduction80DD: '',
      deduction80DDDetails: '',
      deduction80DDB: '',
      deduction80DDBDetails: '',
      deduction80E: '',
      deduction80EDetails: '',
      deduction80EE: '',
      deduction80EEDetails: '',
      deduction80EEA: '',
      deduction80EEADetails: '',
      deduction80EEB: '',
      deduction80EEBDetails: '',
      deduction80F: '',
      deduction80G: '',
      deduction80GG: '',
      deduction80GGA: '',
      deduction80GGC: '',
      deduction80QQB: '',
      deduction80RRB: '',
      deduction80TTA: '',
      deduction80TTB: '',
      deduction80U: '',
      deduction80CCH: '',
      anyOtherDeduction: '',
      totalDeductions: '',
    }
  });

  const watchAllFields = watch();

  // Calculate total deductions
  const calculateTotal = () => {
    const fields = [
      'deduction80C', 'deduction80CCC', 'deduction80CCD1', 'deduction80CCD1B', 
      'deduction80CCD2', 'deduction80D', 'deduction80DD', 'deduction80DDB',
      'deduction80E', 'deduction80EE', 'deduction80EEA', 'deduction80EEB',
      'deduction80F', 'deduction80G', 'deduction80GG', 'deduction80GGA',
      'deduction80GGC', 'deduction80QQB', 'deduction80RRB', 'deduction80TTA',
      'deduction80TTB', 'deduction80U', 'deduction80CCH', 'anyOtherDeduction'
    ];

    const total = fields.reduce((sum, field) => {
      const value = parseFloat(watchAllFields[field as keyof ScheduleVIAFormData] || '0');
      return sum + value;
    }, 0);

    setValue('totalDeductions', total.toString());
  };

  const onSubmit = (data: ScheduleVIAFormData) => {
    calculateTotal();
    onSave(data);
  };

  // Dropdown options for each section
  const deductionDetails: Record<string, string[]> = {
    '80C': [
      'Life Insurance Premium (LIC)',
      'Employee Provident Fund (EPF)',
      'Public Provident Fund (PPF)',
      'Equity Linked Savings Scheme (ELSS)',
      'National Savings Certificate (NSC)',
      'Tax Saver Fixed Deposit',
      'Senior Citizens Savings Scheme (SCSS)',
      'Sukanya Samriddhi Account',
      'Home Loan Principal Repayment',
      'Stamp Duty & Registration Charges',
      'Tuition Fees (2 children)',
      'National Pension System (NPS) - Tier 1',
      'Unit Linked Insurance Plan (ULIP)',
      'Post Office Time Deposit (5 years)',
      'Pension Fund',
    ],
    '80CCC': [
      'Contribution to Pension Fund - LIC',
      'Contribution to Pension Fund - Other Insurers',
      'Annuity Plan Premium',
    ],
    '80CCD(1)': [
      'Employee Contribution to NPS',
      'Self-Employed Contribution to NPS',
      'Atal Pension Yojana',
    ],
    '80CCD(1B)': [
      'Additional NPS Contribution (beyond 80CCD(1))',
    ],
    '80CCD(2)': [
      'Employer Contribution to NPS',
    ],
    '80D': [
      'Health Insurance Premium - Self',
      'Health Insurance Premium - Spouse',
      'Health Insurance Premium - Children',
      'Health Insurance Premium - Parents',
      'Health Insurance Premium - Parents (Senior Citizen)',
      'Preventive Health Check-up',
      'Medical Expenditure - Senior Citizen (no insurance)',
    ],
    '80DD': [
      'Maintenance of Disabled Dependent - Normal Disability (₹75,000)',
      'Maintenance of Disabled Dependent - Severe Disability (₹1,25,000)',
    ],
    '80DDB': [
      'Medical Treatment - Specified Disease (Self)',
      'Medical Treatment - Specified Disease (Dependent)',
      'Medical Treatment - Senior Citizen',
      'Medical Treatment - Super Senior Citizen (80+ years)',
    ],
    '80E': [
      'Education Loan Interest - Self',
      'Education Loan Interest - Spouse',
      'Education Loan Interest - Children',
    ],
    '80EE': [
      'Home Loan Interest - First Time Home Buyer',
    ],
    '80EEA': [
      'Home Loan Interest - Affordable Housing (Sanctioned 2019-2022)',
    ],
    '80EEB': [
      'Electric Vehicle Loan Interest',
    ],
    '80QQB': [
      'Royalty Income from Patents',
    ],
    '80RRB': [
      'Royalty on Patents - Resident',
    ],
    '80CCH': [
      'Agnipath Scheme Contribution',
    ],
  };

  const renderDeductionRow = (
    label: string,
    fieldName: keyof ScheduleVIAFormData,
    note: string,
    rowSpan?: number
  ) => (
    <tr>
      <td className="border border-gray-300 px-4 py-3 font-medium" rowSpan={rowSpan}>
        {label}
      </td>
      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600" rowSpan={rowSpan}>
        {note}
      </td>
      <td className="border border-gray-300 px-2 py-2">
        <input
          type="number"
          step="0.01"
          {...register(fieldName)}
          className="w-full min-w-[150px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
          placeholder="0.00"
        />
        {errors[fieldName] && (
          <p className="text-red-500 text-xs mt-1">{errors[fieldName]?.message}</p>
        )}
      </td>
    </tr>
  );

  const renderDeductionRowWithDropdown = (
    label: string,
    fieldName: keyof ScheduleVIAFormData,
    detailsFieldName: keyof ScheduleVIAFormData,
    note: string,
    dropdownOptions: string[],
    rowSpan?: number
  ) => (
    <tr>
      <td className="border border-gray-300 px-4 py-3 font-medium" rowSpan={rowSpan}>
        {label}
      </td>
      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600" rowSpan={rowSpan}>
        {note}
      </td>
      <td className="border border-gray-300 px-2 py-2">
        <div className="space-y-2">
          <select
            {...register(detailsFieldName)}
            className="w-full min-w-[150px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="">Select an option...</option>
            {dropdownOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="number"
            step="0.01"
            {...register(fieldName)}
            className="w-full min-w-[150px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
            placeholder="Amount (0.00)"
          />
        </div>
        {errors[fieldName] && (
          <p className="text-red-500 text-xs mt-1">{errors[fieldName]?.message}</p>
        )}
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Schedule VI-A</h2>
          <p className="mt-1 text-sm text-gray-600">Deductions under Chapter VI-A</p>
        </div>

        {/* Important Information */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 flex-shrink-0 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Key Information</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>80C + 80CCC + 80CCD(1):</strong> Combined maximum limit of ₹1,50,000</li>
                <li>• <strong>80CCD(1B):</strong> Additional ₹50,000 deduction for NPS (separate limit)</li>
                <li>• <strong>80CCD(2):</strong> Employer's NPS contribution (no upper limit for govt employees, 10% for private)</li>
                <li>• <strong>80D:</strong> Health insurance - ₹25,000 (self/family) + ₹25,000 (parents); ₹50,000 if senior citizen</li>
                <li>• <strong>80DD:</strong> Disabled dependent - ₹75,000 (normal) or ₹1,25,000 (severe)</li>
                <li>• <strong>80DDB:</strong> Medical treatment - ₹40,000 (general) or ₹1,00,000 (senior citizen)</li>
                <li>• <strong>80E:</strong> Education loan interest - Full amount, no limit</li>
                <li>• <strong>80G:</strong> Donations to charitable institutions - 50% or 100% based on institution type</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Part 1: Total Deductions */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            1. Part B- Deduction in respect of certain payments
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left min-w-[120px]">Section</th>
                  <th className="border border-gray-300 px-4 py-3 text-left min-w-[300px]">Note</th>
                  <th className="border border-gray-300 px-4 py-3 text-left min-w-[150px]">Amount</th>
                </tr>
              </thead>
              <tbody>
                {renderDeductionRowWithDropdown(
                  'a. 80C',
                  'deduction80C',
                  'deduction80CDetails',
                  'LIC, EPF, PPF, ELSS, NSC, Tax Saver FD, SCSS, Sukanya Samriddhi, Home Loan Principal, Stamp Duty, Tuition Fees, NPS, ULIP (Max: ₹1.5 Lakh)',
                  deductionDetails['80C']
                )}
                {renderDeductionRowWithDropdown(
                  'b. 80CCC',
                  'deduction80CCC',
                  'deduction80CCCDetails',
                  'Pension Fund Contributions - LIC, Other Insurers, Annuity Plans (Combined limit with 80C: ₹1.5 Lakh)',
                  deductionDetails['80CCC']
                )}
                {renderDeductionRowWithDropdown(
                  'c. 80CCD(1)',
                  'deduction80CCD1',
                  'deduction80CCD1Details',
                  'Employee/Self-employed NPS Contribution, Atal Pension Yojana (Combined limit with 80C: ₹1.5 Lakh)',
                  deductionDetails['80CCD(1)']
                )}
                {renderDeductionRowWithDropdown(
                  'd. 80CCD(1B)',
                  'deduction80CCD1B',
                  'deduction80CCD1BDetails',
                  'Additional NPS Contribution beyond 80CCD(1) (Max: ₹50,000, separate from 80C limit)',
                  deductionDetails['80CCD(1B)']
                )}
                {renderDeductionRowWithDropdown(
                  'e. 80CCD(2)',
                  'deduction80CCD2',
                  'deduction80CCD2Details',
                  'Employer Contribution to NPS (Max: 10% of Salary for Pvt, 14% for Govt employees)',
                  deductionDetails['80CCD(2)']
                )}
                {renderDeductionRowWithDropdown(
                  'f. 80D',
                  'deduction80D',
                  'deduction80DDetails',
                  'Health Insurance Premium - Self, Spouse, Children, Parents; Preventive Health Check-up (Max: ₹25k/₹50k for Senior Citizens)',
                  deductionDetails['80D']
                )}
                {renderDeductionRowWithDropdown(
                  'g. 80DD',
                  'deduction80DD',
                  'deduction80DDDetails',
                  'Maintenance of Disabled Dependent - Normal: ₹75,000, Severe: ₹1,25,000',
                  deductionDetails['80DD']
                )}
                {renderDeductionRowWithDropdown(
                  'h. 80DDB',
                  'deduction80DDB',
                  'deduction80DDBDetails',
                  'Medical Treatment for Specified Diseases - Self/Dependent (Max: ₹40k/₹1 Lakh for Senior Citizens)',
                  deductionDetails['80DDB']
                )}
                {renderDeductionRowWithDropdown(
                  'i. 80E',
                  'deduction80E',
                  'deduction80EDetails',
                  'Education Loan Interest - Self, Spouse, Children (Full interest amount, no upper limit)',
                  deductionDetails['80E']
                )}
                {renderDeductionRowWithDropdown(
                  'j. 80EE',
                  'deduction80EE',
                  'deduction80EEDetails',
                  'Home Loan Interest for First-Time Home Buyers (Max: ₹50,000, loan sanctioned before 01.04.2017)',
                  deductionDetails['80EE']
                )}
                {renderDeductionRowWithDropdown(
                  'k. 80EEA',
                  'deduction80EEA',
                  'deduction80EEADetails',
                  'Affordable Housing Loan Interest (Max: ₹1.5 Lakh, loan sanctioned 01.04.2019-31.03.2022)',
                  deductionDetails['80EEA']
                )}
                {renderDeductionRowWithDropdown(
                  'l. 80EEB',
                  'deduction80EEB',
                  'deduction80EEBDetails',
                  'Electric Vehicle Loan Interest (Max: ₹1.5 Lakh, loan sanctioned 01.04.2019-31.03.2023)',
                  deductionDetails['80EEB']
                )}
                {renderDeductionRow(
                  'm. 80G',
                  'deduction80G',
                  ''
                )}
                {renderDeductionRow(
                  'n. 80GGC',
                  'deduction80GGC',
                  'Political Party Contributions (100% deduction, only by Indian Company or Resident Individual)'
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Part 2: Part C, CA and D - Deduction in respect of certain incomes/other deduction */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 bg-gray-100 px-4 py-2">
            2. Part C, CA and D- Deduction in respect of certain incomes/other deduction
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left min-w-[120px]">Section</th>
                  <th className="border border-gray-300 px-4 py-3 text-left min-w-[300px]">Note</th>
                  <th className="border border-gray-300 px-4 py-3 text-left min-w-[150px]">Amount</th>
                </tr>
              </thead>
              <tbody>
                {renderDeductionRow(
                  'o. 80GGA',
                  'deduction80GGA',
                  ''
                )}
                {renderDeductionRow(
                  'p. 80GGC',
                  'deduction80GGC',
                  ''
                )}
                {renderDeductionRow(
                  'q. 80QQB',
                  'deduction80QQB',
                  'Royalty Income from Patents (Max: ₹3 Lakh)'
                )}
                {renderDeductionRow(
                  'r. 80RRB',
                  'deduction80RRB',
                  'Royalty on Patents - Resident Individual (Max: ₹3 Lakh)'
                )}
                {renderDeductionRow(
                  's. 80TTA',
                  'deduction80TTA',
                  ''
                )}
                {renderDeductionRow(
                  't. 80TTB',
                  'deduction80TTB',
                  ''
                )}
                {renderDeductionRow(
                  'u. 80U',
                  'deduction80U',
                  ''
                )}
                {renderDeductionRow(
                  'ua. 80CCH',
                  'deduction80CCH',
                  ''
                )}
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    ub. Any other deduction
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">
                    Any other deduction as per the e-filing utility (Details are to be filled in the drop down to be provided in e-filing utility)
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register('anyOtherDeduction')}
                      className="w-full min-w-[150px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="0.00"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Deductions */}
        <div className="mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <tbody>
                <tr className="bg-gray-100">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">
                    v. Total deductions under Chapter VI-A (Total of a to ub)
                  </td>
                  <td className="border border-gray-300 px-2 py-2" style={{ width: '200px' }}>
                    <input
                      type="number"
                      step="0.01"
                      {...register('totalDeductions')}
                      className="w-full min-w-[150px] px-4 py-2 border border-gray-300 rounded bg-gray-50 font-semibold"
                      placeholder="0.00"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center" style={{ width: '150px' }}>
                    <button
                      type="button"
                      onClick={calculateTotal}
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                    >
                      Calculate Total
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Save Schedule VI-A
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwoScheduleVIA;
