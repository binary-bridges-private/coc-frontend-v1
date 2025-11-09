import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define the schema for Part D - Tax Computations and Tax Status
const partDTaxComputationsSchema = z.object({
  // D1: Tax payable on total income (C20)
  d1_taxPayableOnTotalIncome: z.string().optional().or(z.literal('')),
  
  // D2: Rebate on 87A
  d2_rebateOn87A: z.string().optional().or(z.literal('')),
  
  // D3: Tax payable after Rebate (D1-D2)
  d3_taxPayableAfterRebate: z.string().optional().or(z.literal('')),
  
  // D4: Health and Education Cess @ 4% on (D3)
  d4_healthEducationCess: z.string().optional().or(z.literal('')),
  
  // D5: Total Tax, and Cess (D3+D4)
  d5_totalTaxAndCess: z.string().optional().or(z.literal('')),
  
  // D6: Relief u/s 89
  d6_reliefU89: z.string().optional().or(z.literal('')),
  
  // D7: Balance Tax after Relief (D5 - D6)
  d7_balanceTaxAfterRelief: z.string().optional().or(z.literal('')),
  
  // D8: Total Interest u/s 234A
  d8_totalInterestU234A: z.string().optional().or(z.literal('')),
  
  // D9: Total Interest u/s 234B
  d9_totalInterestU234B: z.string().optional().or(z.literal('')),
  
  // D10: Total Interest u/s 234C
  d10_totalInterestU234C: z.string().optional().or(z.literal('')),
  
  // D11: Fee u/s 234F
  d11_feeU234F: z.string().optional().or(z.literal('')),
  
  // D12: Total Tax, Fee and Interest (D7+ D8 + D9 + D10 + D11)
  d12_totalTaxFeeInterest: z.string().optional().or(z.literal('')),
  
  // D13: Total Advance Tax Paid
  d13_totalAdvanceTaxPaid: z.string().optional().or(z.literal('')),
  
  // D14: Total Self-Assessment Tax Paid
  d14_totalSelfAssessmentTaxPaid: z.string().optional().or(z.literal('')),
  
  // D15: Total TDS Claimed
  d15_totalTDSClaimed: z.string().optional().or(z.literal('')),
  
  // D16: Total TCS Collected
  d16_totalTCSCollected: z.string().optional().or(z.literal('')),
  
  // D17: Total Taxes Paid (D13+ D14 + D15 + D16)
  d17_totalTaxesPaid: z.string().optional().or(z.literal('')),
  
  // D18: Amount payable (D12 - D17) [If D12 > D17]
  d18_amountPayable: z.string().optional().or(z.literal('')),
  
  // D19: Refund (D17 - D12) [If D17 > D12]
  d19_refund: z.string().optional().or(z.literal('')),
  
  // D20: Exempt income only for reporting purposes
  d20_exemptIncomeForReporting: z.string().optional().or(z.literal('')),
  
  // D21: Income on which no tax is payable - Long Term capital gains under section 112A
  d21_totalSaleConsideration: z.string().optional().or(z.literal('')),
  d21_totalCostAcquisition: z.string().optional().or(z.literal('')),
  d21_longTermCapitalGains: z.string().optional().or(z.literal('')),
  
  // D21: Details of all Bank Accounts (excluding dormant accounts)
  d21_bankAccounts: z.array(z.object({
    sl: z.string().optional().or(z.literal('')),
    ifscCode: z.string().optional().or(z.literal('')),
    bankName: z.string().optional().or(z.literal('')),
    accountNumber: z.string().optional().or(z.literal('')),
    accountType: z.string().optional().or(z.literal('')),
    selectForRefund: z.enum(['yes', 'no']).optional().or(z.literal('')),
  })).optional(),
}).superRefine((data, ctx) => {
  // Validate numeric fields when provided
  const numericFields = [
    { field: data.d1_taxPayableOnTotalIncome, path: 'd1_taxPayableOnTotalIncome', name: 'Tax payable on total income' },
    { field: data.d2_rebateOn87A, path: 'd2_rebateOn87A', name: 'Rebate on 87A' },
    { field: data.d6_reliefU89, path: 'd6_reliefU89', name: 'Relief u/s 89' },
    { field: data.d8_totalInterestU234A, path: 'd8_totalInterestU234A', name: 'Interest u/s 234A' },
    { field: data.d9_totalInterestU234B, path: 'd9_totalInterestU234B', name: 'Interest u/s 234B' },
    { field: data.d10_totalInterestU234C, path: 'd10_totalInterestU234C', name: 'Interest u/s 234C' },
    { field: data.d11_feeU234F, path: 'd11_feeU234F', name: 'Fee u/s 234F' },
    { field: data.d13_totalAdvanceTaxPaid, path: 'd13_totalAdvanceTaxPaid', name: 'Total Advance Tax Paid' },
    { field: data.d14_totalSelfAssessmentTaxPaid, path: 'd14_totalSelfAssessmentTaxPaid', name: 'Total Self-Assessment Tax Paid' },
    { field: data.d15_totalTDSClaimed, path: 'd15_totalTDSClaimed', name: 'Total TDS Claimed' },
    { field: data.d16_totalTCSCollected, path: 'd16_totalTCSCollected', name: 'Total TCS Collected' },
    { field: data.d20_exemptIncomeForReporting, path: 'd20_exemptIncomeForReporting', name: 'Exempt income' },
    { field: data.d21_totalSaleConsideration, path: 'd21_totalSaleConsideration', name: 'Total sale consideration' },
    { field: data.d21_totalCostAcquisition, path: 'd21_totalCostAcquisition', name: 'Total cost of acquisition' },
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

export type PartDTaxComputationsFormData = z.infer<typeof partDTaxComputationsSchema>;

interface ItrFourPartDTaxComputationsProps {
  onNext: () => void;
  onBack: () => void;
  initialData?: Partial<PartDTaxComputationsFormData>;
  onSave?: (data: PartDTaxComputationsFormData) => void;
  taxableTotalIncome?: string;
}

const ItrFourPartDTaxComputations: React.FC<ItrFourPartDTaxComputationsProps> = ({
  onNext,
  onBack,
  initialData,
  onSave,
  taxableTotalIncome = '0',
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PartDTaxComputationsFormData>({
    resolver: zodResolver(partDTaxComputationsSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: PartDTaxComputationsFormData) => {
    if (onSave) {
      onSave(data);
    }
    onNext();
  };

  const handleSaveProgress = () => {
    const data = watch();
    if (onSave) {
      onSave(data as PartDTaxComputationsFormData);
    }
  };

  // Auto-calculate D3: Tax payable after Rebate (D1-D2)
  React.useEffect(() => {
    const d1 = parseFloat(watch('d1_taxPayableOnTotalIncome') || '0');
    const d2 = parseFloat(watch('d2_rebateOn87A') || '0');
    
    const d3 = Math.max(0, d1 - d2);
    setValue('d3_taxPayableAfterRebate', d3.toFixed(2));
  }, [watch('d1_taxPayableOnTotalIncome'), watch('d2_rebateOn87A'), setValue, watch]);

  // Auto-calculate D4: Health and Education Cess @ 4% on (D3)
  React.useEffect(() => {
    const d3 = parseFloat(watch('d3_taxPayableAfterRebate') || '0');
    const d4 = d3 * 0.04;
    setValue('d4_healthEducationCess', d4.toFixed(2));
  }, [watch('d3_taxPayableAfterRebate'), setValue, watch]);

  // Auto-calculate D5: Total Tax and Cess (D3+D4)
  React.useEffect(() => {
    const d3 = parseFloat(watch('d3_taxPayableAfterRebate') || '0');
    const d4 = parseFloat(watch('d4_healthEducationCess') || '0');
    const d5 = d3 + d4;
    setValue('d5_totalTaxAndCess', d5.toFixed(2));
  }, [watch('d3_taxPayableAfterRebate'), watch('d4_healthEducationCess'), setValue, watch]);

  // Auto-calculate D7: Balance Tax after Relief (D5 - D6)
  React.useEffect(() => {
    const d5 = parseFloat(watch('d5_totalTaxAndCess') || '0');
    const d6 = parseFloat(watch('d6_reliefU89') || '0');
    const d7 = Math.max(0, d5 - d6);
    setValue('d7_balanceTaxAfterRelief', d7.toFixed(2));
  }, [watch('d5_totalTaxAndCess'), watch('d6_reliefU89'), setValue, watch]);

  // Auto-calculate D12: Total Tax, Fee and Interest (D7+ D8 + D9 + D10 + D11)
  React.useEffect(() => {
    const d7 = parseFloat(watch('d7_balanceTaxAfterRelief') || '0');
    const d8 = parseFloat(watch('d8_totalInterestU234A') || '0');
    const d9 = parseFloat(watch('d9_totalInterestU234B') || '0');
    const d10 = parseFloat(watch('d10_totalInterestU234C') || '0');
    const d11 = parseFloat(watch('d11_feeU234F') || '0');
    
    const d12 = d7 + d8 + d9 + d10 + d11;
    setValue('d12_totalTaxFeeInterest', d12.toFixed(2));
  }, [
    watch('d7_balanceTaxAfterRelief'),
    watch('d8_totalInterestU234A'),
    watch('d9_totalInterestU234B'),
    watch('d10_totalInterestU234C'),
    watch('d11_feeU234F'),
    setValue,
    watch,
  ]);

  // Auto-calculate D17: Total Taxes Paid (D13+ D14 + D15 + D16)
  React.useEffect(() => {
    const d13 = parseFloat(watch('d13_totalAdvanceTaxPaid') || '0');
    const d14 = parseFloat(watch('d14_totalSelfAssessmentTaxPaid') || '0');
    const d15 = parseFloat(watch('d15_totalTDSClaimed') || '0');
    const d16 = parseFloat(watch('d16_totalTCSCollected') || '0');
    
    const d17 = d13 + d14 + d15 + d16;
    setValue('d17_totalTaxesPaid', d17.toFixed(2));
  }, [
    watch('d13_totalAdvanceTaxPaid'),
    watch('d14_totalSelfAssessmentTaxPaid'),
    watch('d15_totalTDSClaimed'),
    watch('d16_totalTCSCollected'),
    setValue,
    watch,
  ]);

  // Auto-calculate D18: Amount payable and D19: Refund
  React.useEffect(() => {
    const d12 = parseFloat(watch('d12_totalTaxFeeInterest') || '0');
    const d17 = parseFloat(watch('d17_totalTaxesPaid') || '0');
    
    if (d12 > d17) {
      setValue('d18_amountPayable', (d12 - d17).toFixed(2));
      setValue('d19_refund', '0.00');
    } else {
      setValue('d18_amountPayable', '0.00');
      setValue('d19_refund', (d17 - d12).toFixed(2));
    }
  }, [watch('d12_totalTaxFeeInterest'), watch('d17_totalTaxesPaid'), setValue, watch]);

  // Auto-calculate D21: Long Term Capital Gains
  React.useEffect(() => {
    const saleConsideration = parseFloat(watch('d21_totalSaleConsideration') || '0');
    const costAcquisition = parseFloat(watch('d21_totalCostAcquisition') || '0');
    const gains = Math.max(0, saleConsideration - costAcquisition);
    setValue('d21_longTermCapitalGains', gains.toFixed(2));
  }, [watch('d21_totalSaleConsideration'), watch('d21_totalCostAcquisition'), setValue, watch]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-xl border border-gray-200 bg-gradient-to-r from-orange-50 to-red-50 p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Part D - Tax Computations and Tax Status
        </h2>
        <p className="text-sm text-gray-600">
          Calculate tax liability, interest, fees, and determine refund or amount payable
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

        {/* Taxable Total Income Reference */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">Taxable Total Income (from Part C)</p>
              <p className="text-xs text-blue-700">This is the income on which tax will be calculated</p>
            </div>
            <p className="text-2xl font-bold text-blue-900">₹ {parseFloat(taxableTotalIncome || '0').toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Tax Computation Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Tax Computation</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  D1: Tax payable on total income (C20)
                </label>
                <input
                  type="number"
                  {...register('d1_taxPayableOnTotalIncome')}
                  placeholder="0"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.d1_taxPayableOnTotalIncome && (
                  <p className="mt-1 text-xs text-red-600">{errors.d1_taxPayableOnTotalIncome.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  D2: Rebate on 87A
                </label>
                <input
                  type="number"
                  {...register('d2_rebateOn87A')}
                  placeholder="0"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.d2_rebateOn87A && (
                  <p className="mt-1 text-xs text-red-600">{errors.d2_rebateOn87A.message}</p>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                D3: Tax payable after Rebate (D1-D2)
              </label>
              <input
                type="number"
                {...register('d3_taxPayableAfterRebate')}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-900"
              />
            </div>

            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                D4: Health and Education Cess @ 4% on (D3)
              </label>
              <input
                type="number"
                {...register('d4_healthEducationCess')}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-900"
              />
            </div>

            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                D5: Total Tax, and Cess (D3+D4)
              </label>
              <input
                type="number"
                {...register('d5_totalTaxAndCess')}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-900"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                D6: Relief u/s 89 (Please ensure to submit Form 10E to claim this relief)
              </label>
              <input
                type="number"
                {...register('d6_reliefU89')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.d6_reliefU89 && (
                <p className="mt-1 text-xs text-red-600">{errors.d6_reliefU89.message}</p>
              )}
            </div>

            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                D7: Balance Tax after Relief (D5 - D6)
              </label>
              <input
                type="number"
                {...register('d7_balanceTaxAfterRelief')}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Interest and Fees Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Interest and Fees</h3>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                D8: Total Interest u/s 234A
              </label>
              <input
                type="number"
                {...register('d8_totalInterestU234A')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                D9: Total Interest u/s 234B
              </label>
              <input
                type="number"
                {...register('d9_totalInterestU234B')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                D10: Total Interest u/s 234C
              </label>
              <input
                type="number"
                {...register('d10_totalInterestU234C')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                D11: Fee u/s 234F
              </label>
              <input
                type="number"
                {...register('d11_feeU234F')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-purple-200 bg-purple-50 p-4">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              D12: Total Tax, Fee and Interest (D7+ D8 + D9 + D10 + D11)
            </label>
            <input
              type="number"
              {...register('d12_totalTaxFeeInterest')}
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-900"
            />
          </div>
        </div>

        {/* Tax Payments Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Tax Payments</h3>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                D13: Total Advance Tax Paid
              </label>
              <input
                type="number"
                {...register('d13_totalAdvanceTaxPaid')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                D14: Total Self-Assessment Tax Paid
              </label>
              <input
                type="number"
                {...register('d14_totalSelfAssessmentTaxPaid')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                D15: Total TDS Claimed
              </label>
              <p className="mb-1.5 text-xs text-gray-600">
                (total of column 4 of Schedule-TDS1 and, column 6 of Schedule-TDS2)
              </p>
              <input
                type="number"
                {...register('d15_totalTDSClaimed')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                D16: Total TCS Collected
              </label>
              <p className="mb-1.5 text-xs text-gray-600">
                (total of column (5) of Schedule-TCS)
              </p>
              <input
                type="number"
                {...register('d16_totalTCSCollected')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-purple-200 bg-purple-50 p-4">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              D17: Total Taxes Paid (D13+ D14 + D15 + D16)
            </label>
            <input
              type="number"
              {...register('d17_totalTaxesPaid')}
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-900"
            />
          </div>
        </div>

        {/* Final Tax Status */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border-2 border-red-300 bg-gradient-to-r from-red-50 to-pink-50 p-6 shadow-md">
            <h3 className="mb-2 text-lg font-bold text-gray-900">
              D18: Amount payable (If D12 {">"} D17)
            </h3>
            <input
              type="number"
              {...register('d18_amountPayable')}
              readOnly
              className="w-full rounded-lg border-2 border-red-300 bg-white px-4 py-3 text-lg font-bold text-red-900"
            />
          </div>

          <div className="rounded-xl border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-md">
            <h3 className="mb-2 text-lg font-bold text-gray-900">
              D19: Refund (If D17 {">"} D12)
            </h3>
            <input
              type="number"
              {...register('d19_refund')}
              readOnly
              className="w-full rounded-lg border-2 border-green-300 bg-white px-4 py-3 text-lg font-bold text-green-900"
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Additional Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                D20: Exempt income only for reporting purposes (If agricultural income is more than Rs. 5,000/-, use ITR 3/5) and Income on which no tax is payable
              </label>
              <p className="mb-2 text-xs text-gray-600">
                (Keep down to be provided in e-filing utility mentioning nature of exempt income, relevant clause and section)
              </p>
              <input
                type="number"
                {...register('d20_exemptIncomeForReporting')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h4 className="mb-3 text-sm font-semibold text-gray-900">
                D21: Income on which no tax is payable:
              </h4>
              <p className="mb-3 text-xs text-gray-700">
                Long Term capital gains under section 112A not chargeable to Income-tax
              </p>
              
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">
                      i. Total sale consideration
                    </label>
                    <input
                      type="number"
                      {...register('d21_totalSaleConsideration')}
                      placeholder="0"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-700">
                      ii. Total cost of acquisition
                    </label>
                    <input
                      type="number"
                      {...register('d21_totalCostAcquisition')}
                      placeholder="0"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    iii. Long term capital gains as per section 112A
                  </label>
                  <input
                    type="number"
                    {...register('d21_longTermCapitalGains')}
                    readOnly
                    className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* D21: Bank Accounts Details */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900">
              D21 Details of all Bank Accounts held in India at any time during the previous year (excluding dormant accounts)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold text-gray-700">SL</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold text-gray-700">IFS Code of the Bank</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold text-gray-700">Name of the Bank</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold text-gray-700">Account Number</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold text-gray-700">Type of bank account</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold text-gray-700">
                    Select Account for Refund Credit
                    <div className="text-xs font-normal text-gray-600">(Dropdown to be provided by E-filing utility)</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="i"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="IFS Code"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Bank Name"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Account Number"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Account Type"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none">
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="ii"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="IFS Code"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Bank Name"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Account Number"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Account Type"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none">
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-gray-700">
            <p>1. All bank accounts held at any time are to be reported, except dormant A/c.</p>
            <p>2. Minimum one account has to be selected for refund credit.</p>
            <p>3. In case multiple accounts are selected, refund will be credited to one of the validated accounts decided by CPC after processing the return.</p>
          </div>
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

export default ItrFourPartDTaxComputations;
