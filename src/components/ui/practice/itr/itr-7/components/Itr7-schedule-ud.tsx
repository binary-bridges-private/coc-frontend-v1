import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { ITR7ScheduleUDData } from './itr-7-schedule-ud.types.ts';
import { Plus, Trash2 } from 'lucide-react';

export interface Itr7ScheduleUDProps {
    form: UseFormReturn<ITR7ScheduleUDData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleUDData>;
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
    form: UseFormReturn<ITR7ScheduleUDData>;
    className?: string;
    disabled?: boolean;
}> = ({ name, form, className, disabled }) => (
    <input
        type="text"
        disabled={disabled}
        className={`w-full border rounded px-2 py-1 text-sm ${disabled ? 'bg-gray-100' : ''} ${className ?? ''}`}
        {...form.register(name)}
    />
);

const Itr7ScheduleUD: React.FC<Itr7ScheduleUDProps> = ({ form }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'scheduleUD.details',
    });

    const scheduleData = useWatch({ control: form.control, name: 'scheduleUD' });

    // Calculations
    useEffect(() => {
        if (!scheduleData?.details) return;

        let totalDepreciationSetOff = 0;
        let totalAllowanceSetOff = 0;

        scheduleData.details.forEach((row, index) => {
            // Calculate Balance CF for Depreciation (5 = 3 - 3a - 4)
            const depBf = Number(row.depreciation?.brought_forward) || 0;
            const depAdj = Number(row.depreciation?.adjusted_115baa) || 0;
            const depSetOff = Number(row.depreciation?.set_off) || 0;
            const depBalance = Math.max(0, depBf - depAdj - depSetOff);

            if (row.depreciation?.balance_cf !== depBalance) {
                form.setValue(`scheduleUD.details.${index}.depreciation.balance_cf`, depBalance);
            }

            // Calculate Balance CF for Allowance (8 = 6 - 7)
            const allBf = Number(row.allowance_35_4?.brought_forward) || 0;
            const allSetOff = Number(row.allowance_35_4?.set_off) || 0;
            const allBalance = Math.max(0, allBf - allSetOff);

            if (row.allowance_35_4?.balance_cf !== allBalance) {
                form.setValue(`scheduleUD.details.${index}.allowance_35_4.balance_cf`, allBalance);
            }

            totalDepreciationSetOff += depSetOff;
            totalAllowanceSetOff += allSetOff;
        });

        // Update Totals
        form.setValue('scheduleUD.total.depreciation.set_off', totalDepreciationSetOff);
        form.setValue('scheduleUD.total.allowance_35_4.set_off', totalAllowanceSetOff);

    }, [scheduleData, form]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule UD</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Unabsorbed depreciation and allowance under section 35(4)
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 border min-w-[50px]" rowSpan={2}>Sl No</th>
                                <th className="px-2 py-2 border min-w-[150px]" rowSpan={2}>Assessment Year</th>
                                <th className="px-2 py-2 border min-w-[400px]" colSpan={4}>Depreciation</th>
                                <th className="px-2 py-2 border min-w-[300px]" colSpan={3}>Allowance under section 35(4)</th>
                                <th className="px-2 py-2 border min-w-[50px]" rowSpan={2}></th>
                            </tr>
                            <tr>
                                <th className="px-2 py-1 border text-center">Amount of brought forward unabsorbed depreciation</th>
                                <th className="px-2 py-1 border text-center">Amount as adjusted on account of opting for taxation section 115BAA</th>
                                <th className="px-2 py-1 border text-center">Amount of depreciation set-off against the current year income</th>
                                <th className="px-2 py-1 border text-center">Balance carried forward to the next year</th>
                                <th className="px-2 py-1 border text-center">Amount of brought forward unabsorbed allowance</th>
                                <th className="px-2 py-1 border text-center">Amount of allowance set-off against the current year income</th>
                                <th className="px-2 py-1 border text-center">Balance Carried forward to the next year</th>
                            </tr>
                            <tr>
                                <th className="px-2 py-1 border text-center">(1)</th>
                                <th className="px-2 py-1 border text-center">(2)</th>
                                <th className="px-2 py-1 border text-center">(3)</th>
                                <th className="px-2 py-1 border text-center">(3a)</th>
                                <th className="px-2 py-1 border text-center">(4)</th>
                                <th className="px-2 py-1 border text-center">(5)</th>
                                <th className="px-2 py-1 border text-center">(6)</th>
                                <th className="px-2 py-1 border text-center">(7)</th>
                                <th className="px-2 py-1 border text-center">(8)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Current Assessment Year Row - Fixed */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-1 border text-center">i</td>
                                <td className="px-2 py-1 border font-medium">Current Assessment Year</td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td></td>
                            </tr>

                            {/* Dynamic Rows */}
                            {fields.map((field, index) => (
                                <tr key={field.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-2 py-1 border text-center">{index + 1}</td>
                                    <td className="px-2 py-1 border"><TextInput name={`scheduleUD.details.${index}.assessment_year`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`scheduleUD.details.${index}.depreciation.brought_forward`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`scheduleUD.details.${index}.depreciation.adjusted_115baa`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`scheduleUD.details.${index}.depreciation.set_off`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`scheduleUD.details.${index}.depreciation.balance_cf`} form={form} disabled /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`scheduleUD.details.${index}.allowance_35_4.brought_forward`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`scheduleUD.details.${index}.allowance_35_4.set_off`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`scheduleUD.details.${index}.allowance_35_4.balance_cf`} form={form} disabled /></td>
                                    <td className="px-2 py-1 border text-center">
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {/* Add Row Button */}
                            <tr>
                                <td colSpan={10} className="px-2 py-2 border text-center">
                                    <button
                                        type="button"
                                        onClick={() => append({
                                            assessment_year: '',
                                            depreciation: { brought_forward: 0, adjusted_115baa: 0, set_off: 0, balance_cf: 0 },
                                            allowance_35_4: { brought_forward: 0, set_off: 0, balance_cf: 0 }
                                        })}
                                        className="flex items-center justify-center text-blue-600 hover:text-blue-800 mx-auto"
                                    >
                                        <Plus size={16} className="mr-1" /> Add Row
                                    </button>
                                </td>
                            </tr>

                            {/* Total Row */}
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-1 border text-center">iv</td>
                                <td className="px-2 py-1 border text-center">Total</td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleUD.total.depreciation.set_off" form={form} disabled />
                                    <div className="text-xs text-gray-500 font-normal">(3xvi of BFLA)</div>
                                </td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleUD.total.allowance_35_4.set_off" form={form} disabled />
                                    <div className="text-xs text-gray-500 font-normal">(4xvi of BFLA)</div>
                                </td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7ScheduleUD;
