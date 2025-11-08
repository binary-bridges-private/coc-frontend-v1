import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation Schema
const part3TTISchema = z.object({
  // 1. Tax computation on total income
  taxPayableOnDeemedIncome115JC: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 1b. Surcharge on tax (if applicable)
  surchargeOn1a: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 1c. Health and Education Cess @ 4% on (1a + 1b)
  healthEducationCess: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 1d. Total tax payable on deemed total income (1a + 1b + 1c)
  totalTaxOnDeemedIncome: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 2. Tax payable on total income
  // 2a. Tax at normal rates as per Part B-TI
  taxAtNormalRates: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 2b. Tax at special rates (total of col. (ii) of Schedule SI)
  taxAtSpecialRates: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 2c. Rebate on agricultural income
  rebateOnAgriculturalIncome: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 2d. Tax Payable on Total Income (2a + 2b - 2c)
  taxPayableOnTotalIncome: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 3. Rebate under section 87A
  rebateUnder87A: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 4. Tax payable after rebate (2d - 3)
  taxPayableAfterRebate: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 5. Surcharge
  surchargePercent: z.enum(['', '10', '15', '25', '37'], { message: 'Select valid surcharge' }).optional(),
  surchargeAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  surchargeComputed: z.string().optional(),
  surchargeAfterMarginalRelief: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 6. Health and Education Cess @ 4% on (4 + 5vi)
  healthEducationCess2: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 7. Gross tax liability (4 + 5b + 6)
  grossTaxLiability: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 8. Gross tax payable (higher of 1d and 7)
  grossTaxPayable: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 9a. Tax on income without including ESOP perquisites u/s 17(2)(vi)
  taxWithoutESOPIncome: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 9b. Tax deferred on ESOP perquisites
  taxDeferredOnESOP: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 9c. Credit u/s 115JD
  creditUnder115JD: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 9d. Credit u/s 115JD of tax paid in earlier years
  creditUnder115JDEarlierYears: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 10. Tax payable after credit u/s 115JD (8a - 9c - 9)
  taxPayableAfterCredit: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 11. Tax relief
  section90: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  section90A: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  section91: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  totalTaxRelief: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 12. Net tax liability (10 - 11d)
  netTaxLiability: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 13. Interest and Fee payable
  interestForDefault: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  interestForDelayAdvanceTax: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  interestForDeferment: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  feeForDefaultFiling: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  feeForDefaultPAN: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  totalInterestFeePayable: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 14. Aggregate liability (12 + 13e)
  aggregateLiability: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 15. Taxes Paid
  advanceTax: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  tds: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  tcs: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  selfAssessmentTax: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  totalTaxesPaid: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 16. Amount payable (if greater than 0)
  amountPayable: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 17. Refund (if 15e is greater than 14)
  refundAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // 18. Bank account details for refund
  bankAccounts: z.array(
    z.object({
      ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code').min(1, 'IFSC required'),
      bankName: z.string().min(1, 'Bank name required'),
      accountNumber: z.string().regex(/^\d+$/, 'Invalid account number').min(1, 'Account number required'),
      accountType: z.enum(['savings', 'current'], { message: 'Select account type' }),
      selectForRefund: z.boolean().optional(),
    })
  ),
  
  // 19. Foreign bank account question
  hasForeignBankAccount: z.enum(['yes', 'no'], { message: 'Please select' }).optional(),
  foreignBankDetails: z.array(
    z.object({
      swiftCode: z.string().min(1, 'SWIFT code required'),
      bankName: z.string().min(1, 'Bank name required'),
      countryOfLocation: z.string().min(1, 'Country required'),
      iban: z.string().optional(),
    })
  ).optional(),
  
  // 20. Signing authority question
  hasSigningAuthorityInForeignAccount: z.enum(['yes', 'no'], { message: 'Please select' }).optional(),
});

type Part3TTIFormData = z.infer<typeof part3TTISchema>;

interface ItrTwoPart3TTIProps {
  onSave?: (data: Part3TTIFormData) => void;
  onBack?: () => void;
  initialData?: Partial<Part3TTIFormData>;
}

const ItrTwoPart3TTI: React.FC<ItrTwoPart3TTIProps> = ({ onSave, onBack, initialData }) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Part3TTIFormData>({
    resolver: zodResolver(part3TTISchema),
    defaultValues: initialData || {
      bankAccounts: [],
      foreignBankDetails: [],
      hasForeignBankAccount: undefined,
      hasSigningAuthorityInForeignAccount: undefined,
    },
  });

  const { fields: bankFields, append: appendBank, remove: removeBank } = useFieldArray({
    control,
    name: 'bankAccounts',
  });

  const { fields: foreignBankFields, append: appendForeignBank, remove: removeForeignBank } = useFieldArray({
    control,
    name: 'foreignBankDetails',
  });

  // Watch all relevant fields
  const taxOnDeemedIncome = watch('taxPayableOnDeemedIncome115JC');
  const surchargeOn1a = watch('surchargeOn1a');
  const healthEducationCess = watch('healthEducationCess');
  const taxAtNormalRates = watch('taxAtNormalRates');
  const taxAtSpecialRates = watch('taxAtSpecialRates');
  const rebateOnAgri = watch('rebateOnAgriculturalIncome');
  const rebate87A = watch('rebateUnder87A');
  const surchargeAmount = watch('surchargeAmount');
  const healthCess2 = watch('healthEducationCess2');
  const taxWithoutESOP = watch('taxWithoutESOPIncome');
  const taxDeferredESOP = watch('taxDeferredOnESOP');
  const credit115JD = watch('creditUnder115JD');
  const credit115JDEarlier = watch('creditUnder115JDEarlierYears');
  const section90 = watch('section90');
  const section90A = watch('section90A');
  const section91 = watch('section91');
  const interestDefault = watch('interestForDefault');
  const interestDelayAdvance = watch('interestForDelayAdvanceTax');
  const interestDeferment = watch('interestForDeferment');
  const feeDefaultFiling = watch('feeForDefaultFiling');
  const feeDefaultPAN = watch('feeForDefaultPAN');
  const advanceTax = watch('advanceTax');
  const tds = watch('tds');
  const tcs = watch('tcs');
  const selfAssessment = watch('selfAssessmentTax');
  const hasForeignBank = watch('hasForeignBankAccount');

  // Auto-calculations
  useEffect(() => {
    const parseVal = (val: string | undefined) => parseFloat(val || '0') || 0;

    // 1d. Total tax on deemed income (1a + 1b + 1c)
    const totalDeemedTax = parseVal(taxOnDeemedIncome) + parseVal(surchargeOn1a) + parseVal(healthEducationCess);
    setValue('totalTaxOnDeemedIncome', totalDeemedTax.toFixed(2));

    // 2d. Tax payable on total income (2a + 2b - 2c)
    const taxPayableTotal = parseVal(taxAtNormalRates) + parseVal(taxAtSpecialRates) - parseVal(rebateOnAgri);
    setValue('taxPayableOnTotalIncome', taxPayableTotal.toFixed(2));

    // 4. Tax payable after rebate (2d - 3)
    const taxAfterRebate = taxPayableTotal - parseVal(rebate87A);
    setValue('taxPayableAfterRebate', taxAfterRebate.toFixed(2));

    // 6. Health and Education Cess @ 4%
    const totalBeforeCess = taxAfterRebate + parseVal(surchargeAmount);
    const cess = totalBeforeCess * 0.04;
    setValue('healthEducationCess2', cess.toFixed(2));

    // 7. Gross tax liability (4 + 5b + 6)
    const grossLiability = taxAfterRebate + parseVal(surchargeAmount) + cess;
    setValue('grossTaxLiability', grossLiability.toFixed(2));

    // 8. Gross tax payable (higher of 1d and 7)
    const grossPayable = Math.max(totalDeemedTax, grossLiability);
    setValue('grossTaxPayable', grossPayable.toFixed(2));

    // 10. Tax payable after credit (8 - 9c - 9d)
    const taxAfterCredit = grossPayable - parseVal(credit115JD) - parseVal(credit115JDEarlier);
    setValue('taxPayableAfterCredit', taxAfterCredit.toFixed(2));

    // 11d. Total tax relief
    const totalRelief = parseVal(section90) + parseVal(section90A) + parseVal(section91);
    setValue('totalTaxRelief', totalRelief.toFixed(2));

    // 12. Net tax liability (10 - 11d)
    const netLiability = taxAfterCredit - totalRelief;
    setValue('netTaxLiability', netLiability.toFixed(2));

    // 13e. Total interest and fee payable
    const totalInterestFee = parseVal(interestDefault) + parseVal(interestDelayAdvance) + 
                             parseVal(interestDeferment) + parseVal(feeDefaultFiling) + parseVal(feeDefaultPAN);
    setValue('totalInterestFeePayable', totalInterestFee.toFixed(2));

    // 14. Aggregate liability (12 + 13e)
    const aggregateLib = netLiability + totalInterestFee;
    setValue('aggregateLiability', aggregateLib.toFixed(2));

    // 15e. Total taxes paid
    const totalPaid = parseVal(advanceTax) + parseVal(tds) + parseVal(tcs) + parseVal(selfAssessment);
    setValue('totalTaxesPaid', totalPaid.toFixed(2));

    // 16. Amount payable (if aggregate > total paid)
    const payable = aggregateLib - totalPaid;
    if (payable > 0) {
      setValue('amountPayable', payable.toFixed(2));
      setValue('refundAmount', '0.00');
    } else {
      setValue('amountPayable', '0.00');
      // 17. Refund (if total paid > aggregate)
      setValue('refundAmount', Math.abs(payable).toFixed(2));
    }
  }, [
    taxOnDeemedIncome, surchargeOn1a, healthEducationCess, taxAtNormalRates, taxAtSpecialRates,
    rebateOnAgri, rebate87A, surchargeAmount, credit115JD, credit115JDEarlier,
    section90, section90A, section91, interestDefault, interestDelayAdvance, interestDeferment,
    feeDefaultFiling, feeDefaultPAN, advanceTax, tds, tcs, selfAssessment, setValue
  ]);

  const onSubmit = (data: Part3TTIFormData) => {
    console.log('Part III - TTI Data:', data);
    onSave?.(data);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Part B - TTI</h2>
          <p className="mt-1 text-sm text-gray-600">Computation of tax liability on total income</p>
        </div>

        {/* Section 1: Tax on Deemed Income (115JC) */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">1. Tax Payable on Deemed Total Income u/s 115JC</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">1a. Tax payable on deemed total income u/s 115JC (if applicable)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('taxPayableOnDeemedIncome115JC')}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">1b. Surcharge on (a) (if applicable)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('surchargeOn1a')}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">1c. Health and Education Cess @ 4% on (1a + 1b) above</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('healthEducationCess')}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">1d. Total tax payable on deemed total income (1a + 1b + 1c)</label>
                <input
                  type="text"
                  {...register('totalTaxOnDeemedIncome')}
                  readOnly
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Tax Payable on Total Income */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">2. Tax Payable on Total Income</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">2a. Tax at normal rates as per Part B-TI</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('taxAtNormalRates')}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">2b. Tax at special rates (total of col. (ii) of Schedule SI)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('taxAtSpecialRates')}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">2c. Rebate on agricultural income (applicable if (12-13) exceeds maximum amount not chargeable to tax)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('rebateOnAgriculturalIncome')}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">2d. Tax Payable on Total Income (2a + 2b - 2c)</label>
                <input
                  type="text"
                  {...register('taxPayableOnTotalIncome')}
                  readOnly
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3-4: Rebate and Tax After Rebate */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">3-4. Rebate Under Section 87A</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">3. Rebate under section 87A</label>
              <input
                type="number"
                step="0.01"
                {...register('rebateUnder87A')}
                placeholder="0.00"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">4. Tax payable after rebate (2d - 3)</label>
              <input
                type="text"
                {...register('taxPayableAfterRebate')}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Surcharge */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">5. Surcharge</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Surcharge Rate</label>
                <select
                  {...register('surchargePercent')}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select rate</option>
                  <option value="10">@ 10% if taxable income &gt; Rs. 50 lakh</option>
                  <option value="15">@ 15% if taxable income &gt; Rs. 1 crore</option>
                  <option value="25">@ 25% (applicable to certain cases)</option>
                  <option value="37">@ 37% (refer instructions)</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Surcharge Computed</label>
                <input
                  type="text"
                  {...register('surchargeComputed')}
                  placeholder="Auto-calculated or manual"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Surcharge after Marginal Relief</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('surchargeAfterMarginalRelief')}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">5b. Final Surcharge Amount (used in calculations)</label>
              <input
                type="number"
                step="0.01"
                {...register('surchargeAmount')}
                placeholder="0.00"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 6-8: Cess and Gross Tax */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">6-8. Health & Education Cess and Gross Tax</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">6. Health and Education Cess @ 4% (on 4 + 5vi)</label>
              <input
                type="text"
                {...register('healthEducationCess2')}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">7. Gross tax liability (4 + 5b + 6)</label>
              <input
                type="text"
                {...register('grossTaxLiability')}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">8. Gross tax payable (higher of 1d and 7)</label>
              <input
                type="text"
                {...register('grossTaxPayable')}
                readOnly
                className="w-full rounded-lg border border-green-500 bg-green-50 px-3 py-2 text-lg font-bold text-green-700"
              />
            </div>
          </div>
        </div>

        {/* Section 9: ESOP and Credits */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">9. Tax on Income without ESOP & Credits</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">9a. Tax on income without including income on perquisites referred in section 17(2)(vi) received from employer, being an eligible start-up referred in section 80-IAC (8a-8b)</label>
              <input
                type="number"
                step="0.01"
                {...register('taxWithoutESOPIncome')}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">9b. Tax deferred - relatable to income on perquisites referred in section 17(2)(vi) received from employer, being an eligible start-up referred in section 80-IAC</label>
              <input
                type="number"
                step="0.01"
                {...register('taxDeferredOnESOP')}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">9c. Credit u/s 115JD of tax paid in earlier years (applicable only if 7a is higher than 1d from 5 of Part B-TI) (credit restricted to positive amount not chargeable to tax)</label>
              <input
                type="number"
                step="0.01"
                {...register('creditUnder115JD')}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">9d. Credit u/s 115JD of tax paid in earlier years</label>
              <input
                type="number"
                step="0.01"
                {...register('creditUnder115JDEarlierYears')}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">10. Tax payable after credit u/s 115JD (8a - 9c - 9)</label>
            <input
              type="text"
              {...register('taxPayableAfterCredit')}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-sm font-semibold"
            />
          </div>
        </div>

        {/* Section 11: Tax Relief */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">11. Tax Relief</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">11a. Section 89 (Please ensure to submit Form 10E)</label>
              <input
                type="number"
                step="0.01"
                {...register('section90')}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">11b. Section 90/90A (2 of Schedule TR)</label>
              <input
                type="number"
                step="0.01"
                {...register('section90A')}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">11c. Section 91 (3 of Schedule TR)</label>
              <input
                type="number"
                step="0.01"
                {...register('section91')}
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">11d. Total (11a + 11b + 11c)</label>
              <input
                type="text"
                {...register('totalTaxRelief')}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-sm font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Section 12: Net Tax Liability */}
        <div className="border border-green-600 rounded-lg p-5 bg-green-50">
          <h3 className="text-lg font-semibold text-green-800 mb-4">12. Net Tax Liability (10 - 11d) (enter zero if negative)</h3>
          <input
            type="text"
            {...register('netTaxLiability')}
            readOnly
            className="w-full px-3 py-2 border border-green-600 rounded bg-green-100 text-lg font-bold text-green-800"
          />
        </div>

        {/* Section 13: Interest and Fee Payable */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">13. Interest and Fee Payable</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">13a. Interest for default in furnishing the return (section 234A)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('interestForDefault')}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">13b. Interest for default in payment of advance tax (section 234B)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('interestForDelayAdvanceTax')}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">13c. Interest for deferment of advance tax (section 234C)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('interestForDeferment')}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">13d. Fee for default in furnishing return of income (section 234F)</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('feeForDefaultFiling')}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">13d2. Fee for default in furnishing return of income without PAN</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('feeForDefaultPAN')}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">13e. Total Interest and Fee Payable (13a+13b+13c+13d)</label>
                <input
                  type="text"
                  {...register('totalInterestFeePayable')}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-sm font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 14: Aggregate Liability */}
        <div className="border border-red-600 rounded-lg p-5 bg-red-50">
          <h3 className="text-lg font-semibold text-red-800 mb-4">14. Aggregate Liability (12 + 13e)</h3>
          <input
            type="text"
            {...register('aggregateLiability')}
            readOnly
            className="w-full px-3 py-2 border border-red-600 rounded bg-red-100 text-lg font-bold text-red-800"
          />
        </div>

        {/* Section 15: Taxes Paid */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">15. Taxes Paid</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">15a. Advance Tax (from column 3 of 2(A))</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('advanceTax')}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">15b. TDS (total of column 5 of 2(B) and column 9 of 2(C))</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('tds')}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">15c. TCS (total of column 7(i) of 2(D))</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('tcs')}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">15d. Self-Assessment Tax (from column 3 of 2(A))</label>
                <input
                  type="number"
                  step="0.01"
                  {...register('selfAssessmentTax')}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">15e. Total Taxes Paid (15a + 15b + 15c + 15d)</label>
              <input
                type="text"
                {...register('totalTaxesPaid')}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-sm font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Section 16-17: Amount Payable or Refund */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-orange-600 rounded-lg p-5 bg-orange-50">
            <h3 className="text-lg font-semibold text-orange-800 mb-4">16. Amount Payable (if greater than 0) (14-15e, after 0)</h3>
            <input
              type="text"
              {...register('amountPayable')}
              readOnly
              className="w-full px-3 py-2 border border-orange-600 rounded bg-orange-100 text-lg font-bold text-orange-800"
            />
          </div>
          <div className="border border-green-600 rounded-lg p-5 bg-green-50">
            <h3 className="text-lg font-semibold text-green-800 mb-4">17. Refund (if 15e is greater than 14) (Refund, if any, will be directly credited into the bank account)</h3>
            <input
              type="text"
              {...register('refundAmount')}
              readOnly
              className="w-full px-3 py-2 border border-green-600 rounded bg-green-100 text-lg font-bold text-green-800"
            />
          </div>
        </div>

        {/* Section 18: Bank Accounts for Refund */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">18. Bank Account in India (Non-Residents claiming refund with no bank account in India may not fill this) (Select No)</h3>
            <button
              type="button"
              onClick={() => appendBank({ ifscCode: '', bankName: '', accountNumber: '', accountType: 'savings', selectForRefund: false })}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              + Add Bank Account
            </button>
          </div>
          <p className="text-xs text-gray-600 mb-4">
            Note: 1. All bank accounts held at any time during the previous year may be reported, except dormant A/c.
            <br />2. In case multiple accounts are selected, the refund will be credited to one of the validated accounts after processing the return.
          </p>
          {bankFields.length === 0 && (
            <p className="text-sm text-gray-500 italic">No bank accounts added yet.</p>
          )}
          <div className="space-y-4">
            {bankFields.map((field, idx) => (
              <div key={field.id} className="p-4 bg-white border border-gray-300 rounded">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-700">Bank Account #{idx + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeBank(idx)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">IFSC Code *</label>
                    <input
                      type="text"
                      {...register(`bankAccounts.${idx}.ifscCode`)}
                      placeholder="e.g., SBIN0001234"
                      maxLength={11}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm uppercase"
                    />
                    {errors.bankAccounts?.[idx]?.ifscCode && (
                      <p className="text-red-600 text-xs mt-1">{errors.bankAccounts[idx]?.ifscCode?.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Name of the Bank *</label>
                    <input
                      type="text"
                      {...register(`bankAccounts.${idx}.bankName`)}
                      placeholder="Bank name"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    {errors.bankAccounts?.[idx]?.bankName && (
                      <p className="text-red-600 text-xs mt-1">{errors.bankAccounts[idx]?.bankName?.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Account Number *</label>
                    <input
                      type="text"
                      {...register(`bankAccounts.${idx}.accountNumber`)}
                      placeholder="Account number"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    {errors.bankAccounts?.[idx]?.accountNumber && (
                      <p className="text-red-600 text-xs mt-1">{errors.bankAccounts[idx]?.accountNumber?.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Account Type *</label>
                    <select
                      {...register(`bankAccounts.${idx}.accountType`)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="savings">Savings</option>
                      <option value="current">Current</option>
                    </select>
                  </div>
                  <div className="flex items-center md:col-span-4">
                    <input
                      type="checkbox"
                      {...register(`bankAccounts.${idx}.selectForRefund`)}
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700">Select for refund (tick on first year account or e-filing utility)</label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 19: Foreign Bank Account */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">19. Do you have a bank account in India? (Non-Residents claiming refund with no bank account in India may, at their option, furnish the details of one foreign bank account)</h3>
          <div className="flex gap-6 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                {...register('hasForeignBankAccount')}
                value="yes"
                className="mr-2"
              />
              <span className="text-sm">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                {...register('hasForeignBankAccount')}
                value="no"
                className="mr-2"
              />
              <span className="text-sm">No</span>
            </label>
          </div>

          {hasForeignBank === 'yes' && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-gray-700">Rows can be added as required</p>
                <button
                  type="button"
                  onClick={() => appendForeignBank({ swiftCode: '', bankName: '', countryOfLocation: '', iban: '' })}
                  className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                >
                  + Add Foreign Bank
                </button>
              </div>
              <div className="space-y-3">
                {foreignBankFields.map((field, idx) => (
                  <div key={field.id} className="p-3 bg-white border border-gray-300 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="text-sm font-medium text-gray-700">Foreign Bank #{idx + 1}</h5>
                      <button
                        type="button"
                        onClick={() => removeForeignBank(idx)}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                      <input
                        type="text"
                        {...register(`foreignBankDetails.${idx}.swiftCode`)}
                        placeholder="SWIFT Code"
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <input
                        type="text"
                        {...register(`foreignBankDetails.${idx}.bankName`)}
                        placeholder="Bank Name"
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <input
                        type="text"
                        {...register(`foreignBankDetails.${idx}.countryOfLocation`)}
                        placeholder="Country"
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <input
                        type="text"
                        {...register(`foreignBankDetails.${idx}.iban`)}
                        placeholder="IBAN (optional)"
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 20: Signing Authority */}
        <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">20. Do you at any time during the previous year:</h3>
          <p className="text-sm text-gray-700 mb-3">
            (a) hold, as a beneficial owner, beneficiary or otherwise, any asset (including financial interest in any entity) located outside India; or
            <br />(b) have signing authority in any account located outside India; or
            <br />(c) have signing authority in any account located outside India?
            <br />(applicable only in case of a resident) (if answer Schedule-FA is filled up if the answer is Yes)
          </p>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                {...register('hasSigningAuthorityInForeignAccount')}
                value="yes"
                className="mr-2"
              />
              <span className="text-sm">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                {...register('hasSigningAuthorityInForeignAccount')}
                value="no"
                className="mr-2"
              />
              <span className="text-sm">No</span>
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={() => console.log('Current form data:', watch())}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Preview Data
          </button>
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

export default ItrTwoPart3TTI;
