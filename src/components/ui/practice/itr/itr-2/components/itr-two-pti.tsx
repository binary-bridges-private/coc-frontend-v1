import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Investment entity schema
const investmentEntitySchema = z.object({
  investmentEntityCoveredBy: z.enum(['115U', '115UA', '115UB'], { message: 'Select investment entity type' }),
  nameOfBusinessTrustOrInvestmentFund: z.string().min(1, 'Name required'),
  panOfBusinessTrustOrInvestmentFund: z.string()
    .transform((val) => val.trim().toUpperCase())
    .refine((val) => val.length === 10, 'PAN must be 10 characters')
    .refine((val) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(val), 'Invalid PAN format (e.g., ABCDE1234F)'),
  
  // Income details - nested structure
  incomeDetails: z.array(
    z.object({
      headOfIncome: z.string(),
      subCategory: z.string().optional(),
      currentYearIncome: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
      shareOfCurrentYearLoss: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
      netIncomeLoss: z.string().optional(),
      tdsOnSuchAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
    })
  ),
});

const schedulePTISchema = z.object({
  entities: z.array(investmentEntitySchema).min(1, 'At least one investment entity required'),
});

export type SchedulePTIFormData = z.infer<typeof schedulePTISchema>;

interface ItrTwoPTIProps {
  onSave: (data: SchedulePTIFormData) => void;
  onBack: () => void;
  initialData?: SchedulePTIFormData;
}

// Define income structure for each entity
const INCOME_STRUCTURE = [
  { head: 'House property', subCategories: [] },
  { 
    head: 'Capital Gains', 
    subCategories: [
      { code: 'a', label: 'Short term' },
      { code: 'ai', label: 'Section 111A' },
      { code: 'aii', label: 'Others' },
      { code: 'b', label: 'Long term' },
      { code: 'bi', label: 'Section 112A' },
      { code: 'bii', label: 'Other than Section 112A' },
    ] 
  },
  { 
    head: 'Other Sources', 
    subCategories: [
      { code: 'A', label: 'Dividend' },
      { code: 'B', label: 'Others' },
    ] 
  },
  { 
    head: 'Income claimed to be exempt', 
    subCategories: [
      { code: 'a', label: 'u/s 10(23FBB)' },
      { code: 'b', label: 'u/s …………' },
      { code: 'c', label: 'u/s …………' },
    ] 
  },
];

const ItrTwoPTI: React.FC<ItrTwoPTIProps> = ({ onSave, onBack, initialData }) => {
  const { control, register, watch, setValue, handleSubmit, formState: { errors } } = useForm<SchedulePTIFormData>({
    resolver: zodResolver(schedulePTISchema),
    defaultValues: initialData || {
      entities: [
        {
          investmentEntityCoveredBy: '115U',
          nameOfBusinessTrustOrInvestmentFund: '',
          panOfBusinessTrustOrInvestmentFund: '',
          incomeDetails: INCOME_STRUCTURE.flatMap((inc) => {
            if (inc.subCategories.length === 0) {
              return [{ headOfIncome: inc.head, subCategory: '', currentYearIncome: '', shareOfCurrentYearLoss: '', netIncomeLoss: '0', tdsOnSuchAmount: '' }];
            }
            return inc.subCategories.map((sub) => ({
              headOfIncome: inc.head,
              subCategory: `${sub.code} - ${sub.label}`,
              currentYearIncome: '',
              shareOfCurrentYearLoss: '',
              netIncomeLoss: '0',
              tdsOnSuchAmount: '',
            }));
          }),
        },
      ],
    }
  });

  const { fields: entityFields, append: appendEntity, remove: removeEntity } = useFieldArray({
    control,
    name: 'entities'
  });

  const all = watch();

  // Calculate net income/loss for each income detail row
  const calculateNetIncomeLoss = (entityIdx: number, incomeIdx: number) => {
    const income = parseFloat(all.entities?.[entityIdx]?.incomeDetails?.[incomeIdx]?.currentYearIncome || '0');
    const loss = parseFloat(all.entities?.[entityIdx]?.incomeDetails?.[incomeIdx]?.shareOfCurrentYearLoss || '0');
    const net = income - loss;
    setValue(`entities.${entityIdx}.incomeDetails.${incomeIdx}.netIncomeLoss`, net.toFixed(2));
  };

  useEffect(() => {
    // Recalculate all net income/loss when data changes
    all.entities?.forEach((entity, entityIdx) => {
      entity.incomeDetails?.forEach((_, incomeIdx) => {
        calculateNetIncomeLoss(entityIdx, incomeIdx);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(all.entities?.map(e => e.incomeDetails?.map(i => [i.currentYearIncome, i.shareOfCurrentYearLoss])))]);

  const addNewEntity = () => {
    appendEntity({
      investmentEntityCoveredBy: '115U',
      nameOfBusinessTrustOrInvestmentFund: '',
      panOfBusinessTrustOrInvestmentFund: '',
      incomeDetails: INCOME_STRUCTURE.flatMap((inc) => {
        if (inc.subCategories.length === 0) {
          return [{ headOfIncome: inc.head, subCategory: '', currentYearIncome: '', shareOfCurrentYearLoss: '', netIncomeLoss: '0', tdsOnSuchAmount: '' }];
        }
        return inc.subCategories.map((sub) => ({
          headOfIncome: inc.head,
          subCategory: `${sub.code} - ${sub.label}`,
          currentYearIncome: '',
          shareOfCurrentYearLoss: '',
          netIncomeLoss: '0',
          tdsOnSuchAmount: '',
        }));
      }),
    });
  };

  const onSubmit = (data: SchedulePTIFormData) => {
    onSave(data);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-sm space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Schedule PTI - Pass Through Income</h2>
        <p className="text-gray-600">Pass Through Income details from business trust or investment fund as per section 115U, 115UA and 115UB</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={addNewEntity}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
          >
            + Add Investment Entity
          </button>
        </div>

        {entityFields.map((entityField, entityIdx) => (
          <div key={entityField.id} className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50 space-y-6">
            
            {/* Entity Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-300">
              <h3 className="text-xl font-bold text-gray-800">Investment Entity #{entityIdx + 1}</h3>
              {entityFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEntity(entityIdx)}
                  className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Remove Entity
                </button>
              )}
            </div>

            {/* Entity Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (1) Investment Entity Covered by Section <span className="text-red-500">*</span>
                </label>
                <select
                  {...register(`entities.${entityIdx}.investmentEntityCoveredBy`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="115U">115U</option>
                  <option value="115UA">115UA</option>
                  <option value="115UB">115UB</option>
                </select>
                {errors.entities?.[entityIdx]?.investmentEntityCoveredBy && (
                  <p className="text-red-500 text-xs mt-1">{errors.entities[entityIdx]?.investmentEntityCoveredBy?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (3) Name of Business Trust / Investment Fund <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register(`entities.${entityIdx}.nameOfBusinessTrustOrInvestmentFund`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                />
                {errors.entities?.[entityIdx]?.nameOfBusinessTrustOrInvestmentFund && (
                  <p className="text-red-500 text-xs mt-1">{errors.entities[entityIdx]?.nameOfBusinessTrustOrInvestmentFund?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (4) PAN of Business Trust / Investment Fund <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register(`entities.${entityIdx}.panOfBusinessTrustOrInvestmentFund`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 uppercase"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  style={{ textTransform: 'uppercase' }}
                />
                {errors.entities?.[entityIdx]?.panOfBusinessTrustOrInvestmentFund && (
                  <p className="text-red-500 text-xs mt-1">{errors.entities[entityIdx]?.panOfBusinessTrustOrInvestmentFund?.message}</p>
                )}
              </div>
            </div>

            {/* Income Details Table */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3 text-gray-800">Income Details</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-3 py-2 text-left" rowSpan={2}>Sl.</th>
                      <th className="border border-gray-300 px-3 py-2 text-left" rowSpan={2}>
                        (6) Head of Income
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center" rowSpan={2}>
                        (7) Current year income
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center" rowSpan={2}>
                        (8) Share of current year loss distributed by investment fund
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center" rowSpan={2}>
                        (9) Net Income/ Loss (7-8)
                      </th>
                      <th className="border border-gray-300 px-3 py-2 text-center" rowSpan={2}>
                        (10) TDS on such amount, if any
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {all.entities?.[entityIdx]?.incomeDetails?.map((incomeDetail, incomeIdx) => {
                      const isMainHead = !incomeDetail.subCategory;
                      const rowClass = isMainHead ? 'bg-blue-50 font-semibold' : 'bg-white';
                      
                      return (
                        <tr key={incomeIdx} className={rowClass}>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            {isMainHead ? INCOME_STRUCTURE.findIndex(inc => inc.head === incomeDetail.headOfIncome) + 1 : ''}
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            {isMainHead ? (
                              <span className="font-semibold">{incomeDetail.headOfIncome}</span>
                            ) : (
                              <span className="ml-4 text-gray-700">{incomeDetail.subCategory}</span>
                            )}
                          </td>
                          <td className="border border-gray-300 px-2 py-2">
                            <input
                              type="number"
                              step="0.01"
                              {...register(`entities.${entityIdx}.incomeDetails.${incomeIdx}.currentYearIncome`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                              placeholder="0.00"
                            />
                          </td>
                          <td className="border border-gray-300 px-2 py-2">
                            <input
                              type="number"
                              step="0.01"
                              {...register(`entities.${entityIdx}.incomeDetails.${incomeIdx}.shareOfCurrentYearLoss`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                              placeholder="0.00"
                            />
                          </td>
                          <td className="border border-gray-300 px-2 py-2">
                            <input
                              type="number"
                              step="0.01"
                              {...register(`entities.${entityIdx}.incomeDetails.${incomeIdx}.netIncomeLoss`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-right"
                              placeholder="0.00"
                              readOnly
                            />
                          </td>
                          <td className="border border-gray-300 px-2 py-2">
                            <input
                              type="number"
                              step="0.01"
                              {...register(`entities.${entityIdx}.incomeDetails.${incomeIdx}.tdsOnSuchAmount`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                              placeholder="0.00"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}

        {/* Note */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">NOTE:</span> Please refer to the instructions for filling out this schedule.
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
            Save Schedule PTI
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwoPTI;
