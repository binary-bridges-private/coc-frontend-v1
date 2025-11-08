import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schedule AMT - section 115JC computation
const amtSchema = z.object({
  totalIncomePartBTI: z
    .string()
    .min(1, 'Required')
    .refine((v) => /^\d+(\.\d{1,2})?$/.test(v), 'Enter a valid number'),
  adjustment115JC2: z
    .string()
    .min(1, 'Required')
    .refine((v) => /^\d+(\.\d{1,2})?$/.test(v), 'Enter a valid number'),
  adjustedTotalIncome: z.string().optional(),
  taxPayable115JC: z.string().optional(),
});

export type ScheduleAMTFormData = z.infer<typeof amtSchema>;

interface ItrTwoAMTProps {
  onSave: (data: ScheduleAMTFormData) => void;
  onBack: () => void;
  initialData?: ScheduleAMTFormData;
}

const ItrTwoAMT: React.FC<ItrTwoAMTProps> = ({ onSave, onBack, initialData }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ScheduleAMTFormData>({
    resolver: zodResolver(amtSchema),
    defaultValues: initialData || {
      totalIncomePartBTI: '',
      adjustment115JC2: '',
      adjustedTotalIncome: '',
      taxPayable115JC: '',
    }
  });

  const all = watch();

  const recalc = () => {
    const totalIncome = parseFloat(all.totalIncomePartBTI || '0');
    const adjustment = parseFloat(all.adjustment115JC2 || '0');
    const adjustedTotal = totalIncome + adjustment; // (1 + 2)
    setValue('adjustedTotalIncome', String(adjustedTotal));
    // Tax payable = 18.5% of adjusted total (only if > 0)
    const tax = adjustedTotal > 0 ? +(adjustedTotal * 0.185).toFixed(2) : 0;
    setValue('taxPayable115JC', String(tax));
  };

  const onSubmit = (data: ScheduleAMTFormData) => {
    recalc();
    onSave({ ...data, adjustedTotalIncome: data.adjustedTotalIncome, taxPayable115JC: data.taxPayable115JC });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Schedule AMT</h2>
        <p className="mt-1.5 text-sm text-gray-600">Computation of Alternate Minimum Tax payable under section 115JC</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[380px]">Computation Item</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[120px]">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 text-black px-4 py-2">1. Total Income as per Part B-TI</td>
                <td className="border border-gray-300 text-black px-2 py-2">
                  <input
                    type="number"
                    step="0.01"
                    {...register('totalIncomePartBTI', { onChange: recalc })}
                    className="w-full min-w-[140px] px-4 py-2 border border-gray-300 text-black rounded"
                    placeholder="0.00"
                  />
                  {errors.totalIncomePartBTI && <p className="text-red-500 text-xs mt-1">{errors.totalIncomePartBTI.message}</p>}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 text-black px-4 py-2">
                  2. Adjustment as per section 115JC(2)
                </td>
                <td className="border border-gray-300 text-black px-2 py-2">
                  <input
                    type="number"
                    step="0.01"
                    {...register('adjustment115JC2', { onChange: recalc })}
                    className="w-full min-w-[140px] px-4 py-2 border border-gray-300 text-black rounded"
                    placeholder="0.00"
                  />
                  {errors.adjustment115JC2 && <p className="text-red-500 text-xs mt-1">{errors.adjustment115JC2.message}</p>}
                </td>
              </tr>
              <tr className="bg-gray-50 font-semibold">
                <td className="border border-gray-300 text-black px-4 py-2">3. Adjusted Total Income (1 + 2)</td>
                <td className="border border-gray-300 text-black px-2 py-2">
                  <input
                    type="number"
                    step="0.01"
                    {...register('adjustedTotalIncome')}
                    className="w-full min-w-[140px] px-4 py-2 border border-gray-300 text-black rounded bg-gray-50"
                    placeholder="0.00"
                    readOnly
                  />
                </td>
              </tr>
              <tr className="bg-gray-50 font-semibold">
                <td className="border border-gray-300 text-black px-4 py-2">4. Tax payable u/s 115JC (18.5% of 3)</td>
                <td className="border border-gray-300 text-black px-2 py-2">
                  <input
                    type="number"
                    step="0.01"
                    {...register('taxPayable115JC')}
                    className="w-full min-w-[140px] px-4 py-2 border border-gray-300 text-black rounded bg-gray-50"
                    placeholder="0.00"
                    readOnly
                  />
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

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
            Save Schedule AMT
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwoAMT;
