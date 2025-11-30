import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { ITR7ScheduleFSIData } from './itr-7-schedule-fsi.types.ts';

export interface Itr7ScheduleFSIProps {
  form: UseFormReturn<ITR7ScheduleFSIData>;
}

const NumberInput: React.FC<{
  name: any;
  form: UseFormReturn<ITR7ScheduleFSIData>;
  className?: string;
  disabled?: boolean;
}> = ({ name, form, className, disabled }) => (
  <input
    type="number"
    disabled={disabled}
    className={`w-full border rounded px-2 py-1 text-sm ${disabled ? 'bg-gray-100' : ''} ${className ?? ''}`}
    {...form.register(name, { valueAsNumber: true })}
  />
);

const TextInput: React.FC<{
  name: any;
  form: UseFormReturn<ITR7ScheduleFSIData>;
  className?: string;
}> = ({ name, form, className }) => (
  <input
    type="text"
    className={`w-full border rounded px-2 py-1 text-sm ${className ?? ''}`}
    {...form.register(name)}
  />
);

const Itr7ScheduleFSI: React.FC<Itr7ScheduleFSIProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'scheduleFSI.income_details',
  });

  const scheduleData = useWatch({ control: form.control, name: 'scheduleFSI' });

  useEffect(() => {
    if (!scheduleData?.income_details) return;

    scheduleData.income_details.forEach((item, index) => {
      // Calculate totals for each country
      const totalIncome = 
        (Number(item.house_property?.income_outside_india) || 0) +
        (Number(item.business_profession?.income_outside_india) || 0) +
        (Number(item.capital_gains?.income_outside_india) || 0) +
        (Number(item.other_sources?.income_outside_india) || 0);
      
      const totalTaxPaid = 
        (Number(item.house_property?.tax_paid_outside_india) || 0) +
        (Number(item.business_profession?.tax_paid_outside_india) || 0) +
        (Number(item.capital_gains?.tax_paid_outside_india) || 0) +
        (Number(item.other_sources?.tax_paid_outside_india) || 0);

      const totalTaxPayable = 
        (Number(item.house_property?.tax_payable_normal_provisions) || 0) +
        (Number(item.business_profession?.tax_payable_normal_provisions) || 0) +
        (Number(item.capital_gains?.tax_payable_normal_provisions) || 0) +
        (Number(item.other_sources?.tax_payable_normal_provisions) || 0);

      const totalRelief = 
        (Number(item.house_property?.tax_relief_available) || 0) +
        (Number(item.business_profession?.tax_relief_available) || 0) +
        (Number(item.capital_gains?.tax_relief_available) || 0) +
        (Number(item.other_sources?.tax_relief_available) || 0);

      form.setValue(`scheduleFSI.income_details.${index}.total.income_outside_india`, totalIncome);
      form.setValue(`scheduleFSI.income_details.${index}.total.tax_paid_outside_india`, totalTaxPaid);
      form.setValue(`scheduleFSI.income_details.${index}.total.tax_payable_normal_provisions`, totalTaxPayable);
      form.setValue(`scheduleFSI.income_details.${index}.total.tax_relief_available`, totalRelief);
    });
  }, [scheduleData, form]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule FSI</h2>
        <p className="text-sm text-gray-600 mb-4 font-semibold">
          Details of Income from outside India and tax relief (available only in case of resident)
        </p>

        {fields.map((field, index) => (
          <div key={field.id} className="mb-8 border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Country {index + 1}</h3>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Country Code</label>
                <TextInput name={`scheduleFSI.income_details.${index}.country_code`} form={form} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Taxpayer Identification Number</label>
                <TextInput name={`scheduleFSI.income_details.${index}.taxpayer_identification_number`} form={form} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-collapse border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 py-2 border">Sl.</th>
                    <th className="px-2 py-2 border">Head of income</th>
                    <th className="px-2 py-2 border">Income from outside India (included in PART B-TI) (b)</th>
                    <th className="px-2 py-2 border">Tax paid outside India (c)</th>
                    <th className="px-2 py-2 border">Tax payable on such income under normal provisions in India (d)</th>
                    <th className="px-2 py-2 border">Tax relief available in India (e)= (c) or (d) whichever is lower</th>
                    <th className="px-2 py-2 border">Relevant article of DTAA if relief claimed u/s 90 or 90A (f)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* House Property */}
                  <tr className="bg-white">
                    <td className="px-2 py-2 border text-center">i</td>
                    <td className="px-2 py-2 border">House Property</td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.house_property.income_outside_india`} form={form} /></td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.house_property.tax_paid_outside_india`} form={form} /></td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.house_property.tax_payable_normal_provisions`} form={form} /></td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.house_property.tax_relief_available`} form={form} /></td>
                    <td className="px-2 py-2 border"><TextInput name={`scheduleFSI.income_details.${index}.house_property.relevant_article_dtaa`} form={form} /></td>
                  </tr>
                  {/* Business or Profession */}
                  <tr className="bg-white">
                    <td className="px-2 py-2 border text-center">ii</td>
                    <td className="px-2 py-2 border">Business or Profession</td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.business_profession.income_outside_india`} form={form} /></td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.business_profession.tax_paid_outside_india`} form={form} /></td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.business_profession.tax_payable_normal_provisions`} form={form} /></td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.business_profession.tax_relief_available`} form={form} /></td>
                    <td className="px-2 py-2 border"><TextInput name={`scheduleFSI.income_details.${index}.business_profession.relevant_article_dtaa`} form={form} /></td>
                  </tr>
                  {/* Capital Gains */}
                  <tr className="bg-white">
                    <td className="px-2 py-2 border text-center">iii</td>
                    <td className="px-2 py-2 border">Capital Gains</td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.capital_gains.income_outside_india`} form={form} /></td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.capital_gains.tax_paid_outside_india`} form={form} /></td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.capital_gains.tax_payable_normal_provisions`} form={form} /></td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.capital_gains.tax_relief_available`} form={form} /></td>
                    <td className="px-2 py-2 border"><TextInput name={`scheduleFSI.income_details.${index}.capital_gains.relevant_article_dtaa`} form={form} /></td>
                  </tr>
                  {/* Other Sources */}
                  <tr className="bg-white">
                    <td className="px-2 py-2 border text-center">iv</td>
                    <td className="px-2 py-2 border">Other sources</td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.other_sources.income_outside_india`} form={form} /></td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.other_sources.tax_paid_outside_india`} form={form} /></td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.other_sources.tax_payable_normal_provisions`} form={form} /></td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.other_sources.tax_relief_available`} form={form} /></td>
                    <td className="px-2 py-2 border"><TextInput name={`scheduleFSI.income_details.${index}.other_sources.relevant_article_dtaa`} form={form} /></td>
                  </tr>
                  {/* Total */}
                  <tr className="bg-gray-100 font-bold">
                    <td className="px-2 py-2 border"></td>
                    <td className="px-2 py-2 border">Total</td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.total.income_outside_india`} form={form} disabled /></td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.total.tax_paid_outside_india`} form={form} disabled /></td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.total.tax_payable_normal_provisions`} form={form} disabled /></td>
                    <td className="px-2 py-2 border"><NumberInput name={`scheduleFSI.income_details.${index}.total.tax_relief_available`} form={form} disabled /></td>
                    <td className="px-2 py-2 border bg-gray-200"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({
            country_code: '',
            taxpayer_identification_number: '',
            house_property: { income_outside_india: 0, tax_paid_outside_india: 0, tax_payable_normal_provisions: 0, tax_relief_available: 0, relevant_article_dtaa: '' },
            business_profession: { income_outside_india: 0, tax_paid_outside_india: 0, tax_payable_normal_provisions: 0, tax_relief_available: 0, relevant_article_dtaa: '' },
            capital_gains: { income_outside_india: 0, tax_paid_outside_india: 0, tax_payable_normal_provisions: 0, tax_relief_available: 0, relevant_article_dtaa: '' },
            other_sources: { income_outside_india: 0, tax_paid_outside_india: 0, tax_payable_normal_provisions: 0, tax_relief_available: 0, relevant_article_dtaa: '' },
            total: { income_outside_india: 0, tax_paid_outside_india: 0, tax_payable_normal_provisions: 0, tax_relief_available: 0, relevant_article_dtaa: '' }
          })}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Country
        </button>
      </div>
    </div>
  );
};

export default Itr7ScheduleFSI;
