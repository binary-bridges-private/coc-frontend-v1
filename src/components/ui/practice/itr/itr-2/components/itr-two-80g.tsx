import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

interface DonationRow {
  nameAndAddress: string;
  panOfDonee: string;
  donationInCash: string;
  donationInOtherMode: string;
  totalDonation: string;
  eligibleAmount: string;
}

interface DonationRowWithARN extends DonationRow {
  arnNumber: string;
}

interface Schedule80GFormData {
  // Section A: 100% deduction without qualifying limit
  sectionA: DonationRow[];
  
  // Section B: 50% deduction without qualifying limit
  sectionB: DonationRow[];
  
  // Section C: 100% deduction subject to qualifying limit
  sectionC: DonationRow[];
  
  // Section D: 50% deduction subject to qualifying limit
  sectionD: DonationRowWithARN[];
  
  // Section E: Total donations
  totalDonationsAiii: string;
  totalDonationsBiii: string;
  totalDonationsCiii: string;
  totalDonationsDiii: string;
  grandTotal: string;
}

interface ItrTwo80GProps {
  onSave: (data: Schedule80GFormData) => void;
  initialData?: Schedule80GFormData;
}

const ItrTwo80G: React.FC<ItrTwo80GProps> = ({ onSave, initialData }) => {
  const { register, control, handleSubmit, setValue, watch } = useForm<any>({
    defaultValues: initialData || {
      sectionA: [{ nameAndAddress: '', panOfDonee: '', donationInCash: '', donationInOtherMode: '', totalDonation: '', eligibleAmount: '' }],
      sectionB: [{ nameAndAddress: '', panOfDonee: '', donationInCash: '', donationInOtherMode: '', totalDonation: '', eligibleAmount: '' }],
      sectionC: [{ nameAndAddress: '', panOfDonee: '', donationInCash: '', donationInOtherMode: '', totalDonation: '', eligibleAmount: '' }],
      sectionD: [{ nameAndAddress: '', panOfDonee: '', arnNumber: '', donationInCash: '', donationInOtherMode: '', totalDonation: '', eligibleAmount: '' }],
      totalDonationsAiii: '',
      totalDonationsBiii: '',
      totalDonationsCiii: '',
      totalDonationsDiii: '',
      grandTotal: ''
    }
  });

  const { fields: fieldsA, append: appendA, remove: removeA } = useFieldArray<any, 'sectionA'>({
    control,
    name: 'sectionA'
  });

  const { fields: fieldsB, append: appendB, remove: removeB } = useFieldArray<any, 'sectionB'>({
    control,
    name: 'sectionB'
  });

  const { fields: fieldsC, append: appendC, remove: removeC } = useFieldArray<any, 'sectionC'>({
    control,
    name: 'sectionC'
  });

  const { fields: fieldsD, append: appendD, remove: removeD } = useFieldArray<any, 'sectionD'>({
    control,
    name: 'sectionD'
  });

  const watchAllFields = watch();

  // Calculate total donation for a row
  const calculateRowTotal = (section: string, index: number) => {
    const cash = parseFloat(watchAllFields[section]?.[index]?.donationInCash || '0');
    const other = parseFloat(watchAllFields[section]?.[index]?.donationInOtherMode || '0');
    const total = cash + other;
    setValue(`${section}.${index}.totalDonation`, total.toString());
    
    // Calculate eligible amount based on section type
    let eligible = 0;
    if (section === 'sectionA' || section === 'sectionC') {
      eligible = total; // 100% deduction
    } else if (section === 'sectionB' || section === 'sectionD') {
      eligible = total * 0.5; // 50% deduction
    }
    setValue(`${section}.${index}.eligibleAmount`, eligible.toString());
  };

  // Calculate section totals
  const calculateSectionTotal = (section: string, totalField: string) => {
    const donations = watchAllFields[section] || [];
    const total = donations.reduce((sum: number, row: any) => {
      return sum + (parseFloat(row.eligibleAmount) || 0);
    }, 0);
    setValue(totalField, total.toString());
    calculateGrandTotal();
  };

  // Calculate grand total
  const calculateGrandTotal = () => {
    const aiii = parseFloat(watchAllFields.totalDonationsAiii || '0');
    const biii = parseFloat(watchAllFields.totalDonationsBiii || '0');
    const ciii = parseFloat(watchAllFields.totalDonationsCiii || '0');
    const diii = parseFloat(watchAllFields.totalDonationsDiii || '0');
    const total = aiii + biii + ciii + diii;
    setValue('grandTotal', total.toString());
  };

  // Calculate all totals
  const calculateAll = () => {
    // Calculate all row totals for each section
    fieldsA.forEach((_, index) => calculateRowTotal('sectionA', index));
    fieldsB.forEach((_, index) => calculateRowTotal('sectionB', index));
    fieldsC.forEach((_, index) => calculateRowTotal('sectionC', index));
    fieldsD.forEach((_, index) => calculateRowTotal('sectionD', index));

    // Calculate section totals
    calculateSectionTotal('sectionA', 'totalDonationsAiii');
    calculateSectionTotal('sectionB', 'totalDonationsBiii');
    calculateSectionTotal('sectionC', 'totalDonationsCiii');
    calculateSectionTotal('sectionD', 'totalDonationsDiii');

    // Calculate grand total
    calculateGrandTotal();
  };

  const onSubmit = (data: Schedule80GFormData) => {
    calculateAll();
    onSave(data);
  };

  const renderDonationTable = (
    section: string,
    fields: any[],
    append: any,
    remove: any,
    title: string,
    showARN: boolean = false
  ) => (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left min-w-[200px]">Name and address of Donee</th>
              <th className="border border-gray-300 px-4 py-2 text-left min-w-[120px]">PAN of Donee</th>
              {showARN && (
                <th className="border border-gray-300 px-4 py-2 text-left min-w-[120px]">ARN (Donation Reference Number)</th>
              )}
              <th className="border border-gray-300 px-4 py-2 text-left min-w-[120px]">Donation in cash</th>
              <th className="border border-gray-300 px-4 py-2 text-left min-w-[120px]">Donation in other mode</th>
              <th className="border border-gray-300 px-4 py-2 text-left min-w-[120px]">Total Donation</th>
              <th className="border border-gray-300 px-4 py-2 text-left min-w-[120px]">Eligible Amount of donation</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field: any, index: number) => (
              <tr key={field.id}>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="text"
                    {...register(`${section}.${index}.nameAndAddress`)}
                    className="w-full min-w-[200px] px-4 py-2 border border-gray-300 rounded"
                    placeholder="Enter name and address"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="text"
                    {...register(`${section}.${index}.panOfDonee`)}
                    className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded"
                    placeholder="PAN"
                    maxLength={10}
                  />
                </td>
                {showARN && (
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      {...register(`${section}.${index}.arnNumber`)}
                      className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded"
                      placeholder="ARN"
                    />
                  </td>
                )}
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="number"
                    step="0.01"
                    {...register(`${section}.${index}.donationInCash`)}
                    className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded"
                    placeholder="0.00"
                    onChange={() => calculateRowTotal(section, index)}
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="number"
                    step="0.01"
                    {...register(`${section}.${index}.donationInOtherMode`)}
                    className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded"
                    placeholder="0.00"
                    onChange={() => calculateRowTotal(section, index)}
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="number"
                    step="0.01"
                    {...register(`${section}.${index}.totalDonation`)}
                    className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded bg-gray-50"
                    placeholder="0.00"
                    readOnly
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <input
                    type="number"
                    step="0.01"
                    {...register(`${section}.${index}.eligibleAmount`)}
                    className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded bg-gray-50"
                    placeholder="0.00"
                    readOnly
                  />
                </td>
                <td className="border border-gray-300 px-2 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50">
              <td colSpan={showARN ? 8 : 7} className="border border-gray-300 px-4 py-2">
                <button
                  type="button"
                  onClick={() => {
                    const newRow = showARN
                      ? { nameAndAddress: '', panOfDonee: '', arnNumber: '', donationInCash: '', donationInOtherMode: '', totalDonation: '', eligibleAmount: '' }
                      : { nameAndAddress: '', panOfDonee: '', donationInCash: '', donationInOtherMode: '', totalDonation: '', eligibleAmount: '' };
                    append(newRow);
                  }}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Add Row
                </button>
              </td>
            </tr>
            <tr className="bg-gray-100 font-semibold">
              <td colSpan={showARN ? 6 : 5} className="border border-gray-300 px-4 py-2 text-right">
                Total:
              </td>
              <td className="border border-gray-300 px-2 py-2">
                <input
                  type="number"
                  step="0.01"
                  {...register(section === 'sectionA' ? 'totalDonationsAiii' : 
                              section === 'sectionB' ? 'totalDonationsBiii' : 
                              section === 'sectionC' ? 'totalDonationsCiii' : 'totalDonationsDiii')}
                  className="w-full min-w-[120px] px-4 py-2 border border-gray-300 rounded bg-gray-50"
                  placeholder="0.00"
                  readOnly
                />
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    const totalField = section === 'sectionA' ? 'totalDonationsAiii' : 
                                      section === 'sectionB' ? 'totalDonationsBiii' : 
                                      section === 'sectionC' ? 'totalDonationsCiii' : 'totalDonationsDiii';
                    calculateSectionTotal(section, totalField);
                  }}
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
  );

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Schedule 80G - Details of donations entitled for deduction under section 80G</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section A: 100% deduction without qualifying limit */}
        {renderDonationTable(
          'sectionA',
          fieldsA,
          appendA,
          removeA,
          'A. Donations entitled for 100% deduction without qualifying limit'
        )}

        {/* Section B: 50% deduction without qualifying limit */}
        {renderDonationTable(
          'sectionB',
          fieldsB,
          appendB,
          removeB,
          'B. Donations entitled for 50% deduction without qualifying limit'
        )}

        {/* Section C: 100% deduction subject to qualifying limit */}
        {renderDonationTable(
          'sectionC',
          fieldsC,
          appendC,
          removeC,
          'C. Donations entitled for 100% deduction subject to qualifying limit'
        )}

        {/* Section D: 50% deduction subject to qualifying limit */}
        {renderDonationTable(
          'sectionD',
          fieldsD,
          appendD,
          removeD,
          'D. Donations entitled for 50% deduction subject to qualifying limit',
          true
        )}

        {/* Section E: Total donations */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4">E. Total donations (Aiii + Biii + Ciii + Diii)</h3>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Grand Total:</label>
            <input
              type="number"
              step="0.01"
              {...register('grandTotal')}
              className="w-48 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400"
              placeholder="0.00"
              readOnly
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={calculateAll}
            className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            Calculate All Totals
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Save Schedule 80G
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwo80G;
