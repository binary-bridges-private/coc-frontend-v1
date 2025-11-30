import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { ITR7ScheduleTRData } from './itr-7-schedule-tr.types.ts';

export interface Itr7ScheduleTRProps {
  form: UseFormReturn<ITR7ScheduleTRData>;
}

const NumberInput: React.FC<{
  name: any;
  form: UseFormReturn<ITR7ScheduleTRData>;
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
  form: UseFormReturn<ITR7ScheduleTRData>;
  className?: string;
}> = ({ name, form, className }) => (
  <input
    type="text"
    className={`w-full border rounded px-2 py-1 text-sm ${className ?? ''}`}
    {...form.register(name)}
  />
);

const CheckboxInput: React.FC<{
  name: any;
  form: UseFormReturn<ITR7ScheduleTRData>;
  value: string;
}> = ({ name, form, value }) => (
  <input
    type="checkbox"
    value={value}
    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    {...form.register(name)}
  />
);

const Itr7ScheduleTR: React.FC<Itr7ScheduleTRProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'scheduleTR.tax_relief_claims',
  });

  const scheduleData = useWatch({ control: form.control, name: 'scheduleTR' });

  useEffect(() => {
    if (!scheduleData?.tax_relief_claims) return;

    // Calculate totals
    const totalTaxesPaid = scheduleData.tax_relief_claims.reduce((sum, item) => sum + (Number(item.total_taxes_paid_outside_india) || 0), 0);
    const totalRelief = scheduleData.tax_relief_claims.reduce((sum, item) => sum + (Number(item.total_tax_relief_available) || 0), 0);

    form.setValue('scheduleTR.total_tax_relief_claims.total_taxes_paid_outside_india', totalTaxesPaid);
    form.setValue('scheduleTR.total_tax_relief_claims.total_tax_relief_available', totalRelief);

  }, [scheduleData, form]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule TR</h2>
        <p className="text-sm text-gray-600 mb-4 font-semibold">
          Summary of tax relief claimed for taxes paid outside India (available only in case of resident)
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full text-sm border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-2 border" rowSpan={2}>1</th>
                <th className="px-2 py-2 border" colSpan={5}>Details of Tax relief claimed</th>
              </tr>
              <tr>
                <th className="px-2 py-2 border">Country Code (a)</th>
                <th className="px-2 py-2 border">Taxpayer Identification Number (b)</th>
                <th className="px-2 py-2 border">Total taxes paid outside India (total of (c) of Schedule FSI in respect of each country) (c)</th>
                <th className="px-2 py-2 border">Total tax relief available (total of (e) of Schedule FSI in respect of each country) (d)</th>
                <th className="px-2 py-2 border">Section under which relief claimed (specify 90, 90A or 91) (e)</th>
                <th className="px-2 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id} className="bg-white">
                  <td className="px-2 py-2 border text-center">{index + 1}</td>
                  <td className="px-2 py-2 border"><TextInput name={`scheduleTR.tax_relief_claims.${index}.country_code`} form={form} /></td>
                  <td className="px-2 py-2 border"><TextInput name={`scheduleTR.tax_relief_claims.${index}.taxpayer_identification_number`} form={form} /></td>
                  <td className="px-2 py-2 border"><NumberInput name={`scheduleTR.tax_relief_claims.${index}.total_taxes_paid_outside_india`} form={form} /></td>
                  <td className="px-2 py-2 border"><NumberInput name={`scheduleTR.tax_relief_claims.${index}.total_tax_relief_available`} form={form} /></td>
                  <td className="px-2 py-2 border"><TextInput name={`scheduleTR.tax_relief_claims.${index}.section_relief_claimed`} form={form} /></td>
                  <td className="px-2 py-2 border text-center">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold">
                <td className="px-2 py-2 border"></td>
                <td className="px-2 py-2 border" colSpan={2}>Total</td>
                <td className="px-2 py-2 border"><NumberInput name="scheduleTR.total_tax_relief_claims.total_taxes_paid_outside_india" form={form} disabled /></td>
                <td className="px-2 py-2 border"><NumberInput name="scheduleTR.total_tax_relief_claims.total_tax_relief_available" form={form} disabled /></td>
                <td className="px-2 py-2 border" colSpan={2}></td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            onClick={() => append({ country_code: '', taxpayer_identification_number: '', total_taxes_paid_outside_india: 0, total_tax_relief_available: 0, section_relief_claimed: '' })}
            className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Row
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-4">
              <span className="font-bold">2</span>
              <span>Total Tax relief available in respect of country where DTAA is applicable (section 90/90A) (Part of total of 1(d))</span>
            </div>
            <div className="w-[200px]">
              <NumberInput name="scheduleTR.total_relief_dtaa_applicable" form={form} />
            </div>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-4">
              <span className="font-bold">3</span>
              <span>Total Tax relief available in respect of country where DTAA is not applicable (section 91) (Part of total of 1(d))</span>
            </div>
            <div className="w-[200px]">
              <NumberInput name="scheduleTR.total_relief_dtaa_not_applicable" form={form} />
            </div>
          </div>

          <div className="border-b pb-2">
            <div className="flex items-center gap-4 mb-2">
              <span className="font-bold">4</span>
              <span>Whether any tax paid outside India, on which tax relief was allowed in India, has been refunded/credited by the foreign tax authority during the year? If yes, provide the details below</span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <CheckboxInput name="scheduleTR.tax_paid_outside_india_refunded" form={form} value="Yes" />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <CheckboxInput name="scheduleTR.tax_paid_outside_india_refunded" form={form} value="No" />
                  <span>No</span>
                </label>
              </div>
            </div>
            {scheduleData?.tax_paid_outside_india_refunded === 'Yes' && (
              <div className="grid grid-cols-2 gap-4 ml-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700">a. Amount of tax refunded</label>
                  <NumberInput name="scheduleTR.amount_tax_refunded" form={form} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">b. Assessment year in which tax relief allowed in India</label>
                  <TextInput name="scheduleTR.assessment_year_relief_allowed" form={form} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itr7ScheduleTR;
