import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Tax relief row schema
const taxReliefRowSchema = z.object({
  countryCode: z.string().optional(),
  taxpayerIdentificationNumber: z.string().optional(),
  totalTaxesPaidOutsideIndia: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  totalTaxReliefAvailable: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  taxReliefClaimed: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
});

const scheduleTRSchema = z.object({
  // Section 1: Summary of tax relief claimed
  taxReliefRows: z.array(taxReliefRowSchema).optional(),
  totalTaxesPaidOutsideIndia: z.string().optional(),
  totalTaxReliefAvailableScheduleFSI: z.string().optional(),
  taxReliefClaimedSection90_90A_91: z.string().optional(),

  // Section 2: DTAA applicable (90/90A)
  totalTaxReliefDTAAApplicable: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),

  // Section 3: DTAA not applicable (section 91)
  totalTaxReliefDTAANotApplicable: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),

  // Section 4: Tax refund details
  taxRefundOutsideIndia: z.enum(['yes', 'no', ''], { message: 'Select Yes or No' }).optional(),
  amountOfTaxRefunded: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  assessmentYearForRefund: z.string().optional(),
});

export type ScheduleTRFormData = z.infer<typeof scheduleTRSchema>;

interface ItrTwoTRProps {
  onSave: (data: ScheduleTRFormData) => void;
  onBack: () => void;
  initialData?: ScheduleTRFormData;
}

const ItrTwoTR: React.FC<ItrTwoTRProps> = ({ onSave, onBack, initialData }) => {
  const { control, register, watch, setValue, handleSubmit, formState: { errors } } = useForm<ScheduleTRFormData>({
    resolver: zodResolver(scheduleTRSchema),
    defaultValues: initialData || {
      taxReliefRows: [
        {
          countryCode: '',
          taxpayerIdentificationNumber: '',
          totalTaxesPaidOutsideIndia: '',
          totalTaxReliefAvailable: '',
          taxReliefClaimed: '',
        },
      ],
      totalTaxesPaidOutsideIndia: '0',
      totalTaxReliefAvailableScheduleFSI: '0',
      taxReliefClaimedSection90_90A_91: '0',
      totalTaxReliefDTAAApplicable: '',
      totalTaxReliefDTAANotApplicable: '',
      taxRefundOutsideIndia: '',
      amountOfTaxRefunded: '',
      assessmentYearForRefund: '',
    }
  });

  const { fields: taxReliefFields, append: appendTaxRelief, remove: removeTaxRelief } = useFieldArray({
    control,
    name: 'taxReliefRows'
  });

  const all = watch();

  // Calculate totals for section 1
  const calculateSection1Totals = () => {
    let totalTaxesPaid = 0;
    let totalReliefAvailable = 0;
    let totalReliefClaimed = 0;

    (all.taxReliefRows || []).forEach((row) => {
      totalTaxesPaid += parseFloat(row.totalTaxesPaidOutsideIndia || '0');
      totalReliefAvailable += parseFloat(row.totalTaxReliefAvailable || '0');
      totalReliefClaimed += parseFloat(row.taxReliefClaimed || '0');
    });

    setValue('totalTaxesPaidOutsideIndia', totalTaxesPaid.toFixed(2));
    setValue('totalTaxReliefAvailableScheduleFSI', totalReliefAvailable.toFixed(2));
    setValue('taxReliefClaimedSection90_90A_91', totalReliefClaimed.toFixed(2));
  };

  useEffect(() => {
    calculateSection1Totals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(all.taxReliefRows)]);

  const onSubmit = (data: ScheduleTRFormData) => {
    calculateSection1Totals();
    onSave(data);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Schedule TR - Tax Relief</h2>
        <p className="mt-1.5 text-sm text-gray-600">Summary of tax relief claimed for taxes paid outside India (available only in case of resident)</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Section 1: Summary of Tax Relief Claimed */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">1. Summary of Tax Relief Claimed</h3>
            <button
              type="button"
              onClick={() => appendTaxRelief({
                countryCode: '',
                taxpayerIdentificationNumber: '',
                totalTaxesPaidOutsideIndia: '',
                totalTaxReliefAvailable: '',
                taxReliefClaimed: '',
              })}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              + Add Row
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-3 py-2 text-left" rowSpan={2}>
                    (a) Country Code
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-center" rowSpan={2}>
                    (b) Taxpayer Identification Number
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-center" rowSpan={2}>
                    (c) Total taxes paid outside India (total of (c) of Schedule FSI in respect of each country)
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-center" rowSpan={2}>
                    (d) Total tax relief available (total of (e) of Schedule FSI in respect of each country)
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-center" rowSpan={2}>
                    (e) Tax Relief Claimed under section (specify 90, 90A or 91)
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-center" rowSpan={2}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {taxReliefFields.map((field, index) => (
                  <tr key={field.id} className="bg-white">
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        {...register(`taxReliefRows.${index}.countryCode`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded uppercase"
                        placeholder="Country code"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        {...register(`taxReliefRows.${index}.taxpayerIdentificationNumber`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="TIN"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        step="0.01"
                        {...register(`taxReliefRows.${index}.totalTaxesPaidOutsideIndia`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        step="0.01"
                        {...register(`taxReliefRows.${index}.totalTaxReliefAvailable`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        step="0.01"
                        {...register(`taxReliefRows.${index}.taxReliefClaimed`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => removeTaxRelief(index)}
                        className="text-red-600 hover:text-red-800 text-xs"
                        disabled={taxReliefFields.length === 1}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Total Row */}
                <tr className="bg-gray-100 font-semibold">
                  <td className="border border-gray-300 px-3 py-2 text-right" colSpan={2}>Total</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register('totalTaxesPaidOutsideIndia')}
                      className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-200 text-right font-semibold"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register('totalTaxReliefAvailableScheduleFSI')}
                      className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-200 text-right font-semibold"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register('taxReliefClaimedSection90_90A_91')}
                      className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-200 text-right font-semibold"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: DTAA Applicable */}
        <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            2. Total Tax relief available in respect of country where DTAA is applicable (section 90/90A)
            <span className="text-sm font-normal text-gray-600 ml-2">(Part of total of 1(d))</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Tax Relief (₹) <span className="text-xs text-gray-500">(2)</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register('totalTaxReliefDTAAApplicable')}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
              {errors.totalTaxReliefDTAAApplicable && (
                <p className="text-red-500 text-xs mt-1">{errors.totalTaxReliefDTAAApplicable.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: DTAA Not Applicable */}
        <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            3. Total Tax relief available in respect of country where DTAA is not applicable (section 91)
            <span className="text-sm font-normal text-gray-600 ml-2">(Part of total of 1(d))</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Tax Relief (₹) <span className="text-xs text-gray-500">(3)</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register('totalTaxReliefDTAANotApplicable')}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
              {errors.totalTaxReliefDTAANotApplicable && (
                <p className="text-red-500 text-xs mt-1">{errors.totalTaxReliefDTAANotApplicable.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 4: Tax Refund Details */}
        <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            4. Whether any tax paid outside India, on which tax relief was allowed in India, has been refunded/credited by the foreign country? If Yes, please provide the details below
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Refunded Outside India? <span className="text-xs text-gray-500">(4)</span>
              </label>
              <select
                {...register('taxRefundOutsideIndia')}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.taxRefundOutsideIndia && (
                <p className="text-red-500 text-xs mt-1">{errors.taxRefundOutsideIndia.message}</p>
              )}
            </div>
          </div>

          {all.taxRefundOutsideIndia === 'yes' && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
              <h4 className="text-md font-semibold mb-3 text-blue-900">Refund Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    a. Amount of Tax Refunded (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('amountOfTaxRefunded')}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                  {errors.amountOfTaxRefunded && (
                    <p className="text-red-500 text-xs mt-1">{errors.amountOfTaxRefunded.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    b. Assessment Year in which Tax Relief Allowed in India
                  </label>
                  <input
                    type="text"
                    {...register('assessmentYearForRefund')}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 2023-24"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Note */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">NOTE ►</span> Please refer to the instructions for filling out this schedule.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
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
            Save Schedule TR
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwoTR;
