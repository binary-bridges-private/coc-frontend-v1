import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const creditRowSchema = z.object({
  assessmentYear: z.string().min(1, 'Required'),
  grossB1: z.string().optional().refine((v) => !v || /^\d+(\.\d{1,2})?$/.test(v), 'Invalid'),
  setoffEarlierB2: z.string().optional().refine((v) => !v || /^\d+(\.\d{1,2})?$/.test(v), 'Invalid'),
  balanceBroughtB3: z.string().optional(),
  utilizedCurrentC: z.string().optional().refine((v) => !v || /^\d+(\.\d{1,2})?$/.test(v), 'Invalid'),
  balanceCarriedD: z.string().optional(),
});

const amtcSchema = z.object({
  taxUnder115JC: z.string().min(1, 'Required').refine((v) => /^\d+(\.\d{1,2})?$/.test(v), 'Invalid'),
  taxUnderOtherProvisions: z.string().min(1, 'Required').refine((v) => /^\d+(\.\d{1,2})?$/.test(v), 'Invalid'),
  taxAgainstWhichCreditAvailable: z.string().optional(), // max cap for utilization
  credits: z.array(creditRowSchema).min(1, 'Add at least one row'),
  totalUtilizedThisYear: z.string().optional(),
  totalBalanceCarriedForward: z.string().optional(),
});

export type ScheduleAMTCFormData = z.infer<typeof amtcSchema>;

interface ItrTwoAMTCProps {
  onSave: (data: ScheduleAMTCFormData) => void;
  onBack: () => void;
  initialData?: ScheduleAMTCFormData;
}

const defaultYears: string[] = [
  '2013-14','2014-15','2015-16','2016-17','2017-18','2018-19','2019-20','2020-21','2021-22','2022-23','2023-24','2024-25','Current AY (enter 1- if 2+ else enter 0)'
];

const ItrTwoAMTC: React.FC<ItrTwoAMTCProps> = ({ onSave, onBack, initialData }) => {
  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<ScheduleAMTCFormData>({
    resolver: zodResolver(amtcSchema),
    defaultValues: initialData || {
      taxUnder115JC: '',
      taxUnderOtherProvisions: '',
      taxAgainstWhichCreditAvailable: '',
      credits: defaultYears.map((y) => ({ assessmentYear: y, grossB1: '', setoffEarlierB2: '', balanceBroughtB3: '', utilizedCurrentC: '', balanceCarriedD: '' })),
      totalUtilizedThisYear: '',
      totalBalanceCarriedForward: '',
    }
  });

  const { fields } = useFieldArray({ control, name: 'credits' });
  const all = watch();

  const recalcRow = (i: number) => {
    const b1 = parseFloat(all.credits?.[i]?.grossB1 || '0');
    const b2 = parseFloat(all.credits?.[i]?.setoffEarlierB2 || '0');
    const c = parseFloat(all.credits?.[i]?.utilizedCurrentC || '0');
    const b3 = Math.max(b1 - b2, 0);
    const d = Math.max(b3 - c, 0);
    setValue(`credits.${i}.balanceBroughtB3`, String(b3));
    setValue(`credits.${i}.balanceCarriedD`, String(d));
    return { b3, d }; // Return calculated values
  };

  const recalcAll = () => {
    // Get fresh data from watch
    const currentData = watch();
    
    // Item 3: available tax against which credit is available = max(2 - 1, 0)
    const t1 = parseFloat(currentData.taxUnder115JC || '0');
    const t2 = parseFloat(currentData.taxUnderOtherProvisions || '0');
    const available = Math.max(t2 - t1, 0);
    setValue('taxAgainstWhichCreditAvailable', String(available));

    // Calculate all rows and collect B3 and D values
    let sumB3 = 0;
    let sumUtilized = 0;
    let sumD = 0;

    (fields || []).forEach((_, i) => {
      const b1 = parseFloat(currentData.credits?.[i]?.grossB1 || '0');
      const b2 = parseFloat(currentData.credits?.[i]?.setoffEarlierB2 || '0');
      const c = parseFloat(currentData.credits?.[i]?.utilizedCurrentC || '0');
      const b3 = Math.max(b1 - b2, 0);
      const d = Math.max(b3 - c, 0);
      
      setValue(`credits.${i}.balanceBroughtB3`, String(b3));
      setValue(`credits.${i}.balanceCarriedD`, String(d));
      
      sumB3 += b3;
      sumUtilized += c;
      sumD += d;
    });

    // Cap utilization
    const cap = Math.min(available, sumB3);
    const effectiveUtilized = Math.min(sumUtilized, cap);
    setValue('totalUtilizedThisYear', String(effectiveUtilized));
    setValue('totalBalanceCarriedForward', String(sumD));
  };

  const onSubmit = (data: ScheduleAMTCFormData) => {
    recalcAll();
    onSave(data);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Schedule AMTC</h2>
        <p className="mt-1.5 text-sm text-gray-600">Computation of tax credit under section 115JD</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 text-black px-4 py-3 text-left">S. No.</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left">Assessment Year</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left">AMT Credit - Gross (B1)</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left">Set-off in earlier assessment years (B2)</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left">Balance brought forward to the current assessment year (B3=B1-B2)</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left">AMT Credit utilized during the Current Assessment Year (C)</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left">Balance AMT Credit Carried Forward (D=B3-C)</th>
              </tr>
            </thead>
            <tbody>
              {(fields || []).map((f, i) => (
                <tr key={f.id}>
                  <td className="border border-gray-300 text-black px-4 py-2">{i + 1}</td>
                  <td className="border border-gray-300 text-black px-2 py-2">
                    <input type="text" {...register(`credits.${i}.assessmentYear`)} className="w-full px-3 py-2 border border-gray-300 text-black rounded" />
                    {errors.credits?.[i]?.assessmentYear && <p className="text-red-500 text-xs mt-1">{errors.credits?.[i]?.assessmentYear?.message as string}</p>}
                  </td>
                  <td className="border border-gray-300 text-black px-2 py-2">
                    <input type="number" step="0.01" {...register(`credits.${i}.grossB1`, { onChange: () => { recalcRow(i); recalcAll(); } })} className="w-full px-3 py-2 border border-gray-300 text-black rounded" placeholder="0.00" />
                    {errors.credits?.[i]?.grossB1 && <p className="text-red-500 text-xs mt-1">{errors.credits?.[i]?.grossB1?.message as string}</p>}
                  </td>
                  <td className="border border-gray-300 text-black px-2 py-2">
                    <input type="number" step="0.01" {...register(`credits.${i}.setoffEarlierB2`, { onChange: () => { recalcRow(i); recalcAll(); } })} className="w-full px-3 py-2 border border-gray-300 text-black rounded" placeholder="0.00" />
                    {errors.credits?.[i]?.setoffEarlierB2 && <p className="text-red-500 text-xs mt-1">{errors.credits?.[i]?.setoffEarlierB2?.message as string}</p>}
                  </td>
                  <td className="border border-gray-300 text-black px-2 py-2">
                    <input type="number" step="0.01" {...register(`credits.${i}.balanceBroughtB3`)} className="w-full px-3 py-2 border border-gray-300 text-black rounded bg-gray-50" placeholder="0.00" readOnly />
                  </td>
                  <td className="border border-gray-300 text-black px-2 py-2">
                    <input type="number" step="0.01" {...register(`credits.${i}.utilizedCurrentC`, { onChange: recalcAll })} className="w-full px-3 py-2 border border-gray-300 text-black rounded" placeholder="0.00" />
                    {errors.credits?.[i]?.utilizedCurrentC && <p className="text-red-500 text-xs mt-1">{errors.credits?.[i]?.utilizedCurrentC?.message as string}</p>}
                  </td>
                  <td className="border border-gray-300 text-black px-2 py-2">
                    <input type="number" step="0.01" {...register(`credits.${i}.balanceCarriedD`)} className="w-full px-3 py-2 border border-gray-300 text-black rounded bg-gray-50" placeholder="0.00" readOnly />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={recalcAll}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-green-700"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Auto Calculate
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">1. Tax under section 115JC</label>
              <input type="number" step="0.01" {...register('taxUnder115JC', { onChange: recalcAll })} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="0.00" />
              {errors.taxUnder115JC && <p className="mt-1 text-xs text-red-500">{errors.taxUnder115JC.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">2. Tax under other provisions</label>
              <input type="number" step="0.01" {...register('taxUnderOtherProvisions', { onChange: recalcAll })} className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="0.00" />
              {errors.taxUnderOtherProvisions && <p className="mt-1 text-xs text-red-500">{errors.taxUnderOtherProvisions.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">3. Amount of tax against which credit is available</label>
              <input type="number" step="0.01" {...register('taxAgainstWhichCreditAvailable')} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400" placeholder="0.00" readOnly />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">5. Credit utilized during the year (total of C)</label>
              <input type="number" step="0.01" {...register('totalUtilizedThisYear')} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400" placeholder="0.00" readOnly />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">6. AMT liability available for credit in subsequent years (total of D)</label>
              <input type="number" step="0.01" {...register('totalBalanceCarriedForward')} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400" placeholder="0.00" readOnly />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button type="button" onClick={onBack} className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">Back</button>
          <button type="submit" className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">Save Schedule AMTC</button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwoAMTC;
