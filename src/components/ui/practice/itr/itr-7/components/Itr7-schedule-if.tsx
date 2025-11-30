import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { ITR7ScheduleIFData } from './itr-7-schedule-if.types.ts';

export interface Itr7ScheduleIFProps {
    form: UseFormReturn<ITR7ScheduleIFData>;
}

const TextInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleIFData>;
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
    form: UseFormReturn<ITR7ScheduleIFData>;
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

const SelectInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleIFData>;
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

const Itr7ScheduleIF: React.FC<Itr7ScheduleIFProps> = ({ form }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'scheduleIF.investments',
    });

    const scheduleData = useWatch({ control: form.control, name: 'scheduleIF' });

    useEffect(() => {
        if (!scheduleData?.investments) return;

        let totalProfit = 0;
        let totalCapital = 0;

        scheduleData.investments.forEach((item) => {
            totalProfit += Number(item.amount_share_in_profit) || 0;
            totalCapital += Number(item.capital_balance) || 0;
        });

        form.setValue('scheduleIF.total_amount_share_in_profit', totalProfit);
        form.setValue('scheduleIF.total_capital_balance', totalCapital);
    }, [scheduleData, form]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule IF</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Information regarding investment in unincorporated entities
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 border text-center" rowSpan={2}>Sl. No.</th>
                                <th className="px-2 py-2 border text-center" rowSpan={2}>Name of the entity</th>
                                <th className="px-2 py-2 border text-center" rowSpan={2}>Type of the entity</th>
                                <th className="px-2 py-2 border text-center" rowSpan={2}>PAN of the entity</th>
                                <th className="px-2 py-2 border text-center" rowSpan={2}>Whether the entity is liable for audit? (Yes/No)</th>
                                <th className="px-2 py-2 border text-center" rowSpan={2}>Whether section 92E is applicable to entity? (Yes/ No)</th>
                                <th className="px-2 py-2 border text-center" rowSpan={2}>Percentage Share in the profit of the entity</th>
                                <th className="px-2 py-2 border text-center">Amount of share in the profit</th>
                                <th className="px-2 py-2 border text-center">Capital balance on 31st March in the entity</th>
                                <th className="px-2 py-2 border text-center" rowSpan={2}></th>
                            </tr>
                            <tr>
                                <th className="px-2 py-2 border text-center">i</th>
                                <th className="px-2 py-2 border text-center">ii</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={field.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-2 py-2 border text-center">{index + 1}</td>
                                    <td className="px-2 py-2 border">
                                        <TextInput name={`scheduleIF.investments.${index}.name`} form={form} />
                                    </td>
                                    <td className="px-2 py-2 border">
                                        <TextInput name={`scheduleIF.investments.${index}.type`} form={form} />
                                    </td>
                                    <td className="px-2 py-2 border">
                                        <TextInput name={`scheduleIF.investments.${index}.pan`} form={form} />
                                    </td>
                                    <td className="px-2 py-2 border">
                                        <SelectInput name={`scheduleIF.investments.${index}.is_liable_for_audit`} form={form} options={['Yes', 'No']} />
                                    </td>
                                    <td className="px-2 py-2 border">
                                        <SelectInput name={`scheduleIF.investments.${index}.is_section_92e_applicable`} form={form} options={['Yes', 'No']} />
                                    </td>
                                    <td className="px-2 py-2 border">
                                        <NumberInput name={`scheduleIF.investments.${index}.percentage_share`} form={form} />
                                    </td>
                                    <td className="px-2 py-2 border">
                                        <NumberInput name={`scheduleIF.investments.${index}.amount_share_in_profit`} form={form} />
                                    </td>
                                    <td className="px-2 py-2 border">
                                        <NumberInput name={`scheduleIF.investments.${index}.capital_balance`} form={form} />
                                    </td>
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
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border" colSpan={10}>
                                    <button
                                        type="button"
                                        onClick={() => append({
                                            name: '',
                                            type: '',
                                            pan: '',
                                            is_liable_for_audit: 'No',
                                            is_section_92e_applicable: 'No',
                                            percentage_share: 0,
                                            amount_share_in_profit: 0,
                                            capital_balance: 0,
                                        })}
                                        className="flex items-center text-blue-600 hover:text-blue-800"
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> Add Entity
                                    </button>
                                </td>
                            </tr>
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-2 border text-center"></td>
                                <td className="px-2 py-2 border" colSpan={6}>Total</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="scheduleIF.total_amount_share_in_profit" form={form} disabled />
                                </td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="scheduleIF.total_capital_balance" form={form} disabled />
                                </td>
                                <td className="px-2 py-2 border"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7ScheduleIF;
