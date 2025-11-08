import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Income head details schema
const incomeHeadSchema = z.object({
  headOfIncome: z.string(),
  incomeFromOutsideIndia: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  taxPaidOutsideIndia: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  taxPayableOnSuchIncome: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  taxReliefAvailable: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  relevantArticleOfDTAA: z.string().optional(),
});

// Country schema
const countrySchema = z.object({
  countryCode: z.string().min(1, 'Country code required'),
  taxpayerIdentificationNumber: z.string().optional(),
  incomeHeads: z.array(incomeHeadSchema),
  totalIncomeFromOutsideIndia: z.string().optional(),
  totalTaxPaidOutsideIndia: z.string().optional(),
  totalTaxPayableOnSuchIncome: z.string().optional(),
  totalTaxReliefAvailable: z.string().optional(),
});

const scheduleFSISchema = z.object({
  countries: z.array(countrySchema).min(1, 'At least one country required'),
});

export type ScheduleFSIFormData = z.infer<typeof scheduleFSISchema>;

interface ItrTwoFSIProps {
  onSave: (data: ScheduleFSIFormData) => void;
  onBack: () => void;
  initialData?: ScheduleFSIFormData;
}

// Income heads structure
const INCOME_HEADS = [
  { code: 'i', label: 'Salary' },
  { code: 'ii', label: 'House Property' },
  { code: 'iii', label: 'Capital Gains' },
  { code: 'iv', label: 'Other sources' },
];

const ItrTwoFSI: React.FC<ItrTwoFSIProps> = ({ onSave, onBack, initialData }) => {
  const { control, register, watch, setValue, handleSubmit, formState: { errors } } = useForm<ScheduleFSIFormData>({
    resolver: zodResolver(scheduleFSISchema),
    defaultValues: initialData || {
      countries: [
        {
          countryCode: '',
          taxpayerIdentificationNumber: '',
          incomeHeads: INCOME_HEADS.map((head) => ({
            headOfIncome: head.label,
            incomeFromOutsideIndia: '',
            taxPaidOutsideIndia: '',
            taxPayableOnSuchIncome: '',
            taxReliefAvailable: '',
            relevantArticleOfDTAA: '',
          })),
          totalIncomeFromOutsideIndia: '0',
          totalTaxPaidOutsideIndia: '0',
          totalTaxPayableOnSuchIncome: '0',
          totalTaxReliefAvailable: '0',
        },
      ],
    }
  });

  const { fields: countryFields, append: appendCountry, remove: removeCountry } = useFieldArray({
    control,
    name: 'countries'
  });

  const all = watch();

  // Calculate totals for each country
  const calculateCountryTotals = (countryIdx: number) => {
    let totalIncome = 0;
    let totalTaxPaid = 0;
    let totalTaxPayable = 0;
    let totalTaxRelief = 0;

    all.countries?.[countryIdx]?.incomeHeads?.forEach((head) => {
      totalIncome += parseFloat(head.incomeFromOutsideIndia || '0');
      totalTaxPaid += parseFloat(head.taxPaidOutsideIndia || '0');
      totalTaxPayable += parseFloat(head.taxPayableOnSuchIncome || '0');
      totalTaxRelief += parseFloat(head.taxReliefAvailable || '0');
    });

    setValue(`countries.${countryIdx}.totalIncomeFromOutsideIndia`, totalIncome.toFixed(2));
    setValue(`countries.${countryIdx}.totalTaxPaidOutsideIndia`, totalTaxPaid.toFixed(2));
    setValue(`countries.${countryIdx}.totalTaxPayableOnSuchIncome`, totalTaxPayable.toFixed(2));
    setValue(`countries.${countryIdx}.totalTaxReliefAvailable`, totalTaxRelief.toFixed(2));
  };

  useEffect(() => {
    // Recalculate totals for all countries when data changes
    all.countries?.forEach((_, countryIdx) => {
      calculateCountryTotals(countryIdx);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(all.countries?.map(c => c.incomeHeads))]);

  const addNewCountry = () => {
    appendCountry({
      countryCode: '',
      taxpayerIdentificationNumber: '',
      incomeHeads: INCOME_HEADS.map((head) => ({
        headOfIncome: head.label,
        incomeFromOutsideIndia: '',
        taxPaidOutsideIndia: '',
        taxPayableOnSuchIncome: '',
        taxReliefAvailable: '',
        relevantArticleOfDTAA: '',
      })),
      totalIncomeFromOutsideIndia: '0',
      totalTaxPaidOutsideIndia: '0',
      totalTaxPayableOnSuchIncome: '0',
      totalTaxReliefAvailable: '0',
    });
  };

  const onSubmit = (data: ScheduleFSIFormData) => {
    onSave(data);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-sm space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Schedule FSI - Foreign Source Income</h2>
        <p className="text-gray-600">Details of Income from outside India and tax relief (available only in case of resident)</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={addNewCountry}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
          >
            + Add Country
          </button>
        </div>

        {countryFields.map((countryField, countryIdx) => (
          <div key={countryField.id} className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50 space-y-6">
            
            {/* Country Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-300">
              <h3 className="text-xl font-bold text-gray-800">Country #{countryIdx + 1}</h3>
              {countryFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCountry(countryIdx)}
                  className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Remove Country
                </button>
              )}
            </div>

            {/* Country Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country Code <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">(dropdown to be provided in the e-filing utility)</span>
                </label>
                <input
                  type="text"
                  {...register(`countries.${countryIdx}.countryCode`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 uppercase"
                  placeholder="e.g., US, GB, AU"
                />
                {errors.countries?.[countryIdx]?.countryCode && (
                  <p className="text-red-500 text-xs mt-1">{errors.countries[countryIdx]?.countryCode?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taxpayer Identification Number
                </label>
                <input
                  type="text"
                  {...register(`countries.${countryIdx}.taxpayerIdentificationNumber`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="TIN"
                />
              </div>
            </div>

            {/* Income Details Table */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3 text-gray-800">Income Details</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-3 py-2 text-left">Sl.</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">
                        (a) Head of income
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center min-w-[130px]">
                        (b) Income from outside India (included in PART B-TI)
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center min-w-[130px]">
                        (c) Tax paid outside India
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center min-w-[140px]">
                        (d) Tax payable on such income under normal provisions in India
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center min-w-[130px]">
                        (e) Tax relief available in India under section (c) or (d) whichever is lower
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center min-w-[130px]">
                        (f) Relevant article of DTAA if relief claimed u/s 90 or 90A
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {all.countries?.[countryIdx]?.incomeHeads?.map((incomeHead, headIdx) => {
                      const incomeHeadDef = INCOME_HEADS[headIdx];
                      
                      return (
                        <tr key={headIdx} className="bg-white">
                          <td className="border border-gray-300 px-3 py-2 text-center font-medium">
                            {incomeHeadDef.code}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 font-semibold">
                            {incomeHead.headOfIncome}
                          </td>
                          <td className="border border-gray-300 px-2 py-2">
                            <input
                              type="number"
                              step="0.01"
                              {...register(`countries.${countryIdx}.incomeHeads.${headIdx}.incomeFromOutsideIndia`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                              placeholder="0.00"
                            />
                          </td>
                          <td className="border border-gray-300 px-2 py-2">
                            <input
                              type="number"
                              step="0.01"
                              {...register(`countries.${countryIdx}.incomeHeads.${headIdx}.taxPaidOutsideIndia`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                              placeholder="0.00"
                            />
                          </td>
                          <td className="border border-gray-300 px-2 py-2">
                            <input
                              type="number"
                              step="0.01"
                              {...register(`countries.${countryIdx}.incomeHeads.${headIdx}.taxPayableOnSuchIncome`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                              placeholder="0.00"
                            />
                          </td>
                          <td className="border border-gray-300 px-2 py-2">
                            <input
                              type="number"
                              step="0.01"
                              {...register(`countries.${countryIdx}.incomeHeads.${headIdx}.taxReliefAvailable`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                              placeholder="0.00"
                            />
                          </td>
                          <td className="border border-gray-300 px-2 py-2">
                            <input
                              type="text"
                              {...register(`countries.${countryIdx}.incomeHeads.${headIdx}.relevantArticleOfDTAA`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded"
                              placeholder="Article"
                            />
                          </td>
                        </tr>
                      );
                    })}
                    
                    {/* Total Row */}
                    <tr className="bg-gray-100 font-semibold">
                      <td className="border border-gray-300 px-3 py-2 text-right" colSpan={2}>Total</td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          step="0.01"
                          {...register(`countries.${countryIdx}.totalIncomeFromOutsideIndia`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-200 text-right font-semibold"
                          readOnly
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          step="0.01"
                          {...register(`countries.${countryIdx}.totalTaxPaidOutsideIndia`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-200 text-right font-semibold"
                          readOnly
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          step="0.01"
                          {...register(`countries.${countryIdx}.totalTaxPayableOnSuchIncome`)}
                          className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-200 text-right font-semibold"
                          readOnly
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          step="0.01"
                          {...register(`countries.${countryIdx}.totalTaxReliefAvailable`)}
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
          </div>
        ))}

        {/* Note */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">NOTE ►</span> Please refer to the instructions for filling out this schedule.
          </p>
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
            Save Schedule FSI
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwoFSI;
