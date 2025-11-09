import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define the schema for Part B - Gross Total Income with Conditional Validation
const partBGTISchema = z.object({
  // B1: Income from Business & Profession
  b1_businessProfessionIncome: z.string().optional().or(z.literal('')),
  
  // B2: Gross Salary
  b2_1_grossSalary: z.string().optional().or(z.literal('')),
  
  // Salary Details (B2.1)
  b2_1_a_salaryU17_1: z.string().optional().or(z.literal('')),
  b2_1_b_perquisitesU17_2: z.string().optional().or(z.literal('')),
  b2_1_c_profitsInLieuU17_3: z.string().optional().or(z.literal('')),
  b2_1_d_retirementBenefitU89A_notified: z.string().optional().or(z.literal('')),
  b2_1_e_retirementBenefitU89A_otherThanNotified: z.string().optional().or(z.literal('')),
  b2_1_f_lessAllowanceExtentExemptU10: z.enum(['yes', 'no']).optional().or(z.literal('')),
  
  // Less: Income claimed for relief from taxation u/s 89A
  b2_1_incomeClaimedRelief89A: z.string().optional().or(z.literal('')),
  
  // Net Salary (i - ii - iia)
  b2_1_iii_netSalary: z.string().optional().or(z.literal('')),
  
  // Deductions u/s 16
  b2_1_iv_deductionsU16: z.string().optional().or(z.literal('')),
  b2_1_iv_a_standardDeduction: z.string().optional().or(z.literal('')),
  b2_1_iv_b_entertainmentAllowanceU16_ii: z.string().optional().or(z.literal('')),
  b2_1_iv_c_professionalTaxU16_iii: z.string().optional().or(z.literal('')),
  
  // Income chargeable under head 'Salaries' (iii - iv)
  b2_incomeChargeableSalaries: z.string().optional().or(z.literal('')),
  
  // B3: Tick applicable option
  b3_tickApplicable: z.enum(['self-occupied', 'let-out', 'deemed-let-out']).optional().or(z.literal('')),
  
  // Income from house property details (if applicable)
  b3_i_grossRentReceived: z.string().optional().or(z.literal('')),
  b3_ii_taxPaidLocalAuthorities: z.string().optional().or(z.literal('')),
  b3_iii_annualValue: z.string().optional().or(z.literal('')),
  b3_iv_30PercentAnnualValue: z.string().optional().or(z.literal('')),
  b3_v_interestBorrowedCapital: z.string().optional().or(z.literal('')),
  b3_vi_arrearsUnrealisedRent: z.string().optional().or(z.literal('')),
  b3_incomeChargeableHouseProperty: z.string().optional().or(z.literal('')),
  
  // B4: Income from Other Sources
  b4_incomeFromOtherSources: z.string().optional().or(z.literal('')),
  
  // Less: Deduction u/s 57(iia)
  b4_lessDeductionU57: z.string().optional().or(z.literal('')),
  
  // Less: Income claimed for relief from taxation u/s 89A
  b4_lessIncomeClaimedRelief89A: z.string().optional().or(z.literal('')),
  
  // B5: Gross Total Income (B1 + B2 + B3 + B4)
  b5_grossTotalIncome: z.string().optional().or(z.literal('')),
}).superRefine((data, ctx) => {
  // Conditional validation for House Property fields (B3)
  if (data.b3_tickApplicable) {
    // If house property type is selected, gross rent is required for let-out/deemed-let-out
    if ((data.b3_tickApplicable === 'let-out' || data.b3_tickApplicable === 'deemed-let-out')) {
      if (!data.b3_i_grossRentReceived || data.b3_i_grossRentReceived.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Gross rent is required for let-out/deemed let-out property',
          path: ['b3_i_grossRentReceived'],
        });
      }
      if (!data.b3_iii_annualValue || data.b3_iii_annualValue.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Annual value is required',
          path: ['b3_iii_annualValue'],
        });
      }
      if (!data.b3_iv_30PercentAnnualValue || data.b3_iv_30PercentAnnualValue.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '30% of annual value is required',
          path: ['b3_iv_30PercentAnnualValue'],
        });
      }
    }
  }

  // Validate numeric fields when provided
  const numericFields = [
    { field: data.b1_businessProfessionIncome, path: 'b1_businessProfessionIncome', name: 'Business/Profession income' },
    { field: data.b2_1_grossSalary, path: 'b2_1_grossSalary', name: 'Gross salary' },
    { field: data.b2_1_a_salaryU17_1, path: 'b2_1_a_salaryU17_1', name: 'Salary u/s 17(1)' },
    { field: data.b2_1_b_perquisitesU17_2, path: 'b2_1_b_perquisitesU17_2', name: 'Perquisites u/s 17(2)' },
    { field: data.b2_1_c_profitsInLieuU17_3, path: 'b2_1_c_profitsInLieuU17_3', name: 'Profits in lieu u/s 17(3)' },
    { field: data.b2_1_d_retirementBenefitU89A_notified, path: 'b2_1_d_retirementBenefitU89A_notified', name: 'Retirement benefit (notified)' },
    { field: data.b2_1_e_retirementBenefitU89A_otherThanNotified, path: 'b2_1_e_retirementBenefitU89A_otherThanNotified', name: 'Retirement benefit (other)' },
    { field: data.b2_1_incomeClaimedRelief89A, path: 'b2_1_incomeClaimedRelief89A', name: 'Income claimed for relief' },
    { field: data.b2_1_iv_deductionsU16, path: 'b2_1_iv_deductionsU16', name: 'Deductions u/s 16' },
    { field: data.b2_1_iv_a_standardDeduction, path: 'b2_1_iv_a_standardDeduction', name: 'Standard deduction' },
    { field: data.b2_1_iv_b_entertainmentAllowanceU16_ii, path: 'b2_1_iv_b_entertainmentAllowanceU16_ii', name: 'Entertainment allowance' },
    { field: data.b2_1_iv_c_professionalTaxU16_iii, path: 'b2_1_iv_c_professionalTaxU16_iii', name: 'Professional tax' },
    { field: data.b3_i_grossRentReceived, path: 'b3_i_grossRentReceived', name: 'Gross rent' },
    { field: data.b3_ii_taxPaidLocalAuthorities, path: 'b3_ii_taxPaidLocalAuthorities', name: 'Tax paid to local authorities' },
    { field: data.b3_iii_annualValue, path: 'b3_iii_annualValue', name: 'Annual value' },
    { field: data.b3_iv_30PercentAnnualValue, path: 'b3_iv_30PercentAnnualValue', name: '30% of annual value' },
    { field: data.b3_v_interestBorrowedCapital, path: 'b3_v_interestBorrowedCapital', name: 'Interest on borrowed capital' },
    { field: data.b3_vi_arrearsUnrealisedRent, path: 'b3_vi_arrearsUnrealisedRent', name: 'Arrears/unrealised rent' },
    { field: data.b4_incomeFromOtherSources, path: 'b4_incomeFromOtherSources', name: 'Income from other sources' },
    { field: data.b4_lessDeductionU57, path: 'b4_lessDeductionU57', name: 'Deduction u/s 57' },
    { field: data.b4_lessIncomeClaimedRelief89A, path: 'b4_lessIncomeClaimedRelief89A', name: 'Income claimed for relief' },
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
      }
    }
  });
});

export type PartBGTIFormData = z.infer<typeof partBGTISchema>;

interface ItrFourPartBGTIProps {
  onNext: () => void;
  onBack: () => void;
  initialData?: Partial<PartBGTIFormData>;
  onSave?: (data: PartBGTIFormData) => void;
}

const ItrFourPartBGTI: React.FC<ItrFourPartBGTIProps> = ({
  onNext,
  onBack,
  initialData,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PartBGTIFormData>({
    resolver: zodResolver(partBGTISchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: PartBGTIFormData) => {
    if (onSave) {
      onSave(data);
    }
    onNext();
  };

  const handleSaveProgress = () => {
    const data = watch();
    if (onSave) {
      onSave(data as PartBGTIFormData);
    }
  };

  // Manual Calculate Functions
  const calculateNetSalary = () => {
    const grossSalary = parseFloat(watch('b2_1_grossSalary') || '0');
    const incomeClaimedRelief = parseFloat(watch('b2_1_incomeClaimedRelief89A') || '0');
    const netSalary = grossSalary - incomeClaimedRelief;
    setValue('b2_1_iii_netSalary', netSalary.toFixed(2));
  };

  const calculateIncomeChargeableSalaries = () => {
    const netSalary = parseFloat(watch('b2_1_iii_netSalary') || '0');
    const deductions = parseFloat(watch('b2_1_iv_deductionsU16') || '0');
    const income = netSalary - deductions;
    setValue('b2_incomeChargeableSalaries', income.toFixed(2));
  };

  const calculateHousePropertyIncome = () => {
    const annualValue = parseFloat(watch('b3_iii_annualValue') || '0');
    const thirtyPercent = parseFloat(watch('b3_iv_30PercentAnnualValue') || '0');
    const interest = parseFloat(watch('b3_v_interestBorrowedCapital') || '0');
    const arrears = parseFloat(watch('b3_vi_arrearsUnrealisedRent') || '0');
    const income = annualValue - thirtyPercent - interest + arrears;
    setValue('b3_incomeChargeableHouseProperty', income.toFixed(2));
  };

  const calculateGrossTotalIncome = () => {
    const b1 = parseFloat(watch('b1_businessProfessionIncome') || '0');
    const b2 = parseFloat(watch('b2_incomeChargeableSalaries') || '0');
    const b3 = parseFloat(watch('b3_incomeChargeableHouseProperty') || '0');
    const b4Income = parseFloat(watch('b4_incomeFromOtherSources') || '0');
    const b4Deduction = parseFloat(watch('b4_lessDeductionU57') || '0');
    const b4Relief = parseFloat(watch('b4_lessIncomeClaimedRelief89A') || '0');
    const b4 = b4Income - b4Deduction - b4Relief;
    const grossTotal = b1 + b2 + b3 + b4;
    setValue('b5_grossTotalIncome', grossTotal.toFixed(2));
  };

  // Auto-calculate Net Salary (B2.1.iii)
  // Formula: (i) - (ii) - (iia) where:
  // (i) = Gross Salary (sum of ia through if)
  // (ii) = Less: Income claimed for relief from taxation u/s 89A
  // Note: In the current structure, we only have one "income claimed relief" field at (iia)
  // So Net Salary = Gross Salary - Income Claimed Relief
  React.useEffect(() => {
    calculateNetSalary();
  }, [watch('b2_1_grossSalary'), watch('b2_1_incomeClaimedRelief89A')]);

  // Auto-calculate Income chargeable under Salaries (B2)
  // Formula: B2 = (iii) - (iv)
  // (iii) Net Salary
  // (iv) Deductions u/s 16
  React.useEffect(() => {
    calculateIncomeChargeableSalaries();
  }, [watch('b2_1_iii_netSalary'), watch('b2_1_iv_deductionsU16')]);

  // Auto-calculate Income from House Property (B3)
  // Formula: (vii) = (iii) - (iv) - (v) + (vi)
  // (iii) Annual Value
  // (iv) 30% of Annual Value
  // (v) Interest on borrowed capital
  // (vi) Arrears/Unrealised Rent received Less 30% (this is ADDED back)
  React.useEffect(() => {
    calculateHousePropertyIncome();
  }, [
    watch('b3_iii_annualValue'),
    watch('b3_iv_30PercentAnnualValue'),
    watch('b3_v_interestBorrowedCapital'),
    watch('b3_vi_arrearsUnrealisedRent'),
  ]);

  // Auto-calculate Gross Total Income (B5)
  // Formula: B5 = B1 + B2 + B3 + B4
  // Where B4 = Income from Other Sources - Deduction u/s 57 - Income claimed for relief
  React.useEffect(() => {
    calculateGrossTotalIncome();
  }, [
    watch('b1_businessProfessionIncome'),
    watch('b2_incomeChargeableSalaries'),
    watch('b3_incomeChargeableHouseProperty'),
    watch('b4_incomeFromOtherSources'),
    watch('b4_lessDeductionU57'),
    watch('b4_lessIncomeClaimedRelief89A'),
  ]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Part B - Gross Total Income
        </h2>
        <p className="text-sm text-gray-600">
          Whole - Rupee(₹) only
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Enter all income details from business/profession, salary, house property, and other sources
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
        {/* B1: Income from Business & Profession */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                B1 Income from Business & Profession
              </h3>
              <p className="mt-1 text-xs text-gray-600">
                (NOTE: Enter value from E8 of Schedule BP)
              </p>
            </div>
            <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              B1
            </span>
          </div>
          
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Income Amount (₹)
            </label>
            <input
              type="number"
              {...register('b1_businessProfessionIncome')}
              placeholder="0"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* B2: Gross Salary */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                B2 [ 1 ] Gross Salary
              </h3>
              <p className="mt-1 text-xs text-gray-600">
                (i+ii+iii+iv+v+vi+vii+viii+ix) [Refer Sch-S]
              </p>
            </div>
            <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              B2
            </span>
          </div>

          <div className="space-y-4">
            {/* Gross Salary Total */}
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Gross Salary (Total)
              </label>
              <input
                type="number"
                {...register('b2_1_grossSalary')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Salary Breakdown */}
            <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h4 className="text-sm font-semibold text-gray-800">Salary Components</h4>
              
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    <span className="font-mono">ia</span> Salary as per section 17(1)
                  </label>
                  <input
                    type="number"
                    {...register('b2_1_a_salaryU17_1')}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    <span className="font-mono">ib</span> Value of perquisites as per section 17(2)
                  </label>
                  <input
                    type="number"
                    {...register('b2_1_b_perquisitesU17_2')}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    <span className="font-mono">ic</span> Profit in lieu of salary as per section 17(3)
                  </label>
                  <input
                    type="number"
                    {...register('b2_1_c_profitsInLieuU17_3')}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    <span className="font-mono">id</span> Income from retirement benefit maintained in notified country u/s 89A
                  </label>
                  <input
                    type="number"
                    {...register('b2_1_d_retirementBenefitU89A_notified')}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    <span className="font-mono">ie</span> Income from retirement benefit maintained in a country other than notified country u/s 89A
                  </label>
                  <input
                    type="number"
                    {...register('b2_1_e_retirementBenefitU89A_otherThanNotified')}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-medium text-gray-700">
                    <span className="font-mono">if</span> Less allowance to the extent exempt u/s 10
                  </label>
                  <p className="mb-2 text-xs text-gray-600">
                    [Ensure that it is included in salary income u/s 1 / i(1)^2(2) / i(3)]
                  </p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register('b2_1_f_lessAllowanceExtentExemptU10')}
                        value="yes"
                      />
                      <span className="text-sm text-gray-900">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register('b2_1_f_lessAllowanceExtentExemptU10')}
                        value="no"
                      />
                      <span className="text-sm text-gray-900">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Less: Income claimed for relief */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                (iia) Less: Income claimed for relief from taxation u/s 89A
              </label>
              <input
                type="number"
                {...register('b2_1_incomeClaimedRelief89A')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Net Salary (Auto-calculated) */}
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  (iii) Net Salary (i - ii - iia)
                </label>
                <button
                  type="button"
                  onClick={calculateNetSalary}
                  className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Calculate
                </button>
              </div>
              <input
                type="number"
                {...register('b2_1_iii_netSalary')}
                placeholder="0"
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Deductions u/s 16 */}
            <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h4 className="text-sm font-semibold text-gray-800">(iv) Deductions u/s 16 (iva + ivb + ivc)</h4>
              
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    <span className="font-mono">iva</span> Standard Deduction
                  </label>
                  <input
                    type="number"
                    {...register('b2_1_iv_a_standardDeduction')}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    <span className="font-mono">ivb</span> Entertainment allowance u/s 16(ii)
                  </label>
                  <input
                    type="number"
                    {...register('b2_1_iv_b_entertainmentAllowanceU16_ii')}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    <span className="font-mono">ivc</span> Professional tax u/s 16(iii)
                  </label>
                  <input
                    type="number"
                    {...register('b2_1_iv_c_professionalTaxU16_iii')}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Total Deductions u/s 16
                </label>
                <input
                  type="number"
                  {...register('b2_1_iv_deductionsU16')}
                  placeholder="0"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Income chargeable under Salaries (Auto-calculated) */}
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <span className="font-mono">B2</span> Income chargeable under the head 'Salaries' (iii - iv)
                  </label>
                  <p className="mt-1 text-xs text-gray-600">
                    (NOTE: Ensure to Fill "Sch TDS1")
                  </p>
                </div>
                <button
                  type="button"
                  onClick={calculateIncomeChargeableSalaries}
                  className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Calculate
                </button>
              </div>
              <input
                type="number"
                {...register('b2_incomeChargeableSalaries')}
                placeholder="0"
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* B3: House Property Income */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                B3 [ 1 ] Tick applicable option:
              </h3>
              <p className="mt-1 text-xs text-gray-600">
                Self Occupied ☐ Let Out ☐ Deemed Let Out ☐
              </p>
            </div>
            <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              B3
            </span>
          </div>

          <div className="mb-4">
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register('b3_tickApplicable')}
                  value="self-occupied"
                />
                <span className="text-sm text-gray-900">Self Occupied</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register('b3_tickApplicable')}
                  value="let-out"
                />
                <span className="text-sm text-gray-900">Let Out</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register('b3_tickApplicable')}
                  value="deemed-let-out"
                />
                <span className="text-sm text-gray-900">Deemed Let Out</span>
              </label>
            </div>
          </div>

          {watch('b3_tickApplicable') && (
            <div className="space-y-4 rounded-lg border border-purple-200 bg-purple-50 p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    (i) Gross rent received/ receivable/ lettable value during the year
                  </label>
                  <input
                    type="number"
                    {...register('b3_i_grossRentReceived')}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    (ii) Tax paid to local authorities
                  </label>
                  <input
                    type="number"
                    {...register('b3_ii_taxPaidLocalAuthorities')}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    (iii) Annual Value (i - ii)
                  </label>
                  <input
                    type="number"
                    {...register('b3_iii_annualValue')}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    (iv) 30% of Annual Value
                  </label>
                  <input
                    type="number"
                    {...register('b3_iv_30PercentAnnualValue')}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    (v) Interest payable on borrowed capital
                  </label>
                  <p className="mb-1 text-xs text-gray-600">
                    (Result are to be filled in the drop down to be provided in e-filing utility)
                  </p>
                  <input
                    type="number"
                    {...register('b3_v_interestBorrowedCapital')}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    (vi) Arrears/Unrealised Rent received during the year Less 30%
                  </label>
                  <input
                    type="number"
                    {...register('b3_vi_arrearsUnrealisedRent')}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      (vii) Income chargeable under the head 'House Property' (iii - iv - v) + vi
                    </label>
                    <p className="mt-1 text-xs text-gray-600">
                      [If loss, put the figure in negative]
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={calculateHousePropertyIncome}
                    className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Calculate
                  </button>
                </div>
                <input
                  type="number"
                  {...register('b3_incomeChargeableHouseProperty')}
                  placeholder="0"
                  readOnly
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
          )}
        </div>

        {/* B4: Income from Other Sources */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                B4 [ 1 ] Income from Other Sources
              </h3>
              <p className="mt-1 text-xs text-gray-600">
                (drop down like interest from saving account, deposit etc. to be provided in e-filing utility)
              </p>
            </div>
            <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              B4
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Income from Other Sources
              </label>
              <p className="mb-2 text-xs text-gray-600">
                <strong>NOTE:</strong> Fill "Sch TDS2" if applicable.
              </p>
              <input
                type="number"
                {...register('b4_incomeFromOtherSources')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Less: Deduction u/s 57(iia) (in case of family pension only)
              </label>
              <input
                type="number"
                {...register('b4_lessDeductionU57')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Less: Income claimed for relief from taxation u/s 89A
              </label>
              <input
                type="number"
                {...register('b4_lessIncomeClaimedRelief89A')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* B5: Gross Total Income (Auto-calculated) */}
        <div className="rounded-xl border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-md">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    B5 Gross Total Income (B1 + B2 + B3 + B4)
                  </h3>
                  <p className="mt-1 text-xs text-gray-600">
                    (If to avail the benefit of carry forward and set of loss, please see ITR -3/-5.)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={calculateGrossTotalIncome}
                  className="ml-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Calculate
                </button>
              </div>
            </div>
            <span className="ml-3 rounded-lg bg-green-100 px-3 py-1.5 text-base font-bold text-green-800">
              B5
            </span>
          </div>
          
          <input
            type="number"
            {...register('b5_grossTotalIncome')}
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

export default ItrFourPartBGTI;
