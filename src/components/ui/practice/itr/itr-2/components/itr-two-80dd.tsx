import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation Schema
const dependentRowSchema = z.object({
  // 1 = disability; 2 = severe disability
  natureOfDisability: z
    .enum(['1', '2'])
    .refine((val) => !!val, { message: 'Nature of disability is required' }),
  typeOfDependent: z.string().min(1, 'Type of dependent is required'),
  panOfDependent: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((v) => !v || (v.trim().length === 10 && /^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(v.trim())), 'Invalid PAN format (e.g., ABCDE1234F)'),
  aadhaarOfDependent: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((v) => !v || /^\d{12}$/.test(v), 'Aadhaar must be 12 digits'),
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
  amountAvailable: z.string().optional(),
});

const schedule80DDSchema = z.object({
  dependents: z.array(dependentRowSchema).min(1, "At least one dependent is required"),
});

export type Schedule80DDFormData = z.infer<typeof schedule80DDSchema>;

interface ItrTwo80DDProps {
  onSave: (data: Schedule80DDFormData) => void;
  onBack: () => void;
  initialData?: Schedule80DDFormData;
}

const ItrTwo80DD: React.FC<ItrTwo80DDProps> = ({ onSave, onBack, initialData }) => {
  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<Schedule80DDFormData>({
    resolver: zodResolver(schedule80DDSchema),
    defaultValues: initialData || {
      dependents: [
        {
          natureOfDisability: '1',
          typeOfDependent: '',
          panOfDependent: '',
          aadhaarOfDependent: '',
          dateOfFilingForm10IA: '',
          ackNoOfForm10IA: '',
          formAckNoAsPerRule: '',
          udidNumber: '',
          amountAvailable: '75000',
        }
      ],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dependents'
  });

  const all = watch();

  // Auto-calculate deduction amount per row: 75,000 for disability, 1,25,000 for severe
  const updateAmountForRow = (index: number) => {
    const nature = all?.dependents?.[index]?.natureOfDisability;
    const amt = nature === '2' ? 125000 : 75000;
    setValue(`dependents.${index}.amountAvailable`, String(amt));
  };

  const recalcAll = () => {
    (fields || []).forEach((_, i) => updateAmountForRow(i));
  };

  const onSubmit = (data: Schedule80DDFormData) => {
    recalcAll();
    onSave(data);
  };

  const dependentTypes = [
    '1. Spouse',
    '2. Son',
    '3. Daughter',
    '4. Father',
    '5. Mother',
    '6. Brother',
    '7. Sister',
    'Member of HUF (in case of HUF)',
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Schedule 80DD</h2>
        <p className="mt-1.5 text-sm text-gray-600">Deduction for maintenance including medical treatment of a dependent person with disability</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[150px]">Nature of disability</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[150px]">Type of dependent</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[120px]">PAN of the dependent</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[120px]">Aadhaar No. of the dependent</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[140px]">Date of filing of Form 10IA</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[140px]">Ack. No. of Form 10IA filed</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[180px]">Form Ack. No. as per Rule 11A(2)(ii) (if applicable)</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[120px]">UDID Number (if available)</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-left min-w-[120px]">Amount available</th>
                <th className="border border-gray-300 text-black px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td className="border border-gray-300 px-2 py-2">
                    <select
                      {...register(`dependents.${index}.natureOfDisability`, {
                        onChange: () => updateAmountForRow(index),
                      })}
                      className="w-full min-w-[150px] px-4 py-2 border border-gray-300 rounded"
                    >
                      <option value="">Select...</option>
                      <option value="1">1. Dependent person with disability</option>
                      <option value="2">2. Dependent person with severe disability</option>
                    </select>
                    {errors.dependents?.[index]?.natureOfDisability && (
                      <p className="text-red-500 text-xs mt-1">{errors.dependents[index]?.natureOfDisability?.message}</p>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select
                      {...register(`dependents.${index}.typeOfDependent`)}
                      className="w-full min-w-[150px] px-4 py-2 border border-gray-300 rounded"
                    >
                      <option value="">Select...</option>
                      {dependentTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.dependents?.[index]?.typeOfDependent && (
                      <p className="text-red-500 text-xs mt-1">{errors.dependents[index]?.typeOfDependent?.message}</p>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      {...register(`dependents.${index}.panOfDependent`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="PAN"
                      maxLength={10}
                      style={{ textTransform: 'uppercase' }}
                      onBlur={(e) => {
                        e.target.value = e.target.value.trim();
                      }}
                    />
                    {errors.dependents?.[index]?.panOfDependent && (
                      <p className="text-red-500 text-xs mt-1">{errors.dependents[index]?.panOfDependent?.message}</p>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      {...register(`dependents.${index}.aadhaarOfDependent`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="Aadhaar"
                      maxLength={12}
                    />
                    {errors.dependents?.[index]?.aadhaarOfDependent && (
                      <p className="text-red-500 text-xs mt-1">{errors.dependents[index]?.aadhaarOfDependent?.message}</p>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      {...register(`dependents.${index}.dateOfFilingForm10IA`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="DD/MM/YYYY"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      {...register(`dependents.${index}.ackNoOfForm10IA`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="Ack. No."
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      {...register(`dependents.${index}.formAckNoAsPerRule`)}
                      className="w-full min-w-[150px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="Form Ack. No."
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      {...register(`dependents.${index}.udidNumber`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="UDID"
                      style={{ textTransform: 'uppercase' }}
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="1"
                      {...register(`dependents.${index}.amountAvailable`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded bg-gray-50"
                      placeholder="0"
                      readOnly
                    />
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
                <td colSpan={10} className="border border-gray-300 px-4 py-2">
                  <button
                    type="button"
                    onClick={() => append({
                      natureOfDisability: '1',
                      typeOfDependent: '',
                      panOfDependent: '',
                      aadhaarOfDependent: '',
                      dateOfFilingForm10IA: '',
                      ackNoOfForm10IA: '',
                      formAckNoAsPerRule: '',
                      udidNumber: '',
                      amountAvailable: '75000',
                    })}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Add Row
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
            Save Schedule 80DD
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwo80DD;
