import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { ITR7Schedule10AAData } from './itr-7-schedule-10aa.types.ts';
import { Plus, Trash2 } from 'lucide-react';

export interface Itr7Schedule10AAProps {
    form: UseFormReturn<ITR7Schedule10AAData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7Schedule10AAData>;
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
    form: UseFormReturn<ITR7Schedule10AAData>;
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

const Itr7Schedule10AA: React.FC<Itr7Schedule10AAProps> = ({ form }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'schedule10AA.deductions',
    });

    const scheduleData = useWatch({ control: form.control, name: 'schedule10AA' });

    useEffect(() => {
        if (fields.length === 0) {
            append({ undertaking_name: 'Undertaking No.1', assessment_year: '', amount: 0 });
        }
    }, [fields.length, append]);

    useEffect(() => {
        if (!scheduleData?.deductions) return;

        const total = scheduleData.deductions.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
        form.setValue('schedule10AA.total_deduction', total);

    }, [scheduleData, form]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule 10AA</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Deduction under section 10AA
                </p>
                <p className="text-xs text-gray-500 mb-4 italic">
                    Deductions in respect of units located in Special Economic Zone
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 border min-w-[50px]">Sl</th>
                                <th className="px-2 py-2 border min-w-[200px]">Undertaking</th>
                                <th className="px-2 py-2 border min-w-[200px]">Assessment year in which unit begins to manufacture/produce/provide services</th>
                                <th className="px-2 py-2 border min-w-[50px]">Sl</th>
                                <th className="px-2 py-2 border min-w-[150px]">Amount of deduction</th>
                                <th className="px-2 py-2 border min-w-[50px]"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={field.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-2 py-1 border text-center">{String.fromCharCode(97 + index)}</td>
                                    <td className="px-2 py-1 border">
                                        <TextInput name={`schedule10AA.deductions.${index}.undertaking_name`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <TextInput name={`schedule10AA.deductions.${index}.assessment_year`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border text-center">{String.fromCharCode(97 + index)}</td>
                                    <td className="px-2 py-1 border">
                                        <NumberInput name={`schedule10AA.deductions.${index}.amount`} form={form} />
                                        <div className="text-xs text-gray-500 italic">
                                            (item 17 of Annexure A of Form 56F for Undertaking {index + 1})
                                        </div>
                                    </td>
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
                            <tr>
                                <td colSpan={6} className="px-2 py-2 border text-center">
                                    <button
                                        type="button"
                                        onClick={() => append({ undertaking_name: `Undertaking No.${fields.length + 1}`, assessment_year: '', amount: 0 })}
                                        className="flex items-center justify-center text-blue-600 hover:text-blue-800 mx-auto"
                                    >
                                        <Plus size={16} className="mr-1" /> Add Undertaking
                                    </button>
                                </td>
                            </tr>
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-1 border text-center">{String.fromCharCode(97 + fields.length)}</td>
                                <td className="px-2 py-1 border" colSpan={3}>Total deduction under section 10AA (a+b+...)</td>
                                <td className="px-2 py-1 border"><NumberInput name="schedule10AA.total_deduction" form={form} disabled /></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7Schedule10AA;
