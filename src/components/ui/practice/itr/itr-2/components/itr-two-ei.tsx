import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Agricultural land detail schema
const agriculturalLandDetailSchema = z.object({
  districtName: z.string().min(1, 'District name required'),
  pinCode: z.string().regex(/^\d{6}$/, 'Valid 6-digit PIN required'),
  measurementInAcre: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Valid measurement required'),
  ownedOrLease: z.enum(['owned', 'lease'], { message: 'Select owned or lease' }),
  irrigatedOrRainFed: z.enum(['irrigated', 'rain-fed'], { message: 'Select irrigated or rain-fed' }),
});

// DTAA income row schema
const dtaaIncomeRowSchema = z.object({
  amountOfIncome: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Valid amount required').optional().or(z.literal('')),
  natureOfIncome: z.string().optional(),
  countryName: z.string().optional(),
  countryCode: z.string().optional(),
  articleOfDTAA: z.string().optional(),
  headOfIncome: z.string().optional(),
  whetherTRCObtained: z.enum(['yes', 'no', '']).optional(),
});

const scheduleEISchema = z.object({
  // Section 1: Interest income
  interestIncome: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // Section 2: Agricultural income
  grossAgriculturalReceipts: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  expenditureOnAgriculture: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  unabsorbedAgriculturalLoss: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  netAgriculturalIncome: z.string().optional(),
  
  // Agricultural land details (if net income > 5 lakh)
  exceedsLimit: z.boolean().optional(),
  agriculturalLandDetails: z.array(agriculturalLandDetailSchema).optional(),
  
  // Section 3: Other exempt income
  otherExemptIncome: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // Section 4: Income claimed as not chargeable to tax as per DTAA
  dtaaIncomeRows: z.array(dtaaIncomeRowSchema).optional(),
  totalDTAAIncome: z.string().optional(),
  
  // Section 5: Pass through income (Schedule PTI)
  passThroughIncome: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  
  // Section 6: Total exempt income
  totalExemptIncome: z.string().optional(),
}).superRefine((data, ctx) => {
  // If net agricultural income exceeds 5 lakh, land details are mandatory
  const netIncome = parseFloat(data.netAgriculturalIncome || '0');
  if (netIncome > 500000) {
    if (!data.agriculturalLandDetails || data.agriculturalLandDetails.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['agriculturalLandDetails'],
        message: 'Agricultural land details required when net income exceeds ₹5 lakh',
      });
    }
  }
});

export type ScheduleEIFormData = z.infer<typeof scheduleEISchema>;

interface ItrTwoEIProps {
  onSave: (data: ScheduleEIFormData) => void;
  onBack: () => void;
  initialData?: ScheduleEIFormData;
}

const ItrTwoEI: React.FC<ItrTwoEIProps> = ({ onSave, onBack, initialData }) => {
  const { control, register, watch, setValue, handleSubmit, formState: { errors } } = useForm<ScheduleEIFormData>({
    resolver: zodResolver(scheduleEISchema),
    defaultValues: initialData || {
      interestIncome: '',
      grossAgriculturalReceipts: '',
      expenditureOnAgriculture: '',
      unabsorbedAgriculturalLoss: '',
      netAgriculturalIncome: '0',
      exceedsLimit: false,
      agriculturalLandDetails: [],
      otherExemptIncome: '',
      dtaaIncomeRows: [{ amountOfIncome: '', natureOfIncome: '', countryName: '', countryCode: '', articleOfDTAA: '', headOfIncome: '', whetherTRCObtained: '' }],
      totalDTAAIncome: '0',
      passThroughIncome: '',
      totalExemptIncome: '0',
    }
  });

  const { fields: landFields, append: appendLand, remove: removeLand } = useFieldArray({
    control,
    name: 'agriculturalLandDetails'
  });

  const { fields: dtaaFields, append: appendDTAA, remove: removeDTAA } = useFieldArray({
    control,
    name: 'dtaaIncomeRows'
  });

  const all = watch();

  // Calculate net agricultural income
  const calculateNetAgriIncome = () => {
    const gross = parseFloat(all.grossAgriculturalReceipts || '0');
    const expenditure = parseFloat(all.expenditureOnAgriculture || '0');
    const loss = parseFloat(all.unabsorbedAgriculturalLoss || '0');
    const net = gross - expenditure - loss;
    setValue('netAgriculturalIncome', net.toFixed(2));
    
    // Check if exceeds 5 lakh
    if (net > 500000) {
      setValue('exceedsLimit', true);
    } else {
      setValue('exceedsLimit', false);
    }
    
    return net;
  };

  // Calculate total DTAA income
  const calculateTotalDTAA = () => {
    const total = (all.dtaaIncomeRows || []).reduce((sum, row) => {
      return sum + parseFloat(row.amountOfIncome || '0');
    }, 0);
    setValue('totalDTAAIncome', total.toFixed(2));
    return total;
  };

  // Calculate total exempt income
  const calculateTotal = () => {
    const interest = parseFloat(all.interestIncome || '0');
    const netAgri = parseFloat(all.netAgriculturalIncome || '0');
    const other = parseFloat(all.otherExemptIncome || '0');
    const dtaa = parseFloat(all.totalDTAAIncome || '0');
    const passThrough = parseFloat(all.passThroughIncome || '0');
    
    const total = interest + netAgri + other + dtaa + passThrough;
    setValue('totalExemptIncome', total.toFixed(2));
  };

  useEffect(() => {
    calculateNetAgriIncome();
    calculateTotalDTAA();
    calculateTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    all.grossAgriculturalReceipts,
    all.expenditureOnAgriculture,
    all.unabsorbedAgriculturalLoss,
    all.interestIncome,
    all.otherExemptIncome,
    all.passThroughIncome,
    JSON.stringify(all.dtaaIncomeRows)
  ]);

  const onSubmit = (data: ScheduleEIFormData) => {
    calculateNetAgriIncome();
    calculateTotalDTAA();
    calculateTotal();
    onSave(data);
  };

  const handleAutoCalculate = () => {
    calculateNetAgriIncome();
    calculateTotalDTAA();
    calculateTotal();
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-sm space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Schedule EI - Exempt Income</h2>
        <p className="text-gray-600">Details of Exempt Income (Income not to be included in Total Income or not chargeable to tax)</p>
      </div>

      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={handleAutoCalculate}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold shadow-md transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Auto Calculate
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Section 1: Interest Income */}
        <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">1. Interest Income</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Income (₹) <span className="text-xs text-gray-500">(i)</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register('interestIncome')}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
              {errors.interestIncome && (
                <p className="text-red-500 text-xs mt-1">{errors.interestIncome.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Agricultural Income */}
        <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">2. Agricultural Income</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                i. Gross Agricultural Receipts <span className="text-xs text-gray-500">(other than income to be excluded under rule 7A, 7B or 8 of I.T. Rules)</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register('grossAgriculturalReceipts')}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
              {errors.grossAgriculturalReceipts && (
                <p className="text-red-500 text-xs mt-1">{errors.grossAgriculturalReceipts.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ii. Expenditure Incurred on Agriculture
              </label>
              <input
                type="number"
                step="0.01"
                {...register('expenditureOnAgriculture')}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
              {errors.expenditureOnAgriculture && (
                <p className="text-red-500 text-xs mt-1">{errors.expenditureOnAgriculture.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                iii. Unabsorbed Agricultural Loss of Previous Eight Assessment Years
              </label>
              <input
                type="number"
                step="0.01"
                {...register('unabsorbedAgriculturalLoss')}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
              {errors.unabsorbedAgriculturalLoss && (
                <p className="text-red-500 text-xs mt-1">{errors.unabsorbedAgriculturalLoss.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                iv. Net Agricultural Income for the Year (i − ii − iii) <span className="text-xs text-gray-500">(enter nil if loss) (2)</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register('netAgriculturalIncome')}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                placeholder="0.00"
                readOnly
              />
            </div>
          </div>

          {/* Agricultural Land Details - shown if net income > 5 lakh */}
          {all.exceedsLimit && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-semibold text-blue-900">
                  v. Agricultural Land Details <span className="text-xs font-normal">(Required when net income exceeds ₹5 lakh)</span>
                </h4>
                <button
                  type="button"
                  onClick={() => appendLand({
                    districtName: '',
                    pinCode: '',
                    measurementInAcre: '',
                    ownedOrLease: 'owned',
                    irrigatedOrRainFed: 'irrigated'
                  })}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  + Add Land
                </button>
              </div>
              
              {errors.agriculturalLandDetails && typeof errors.agriculturalLandDetails === 'object' && 'message' in errors.agriculturalLandDetails && (
                <p className="text-red-500 text-sm mb-3">{String(errors.agriculturalLandDetails.message)}</p>
              )}

              {landFields.map((field, index) => (
                <div key={field.id} className="mb-4 p-4 bg-white border border-gray-300 rounded">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-700">Land #{index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeLand(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        a. Name of District <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register(`agriculturalLandDetails.${index}.districtName`)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        placeholder="District name"
                      />
                      {errors.agriculturalLandDetails?.[index]?.districtName && (
                        <p className="text-red-500 text-xs mt-1">{errors.agriculturalLandDetails[index]?.districtName?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pin Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register(`agriculturalLandDetails.${index}.pinCode`)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        placeholder="6-digit PIN"
                        maxLength={6}
                      />
                      {errors.agriculturalLandDetails?.[index]?.pinCode && (
                        <p className="text-red-500 text-xs mt-1">{errors.agriculturalLandDetails[index]?.pinCode?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        b. Measurement in Acre <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`agriculturalLandDetails.${index}.measurementInAcre`)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        placeholder="0.00"
                      />
                      {errors.agriculturalLandDetails?.[index]?.measurementInAcre && (
                        <p className="text-red-500 text-xs mt-1">{errors.agriculturalLandDetails[index]?.measurementInAcre?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        c. Owned or Held on Lease <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register(`agriculturalLandDetails.${index}.ownedOrLease`)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                      >
                        <option value="owned">Owned</option>
                        <option value="lease">Held on Lease</option>
                      </select>
                      {errors.agriculturalLandDetails?.[index]?.ownedOrLease && (
                        <p className="text-red-500 text-xs mt-1">{errors.agriculturalLandDetails[index]?.ownedOrLease?.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        d. Irrigated or Rain-fed <span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register(`agriculturalLandDetails.${index}.irrigatedOrRainFed`)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                      >
                        <option value="irrigated">Irrigated</option>
                        <option value="rain-fed">Rain-fed</option>
                      </select>
                      {errors.agriculturalLandDetails?.[index]?.irrigatedOrRainFed && (
                        <p className="text-red-500 text-xs mt-1">{errors.agriculturalLandDetails[index]?.irrigatedOrRainFed?.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Other Exempt Income */}
        <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">3. Other Exempt Income (including exempt income of minor child)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Exempt Income (₹) <span className="text-xs text-gray-500">(3)</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register('otherExemptIncome')}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
              {errors.otherExemptIncome && (
                <p className="text-red-500 text-xs mt-1">{errors.otherExemptIncome.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 4: DTAA Income */}
        <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">4. Income Claimed as Not Chargeable to Tax as per DTAA</h3>
            <button
              type="button"
              onClick={() => appendDTAA({
                amountOfIncome: '',
                natureOfIncome: '',
                countryName: '',
                countryCode: '',
                articleOfDTAA: '',
                headOfIncome: '',
                whetherTRCObtained: ''
              })}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              + Add DTAA Entry
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-2">Sl. No.</th>
                  <th className="border border-gray-300 px-2 py-2">Amount of Income</th>
                  <th className="border border-gray-300 px-2 py-2">Nature of Income</th>
                  <th className="border border-gray-300 px-2 py-2">Country Name & Code</th>
                  <th className="border border-gray-300 px-2 py-2">Article of DTAA</th>
                  <th className="border border-gray-300 px-2 py-2">Head of Income</th>
                  <th className="border border-gray-300 px-2 py-2">Whether TRC Obtained (Y/N)</th>
                  <th className="border border-gray-300 px-2 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {dtaaFields.map((field, index) => (
                  <tr key={field.id}>
                    <td className="border border-gray-300 px-2 py-2 text-center">{index + 1}</td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        step="0.01"
                        {...register(`dtaaIncomeRows.${index}.amountOfIncome`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        {...register(`dtaaIncomeRows.${index}.natureOfIncome`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Nature"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        {...register(`dtaaIncomeRows.${index}.countryName`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded mb-1"
                        placeholder="Country"
                      />
                      <input
                        type="text"
                        {...register(`dtaaIncomeRows.${index}.countryCode`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Code"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        {...register(`dtaaIncomeRows.${index}.articleOfDTAA`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Article"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        {...register(`dtaaIncomeRows.${index}.headOfIncome`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Head"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <select
                        {...register(`dtaaIncomeRows.${index}.whetherTRCObtained`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => removeDTAA(index)}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                III. Total Income from DTAA Claimed as Not Chargeable to Tax <span className="text-xs text-gray-500">(4)</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register('totalDTAAIncome')}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                placeholder="0.00"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Section 5: Pass Through Income */}
        <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">5. Pass Through Income Claimed as Not Chargeable to Tax (Schedule PTI)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pass Through Income (₹) <span className="text-xs text-gray-500">(5)</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register('passThroughIncome')}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
              {errors.passThroughIncome && (
                <p className="text-red-500 text-xs mt-1">{errors.passThroughIncome.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 6: Total */}
        <div className="border border-gray-300 rounded-lg p-5 bg-blue-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">6. Total Exempt Income (1+2+3+4+5)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total (₹) <span className="text-xs text-gray-500">(6)</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register('totalExemptIncome')}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 font-semibold"
                placeholder="0.00"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-semibold"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 font-semibold"
          >
            Save Schedule EI
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwoEI;
