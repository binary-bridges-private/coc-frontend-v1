import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation Schema
const contributionRowSchema = z
  .object({
    date: z
      .string()
      .min(1, 'Date is required')
      .regex(/^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/i, 'Use DD/MM/YYYY'),
    contributionInCash: z
      .string()
      .optional()
      .refine(
        (v) => !v || /^\d+(\.\d{1,2})?$/.test(v),
        'Cash must be a non-negative number'
      ),
    contributionInOtherMode: z
      .string()
      .optional()
      .refine(
        (v) => !v || /^\d+(\.\d{1,2})?$/.test(v),
        'Other mode must be a non-negative number'
      ),
    totalContribution: z.string().optional(),
    eligibleAmount: z.string().optional(),
    transactionReference: z.string().optional(),
    ifsCode: z
      .string()
      .optional()
      .refine(
        (v) => !v || /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v),
        'Invalid IFSC format'
      ),
  })
  .superRefine((data, ctx) => {
    const other = parseFloat(data.contributionInOtherMode || '0');
    if (other > 0 && !data.transactionReference) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['transactionReference'],
        message: 'Transaction reference required when non-cash contribution > 0',
      });
    }
  });

const schedule80GGCSchema = z.object({
  contributions: z
    .array(contributionRowSchema)
    .min(1, 'At least one contribution is required'),
  totalContribution: z.string().optional(), // Sum of eligible amounts (non-cash only)
});

export type Schedule80GGCFormData = z.infer<typeof schedule80GGCSchema>;

interface ItrTwo80GGCProps {
  onSave: (data: Schedule80GGCFormData) => void;
  onBack: () => void;
  initialData?: Schedule80GGCFormData;
}

const ItrTwo80GGC: React.FC<ItrTwo80GGCProps> = ({ onSave, onBack, initialData }) => {
  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<Schedule80GGCFormData>({
    resolver: zodResolver(schedule80GGCSchema),
    defaultValues: initialData || {
      contributions: [
        {
          date: '',
          contributionInCash: '',
          contributionInOtherMode: '',
          totalContribution: '',
          eligibleAmount: '',
          transactionReference: '',
          ifsCode: '',
        }
      ],
      totalContribution: '',
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contributions'
  });

  const watchAllFields = watch();

  // Calculate row total & eligible amount
  const calculateRowTotal = (index: number) => {
    const cashRaw = watchAllFields.contributions?.[index]?.contributionInCash || '';
    const otherRaw = watchAllFields.contributions?.[index]?.contributionInOtherMode || '';
    const cash = parseFloat(cashRaw || '0');
    const other = parseFloat(otherRaw || '0');
    const total = cash + other;
    // totalContribution = cash + other; eligibleAmount = other (non-cash only)
    setValue(`contributions.${index}.totalContribution`, isFinite(total) ? total.toString() : '0');
    setValue(`contributions.${index}.eligibleAmount`, isFinite(other) ? other.toString() : '0');
    calculateGrandTotal();
  };

  // Calculate grand total of eligible amounts (non-cash contributions only)
  const calculateGrandTotal = () => {
    const contributions = watchAllFields.contributions || [];
    const total = contributions.reduce((sum: number, row: any) => {
      return sum + (parseFloat(row.eligibleAmount) || 0);
    }, 0);
    setValue('totalContribution', isFinite(total) ? total.toString() : '0');
  };

  // Calculate all
  const calculateAll = () => {
    fields.forEach((_, index) => calculateRowTotal(index));
    calculateGrandTotal();
  };

  const onSubmit = (data: Schedule80GGCFormData) => {
    calculateAll();
    onSave(data);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Schedule 80GGC</h2>
        <p className="mt-1.5 text-sm text-gray-600">Contributions to political parties (only non-cash eligible for deduction)</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 ">
            <thead>
              <tr className="bg-gray-100">
                <th className="border text-black border-gray-300 px-4 py-3 text-left min-w-[80px]">S. No.</th>
                <th className="border text-black border-gray-300 px-4 py-3 text-left min-w-[120px]">Date</th>
                <th className="border text-black border-gray-300 px-4 py-3 text-center min-w-[300px]" colSpan={3}>Amount of contribution</th>
                <th className="border text-black border-gray-300 px-4 py-3 text-left min-w-[120px]">Eligible amount of contribution</th>
                <th className="border text-black border-gray-300 px-4 py-3 text-left min-w-[150px]">
                  Transaction Reference number for UPI transfer or Cheque number/ IMPS/ NEFT/ RTGS
                </th>
                <th className="border text-black border-gray-300 px-4 py-3 text-left min-w-[120px]">IFS code of Bank</th>
                <th className="border text-black border-gray-300 px-4 py-3 text-center">Actions</th>
              </tr>
              <tr className="bg-gray-50">
                <th className="border text-black border-gray-300"></th>
                <th className="border text-black border-gray-300"></th>
                <th className="border text-black border-gray-300 px-4 py-2 text-left min-w-[120px]">Contribution in cash</th>
                <th className="border text-black border-gray-300 px-4 py-2 text-left min-w-[120px]">Contribution in other mode</th>
                <th className="border text-black border-gray-300 px-4 py-2 text-left min-w-[120px]">Total Contribution</th>
                <th className="border text-black border-gray-300"></th>
                <th className="border text-black border-gray-300"></th>
                <th className="border text-black border-gray-300"></th>
                <th className="border text-black border-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      {...register(`contributions.${index}.date`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="DD/MM/YYYY"
                    />
                    {errors.contributions?.[index]?.date && (
                      <p className="text-red-500 text-xs mt-1">{errors.contributions[index]?.date?.message}</p>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register(`contributions.${index}.contributionInCash`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="0.00"
                      onChange={() => calculateRowTotal(index)}
                    />
                    {errors.contributions?.[index]?.contributionInCash && (
                      <p className="text-red-500 text-xs mt-1">{errors.contributions[index]?.contributionInCash?.message}</p>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register(`contributions.${index}.contributionInOtherMode`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="0.00"
                      onChange={() => calculateRowTotal(index)}
                    />
                    {errors.contributions?.[index]?.contributionInOtherMode && (
                      <p className="text-red-500 text-xs mt-1">{errors.contributions[index]?.contributionInOtherMode?.message}</p>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register(`contributions.${index}.totalContribution`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded bg-gray-50"
                      placeholder="0.00"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register(`contributions.${index}.eligibleAmount`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded bg-gray-50"
                      placeholder="0.00"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      {...register(`contributions.${index}.transactionReference`)}
                      className="w-full min-w-[150px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="Transaction ref"
                    />
                    {errors.contributions?.[index]?.transactionReference && (
                      <p className="text-red-500 text-xs mt-1">{errors.contributions[index]?.transactionReference?.message}</p>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      {...register(`contributions.${index}.ifsCode`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="IFSC Code"
                      maxLength={11}
                      style={{ textTransform: 'uppercase' }}
                    />
                    {errors.contributions?.[index]?.ifsCode && (
                      <p className="text-red-500 text-xs mt-1">{errors.contributions[index]?.ifsCode?.message}</p>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td colSpan={9} className="border border-gray-300 px-4 py-2">
                  <button
                    type="button"
                    onClick={() => append({
                      date: '',
                      contributionInCash: '',
                      contributionInOtherMode: '',
                      totalContribution: '',
                      eligibleAmount: '',
                      transactionReference: '',
                      ifsCode: '',
                    })}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Add Row
                  </button>
                </td>
              </tr>
              <tr className="bg-gray-100 font-semibold">
                <td colSpan={5} className="border border-gray-300 px-4 py-2 text-right">
                  Total Contribution
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="number"
                    step="0.01"
                    {...register('totalContribution')}
                    className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded bg-gray-50"
                    placeholder="0.00"
                    readOnly
                  />
                </td>
                <td colSpan={2} className="border border-gray-300"></td>
                <td className="border border-gray-300 px-2 py-2 text-center">
                  <button
                    type="button"
                    onClick={calculateAll}
                    className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
                  >
                    Calculate
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
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
            Save Schedule 80GGC
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwo80GGC;
