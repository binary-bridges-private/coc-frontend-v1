import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { ITR7ScheduleDBSData } from './itr-7-schedule-dbs.types.ts';

export interface Itr7ScheduleDBSProps {
  form: UseFormReturn<ITR7ScheduleDBSData>;
}

const NumberInput: React.FC<{
  name: any;
  form: UseFormReturn<ITR7ScheduleDBSData>;
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
  form: UseFormReturn<ITR7ScheduleDBSData>;
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
  form: UseFormReturn<ITR7ScheduleDBSData>;
  className?: string;
}> = ({ name, form, className }) => (
  <input
    type="text"
    className={`w-full border rounded px-2 py-1 text-sm ${className ?? ''}`}
    {...form.register(name)}
  />
);

const Itr7ScheduleDBS: React.FC<Itr7ScheduleDBSProps> = ({ form }) => {
  const { fields: buyBackFields, append: appendBuyBack, remove: removeBuyBack } = useFieldArray({
    control: form.control,
    name: 'scheduleDBS.buy_backs',
  });

  const scheduleData = useWatch({ control: form.control, name: 'scheduleDBS' });

  useEffect(() => {
    if (!scheduleData?.buy_backs) return;

    scheduleData.buy_backs.forEach((buyBack, index) => {
      // Calculate total additional tax payable (5d = 5a + 5b + 5c)
      const totalAdditionalTax = 
        (Number(buyBack.tax_payable_on_distributed_income) || 0) +
        (Number(buyBack.additional_income_tax) || 0) +
        (Number(buyBack.surcharge_12_percent) || 0) +
        (Number(buyBack.health_education_cess) || 0);
      
      form.setValue(`scheduleDBS.buy_backs.${index}.total_additional_tax_payable`, totalAdditionalTax);

      // Calculate net tax payable (7 = 5d - 6)
      const netTaxPayable = totalAdditionalTax - (Number(buyBack.taxes_paid) || 0);
      form.setValue(`scheduleDBS.buy_backs.${index}.net_tax_payable`, netTaxPayable);

      // Calculate income tax and interest payable (5d + 6)
      const incomeTaxAndInterest = 
        (Number(buyBack.interest_payable_115qb) || 0) +
        (Number(buyBack.additional_interest_payable) || 0);
      form.setValue(`scheduleDBS.buy_backs.${index}.income_tax_and_interest_payable`, incomeTaxAndInterest);

      // Calculate net payable/refundable (7 + 8)
      const netPayableRefundable = netTaxPayable + incomeTaxAndInterest - (Number(buyBack.tax_and_interest_paid) || 0);
      form.setValue(`scheduleDBS.buy_backs.${index}.net_payable_refundable`, netPayableRefundable);
    });
  }, [scheduleData, form]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule DBS</h2>
        <p className="text-sm text-gray-600 mb-4 font-semibold">
          Details of tax on distributed income of a domestic company on buy back of shares [for the buy back before 01.10.2020]
        </p>

        {buyBackFields.map((field, buyBackIndex) => (
          <div key={field.id} className="mb-8 border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Details of {['1st', '2nd', '3rd'][buyBackIndex] || `${buyBackIndex + 1}th`} buy back</h3>
              <button
                type="button"
                onClick={() => removeBuyBack(buyBackIndex)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-collapse border">
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="px-2 py-2 border font-bold w-[50px]">1</td>
                    <td className="px-2 py-2 border">Date of payments of any consideration to the shareholder on buy back of share</td>
                    <td className="px-2 py-2 border w-[200px]">
                      <DateInput name={`scheduleDBS.buy_backs.${buyBackIndex}.date_of_payments`} form={form} />
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-2 py-2 border font-bold">2</td>
                    <td className="px-2 py-2 border">Amount of consideration paid on buy back of shares</td>
                    <td className="px-2 py-2 border">
                      <NumberInput name={`scheduleDBS.buy_backs.${buyBackIndex}.amount_consideration_paid`} form={form} />
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-2 py-2 border font-bold">3</td>
                    <td className="px-2 py-2 border">Amount received by the company for issue of such shares</td>
                    <td className="px-2 py-2 border">
                      <NumberInput name={`scheduleDBS.buy_backs.${buyBackIndex}.amount_received_by_company`} form={form} />
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-2 py-2 border font-bold">4</td>
                    <td className="px-2 py-2 border">Distributed income (2 - 3)</td>
                    <td className="px-2 py-2 border">
                      <NumberInput name={`scheduleDBS.buy_backs.${buyBackIndex}.distributed_income`} form={form} />
                    </td>
                  </tr>

                  {/* Tax calculations */}
                  <tr className="bg-gray-50 border-b">
                    <td className="px-2 py-2 border font-bold" rowSpan={5}>5</td>
                    <td className="px-2 py-2 border font-bold" colSpan={2}>Tax payable on distributed income</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-2 py-2 border">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">a</span>
                        <span>Additional income tax @20 % payable under section 115QA on distributed income (a+b)</span>
                      </div>
                    </td>
                    <td className="px-2 py-2 border">
                      <NumberInput name={`scheduleDBS.buy_backs.${buyBackIndex}.tax_payable_on_distributed_income`} form={form} />
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
                      <NumberInput name={`scheduleDBS.buy_backs.${buyBackIndex}.surcharge_12_percent`} form={form} />
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
                      <NumberInput name={`scheduleDBS.buy_backs.${buyBackIndex}.health_education_cess`} form={form} />
                    </td>
                  </tr>
                  <tr className="bg-gray-100 border-b font-bold">
                    <td className="px-2 py-2 border">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">d</span>
                        <span>Total additional tax payable (a+b+c)</span>
                      </div>
                    </td>
                    <td className="px-2 py-2 border">
                      <NumberInput name={`scheduleDBS.buy_backs.${buyBackIndex}.total_additional_tax_payable`} form={form} disabled />
                    </td>
                  </tr>

                  <tr className="bg-white border-b">
                    <td className="px-2 py-2 border font-bold">6</td>
                    <td className="px-2 py-2 border">Taxes paid</td>
                    <td className="px-2 py-2 border">
                      <NumberInput name={`scheduleDBS.buy_backs.${buyBackIndex}.taxes_paid`} form={form} />
                    </td>
                  </tr>
                  <tr className="bg-white border-b font-bold">
                    <td className="px-2 py-2 border">7</td>
                    <td className="px-2 py-2 border">Net tax payable (5d-6)</td>
                    <td className="px-2 py-2 border">
                      <NumberInput name={`scheduleDBS.buy_backs.${buyBackIndex}.net_tax_payable`} form={form} disabled />
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-2 py-2 border font-bold">8</td>
                    <td className="px-2 py-2 border">Interest payable under section 115QB</td>
                    <td className="px-2 py-2 border">
                      <NumberInput name={`scheduleDBS.buy_backs.${buyBackIndex}.interest_payable_115qb`} form={form} />
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-2 py-2 border font-bold">9</td>
                    <td className="px-2 py-2 border">Additional interest payable (5d + 6)</td>
                    <td className="px-2 py-2 border">
                      <NumberInput name={`scheduleDBS.buy_backs.${buyBackIndex}.additional_interest_payable`} form={form} />
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-2 py-2 border font-bold">10</td>
                    <td className="px-2 py-2 border">Income-tax and Interest payable (5d + 6)</td>
                    <td className="px-2 py-2 border">
                      <NumberInput name={`scheduleDBS.buy_backs.${buyBackIndex}.income_tax_and_interest_payable`} form={form} disabled />
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-2 py-2 border font-bold">11</td>
                    <td className="px-2 py-2 border">Tax and interest paid</td>
                    <td className="px-2 py-2 border">
                      <NumberInput name={`scheduleDBS.buy_backs.${buyBackIndex}.tax_and_interest_paid`} form={form} />
                    </td>
                  </tr>
                  <tr className="bg-gray-100 border-b font-bold">
                    <td className="px-2 py-2 border">12</td>
                    <td className="px-2 py-2 border">Net payable/refundable (7 + 8)</td>
                    <td className="px-2 py-2 border">
                      <NumberInput name={`scheduleDBS.buy_backs.${buyBackIndex}.net_payable_refundable`} form={form} disabled />
                    </td>
                  </tr>

                  {/* Date(s) of deposit */}
                  <tr className="bg-white border-b">
                    <td className="px-2 py-2 border font-bold">13</td>
                    <td className="px-2 py-2 border" colSpan={2}>
                      <div className="mb-2 font-semibold">Date(s) of deposit of tax on distribution of income</div>
                      <div className="text-xs text-gray-500">Multiple dates can be entered (DD/MM/YYYY format)</div>
                    </td>
                  </tr>

                  {/* Bank details */}
                  <tr className="bg-white border-b">
                    <td className="px-2 py-2 border font-bold">14</td>
                    <td className="px-2 py-2 border">Name of Bank and Branch</td>
                    <td className="px-2 py-2 border">
                      <TextInput name={`scheduleDBS.buy_backs.${buyBackIndex}.name_of_bank_and_branch`} form={form} />
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-2 py-2 border font-bold">15</td>
                    <td className="px-2 py-2 border">BSR Code</td>
                    <td className="px-2 py-2 border">
                      <TextInput name={`scheduleDBS.buy_backs.${buyBackIndex}.bsr_code`} form={form} />
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-2 py-2 border font-bold">16</td>
                    <td className="px-2 py-2 border">Serial number of challan</td>
                    <td className="px-2 py-2 border">
                      <TextInput name={`scheduleDBS.buy_backs.${buyBackIndex}.serial_number_of_challan`} form={form} />
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-2 py-2 border font-bold">17</td>
                    <td className="px-2 py-2 border">Amount deposited</td>
                    <td className="px-2 py-2 border">
                      <NumberInput name={`scheduleDBS.buy_backs.${buyBackIndex}.amount_deposited`} form={form} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => appendBuyBack({
            date_of_payments: '',
            date_of_distribution: '',
            amount_consideration_paid: 0,
            amount_received_by_company: 0,
            distributed_income: 0,
            tax_payable_on_distributed_income: 0,
            additional_income_tax: 0,
            surcharge_12_percent: 0,
            health_education_cess: 0,
            total_additional_tax_payable: 0,
            taxes_paid: 0,
            net_tax_payable: 0,
            interest_payable_115qb: 0,
            additional_interest_payable: 0,
            income_tax_and_interest_payable: 0,
            tax_and_interest_paid: 0,
            net_payable_refundable: 0,
            deposit_dates: [],
            name_of_bank_and_branch: '',
            bsr_code: '',
            serial_number_of_challan: '',
            amount_deposited: 0
          })}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4 mr-1" /> Add Buy Back
        </button>
      </div>
    </div>
  );
};

export default Itr7ScheduleDBS;
