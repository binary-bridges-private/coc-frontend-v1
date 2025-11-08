import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation Schema
const donationRowSchema = z.object({
  relevantClause: z.string().min(1, "Relevant clause is required"),
  nameAndAddress: z.string().min(1, "Name and address of donee is required"),
  panOfDonee: z.string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN format")
    .optional()
    .or(z.literal('')),
  donationInCash: z.string().optional(),
  donationInOtherMode: z.string().optional(),
  totalDonation: z.string().optional(),
  eligibleAmount: z.string().optional(),
});

const schedule80GGASchema = z.object({
  donations: z.array(donationRowSchema).min(1, "At least one donation is required"),
  totalDonation: z.string().optional(),
});

export type Schedule80GGAFormData = z.infer<typeof schedule80GGASchema>;

interface ItrTwo80GGAProps {
  onSave: (data: Schedule80GGAFormData) => void;
  onBack: () => void;
  initialData?: Schedule80GGAFormData;
}

const ItrTwo80GGA: React.FC<ItrTwo80GGAProps> = ({ onSave, onBack, initialData }) => {
  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<Schedule80GGAFormData>({
    resolver: zodResolver(schedule80GGASchema),
    defaultValues: initialData || {
      donations: [
        {
          relevantClause: '',
          nameAndAddress: '',
          panOfDonee: '',
          donationInCash: '',
          donationInOtherMode: '',
          totalDonation: '',
          eligibleAmount: '',
        }
      ],
      totalDonation: '',
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'donations'
  });

  const watchAllFields = watch();

  // Calculate row total
  const calculateRowTotal = (index: number) => {
    const cash = parseFloat(watchAllFields.donations?.[index]?.donationInCash || '0');
    const other = parseFloat(watchAllFields.donations?.[index]?.donationInOtherMode || '0');
    const total = cash + other;
    setValue(`donations.${index}.totalDonation`, total.toString());
    setValue(`donations.${index}.eligibleAmount`, total.toString());
    calculateGrandTotal();
  };

  // Calculate grand total
  const calculateGrandTotal = () => {
    const donations = watchAllFields.donations || [];
    const total = donations.reduce((sum: number, row: any) => {
      return sum + (parseFloat(row.eligibleAmount) || 0);
    }, 0);
    setValue('totalDonation', total.toString());
  };

  // Calculate all
  const calculateAll = () => {
    fields.forEach((_, index) => calculateRowTotal(index));
    calculateGrandTotal();
  };

  const onSubmit = (data: Schedule80GGAFormData) => {
    calculateAll();
    onSave(data);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Schedule 80GGA</h2>
        <p className="mt-1.5 text-sm text-gray-600">Details of donations for scientific research or rural development</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border text-black border-gray-300 px-4 py-3 text-left min-w-[80px]">S. No.</th>
                <th className="border text-black border-gray-300 px-4 py-3 text-left min-w-[200px]">
                  Relevant clause under which deduction is claimed (drop down to be provided)
                </th>
                <th className="border text-black border-gray-300 px-4 py-3 text-left min-w-[200px]">Name and address of Donee</th>
                <th className="border text-black border-gray-300 px-4 py-3 text-left min-w-[120px]">PAN of Donee</th>
                <th className="border text-black border-gray-300 px-4 py-3 text-left min-w-[120px]">Donation in cash</th>
                <th className="border text-black border-gray-300 px-4 py-3 text-left min-w-[120px]">Donation in other mode</th>
                <th className="border text-black border-gray-300 px-4 py-3 text-left min-w-[120px]">Total Donation</th>
                <th className="border text-black border-gray-300 px-4 py-3 text-left min-w-[120px]">Eligible Amount of donation</th>
                <th className="border text-black border-gray-300 px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index === 0 ? 'i' : 'ii'}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      {...register(`donations.${index}.relevantClause`)}
                      className="w-full min-w-[200px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="Enter relevant clause"
                    />
                    {errors.donations?.[index]?.relevantClause && (
                      <p className="text-red-500 text-xs mt-1">{errors.donations[index]?.relevantClause?.message}</p>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      {...register(`donations.${index}.nameAndAddress`)}
                      className="w-full min-w-[200px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="Enter name and address"
                    />
                    {errors.donations?.[index]?.nameAndAddress && (
                      <p className="text-red-500 text-xs mt-1">{errors.donations[index]?.nameAndAddress?.message}</p>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      {...register(`donations.${index}.panOfDonee`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="PAN"
                      maxLength={10}
                    />
                    {errors.donations?.[index]?.panOfDonee && (
                      <p className="text-red-500 text-xs mt-1">{errors.donations[index]?.panOfDonee?.message}</p>
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register(`donations.${index}.donationInCash`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="0.00"
                      onChange={() => calculateRowTotal(index)}
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register(`donations.${index}.donationInOtherMode`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="0.00"
                      onChange={() => calculateRowTotal(index)}
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register(`donations.${index}.totalDonation`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded bg-gray-50"
                      placeholder="0.00"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register(`donations.${index}.eligibleAmount`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded bg-gray-50"
                      placeholder="0.00"
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
                <td colSpan={9} className="border border-gray-300 px-4 py-2">
                  <button
                    type="button"
                    onClick={() => append({
                      relevantClause: '',
                      nameAndAddress: '',
                      panOfDonee: '',
                      donationInCash: '',
                      donationInOtherMode: '',
                      totalDonation: '',
                      eligibleAmount: '',
                    })}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Add Row
                  </button>
                </td>
              </tr>
              <tr className="bg-gray-100 font-semibold">
                <td colSpan={7} className="border border-gray-300 px-4 py-2 text-right">
                  Total donation
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="number"
                    step="0.01"
                    {...register('totalDonation')}
                    className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded bg-gray-50"
                    placeholder="0.00"
                    readOnly
                  />
                </td>
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
            Save Schedule 80GGA
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwo80GGA;
