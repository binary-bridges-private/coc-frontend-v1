import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Complete Schedule SI rows as per ITR-2 form
const SI_ROWS = [
  // Section 1: 11E (prior years provident fund)
  { code: 'si-1', label: '11E- Accumulated balance of recognized provident fund for prior years', rate: 0 },
  
  // Section 2-2b: 111A provisions
  { code: 'si-2', label: '111A or section 115AD(1)(b)(ii)- Proviso (STCG on shares emits on which STT is paid) [where transfer was before 23rd July 2024 as applicable]', rate: 15 },
  { code: 'si-2b', label: '111A or section 115AD(1)(b)(ii)- Proviso (STCG on shares emits on which STT is paid) [where transfer was on or after 23rd July 2024 as applicable]', rate: 20 },
  
  // Section 3: 115AD STCG for FIIs
  { code: 'si-3', label: '115AD (STCG for FIIs on securities where STT not paid)', rate: 30 },
  
  // Section 4-4b: Proviso to 112(1) (LTCG on listed securities/units with indexation)
  { code: 'si-4', label: 'Proviso to 112(1) (LTCG on listed securities/ units with indexation) [where transfer was before 23rd July 2024 as applicable and tax thereon after taking into account SL no. RS(i)(B) of Schedule CG, if any]', rate: 20 },
  { code: 'si-4b', label: '112(1) (LTCG on listed securities/ units) [where transfer was on or after 23rd July 2024 as applicable]', rate: 12.5 },
  
  // Section 5a-5b: 112(1)(c)(iii) (LTCG for non-resident on unlisted securities)
  { code: 'si-5a', label: '112(1)(c)(iii) (LTCG for non-resident on unlisted securities or other than listed debentures) [where transfer was before 23rd July 2024 as applicable]', rate: 10 },
  { code: 'si-5b', label: '112(1)(c)(iii) (LTCG for non-resident on unlisted securities) [where transfer was on or after 23rd July 2024 as applicable]', rate: 12.5 },
  
  // Section 6a-6b: 115AC (LTCG for non-resident on bonds/GDR)
  { code: 'si-6a', label: '115AC (LTCG for non-resident on bonds/GDR) [where transfer was before 23rd July 2024 as applicable]', rate: 10 },
  { code: 'si-6b', label: '115AC (LTCG for non-resident on bonds/GDR) [where transfer was on or after 23rd July 2024 as applicable]', rate: 12.5 },
  
  // Section 7a-7b: 115ACA (LTCG for an employee of specified company on GDR)
  { code: 'si-7a', label: '115ACA (LTCG for an employee of specified company on GDR) [where transfer was before 23rd July 2024 as applicable]', rate: 10 },
  { code: 'si-7b', label: '115ACA (LTCG for an employee of specified company on GDR) [where transfer was on or after 23rd July 2024 as applicable]', rate: 12.5 },
  
  // Section 8: 115AD (LTCG for FIIs on securities)
  { code: 'si-8', label: '115AD (LTCG for FIIs on securities)', rate: 10 },
  
  // Section 9a-9b: 115E (LTCG for non-resident Indian on foreign exchange asset)
  { code: 'si-9a', label: '115E (LTCG for non-resident Indian on foreign exchange asset) [where transfer was before 23rd July 2024 as applicable]', rate: 10 },
  { code: 'si-9b', label: '115E (LTCG for non-resident Indian on foreign exchange asset) [where transfer was on or after 23rd July 2024 as applicable]', rate: 12.5 },
  
  // Section 10a-10b: 112 (LTCG on others)
  { code: 'si-10a', label: '112 (LTCG on others) [where transfer / event was before 23rd July 2024 as applicable]', rate: 20 },
  { code: 'si-10b', label: '112 (LTCG on others) [where transfer / event was on or after 23rd July 2024 as applicable] and tax thereon after taking into account Sl. no. 2- first of Schedule CG, if any.', rate: 12.5 },
  
  // Section 11a-11b: 112A or section 115AD(1)(b)(iii)- Proviso (LTCG on sale of shares)
  { code: 'si-11a', label: '112A or section 115AD(1)(b)(iii)- Proviso (LTCG on sale of shares or units on which STT is paid) [where transfer was before 23rd July 2024 as applicable]', rate: 10 },
  { code: 'si-11b', label: '112A or section 115AD(1)(b)(iii)- Proviso (LTCG on sale of shares or units on which STT is paid) [where transfer was on or after 23rd July 2024 as applicable]', rate: 12.5 },
  
  // Section 12: STCG Chargeable at special rates in India as per DTAA
  { code: 'si-12', label: 'STCG Chargeable at special rates in India as per DTAA', rate: 0 },
  
  // Section 13: LTCG Chargeable at special rates in India as per DTAA
  { code: 'si-13', label: 'LTCG Chargeable at special rates in India as per DTAA', rate: 0 },
  
  // Section 14a-14c: Winnings
  { code: 'si-14a', label: '115BB (Winnings from lotteries, puzzles, races, games etc.)', rate: 30 },
  { code: 'si-14b', label: '115BBJ (Winnings from online games)', rate: 30 },
  { code: 'si-15', label: '115BBE (Income under section 68, 69, 69A, 69B, 69C or 69D)', rate: 60 },
  
  // Section 16: Virtual Digital Asset
  { code: 'si-16', label: '115BBH (Income from transfer of Virtual Digital Asset)', rate: 30 },
  
  // Section 17-18: Tax on income
  { code: 'si-17', label: '115BBF (Tax on income from patent)', rate: 10 },
  { code: 'si-18', label: '115BBG (Tax on income from transfer of carbon credits)', rate: 10 },
  
  // Section 19: Any other income chargeable at special rate
  { code: 'si-19', label: 'Any other income chargeable at special rate (Drop down to be provided in e-filing utility)', rate: 0 },
  
  // Section 20: Other source of income chargeable at special rates in India as per DTAA
  { code: 'si-20', label: 'Other source of income chargeable at special rates in India as per DTAA', rate: 0 },
  
  // Section 21a-21c: Pass Through Income - STCG @ 15%
  { code: 'si-21a', label: 'Pass Through Income in the nature of Short Term Capital Gain chargeable @ 15%', rate: 15 },
  { code: 'si-21b', label: 'Pass Through Income in the nature of Short Term Capital Gain chargeable @ 20%', rate: 20 },
  { code: 'si-21c', label: 'Pass Through Income in the nature of Short Term Capital Gain chargeable @ 30%', rate: 30 },
  
  // Section 23a-23d: Pass Through Income - LTCG various rates
  { code: 'si-23a', label: 'Pass Through Income in the nature of Long Term Capital Gains chargeable @ 10% u/s 112A', rate: 10 },
  { code: 'si-23b', label: 'Pass Through Income in the nature of Long Term Capital Gains chargeable @ 12.5% u/s 112A', rate: 12.5 },
  { code: 'si-24a', label: 'Pass Through Income in the nature of Long Term Capital Gains chargeable @ 10%- under sections other than u/s 112A', rate: 10 },
  { code: 'si-24b', label: 'Pass Through Income in the nature of Long Term Capital Gains chargeable @ 12.5% under sections other than u/s 112A', rate: 12.5 },
  { code: 'si-25', label: 'Pass Through Income in the nature of Long Term Capital Gains chargeable @ 20%', rate: 20 },
  
  // Section 26: Pass through income from other sources
  { code: 'si-26', label: 'Pass through income in the nature of income from other sources chargeable at special rates (Drop down to be provided in e-filing utility)', rate: 0 },
];

const siRowSchema = z.object({
  code: z.string(),
  selected: z.boolean(),
  income: z
    .string()
    .optional()
    .refine((v) => !v || /^\d+(\.\d{1,2})?$/.test(v), 'Invalid number'),
  tax: z.string().optional(),
});

const scheduleSISchema = z.object({
  rows: z
    .array(siRowSchema)
    .min(1)
    .superRefine((rows, ctx) => {
      rows.forEach((r, i) => {
        if (r.selected && (!r.income || r.income === '0')) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['rows', i, 'income'],
            message: 'Income required when selected',
          });
        }
      });
    }),
  totalIncome: z.string().optional(),
  totalTax: z.string().optional(),
});

export type ScheduleSIFormData = z.infer<typeof scheduleSISchema>;

interface ItrTwoSIProps {
  onSave: (data: ScheduleSIFormData) => void;
  onBack: () => void;
  initialData?: ScheduleSIFormData;
}

const ItrTwoSI: React.FC<ItrTwoSIProps> = ({ onSave, onBack, initialData }) => {
  const { control, register, watch, setValue, handleSubmit, formState: { errors } } = useForm<ScheduleSIFormData>({
    resolver: zodResolver(scheduleSISchema),
    defaultValues: initialData || {
  rows: SI_ROWS.map(r => ({ code: r.code, selected: false, income: '', tax: '' })),
      totalIncome: '0',
      totalTax: '0'
    }
  });

  const { fields } = useFieldArray({ control, name: 'rows' });
  const all = watch();

  const recalc = () => {
    let totalIncome = 0;
    let totalTax = 0;
    fields.forEach((f, idx) => {
      const def = SI_ROWS.find(r => r.code === f.code);
      const selected = all.rows?.[idx]?.selected;
      const incomeVal = parseFloat(all.rows?.[idx]?.income || '0');
      if (selected && def && incomeVal > 0) {
        const rate = def.rate;
        const tax = +(incomeVal * (rate / 100)).toFixed(2);
        setValue(`rows.${idx}.tax`, String(tax));
        totalIncome += incomeVal;
        totalTax += tax;
      } else {
        setValue(`rows.${idx}.tax`, '');
      }
    });
    setValue('totalIncome', String(totalIncome));
    setValue('totalTax', String(totalTax));
  };

  useEffect(() => {
    recalc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(all.rows)]);

  const onSubmit = (data: ScheduleSIFormData) => {
    recalc();
    onSave(data);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Schedule SI</h2>
        <p className="text-gray-600">Income chargeable to tax at special rates</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2">#</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Section / Description</th>
                <th className="border border-gray-300 px-3 py-2">Select</th>
                <th className="border border-gray-300 px-3 py-2">Rate %</th>
                <th className="border border-gray-300 px-3 py-2 min-w-[140px] text-left">Income (i)</th>
                <th className="border border-gray-300 px-3 py-2 min-w-[140px] text-left">Tax thereon (ii)</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, idx) => {
                const meta = SI_ROWS.find(r => r.code === field.code)!;
                return (
                  <tr key={field.id} className={all.rows?.[idx]?.selected ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-3 py-2">{idx + 1}</td>
                    <td className="border border-gray-300 px-3 py-2 text-left">
                      <div className="font-medium text-gray-800">{meta.label}</div>
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      <input
                        type="checkbox"
                        {...register(`rows.${idx}.selected`)}
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">{meta.rate}</td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        step="0.01"
                        {...register(`rows.${idx}.income`, { onChange: recalc })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        placeholder="0.00"
                        disabled={!all.rows?.[idx]?.selected}
                      />
                      {errors.rows?.[idx]?.income && (
                        <p className="text-red-500 text-[11px] mt-1">{errors.rows[idx]?.income?.message}</p>
                      )}
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        step="0.01"
                        {...register(`rows.${idx}.tax`)}
                        className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50"
                        placeholder="0.00"
                        readOnly
                      />
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-semibold">
                <td className="border border-gray-300 px-3 py-2 text-right" colSpan={4}>Total</td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="number"
                    step="0.01"
                    {...register('totalIncome')}
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50"
                    readOnly
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="number"
                    step="0.01"
                    {...register('totalTax')}
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50"
                    readOnly
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex gap-4 mt-8">
          <button type="button" onClick={onBack} className="px-6 py-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-semibold">Back</button>
          <button type="submit" className="px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 font-semibold">Save Schedule SI</button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwoSI;
