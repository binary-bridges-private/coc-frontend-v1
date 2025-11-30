import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { ITR7ScheduleTPSAData } from './itr-7-schedule-tpsa.types.ts';

export interface Itr7ScheduleTPSAProps {
  form: UseFormReturn<ITR7ScheduleTPSAData>;
}

const NumberInput: React.FC<{
  name: any;
  form: UseFormReturn<ITR7ScheduleTPSAData>;
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

const DateInput: React.FC<{
  name: any;
  form: UseFormReturn<ITR7ScheduleTPSAData>;
  className?: string;
}> = ({ name, form, className }) => (
  <input
    type="date"
    className={`w-full border rounded px-2 py-1 text-sm ${className ?? ''}`}
    {...form.register(name)}
  />
);

const TextInput: React.FC<{
  name: any;
  form: UseFormReturn<ITR7ScheduleTPSAData>;
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
  form: UseFormReturn<ITR7ScheduleTPSAData>;
  value: string;
}> = ({ name, form, value }) => (
  <input
    type="checkbox"
    value={value}
    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    {...form.register(name)}
  />
);

const Itr7ScheduleTPSA: React.FC<Itr7ScheduleTPSAProps> = ({ form }) => {
  const { fields: depositDateFields, append: appendDepositDate, remove: removeDepositDate } = useFieldArray({
    control: form.control,
    name: 'scheduleTPSA.deposit_dates',
  });

  const scheduleData = useWatch({ control: form.control, name: 'scheduleTPSA' });

  useEffect(() => {
    if (!scheduleData) return;

    // Calculate total additional tax payable (1d = 1a + 1b + 1c)
    const totalTax = 
      (Number(scheduleData.additional_income_tax_payable_18_percent) || 0) +
      (Number(scheduleData.surcharge_12_percent) || 0) +
      (Number(scheduleData.health_education_cess) || 0);
    
    form.setValue('scheduleTPSA.total_additional_tax_payable', totalTax);

    // Calculate net tax payable (3 = 1d - 2)
    const netTax = totalTax - (Number(scheduleData.taxes_paid) || 0);
    form.setValue('scheduleTPSA.net_tax_payable', netTax);

  }, [scheduleData, form]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule TPSA</h2>
        <p className="text-sm text-gray-600 mb-4 font-semibold">
          Details of Tax on Secondary adjustments as per section 92CE(2A) as per the schedule provided in e-filing utility
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
            <tbody>
              {/* Section 1: Primary adjustments */}
              <tr className="bg-gray-50 border-b">
                <td className="px-2 py-2 border font-bold" rowSpan={5}>1</td>
                <td className="px-2 py-2 border font-bold" colSpan={2}>
                  <div className="mb-2">Amount of primary adjustments on which option u/s 92CE(2A) is exercised & such option has not been exercised within the due date of filing of return in respect of all the AY's</div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <CheckboxInput name="scheduleTPSA.primary_adjustments_option_exercised" form={form} value="Yes" />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <CheckboxInput name="scheduleTPSA.primary_adjustments_option_exercised" form={form} value="No" />
                      <span>No</span>
                    </label>
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">a</span>
                    <span>Additional income tax payable @ 18% on above</span>
                  </div>
                </td>
                <td className="px-2 py-2 border w-[200px]">
                  <NumberInput name="scheduleTPSA.additional_income_tax_payable_18_percent" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">b</span>
                    <span>Surcharge @ 12% on (a+b)</span>
                  </div>
                </td>
                <td className="px-2 py-2 border">
                  <NumberInput name="scheduleTPSA.surcharge_12_percent" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">c</span>
                    <span>Health & Education cess on (a+b)</span>
                  </div>
                </td>
                <td className="px-2 py-2 border">
                  <NumberInput name="scheduleTPSA.health_education_cess" form={form} />
                </td>
              </tr>
              <tr className="bg-gray-100 border-b font-bold">
                <td className="px-2 py-2 border">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">d</span>
                    <span>Total Additional tax payable (a+b+c)</span>
                  </div>
                </td>
                <td className="px-2 py-2 border">
                  <NumberInput name="scheduleTPSA.total_additional_tax_payable" form={form} disabled />
                </td>
              </tr>

              {/* Section 2-4 */}
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">2</td>
                <td className="px-2 py-2 border" colSpan={2}>Taxes paid</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="scheduleTPSA.taxes_paid" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b font-bold">
                <td className="px-2 py-2 border">3</td>
                <td className="px-2 py-2 border" colSpan={2}>Net tax payable (1d-2)</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="scheduleTPSA.net_tax_payable" form={form} disabled />
                </td>
              </tr>

              {/* Section 5: Date(s) of deposit */}
              <tr className="bg-gray-50 border-b">
                <td className="px-2 py-2 border font-bold">4</td>
                <td className="px-2 py-2 border" colSpan={3}>
                  <div className="mb-2 font-semibold">Date(s) of deposit of tax on secondary adjustments as per section 92CE(2A)</div>
                  <div className="space-y-2">
                    {depositDateFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <DateInput name={`scheduleTPSA.deposit_dates.${index}.date`} form={form} />
                        <button
                          type="button"
                          onClick={() => removeDepositDate(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => appendDepositDate({ date: '' })}
                      className="flex items-center text-blue-600 hover:text-blue-800 text-xs"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Date
                    </button>
                  </div>
                </td>
              </tr>

              {/* Section 6-9: Bank details */}
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">5</td>
                <td className="px-2 py-2 border" colSpan={2}>Name of Bank and Branch</td>
                <td className="px-2 py-2 border">
                  <TextInput name="scheduleTPSA.name_of_bank_and_branch" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">6</td>
                <td className="px-2 py-2 border" colSpan={2}>BSR Code</td>
                <td className="px-2 py-2 border">
                  <TextInput name="scheduleTPSA.bsr_code" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">7</td>
                <td className="px-2 py-2 border" colSpan={2}>Serial number of challan</td>
                <td className="px-2 py-2 border">
                  <TextInput name="scheduleTPSA.serial_number_of_challan" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">8</td>
                <td className="px-2 py-2 border" colSpan={2}>Amount deposited</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="scheduleTPSA.amount_deposited" form={form} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Itr7ScheduleTPSA;
