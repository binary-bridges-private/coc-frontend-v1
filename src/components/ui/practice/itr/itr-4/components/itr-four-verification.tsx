import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define the schema for Schedule TDS-2 and Verification
const verificationSchema = z.object({
  // Schedule TDS-2: Tax Deducted at Source on Income Other Than Salary
  tds2_rows: z.array(z.object({
    sl: z.string().optional().or(z.literal('')),
    tanDeductor: z.string().optional().or(z.literal('')),
    nameDeductor: z.string().optional().or(z.literal('')),
    unclaimed: z.string().optional().or(z.literal('')),
    finYearDeducted: z.string().optional().or(z.literal('')),
    tdsDeducted: z.string().optional().or(z.literal('')),
    tdsClaimed: z.string().optional().or(z.literal('')),
    grossAmount: z.string().optional().or(z.literal('')),
    headOfIncome: z.string().optional().or(z.literal('')),
  })).optional(),
  
  // Verification Section
  verification_place: z.string().optional().or(z.literal('')),
  verification_date: z.string().optional().or(z.literal('')),
  verification_declaration: z.enum(['yes']).optional().or(z.literal('')),
  
  // Tax Return Preparer (TRP) Details
  trp_used: z.enum(['yes', 'no']).optional().or(z.literal('')),
  trp_pin: z.string().optional().or(z.literal('')),
  trp_name: z.string().optional().or(z.literal('')),
  trp_counterSignature: z.string().optional().or(z.literal('')),
  trp_amount: z.string().optional().or(z.literal('')),
}).superRefine((data, ctx) => {
  // Validate TRP fields if TRP is used
  if (data.trp_used === 'yes') {
    if (!data.trp_pin || data.trp_pin.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'TRP PIN is required when using Tax Return Preparer',
        path: ['trp_pin'],
      });
    }
    if (!data.trp_name || data.trp_name.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'TRP Name is required when using Tax Return Preparer',
        path: ['trp_name'],
      });
    }
  }
});

export type VerificationFormData = z.infer<typeof verificationSchema>;

interface VerificationProps {
  onNext: () => void;
  onBack: () => void;
  onSave?: (data: VerificationFormData) => void;
  initialData?: Partial<VerificationFormData>;
}

const ItrFourVerification: React.FC<VerificationProps> = ({
  onNext,
  onBack,
  onSave,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: VerificationFormData) => {
    if (onSave) {
      onSave(data);
    }
    onNext();
  };

  const handleSaveProgress = () => {
    const data = watch();
    if (onSave) {
      onSave(data as VerificationFormData);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;
  const trpUsed = watch('trp_used');

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-xl border border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Schedule TDS-2 & Verification
        </h2>
        <p className="text-sm text-gray-600">
          Tax Deducted at Source on Income Other Than Salary and Final Verification
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Error Summary Banner */}
        {hasErrors && (
          <div className="rounded-xl border-2 border-red-300 bg-red-50 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-900">
                  Please correct the following errors ({Object.keys(errors).length})
                </h3>
                <ul className="mt-2 space-y-1 text-xs text-red-800">
                  {Object.entries(errors).slice(0, 5).map(([key, error]) => (
                    <li key={key} className="flex items-start gap-2">
                      <span className="mt-0.5">•</span>
                      <span>
                        <strong className="font-medium">{key.replace(/([A-Z_])/g, ' $1').trim()}:</strong>{' '}
                        {error?.message as string}
                      </span>
                    </li>
                  ))}
                  {Object.keys(errors).length > 5 && (
                    <li className="text-red-700">
                      ... and {Object.keys(errors).length - 5} more error(s)
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Schedule TDS-2 Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Schedule TDS-2: Details of Tax Deducted at Source on Income Other Than Salary
          </h3>
          <p className="mb-4 text-xs text-gray-600">
            [As per Form 16A issued or Form 16C or Form 16D furnished by Deductor(s)]
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold" rowSpan={2}>S. No.</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold" rowSpan={2}>
                    TAN / Section of the tender Deductor which claims exemption from obtaining TAN / PAN (deductor Aadhar) (if TAN is not available)
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold" rowSpan={2}>Name of the Deductor</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold" rowSpan={2}>
                    Unclaimed TDS brought forward (b-f)
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold" rowSpan={2}>
                    TDS (Fin. Year) / Year only if corresponding receipt is being offered for tax in the current Fin. Year and in which TDS is deducted u/s [94(k)]
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold" rowSpan={2}>
                    Corresponding Receipt/ withdrawals offered for tax in current Fin. Year only if corresponding receipt is being offered for tax in the current FIN. Year and TDS is deducted u/s [94(k)]
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold" rowSpan={2}>TDS credit being claimed this Year</th>
                  <th className="border border-gray-300 px-2 py-2 text-center font-semibold" colSpan={2}>
                    Fin. Year in which deducted
                  </th>
                </tr>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(2a)</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(2b)</th>
                </tr>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(1)</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(2a)</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(2b)</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(3)</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(4)</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(5)</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(6)</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(7)</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(8)</th>
                  <th className="border border-gray-300 px-2 py-2 text-left font-semibold">(9)</th>
                </tr>
              </thead>
              <tbody>
                {/* Row i */}
                <tr>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="i"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="TAN/PAN/Aadhaar"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Name of Deductor"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="Unclaimed"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Fin. Year"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="TDS Deducted"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="TDS Claimed"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="Gross Amount"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Head"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="(9)"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                </tr>

                {/* Row ii */}
                <tr>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="ii"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="TAN/PAN/Aadhaar"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Name of Deductor"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="Unclaimed"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Fin. Year"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="TDS Deducted"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="TDS Claimed"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      placeholder="Gross Amount"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="Head"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      placeholder="(9)"
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-gray-700">
            <strong>NOTE:</strong> Enter the total of column 6 of Schedule-TDS2 and column 4 of Schedule-TDS1 in D15
          </div>
        </div>

        {/* Verification Section */}
        <div className="rounded-xl border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-md">
          <h3 className="mb-4 text-xl font-bold text-gray-900">
            VERIFICATION
          </h3>

          <div className="space-y-4">
            <div className="rounded-lg border border-gray-300 bg-white p-4">
              <p className="mb-4 text-sm leading-relaxed text-gray-800">
                I, <strong>[Name]</strong>, solemnly declare that to the best of my knowledge and belief, the information given in the return is correct and complete and is in accordance with the provisions of the Income-tax Act, 1961. I further declare that I am making this return in my capacity as{' '}
                <strong>(designation)</strong> and I am also competent to make this return and verify it. I am holding permanent account number{' '}
                <strong>(if allotted)</strong>{' '}
                <em>(Please see instruction)</em>
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Place:
                  </label>
                  <input
                    type="text"
                    {...register('verification_place')}
                    placeholder="Enter place"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.verification_place && (
                    <p className="mt-1 text-xs text-red-600">{errors.verification_place.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Date:
                  </label>
                  <input
                    type="date"
                    {...register('verification_date')}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.verification_date && (
                    <p className="mt-1 text-xs text-red-600">{errors.verification_date.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 p-3">
                <input
                  type="checkbox"
                  {...register('verification_declaration')}
                  value="yes"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label className="text-sm font-medium text-gray-900">
                  I hereby declare that the information provided is true and correct to the best of my knowledge
                </label>
              </div>

              <div className="mt-4 flex justify-end">
                <div className="w-64 border-t-2 border-gray-400 pt-2 text-center">
                  <p className="text-xs font-semibold text-gray-700">Signature here →</p>
                </div>
              </div>
            </div>

            {/* Tax Return Preparer Section */}
            <div className="rounded-lg border border-purple-300 bg-purple-50 p-4">
              <h4 className="mb-3 text-base font-semibold text-gray-900">
                If the return has been prepared by a Tax Return Preparer (TRP) give further details as below:
              </h4>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Was this return prepared by a Tax Return Preparer (TRP)?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register('trp_used')}
                      value="yes"
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-900">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...register('trp_used')}
                      value="no"
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-900">No</span>
                  </label>
                </div>
              </div>

              {trpUsed === 'yes' && (
                <div className="space-y-4 rounded-lg border border-purple-200 bg-white p-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        TRP PIN (10 Digit)
                      </label>
                      <input
                        type="text"
                        {...register('trp_pin')}
                        placeholder="Enter 10-digit TRP PIN"
                        maxLength={10}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      {errors.trp_pin && (
                        <p className="mt-1 text-xs text-red-600">{errors.trp_pin.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Name of TRP
                      </label>
                      <input
                        type="text"
                        {...register('trp_name')}
                        placeholder="Enter TRP name"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      {errors.trp_name && (
                        <p className="mt-1 text-xs text-red-600">{errors.trp_name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Counter Signature of TRP
                      </label>
                      <input
                        type="text"
                        {...register('trp_counterSignature')}
                        placeholder="Counter Signature"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Amount to be paid to TRP:
                      </label>
                      <input
                        type="number"
                        {...register('trp_amount')}
                        placeholder="₹ 0"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            ← Back
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSaveProgress}
              className="rounded-lg border border-blue-300 bg-blue-50 px-6 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              💾 Save Progress
            </button>
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-8 py-2.5 text-sm font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Complete ITR-4 Filing ✓
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ItrFourVerification;
