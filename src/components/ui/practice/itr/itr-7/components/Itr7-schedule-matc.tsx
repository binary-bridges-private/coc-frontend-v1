import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { ITR7ScheduleMATCData } from './itr-7-schedule-matc.types.ts';

export interface Itr7ScheduleMATCProps {
  form: UseFormReturn<ITR7ScheduleMATCData>;
}

const NumberInput: React.FC<{
  name: any;
  form: UseFormReturn<ITR7ScheduleMATCData>;
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
  form: UseFormReturn<ITR7ScheduleMATCData>;
  className?: string;
}> = ({ name, form, className }) => (
  <input
    type="text"
    className={`w-full border rounded px-2 py-1 text-sm ${className ?? ''}`}
    {...form.register(name)}
  />
);

const Itr7ScheduleMATC: React.FC<Itr7ScheduleMATCProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'scheduleMATc.mat_credit_years',
  });

  const scheduleData = useWatch({ control: form.control, name: 'scheduleMATc' });

  useEffect(() => {
    if (!scheduleData) return;

    // Calculate amount of tax credit available (3)
    const taxCredit = (Number(scheduleData.tax_115jb_2025_26) || 0) - (Number(scheduleData.tax_other_provisions_2025_26) || 0);
    form.setValue('scheduleMATc.amount_tax_credit_available', Math.max(0, taxCredit));

    // Calculate balance MAT credit carried forward for each year
    scheduleData.mat_credit_years?.forEach((year, index) => {
      const balance = 
        (Number(year.mat_credit_b1) || 0) - 
        (Number(year.set_off_earlier_years_b2) || 0) + 
        (Number(year.balance_brought_forward_b3) || 0);
      
      const balanceCarriedForward = balance - (Number(year.mat_credit_utilized_current_year_c) || 0);
      
      form.setValue(`scheduleMATc.mat_credit_years.${index}.balance_mat_credit_carried_forward_d`, balanceCarriedForward);
    });

  }, [scheduleData, form]);

  // Initialize with predefined assessment years
  useEffect(() => {
    if (fields.length === 0) {
      const years = [
        '2009-10', '2010-11', '2011-12', '2012-13', '2013-14', '2014-15',
        '2015-16', '2016-17', '2017-18', '2018-19', '2019-20', '2020-21',
        '2021-22', '2022-23', '2023-24', '2024-25', '2025-26'
      ];
      years.forEach(year => {
        append({
          assessment_year: year,
          mat_credit_b1: 0,
          set_off_earlier_years_b2: 0,
          balance_brought_forward_b3: 0,
          mat_credit_utilized_current_year_c: 0,
          balance_mat_credit_carried_forward_d: 0
        });
      });
    }
  }, [fields.length, append]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule MATC</h2>
        <p className="text-sm text-gray-600 mb-4 font-semibold">
          Computation of tax credit under section 115JAA
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
            <tbody>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold w-[50px]">1</td>
                <td className="px-2 py-2 border">Tax under section 115JB in assessment year 2025-26 (1d of Part-B-TTI)</td>
                <td className="px-2 py-2 border text-center font-bold w-[50px]">1</td>
                <td className="px-2 py-2 border w-[200px]">
                  <NumberInput name="scheduleMATc.tax_115jb_2025_26" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">2</td>
                <td className="px-2 py-2 border">Tax under other provisions of the Act in assessment year 2025-26 (2f of Part-B-TTI)</td>
                <td className="px-2 py-2 border text-center font-bold">2</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="scheduleMATc.tax_other_provisions_2025_26" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">3</td>
                <td className="px-2 py-2 border">Amount of tax credit which is available [enter (2 - 1) if 2 is greater than 1, otherwise enter 0]</td>
                <td className="px-2 py-2 border text-center font-bold">3</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="scheduleMATc.amount_tax_credit_available" form={form} disabled />
                </td>
              </tr>

              {/* Section 4: MAT Credit Table */}
              <tr className="bg-gray-50 border-b">
                <td className="px-2 py-2 border font-bold">4</td>
                <td className="px-2 py-2 border font-bold" colSpan={3}>
                  Utilization of MAT credit Available (Sum of MAT credit utilized during the current year is subject to maximum of amount mentioned in 3 above and cannot exceed the credit of Credit Brought Forward)
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border" colSpan={4}>
                  <table className="min-w-full text-xs border-collapse border">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-1 py-1 border" rowSpan={2}>S.No</th>
                        <th className="px-1 py-1 border" rowSpan={2}>Assessment Year (A)</th>
                        <th className="px-1 py-1 border">MAT Credit (B1)</th>
                        <th className="px-1 py-1 border">Set-off in earlier years (B2)</th>
                        <th className="px-1 py-1 border">Balance Brought forward (B3)=(B2)-(B1)</th>
                        <th className="px-1 py-1 border">MAT Credit Utilised during the Current year (C)</th>
                        <th className="px-1 py-1 border">Balance MAT Credit Carried Forward (D)= (B3) – (C)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fields.map((field, index) => (
                        <tr key={field.id} className="hover:bg-gray-50">
                          <td className="px-1 py-1 border text-center">{['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii'][index]}</td>
                          <td className="px-1 py-1 border">
                            <TextInput name={`scheduleMATc.mat_credit_years.${index}.assessment_year`} form={form} />
                          </td>
                          <td className="px-1 py-1 border">
                            <NumberInput name={`scheduleMATc.mat_credit_years.${index}.mat_credit_b1`} form={form} />
                          </td>
                          <td className="px-1 py-1 border">
                            <NumberInput name={`scheduleMATc.mat_credit_years.${index}.set_off_earlier_years_b2`} form={form} />
                          </td>
                          <td className="px-1 py-1 border">
                            <NumberInput name={`scheduleMATc.mat_credit_years.${index}.balance_brought_forward_b3`} form={form} />
                          </td>
                          <td className="px-1 py-1 border">
                            <NumberInput name={`scheduleMATc.mat_credit_years.${index}.mat_credit_utilized_current_year_c`} form={form} />
                          </td>
                          <td className="px-1 py-1 border">
                            <NumberInput name={`scheduleMATc.mat_credit_years.${index}.balance_mat_credit_carried_forward_d`} form={form} disabled />
                          </td>
                        </tr>
                      ))}
                      {fields.length === 17 && (
                        <tr className="bg-gray-100">
                          <td className="px-1 py-1 border text-center font-bold">xviii</td>
                          <td className="px-1 py-1 border font-bold">Total</td>
                          <td className="px-1 py-1 border"></td>
                          <td className="px-1 py-1 border"></td>
                          <td className="px-1 py-1 border"></td>
                          <td className="px-1 py-1 border"></td>
                          <td className="px-1 py-1 border"></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </td>
              </tr>

              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">5</td>
                <td className="px-2 py-2 border">Amount of tax credit under section 115JAA utilised during the year [enter 4(Cxviii)]</td>
                <td className="px-2 py-2 border text-center font-bold">5</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="scheduleMATc.amount_tax_credit_115jaa_utilized" form={form} />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-bold">6</td>
                <td className="px-2 py-2 border">Amount of MAT liability available for credit in subsequent assessment years [enter 4(Dxviii)]</td>
                <td className="px-2 py-2 border text-center font-bold">6</td>
                <td className="px-2 py-2 border">
                  <NumberInput name="scheduleMATc.amount_mat_liability_available_credit" form={form} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Itr7ScheduleMATC;
