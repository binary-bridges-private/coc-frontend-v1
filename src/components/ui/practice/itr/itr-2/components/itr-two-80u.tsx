import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schedule 80U: Self with disability / severe disability
const schedule80USchema = z.object({
  natureOfDisability: z
    .enum(['1', '2']) // 1=self with disability, 2=self with severe disability
    .refine((v) => !!v, { message: 'Nature of disability is required' }),
  dateOfFilingForm10IA: z
    .string()
    .optional()
    .refine((v) => !v || /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/.test(v), 'Use DD/MM/YYYY'),
  ackNoOfForm10IA: z.string().optional(),
  formAckNoAsPerRule: z.string().optional(),
  udidNumber: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((v) => !v || /^[A-Z0-9]{8,20}$/i.test(v), 'UDID should be 8-20 characters'),
  amount: z.string().optional(),
});

export type Schedule80UFormData = z.infer<typeof schedule80USchema>;

interface ItrTwo80UProps {
  onSave: (data: Schedule80UFormData) => void;
  onBack: () => void;
  initialData?: Schedule80UFormData;
}

const ItrTwo80U: React.FC<ItrTwo80UProps> = ({ onSave, onBack, initialData }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Schedule80UFormData>({
    resolver: zodResolver(schedule80USchema),
    defaultValues: initialData || {
      natureOfDisability: '1',
      dateOfFilingForm10IA: '',
      ackNoOfForm10IA: '',
      formAckNoAsPerRule: '',
      udidNumber: '',
      amount: '75000',
    }
  });

  const all = watch();

  const updateAmount = () => {
    const amt = all.natureOfDisability === '2' ? 125000 : 75000;
    setValue('amount', String(amt));
  };

  const onSubmit = (data: Schedule80UFormData) => {
    updateAmount();
    onSave(data);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Schedule 80U</h2>
        <p className="mt-1.5 text-sm text-gray-600">Details of deduction in case of a person with disability</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[180px]">Nature of disability</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[140px]">Date of filing of Form 10IA</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[140px]">Ack. No. of Form 10IA filed</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[180px]">Form Ack. No. as per Rule 11A(2)(ii) (if applicable)</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[140px]">UDID Number (if available)</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[120px]">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-2">
                  <select
                    {...register('natureOfDisability', { onChange: updateAmount })}
                    className="w-full min-w-[180px] px-4 py-2 border border-gray-300 rounded"
                  >
                    <option value="">Select...</option>
                    <option value="1">Self with disability</option>
                    <option value="2">Self with severe disability</option>
                  </select>
                  {errors.natureOfDisability && (
                    <p className="text-red-500 text-xs mt-1">{errors.natureOfDisability.message}</p>
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="text"
                    {...register('dateOfFilingForm10IA')}
                    className="w-full min-w-[140px] px-4 py-2 border border-gray-300 rounded"
                    placeholder="DD/MM/YYYY"
                  />
                  {errors.dateOfFilingForm10IA && (
                    <p className="text-red-500 text-xs mt-1">{errors.dateOfFilingForm10IA.message}</p>
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="text"
                    {...register('ackNoOfForm10IA')}
                    className="w-full min-w-[140px] px-4 py-2 border border-gray-300 rounded"
                    placeholder="Ack. No."
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="text"
                    {...register('formAckNoAsPerRule')}
                    className="w-full min-w-[180px] px-4 py-2 border border-gray-300 rounded"
                    placeholder="Form Ack. No."
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="text"
                    {...register('udidNumber')}
                    className="w-full min-w-[140px] px-4 py-2 border border-gray-300 rounded"
                    placeholder="UDID"
                    style={{ textTransform: 'uppercase' }}
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="number"
                    step={1}
                    {...register('amount')}
                    className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded bg-gray-50"
                    placeholder="0"
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
            Save Schedule 80U
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwo80U;
