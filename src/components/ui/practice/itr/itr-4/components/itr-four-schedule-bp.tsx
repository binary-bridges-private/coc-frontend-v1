import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define the schema for Schedule BP - Business/Profession Income
const scheduleBPSchema = z.object({
  // E1: Gross Turnover/Gross Receipts under section 44AD
  e1_nameOfBusiness: z.string().optional().or(z.literal('')),
  e1_businessCode: z.string().optional().or(z.literal('')),
  e1_description: z.string().optional().or(z.literal('')),
  e1_grossTurnover: z.string().optional().or(z.literal('')),
  e1a_throughElectronic: z.string().optional().or(z.literal('')),
  e1b_receiptsInCash: z.string().optional().or(z.literal('')),
  e1c_anyModeOtherThanAB: z.string().optional().or(z.literal('')),
  
  // E2: Presumptive Income under section 44AD
  e2_presumptiveIncome: z.string().optional().or(z.literal('')),
  e2a_6percentOrClaimed: z.string().optional().or(z.literal('')),
  e2b_8percentOrClaimed: z.string().optional().or(z.literal('')),
  e2c_total: z.string().optional().or(z.literal('')),
  
  // E3: Gross Receipts under section 44ADA (Professionals)
  e3_nameOfBusiness: z.string().optional().or(z.literal('')),
  e3_businessCode: z.string().optional().or(z.literal('')),
  e3_description: z.string().optional().or(z.literal('')),
  e3_grossReceipts: z.string().optional().or(z.literal('')),
  e3a_throughElectronic: z.string().optional().or(z.literal('')),
  e3b_receiptsInCash: z.string().optional().or(z.literal('')),
  e3c_anyModeOtherThanAB: z.string().optional().or(z.literal('')),
  
  // E4: Presumptive Income under section 44ADA (50% of E3)
  e4_presumptiveIncome: z.string().optional().or(z.literal('')),
  
  // E5: Presumptive Income from Goods Carriage under section 44AE
  e5_goodsCarriageRows: z.array(z.object({
    registration: z.string().optional().or(z.literal('')),
    ownedLeased: z.string().optional().or(z.literal('')),
    tonnageCapacity: z.string().optional().or(z.literal('')),
    monthsOwned: z.string().optional().or(z.literal('')),
    presumptiveIncome: z.string().optional().or(z.literal('')),
  })).optional(),
  e5_total: z.string().optional().or(z.literal('')),
  
  // E6: Salary and interest paid to partners
  e6_salaryInterestPartners: z.string().optional().or(z.literal('')),
  
  // E7: Presumptive Income u/s 44AE (E5-E6)
  e7_presumptiveIncome: z.string().optional().or(z.literal('')),
  
  // E8: Income chargeable under the head 'Business or Profession'
  e8_incomeChargeable: z.string().optional().or(z.literal('')),
  
  // E9: GSTIN No(s)
  e9_gstinNumbers: z.string().optional().or(z.literal('')),
  
  // E10: Annual value of outward supplies as per GST returns
  e10_annualValueOutward: z.string().optional().or(z.literal('')),
  
  // Financial Particulars (E11-E25)
  e11_partnersCapital: z.string().optional().or(z.literal('')),
  e12_securedLoans: z.string().optional().or(z.literal('')),
  e13_unsecuredLoans: z.string().optional().or(z.literal('')),
  e14_advances: z.string().optional().or(z.literal('')),
  e15_sundryCreditors: z.string().optional().or(z.literal('')),
  e16_otherLiabilities: z.string().optional().or(z.literal('')),
  e17_totalCapitalLiabilities: z.string().optional().or(z.literal('')),
  e18_fixedAssets: z.string().optional().or(z.literal('')),
  e19_inventories: z.string().optional().or(z.literal('')),
  e20_sundryDebtors: z.string().optional().or(z.literal('')),
  e21_balanceWithBanks: z.string().optional().or(z.literal('')),
  e22_cashInHand: z.string().optional().or(z.literal('')),
  e23_loansAdvances: z.string().optional().or(z.literal('')),
  e24_otherAssets: z.string().optional().or(z.literal('')),
  e25_totalAssets: z.string().optional().or(z.literal('')),
}).superRefine((data, ctx) => {
  // Validate numeric fields when provided
  const numericFields = [
    { field: data.e1_grossTurnover, path: 'e1_grossTurnover', name: 'Gross Turnover' },
    { field: data.e2_presumptiveIncome, path: 'e2_presumptiveIncome', name: 'Presumptive Income' },
    { field: data.e3_grossReceipts, path: 'e3_grossReceipts', name: 'Gross Receipts' },
    { field: data.e4_presumptiveIncome, path: 'e4_presumptiveIncome', name: 'Presumptive Income (44ADA)' },
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

export type ScheduleBPFormData = z.infer<typeof scheduleBPSchema>;

interface ScheduleBPProps {
  onNext: () => void;
  onBack: () => void;
  onSave?: (data: ScheduleBPFormData) => void;
  initialData?: Partial<ScheduleBPFormData>;
}

const ItrFourScheduleBP: React.FC<ScheduleBPProps> = ({
  onNext,
  onBack,
  onSave,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ScheduleBPFormData>({
    resolver: zodResolver(scheduleBPSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: ScheduleBPFormData) => {
    if (onSave) {
      onSave(data);
    }
    onNext();
  };

  const handleSaveProgress = () => {
    const data = watch();
    if (onSave) {
      onSave(data as ScheduleBPFormData);
    }
  };

  // Auto-calculate E2c: Total (E2a + E2b)
  React.useEffect(() => {
    const e2a = parseFloat(watch('e2a_6percentOrClaimed') || '0');
    const e2b = parseFloat(watch('e2b_8percentOrClaimed') || '0');
    const total = e2a + e2b;
    setValue('e2c_total', total.toFixed(2));
  }, [watch('e2a_6percentOrClaimed'), watch('e2b_8percentOrClaimed')]);

  // Auto-calculate E4: 50% of E3
  React.useEffect(() => {
    const e3 = parseFloat(watch('e3_grossReceipts') || '0');
    const e4 = e3 * 0.50;
    setValue('e4_presumptiveIncome', e4.toFixed(2));
  }, [watch('e3_grossReceipts')]);

  // Auto-calculate E7: E5 - E6
  React.useEffect(() => {
    const e5 = parseFloat(watch('e5_total') || '0');
    const e6 = parseFloat(watch('e6_salaryInterestPartners') || '0');
    const e7 = Math.max(0, e5 - e6);
    setValue('e7_presumptiveIncome', e7.toFixed(2));
  }, [watch('e5_total'), watch('e6_salaryInterestPartners')]);

  // Auto-calculate E8: Total income chargeable (E2c + E4 + E7)
  React.useEffect(() => {
    const e2c = parseFloat(watch('e2c_total') || '0');
    const e4 = parseFloat(watch('e4_presumptiveIncome') || '0');
    const e7 = parseFloat(watch('e7_presumptiveIncome') || '0');
    const e8 = e2c + e4 + e7;
    setValue('e8_incomeChargeable', e8.toFixed(2));
  }, [watch('e2c_total'), watch('e4_presumptiveIncome'), watch('e7_presumptiveIncome')]);

  // Auto-calculate E17: Total capital and liabilities
  React.useEffect(() => {
    const e11 = parseFloat(watch('e11_partnersCapital') || '0');
    const e12 = parseFloat(watch('e12_securedLoans') || '0');
    const e13 = parseFloat(watch('e13_unsecuredLoans') || '0');
    const e14 = parseFloat(watch('e14_advances') || '0');
    const e15 = parseFloat(watch('e15_sundryCreditors') || '0');
    const e16 = parseFloat(watch('e16_otherLiabilities') || '0');
    const total = e11 + e12 + e13 + e14 + e15 + e16;
    setValue('e17_totalCapitalLiabilities', total.toFixed(2));
  }, [
    watch('e11_partnersCapital'),
    watch('e12_securedLoans'),
    watch('e13_unsecuredLoans'),
    watch('e14_advances'),
    watch('e15_sundryCreditors'),
    watch('e16_otherLiabilities'),
  ]);

  // Auto-calculate E25: Total assets
  React.useEffect(() => {
    const e18 = parseFloat(watch('e18_fixedAssets') || '0');
    const e19 = parseFloat(watch('e19_inventories') || '0');
    const e20 = parseFloat(watch('e20_sundryDebtors') || '0');
    const e21 = parseFloat(watch('e21_balanceWithBanks') || '0');
    const e22 = parseFloat(watch('e22_cashInHand') || '0');
    const e23 = parseFloat(watch('e23_loansAdvances') || '0');
    const e24 = parseFloat(watch('e24_otherAssets') || '0');
    const total = e18 + e19 + e20 + e21 + e22 + e23 + e24;
    setValue('e25_totalAssets', total.toFixed(2));
  }, [
    watch('e18_fixedAssets'),
    watch('e19_inventories'),
    watch('e20_sundryDebtors'),
    watch('e21_balanceWithBanks'),
    watch('e22_cashInHand'),
    watch('e23_loansAdvances'),
    watch('e24_otherAssets'),
  ]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-xl border border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Schedule BP - Details of Income from Business or Profession
        </h2>
        <p className="text-sm text-gray-600">
          Computation of Presumptive Business Income under Section 44AD/44ADA/44AE
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

        {/* E1: Section 44AD - Business Income */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            E1 - Gross Turnover/Gross Receipts (E1 limited to Rs.2 Crores, however if [E1b+ E1c] is less than or equal to 5% of E1 then the limit under E1 is extended to Rs.3 Crores.)
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  Name of Business
                </label>
                <input
                  type="text"
                  {...register('e1_nameOfBusiness')}
                  placeholder="Business name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  Business Code
                </label>
                <input
                  type="text"
                  {...register('e1_businessCode')}
                  placeholder="Code"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  {...register('e1_description')}
                  placeholder="Description"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Gross Turnover/Gross Receipts
              </label>
              <input
                type="number"
                {...register('e1_grossTurnover')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  a. Through a/c payee cheque or a/c payee bank draft or bank electronic clearing system received or prescribed electronic modes received before specified date
                </label>
                <input
                  type="number"
                  {...register('e1a_throughElectronic')}
                  placeholder="E1a"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  b. Receipts in Cash
                </label>
                <input
                  type="number"
                  {...register('e1b_receiptsInCash')}
                  placeholder="E1b"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  c. Any mode other than a and b
                </label>
                <input
                  type="number"
                  {...register('e1c_anyModeOtherThanAB')}
                  placeholder="E1c"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-gray-700">
              <strong>NOTE:</strong> If income is less than the above percentage of Gross Receipts, it is mandatory to have a tax audit under 44AB & other ITR as applicable has to be filed
            </div>
          </div>
        </div>

        {/* E2: Presumptive Income under Section 44AD */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            E2 - Presumptive Income under section 44AD
          </h3>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                a. 6% of E1a or the amount claimed to have been earned, whichever is higher
              </label>
              <input
                type="number"
                {...register('e2a_6percentOrClaimed')}
                placeholder="E2a"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                b. 8% of (E1b+E1c) or the amount claimed to have been earned, whichever is higher
              </label>
              <input
                type="number"
                {...register('e2b_8percentOrClaimed')}
                placeholder="E2b"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-700">
                c. Total (a + b)
              </label>
              <input
                type="number"
                {...register('e2c_total')}
                readOnly
                placeholder="E2c"
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* E3: Section 44ADA - Professional Income */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            E3 - Gross Receipts (E3 limited to Rs.50 Lakhs, however if [E3b + E3c] is less than or equal to 5% of E3 then limit under E3 is extended to Rs.75 Lakhs)
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  Name of Business
                </label>
                <input
                  type="text"
                  {...register('e3_nameOfBusiness')}
                  placeholder="Professional service"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  Business Code
                </label>
                <input
                  type="text"
                  {...register('e3_businessCode')}
                  placeholder="Code"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  {...register('e3_description')}
                  placeholder="Description"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Gross Receipts
              </label>
              <input
                type="number"
                {...register('e3_grossReceipts')}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  a. Through a/c payee cheque or a/c payee bank draft or bank electronic clearing system received or prescribed electronic modes received before specified date
                </label>
                <input
                  type="number"
                  {...register('e3a_throughElectronic')}
                  placeholder="E3a"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  b. Receipts in Cash
                </label>
                <input
                  type="number"
                  {...register('e3b_receiptsInCash')}
                  placeholder="E3b"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  c. Any mode other than a and b
                </label>
                <input
                  type="number"
                  {...register('e3c_anyModeOtherThanAB')}
                  placeholder="E3c"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* E4: Presumptive Income under Section 44ADA */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            E4 - Presumptive Income under section 44ADA (50% of E3) or the amount claimed to have been earned, whichever is higher
          </h3>
          
          <input
            type="number"
            {...register('e4_presumptiveIncome')}
            readOnly
            placeholder="E4"
            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-900 placeholder:text-gray-400"
          />

          <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-gray-700">
            <strong>NOTE:</strong> If income is less than 50% of Gross Receipts, it is mandatory to have a tax audit under 44AB & other ITR as applicable has to be filed
          </div>
        </div>

        {/* E5: Goods Carriage Section 44AE */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Computation of Presumptive Income from Goods Carriages under Section 44AE
          </h3>
          
          <div className="mb-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-gray-700">
            <strong>NOTE:</strong> At any time during the year the number of vehicles should not exceed 10 vehicles
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(1)<br/>Registration No. of goods carriage</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(2)<br/>Whether owned/ leased/ hired</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(3)<br/>Tonnage capacity of goods carriage (in MT)</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(4)<br/>Number of months for which goods carriage was owned/ leased/hired by assessee</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(5)<br/>Presumptive income u/s 44AE for the goods carriage (Computed @ Rs.1000 per ton per month in case tonnage exceeds 12MT, or else @ Rs.7500 per month) or the amount claimed to have been actually earned, whichever is higher</th>
                </tr>
              </thead>
              <tbody>
                {/* Row i */}
                <tr>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Registration No."
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none">
                      <option value="">Select</option>
                      <option value="owned">Owned</option>
                      <option value="leased">Leased</option>
                      <option value="hired">Hired</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="MT"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="Months"
                      max="12"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="Income"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                </tr>

                {/* Row ii */}
                <tr>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Registration No."
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none">
                      <option value="">Select</option>
                      <option value="owned">Owned</option>
                      <option value="leased">Leased</option>
                      <option value="hired">Hired</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="MT"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="Months"
                      max="12"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="Income"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                </tr>

                {/* Row iii */}
                <tr>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Registration No."
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none">
                      <option value="">Select</option>
                      <option value="owned">Owned</option>
                      <option value="leased">Leased</option>
                      <option value="hired">Hired</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="MT"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="Months"
                      max="12"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="Income"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                </tr>

                {/* Row iv */}
                <tr>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Registration No."
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none">
                      <option value="">Select</option>
                      <option value="owned">Owned</option>
                      <option value="leased">Leased</option>
                      <option value="hired">Hired</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="MT"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="Months"
                      max="12"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="Income"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                </tr>

                {/* Row v */}
                <tr>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Registration No."
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none">
                      <option value="">Select</option>
                      <option value="owned">Owned</option>
                      <option value="leased">Leased</option>
                      <option value="hired">Hired</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="MT"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="Months"
                      max="12"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="Income"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              E5: Presumptive Income from Goods Carriage under section 44AE [total of column (5)]
            </label>
            <input
              type="number"
              {...register('e5_total')}
              placeholder="E5"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-600">
              <strong>NOTE:</strong> If the profits are lower than prescribed under section 44AE or the number of Vehicles owned at any time exceed 10 then other ITR, as applicable, has to be filed
            </p>
          </div>
        </div>

        {/* E6, E7, E8 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Income Computation
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                E6: Salary and interest paid to the partners
              </label>
              <p className="mb-1.5 text-xs text-gray-600">
                <strong>NOTE:</strong> This is allowed only if Form 3CA and Form 3CB or Form 3CD or Form 3CE has been filed
              </p>
              <input
                type="number"
                {...register('e6_salaryInterestPartners')}
                placeholder="E6"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                E7: Presumptive Income u/s 44AE (E5-E6)
              </label>
              <input
                type="number"
                {...register('e7_presumptiveIncome')}
                readOnly
                placeholder="E7"
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                E8: Income chargeable under the head 'Business or Profession' (E2c+E4+E7)
              </label>
              <input
                type="number"
                {...register('e8_incomeChargeable')}
                readOnly
                placeholder="E8"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* GST Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Information Regarding Turnover/Gross Receipt Reported for GST
          </h3>
          <p className="mb-4 text-xs text-gray-600">
            <strong>Note:</strong> Please furnish the information below for each GSTIN No. separately
          </p>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                E9: GSTIN No(s).
              </label>
              <input
                type="text"
                {...register('e9_gstinNumbers')}
                placeholder="GSTIN numbers"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                E10: Annual value of outward supplies as per the GST returns filed
              </label>
              <input
                type="number"
                {...register('e10_annualValueOutward')}
                placeholder="E10"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Financial Particulars */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Financial Particulars of the Business
          </h3>
          <p className="mb-4 text-xs text-gray-600">
            <strong>Note:</strong> For E11 to E25 furnish the information as on 31st day of March, 2025
          </p>
          
          <div className="space-y-6">
            {/* Liabilities Side */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-gray-800">Liabilities</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    E11: Partners/Members own capital
                  </label>
                  <input
                    type="number"
                    {...register('e11_partnersCapital')}
                    placeholder="E11"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    E12: Secured loans
                  </label>
                  <input
                    type="number"
                    {...register('e12_securedLoans')}
                    placeholder="E12"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    E13: Unsecured loans
                  </label>
                  <input
                    type="number"
                    {...register('e13_unsecuredLoans')}
                    placeholder="E13"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    E14: Advances
                  </label>
                  <input
                    type="number"
                    {...register('e14_advances')}
                    placeholder="E14"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    E15: Sundry creditors
                  </label>
                  <input
                    type="number"
                    {...register('e15_sundryCreditors')}
                    placeholder="E15"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    E16: Other liabilities
                  </label>
                  <input
                    type="number"
                    {...register('e16_otherLiabilities')}
                    placeholder="E16"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-purple-200 bg-purple-50 p-3">
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  E17: Total capital and liabilities (E11+E12+E13+E14+E15+E16)
                </label>
                <input
                  type="number"
                  {...register('e17_totalCapitalLiabilities')}
                  readOnly
                  placeholder="E17"
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900"
                />
              </div>
            </div>

            {/* Assets Side */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-gray-800">Assets</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    E18: Fixed assets
                  </label>
                  <input
                    type="number"
                    {...register('e18_fixedAssets')}
                    placeholder="E18"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    E19: Inventories
                  </label>
                  <input
                    type="number"
                    {...register('e19_inventories')}
                    placeholder="E19"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    E20: Sundry debtors
                  </label>
                  <input
                    type="number"
                    {...register('e20_sundryDebtors')}
                    placeholder="E20"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    E21: Balance with banks
                  </label>
                  <input
                    type="number"
                    {...register('e21_balanceWithBanks')}
                    placeholder="E21"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    E22: Cash-in-hand
                  </label>
                  <input
                    type="number"
                    {...register('e22_cashInHand')}
                    placeholder="E22"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    E23: Loans and advances
                  </label>
                  <input
                    type="number"
                    {...register('e23_loansAdvances')}
                    placeholder="E23"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-700">
                    E24: Other assets
                  </label>
                  <input
                    type="number"
                    {...register('e24_otherAssets')}
                    placeholder="E24"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-purple-200 bg-purple-50 p-3">
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  E25: Total Assets (E18+E19+E20+E21+E22+E23+E24)
                </label>
                <input
                  type="number"
                  {...register('e25_totalAssets')}
                  readOnly
                  placeholder="E25"
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900"
                />
              </div>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-gray-700">
              <strong>NOTE:</strong> Please refer to instructions for filling this schedule (E15, E19, E20, E22 are mandatory and others if available)
            </div>
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

export default ItrFourScheduleBP;
