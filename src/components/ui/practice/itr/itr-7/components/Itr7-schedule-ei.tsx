import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { ITR7ScheduleEIData } from './itr-7-schedule-ei.types.ts';

export interface Itr7ScheduleEIProps {
    form: UseFormReturn<ITR7ScheduleEIData>;
}

const TextInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleEIData>;
    className?: string;
}> = ({ name, form, className }) => (
    <input
        type="text"
        className={`w-full border rounded px-2 py-1 text-sm ${className ?? ''}`}
        {...form.register(name)}
    />
);

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleEIData>;
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
    form: UseFormReturn<ITR7ScheduleEIData>;
    className?: string;
}> = ({ name, form, className }) => (
    <input
        type="date"
        className={`w-full border rounded px-2 py-1 text-sm ${className ?? ''}`}
        {...form.register(name)}
    />
);

const SelectInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleEIData>;
    options: string[];
    className?: string;
}> = ({ name, form, options, className }) => (
    <select
        className={`w-full border rounded px-2 py-1 text-sm ${className ?? ''}`}
        {...form.register(name)}
    >
        <option value="">Select</option>
        {options.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
    </select>
);

const Itr7ScheduleEI: React.FC<Itr7ScheduleEIProps> = ({ form }) => {
    const { fields: otherIncomeFields, append: appendOtherIncome, remove: removeOtherIncome } = useFieldArray({
        control: form.control,
        name: 'scheduleEI.other_exempt_income.any_other_income',
    });

    const { fields: dtaaFields, append: appendDtaa, remove: removeDtaa } = useFieldArray({
        control: form.control,
        name: 'scheduleEI.income_not_chargeable_dta.items',
    });

    const scheduleData = useWatch({ control: form.control, name: 'scheduleEI' });

    useEffect(() => {
        if (!scheduleData) return;

        // Calculate Net Agricultural Income
        const ag = scheduleData.agriculture || {};
        const netAg = (Number(ag.gross_receipts) || 0) - (Number(ag.expenditure) || 0) - (Number(ag.unabsorbed_loss) || 0) + (Number(ag.rule_7_income) || 0);
        form.setValue('scheduleEI.agriculture.net_income', Math.max(0, netAg));

        // Calculate Total Other Exempt Income
        const other = scheduleData.other_exempt_income || {};
        let totalOther = Number(other.income_u_s_10_15b_etc) || 0;
        other.any_other_income?.forEach(item => {
            totalOther += Number(item.amount) || 0;
        });
        form.setValue('scheduleEI.other_exempt_income.total_other_exempt_income', totalOther);

        // Calculate Total DTAA Income
        let totalDtaa = 0;
        scheduleData.income_not_chargeable_dta?.items?.forEach(item => {
            totalDtaa += Number(item.amount) || 0;
        });
        form.setValue('scheduleEI.income_not_chargeable_dta.total', totalDtaa);

        // Calculate Grand Total
        const grandTotal = (Number(scheduleData.interest_income) || 0) +
            (Number(scheduleData.agriculture?.net_income) || 0) +
            totalOther +
            totalDtaa +
            (Number(scheduleData.pass_through_income_pti) || 0);

        form.setValue('scheduleEI.total_exempt_income', grandTotal);

    }, [scheduleData, form]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule EI</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Details of Exempt Income (Income not to be included in Total Income or not chargeable to tax)
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <tbody>
                            {/* 1. Interest Income */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border font-bold w-[50px]">1</td>
                                <td className="px-2 py-2 border" colSpan={2}>Interest income</td>
                                <td className="px-2 py-2 border w-[50px] text-center font-bold">1</td>
                                <td className="px-2 py-2 border w-[200px]">
                                    <NumberInput name="scheduleEI.interest_income" form={form} />
                                </td>
                            </tr>

                            {/* 2. Agriculture Income */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border font-bold w-[50px]" rowSpan={6}>2</td>
                                <td className="px-2 py-2 border w-[50px] text-center font-bold">i</td>
                                <td className="px-2 py-2 border">Gross Agricultural receipts (other than income to be excluded under rule 7A, 7B or 8 of I.T. Rules)</td>
                                <td className="px-2 py-2 border text-center font-bold">i</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="scheduleEI.agriculture.gross_receipts" form={form} />
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border text-center font-bold">ii</td>
                                <td className="px-2 py-2 border">Expenditure incurred on agriculture</td>
                                <td className="px-2 py-2 border text-center font-bold">ii</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="scheduleEI.agriculture.expenditure" form={form} />
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border text-center font-bold">iii</td>
                                <td className="px-2 py-2 border">Unabsorbed agricultural loss of previous eight assessment years</td>
                                <td className="px-2 py-2 border text-center font-bold">iii</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="scheduleEI.agriculture.unabsorbed_loss" form={form} />
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border text-center font-bold">iv</td>
                                <td className="px-2 py-2 border">Agricultural income portion relating to Rule 7, 7A, 7B(1), 7B(1A) and 8 (from Sl. No. 39 of Sch. BP)</td>
                                <td className="px-2 py-2 border text-center font-bold">iv</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="scheduleEI.agriculture.rule_7_income" form={form} />
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border text-center font-bold">v</td>
                                <td className="px-2 py-2 border">Net Agricultural income for the year (i – ii – iii + iv) (enter nil if loss)</td>
                                <td className="px-2 py-2 border text-center font-bold">2</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="scheduleEI.agriculture.net_income" form={form} disabled />
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border text-center font-bold">vi</td>
                                <td className="px-2 py-2 border" colSpan={3}>
                                    <div className="mb-2 font-semibold">In case the net agricultural income for the year exceeds Rs.5 lakh, please furnish the following details (Fill up details separately for each agricultural land)</div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700">a. Name of district along with pin code</label>
                                            <div className="flex gap-2">
                                                <TextInput name="scheduleEI.agriculture.details_if_exceeds_5_lakh.district_name" form={form} className="placeholder:text-xs" />
                                                <TextInput name="scheduleEI.agriculture.details_if_exceeds_5_lakh.pincode" form={form} className="w-24 placeholder:text-xs" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700">b. Measurement in Acre</label>
                                            <NumberInput name="scheduleEI.agriculture.details_if_exceeds_5_lakh.measurement_acre" form={form} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700">c. Ownership Status</label>
                                            <SelectInput name="scheduleEI.agriculture.details_if_exceeds_5_lakh.ownership_status" form={form} options={['Owned', 'Held on lease']} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700">d. Irrigation Status</label>
                                            <SelectInput name="scheduleEI.agriculture.details_if_exceeds_5_lakh.irrigation_status" form={form} options={['Irrigated', 'Rain-fed']} />
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            {/* 3. Other Exempt Income */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border font-bold w-[50px]" rowSpan={3 + (otherIncomeFields.length || 0)}>3</td>
                                <td className="px-2 py-2 border" colSpan={2}>Other exempt income (please specify) (3a+3b)</td>
                                <td className="px-2 py-2 border text-center font-bold">3</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="scheduleEI.other_exempt_income.total_other_exempt_income" form={form} disabled />
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border text-center font-bold">a</td>
                                <td className="px-2 py-2 border">
                                    <div>Income u/s 10(15B), 10(23FB), 10(23FBA), 10(23FC), 10(23FCA), 10(23FE), 10(23FF), 10(4D)</div>
                                    <div className="mt-1 text-xs text-gray-500">Acknowledgement Number and Date of Form Filed if 10(23FF) and 10(4D) is claimed</div>
                                    <div className="flex gap-2 mt-1">
                                        <TextInput name="scheduleEI.other_exempt_income.details_10_23ff.ack_number" form={form} className="placeholder:text-xs" />
                                        <DateInput name="scheduleEI.other_exempt_income.details_10_23ff.date_filed" form={form} />
                                    </div>
                                </td>
                                <td className="px-2 py-2 border text-center font-bold">3a</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="scheduleEI.other_exempt_income.income_u_s_10_15b_etc" form={form} />
                                </td>
                            </tr>
                            {otherIncomeFields.map((field, index) => (
                                <tr key={field.id} className="bg-white border-b">
                                    <td className="px-2 py-2 border text-center font-bold">{index === 0 ? 'b' : ''}</td>
                                    <td className="px-2 py-2 border">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs">Any other Income (Specify nature)</span>
                                            <TextInput name={`scheduleEI.other_exempt_income.any_other_income.${index}.nature`} form={form} />
                                        </div>
                                    </td>
                                    <td className="px-2 py-2 border text-center font-bold">3b</td>
                                    <td className="px-2 py-2 border relative">
                                        <NumberInput name={`scheduleEI.other_exempt_income.any_other_income.${index}.amount`} form={form} />
                                        <button
                                            type="button"
                                            onClick={() => removeOtherIncome(index)}
                                            className="absolute right-[-25px] top-2 text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border text-center font-bold"></td>
                                <td className="px-2 py-2 border" colSpan={3}>
                                    <button
                                        type="button"
                                        onClick={() => appendOtherIncome({ nature: '', amount: 0 })}
                                        className="flex items-center text-blue-600 hover:text-blue-800 text-xs"
                                    >
                                        <Plus className="w-3 h-3 mr-1" /> Add Other Income
                                    </button>
                                </td>
                            </tr>

                            {/* 4. DTAA Income */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border font-bold w-[50px]">4</td>
                                <td className="px-2 py-2 border" colSpan={4}>
                                    <div className="mb-2 font-semibold">Income claimed as not chargeable to tax as per DTAA</div>
                                    <table className="min-w-full text-xs text-left text-gray-500 border-collapse border">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-1 py-1 border">Sl. No.</th>
                                                <th className="px-1 py-1 border">Amount of income</th>
                                                <th className="px-1 py-1 border">Nature of income</th>
                                                <th className="px-1 py-1 border">Country name & Code</th>
                                                <th className="px-1 py-1 border">Article of DTAA</th>
                                                <th className="px-1 py-1 border">Head of Income</th>
                                                <th className="px-1 py-1 border">Whether TRC obtained (Y/N)</th>
                                                <th className="px-1 py-1 border"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dtaaFields.map((field, index) => (
                                                <tr key={field.id}>
                                                    <td className="px-1 py-1 border text-center">{index + 1}</td>
                                                    <td className="px-1 py-1 border"><NumberInput name={`scheduleEI.income_not_chargeable_dta.items.${index}.amount`} form={form} /></td>
                                                    <td className="px-1 py-1 border"><TextInput name={`scheduleEI.income_not_chargeable_dta.items.${index}.nature`} form={form} /></td>
                                                    <td className="px-1 py-1 border"><TextInput name={`scheduleEI.income_not_chargeable_dta.items.${index}.country_name_code`} form={form} /></td>
                                                    <td className="px-1 py-1 border"><TextInput name={`scheduleEI.income_not_chargeable_dta.items.${index}.article_dtaa`} form={form} /></td>
                                                    <td className="px-1 py-1 border"><TextInput name={`scheduleEI.income_not_chargeable_dta.items.${index}.head_of_income`} form={form} /></td>
                                                    <td className="px-1 py-1 border"><SelectInput name={`scheduleEI.income_not_chargeable_dta.items.${index}.trc_obtained`} form={form} options={['Yes', 'No']} /></td>
                                                    <td className="px-1 py-1 border text-center">
                                                        <button type="button" onClick={() => removeDtaa(index)} className="text-red-600"><Trash2 className="w-3 h-3" /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td colSpan={8} className="px-1 py-1 border">
                                                    <button type="button" onClick={() => appendDtaa({ amount: 0, nature: '', country_name_code: '', article_dtaa: '', head_of_income: '', trc_obtained: 'No' })} className="flex items-center text-blue-600 text-xs"><Plus className="w-3 h-3 mr-1" /> Add Row</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            {/* 5. Pass Through Income */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border font-bold w-[50px]">5</td>
                                <td className="px-2 py-2 border" colSpan={2}>Pass through income claimed as not chargeable to tax (Schedule PTI)</td>
                                <td className="px-2 py-2 border text-center font-bold">5</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="scheduleEI.pass_through_income_pti" form={form} />
                                </td>
                            </tr>

                            {/* 6. Total */}
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-2 border text-center">6</td>
                                <td className="px-2 py-2 border" colSpan={2}>Total (1+2+3+4+5)</td>
                                <td className="px-2 py-2 border text-center">6</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="scheduleEI.total_exempt_income" form={form} disabled />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7ScheduleEI;
