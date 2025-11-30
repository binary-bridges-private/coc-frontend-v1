import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { ITR7Schedule115TDData } from './itr-7-schedule-115td.types.ts';

export interface Itr7Schedule115TDProps {
  form: UseFormReturn<ITR7Schedule115TDData>;
}

const NumberInput: React.FC<{
  name: any;
  form: UseFormReturn<ITR7Schedule115TDData>;
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
  form: UseFormReturn<ITR7Schedule115TDData>;
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
  form: UseFormReturn<ITR7Schedule115TDData>;
  className?: string;
}> = ({ name, form, className }) => (
  <input
    type="text"
    className={`w-full border rounded px-2 py-1 text-sm ${className ?? ''}`}
    {...form.register(name)}
  />
);

const Itr7Schedule115TD: React.FC<Itr7Schedule115TDProps> = ({ form }) => {
  const { fields: depositDateFields, append: appendDepositDate, remove: removeDepositDate } = useFieldArray({
    control: form.control,
    name: 'schedule115TD.deposit_dates',
  });

  const scheduleData = useWatch({ control: form.control, name: 'schedule115TD' });

  useEffect(() => {
    if (!scheduleData) return;

    // Calculate Net value of assets (3 = 1 - 2)
    const netValue = (Number(scheduleData.aggregate_fmv_total_assets) || 0) - (Number(scheduleData.less_total_liability) || 0);
    form.setValue('schedule115TD.net_value_of_assets', netValue);

    // Calculate Total FMV (4iv)
    const fmvDetails = scheduleData.fmv_assets_details || {};
    const totalFmv = 
      (Number(fmvDetails.directly_acquired_income_section_10_1) || 0) +
      (Number(fmvDetails.acquired_during_period_date_creation) || 0) +
      (Number(fmvDetails.transferred_third_proviso_115td_2) || 0);
    form.setValue('schedule115TD.fmv_assets_details.total_fmv', totalFmv);

    // Calculate Accreted income (6 = 3 - (4iv - 5))
    const liabilityAssets = Number(scheduleData.liability_respect_assets) || 0;
    const accretedIncome = netValue - (totalFmv - liabilityAssets);
    form.setValue('schedule115TD.accreted_income_section_115td', Math.max(0, accretedIncome));

    // Calculate Net payable (12 = 10 - 11)
    const netPayable = (Number(scheduleData.additional_income_tax_and_interest_payable) || 0) - (Number(scheduleData.tax_and_interest_paid) || 0);
    form.setValue('schedule115TD.net_payable', Math.max(0, netPayable));

  }, [scheduleData, form]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule 115TD</h2>
        <p className="text-sm text-gray-600 mb-4 font-semibold">
          Accreted income under section 115TD
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
            <tbody>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold w-[50px]">1</td>
                <td className="px-2 py-2 border" colSpan={2}>Aggregate Fair Market Value (FMV) of total assets of specified person</td>
                <td className="px-2 py-2 border text-center font-bold w-[50px]">1</td>
                <td className="px-2 py-2 border w-[200px]">
                  <NumberInput name="schedule115TD.aggregate_fmv_total_assets" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">2</td>
                <td className="px-2 py-2 border" colSpan={2}>Less: Total liability of specified person</td>
                <td className="px-2 py-2 border text-center font-bold">2</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="schedule115TD.less_total_liability" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b font-bold">
                <td className="px-2 py-2 border">3</td>
                <td className="px-2 py-2 border" colSpan={2}>Net value of assets (1 – 2)</td>
                <td className="px-2 py-2 border text-center">3</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="schedule115TD.net_value_of_assets" form={form} disabled />
                </td>
              </tr>

              {/* Section 4 */}
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold" rowSpan={4}>4</td>
                <td className="px-2 py-2 border font-bold w-[50px]">(i)</td>
                <td className="px-2 py-2 border">FMV of assets directly acquired out of income referred to in section 10(1)</td>
                <td className="px-2 py-2 border text-center font-bold">4i</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="schedule115TD.fmv_assets_details.directly_acquired_income_section_10_1" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">(ii)</td>
                <td className="px-2 py-2 border">FMV of assets acquired during the period from the date of creation or establishment to the effective date of registration/provisional registration u/s 12AB, if benefit u/s 11 and 12 not claimed during the said</td>
                <td className="px-2 py-2 border text-center font-bold">4ii</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="schedule115TD.fmv_assets_details.acquired_during_period_date_creation" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">(iii)</td>
                <td className="px-2 py-2 border">FMV of assets transferred in accordance with third proviso to section 115TD(2)</td>
                <td className="px-2 py-2 border text-center font-bold">4iii</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="schedule115TD.fmv_assets_details.transferred_third_proviso_115td_2" form={form} />
                </td>
              </tr>
              <tr className="bg-gray-100 border-b font-bold">
                <td className="px-2 py-2 border">(iv)</td>
                <td className="px-2 py-2 border">Total (4i + 4ii + 4iii)</td>
                <td className="px-2 py-2 border text-center">4iv</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="schedule115TD.fmv_assets_details.total_fmv" form={form} disabled />
                </td>
              </tr>

              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">5</td>
                <td className="px-2 py-2 border" colSpan={2}>Liability in respect of assets at 4 above</td>
                <td className="px-2 py-2 border text-center font-bold">5</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="schedule115TD.liability_respect_assets" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b font-bold">
                <td className="px-2 py-2 border">6</td>
                <td className="px-2 py-2 border" colSpan={2}>Accreted income as per section 115TD [3 – (4iv – 5)]</td>
                <td className="px-2 py-2 border text-center">6</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="schedule115TD.accreted_income_section_115td" form={form} disabled />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">7</td>
                <td className="px-2 py-2 border" colSpan={2}>Additional income-tax payable u/s 115TD at maximum marginal rate</td>
                <td className="px-2 py-2 border text-center font-bold">7</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="schedule115TD.additional_income_tax_payable_115td" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">8</td>
                <td className="px-2 py-2 border" colSpan={2}>Interest payable u/s 115TE</td>
                <td className="px-2 py-2 border text-center font-bold">8</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="schedule115TD.interest_payable_115te" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">9</td>
                <td className="px-2 py-2 border" colSpan={2}>Specified date u/s 115TD</td>
                <td className="px-2 py-2 border text-center font-bold">9</td>
                <td className="px-2 py-2 border">
                  <DateInput name="schedule115TD.specified_date_115td" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">10</td>
                <td className="px-2 py-2 border" colSpan={2}>Additional income-tax and interest payable</td>
                <td className="px-2 py-2 border text-center font-bold">10</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="schedule115TD.additional_income_tax_and_interest_payable" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">11</td>
                <td className="px-2 py-2 border" colSpan={2}>Tax and interest paid</td>
                <td className="px-2 py-2 border text-center font-bold">11</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="schedule115TD.tax_and_interest_paid" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b font-bold">
                <td className="px-2 py-2 border">12</td>
                <td className="px-2 py-2 border" colSpan={2}>Net payable (10 - 11) (Enter 0 if negative)</td>
                <td className="px-2 py-2 border text-center">12</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="schedule115TD.net_payable" form={form} disabled />
                </td>
              </tr>

              {/* Date(s) of deposit */}
              <tr className="bg-gray-50 border-b">
                <td className="px-2 py-2 border font-bold">13</td>
                <td className="px-2 py-2 border" colSpan={4}>
                  <div className="mb-2 font-semibold">Date(s) of deposit of tax on accreted income</div>
                  <div className="space-y-2">
                    {depositDateFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <DateInput name={`schedule115TD.deposit_dates.${index}.date`} form={form} />
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

              {/* Bank details */}
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">14</td>
                <td className="px-2 py-2 border" colSpan={2}>Name of Bank and Branch</td>
                <td className="px-2 py-2 border" colSpan={2}>
                  <TextInput name="schedule115TD.name_of_bank_and_branch" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">15</td>
                <td className="px-2 py-2 border" colSpan={2}>BSR Code</td>
                <td className="px-2 py-2 border" colSpan={2}>
                  <TextInput name="schedule115TD.bsr_code" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">16</td>
                <td className="px-2 py-2 border" colSpan={2}>Serial number of challan</td>
                <td className="px-2 py-2 border" colSpan={2}>
                  <TextInput name="schedule115TD.serial_number_of_challan" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">17</td>
                <td className="px-2 py-2 border" colSpan={2}>Amount deposited</td>
                <td className="px-2 py-2 border" colSpan={2}>
                  <NumberInput name="schedule115TD.amount_deposited" form={form} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Itr7Schedule115TD;
