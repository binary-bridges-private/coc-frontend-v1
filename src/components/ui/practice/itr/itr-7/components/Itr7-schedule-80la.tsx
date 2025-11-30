import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { ITR7Schedule80LAData } from './itr-7-schedule-80la.types.ts';
import { Plus, Trash2 } from 'lucide-react';

export interface Itr7Schedule80LAProps {
    form: UseFormReturn<ITR7Schedule80LAData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7Schedule80LAData>;
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
    form: UseFormReturn<ITR7Schedule80LAData>;
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

const DateInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7Schedule80LAData>;
    className?: string;
    disabled?: boolean;
}> = ({ name, form, className, disabled }) => (
    <input
        type="date"
        disabled={disabled}
        className={`w-full border rounded px-2 py-1 text-sm ${disabled ? 'bg-gray-100' : ''} ${className ?? ''}`}
        {...form.register(name)}
    />
);

const Itr7Schedule80LA: React.FC<Itr7Schedule80LAProps> = ({ form }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'schedule80LA.details',
    });

    const scheduleData = useWatch({ control: form.control, name: 'schedule80LA' });

    useEffect(() => {
        if (fields.length === 0) {
            append({ type_of_entity: '', type_of_income: '', authority_granting_registration: '', date_of_registration: '', registration_number: '', first_ay_claimed: '', amount_deduction: 0 });
        }
    }, [fields.length, append]);

    useEffect(() => {
        if (!scheduleData?.details) return;

        const total = scheduleData.details.reduce((sum, item) => sum + (Number(item.amount_deduction) || 0), 0);
        form.setValue('schedule80LA.total_deduction', total);

    }, [scheduleData, form]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule 80LA</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Deduction in respect of offshore banking unit or IFSC
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 border min-w-[50px]">Sl. No.</th>
                                <th className="px-2 py-2 border min-w-[150px]">Type of entity</th>
                                <th className="px-2 py-2 border min-w-[150px]">Type of income of the unit</th>
                                <th className="px-2 py-2 border min-w-[150px]">Authority granting registration</th>
                                <th className="px-2 py-2 border min-w-[120px]">Date of registration</th>
                                <th className="px-2 py-2 border min-w-[150px]">Registration number</th>
                                <th className="px-2 py-2 border min-w-[120px]">First AY during which deduction is claimed</th>
                                <th className="px-2 py-2 border min-w-[150px]">Amount of deduction claimed for current AY</th>
                                <th className="px-2 py-2 border min-w-[50px]"></th>
                            </tr>
                            <tr>
                                <th className="px-2 py-1 border text-center">(1)</th>
                                <th className="px-2 py-1 border text-center">(2)</th>
                                <th className="px-2 py-1 border text-center">(3)</th>
                                <th className="px-2 py-1 border text-center">(4)</th>
                                <th className="px-2 py-1 border text-center">(5)</th>
                                <th className="px-2 py-1 border text-center">(6)</th>
                                <th className="px-2 py-1 border text-center">(7)</th>
                                <th className="px-2 py-1 border text-center">(8)</th>
                                <th className="px-2 py-1 border"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={field.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-2 py-1 border text-center">{index + 1}</td>
                                    <td className="px-2 py-1 border">
                                        <TextInput name={`schedule80LA.details.${index}.type_of_entity`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <TextInput name={`schedule80LA.details.${index}.type_of_income`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <TextInput name={`schedule80LA.details.${index}.authority_granting_registration`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <DateInput name={`schedule80LA.details.${index}.date_of_registration`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <TextInput name={`schedule80LA.details.${index}.registration_number`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <TextInput name={`schedule80LA.details.${index}.first_ay_claimed`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <NumberInput name={`schedule80LA.details.${index}.amount_deduction`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border text-center">
                                        <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={9} className="px-2 py-2 border text-center">
                                    <button
                                        type="button"
                                        onClick={() => append({ type_of_entity: '', type_of_income: '', authority_granting_registration: '', date_of_registration: '', registration_number: '', first_ay_claimed: '', amount_deduction: 0 })}
                                        className="flex items-center justify-center text-blue-600 hover:text-blue-800 mx-auto"
                                    >
                                        <Plus size={16} className="mr-1" /> Add Row
                                    </button>
                                </td>
                            </tr>
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-1 border"></td>
                                <td className="px-2 py-1 border" colSpan={6}>Total</td>
                                <td className="px-2 py-1 border"><NumberInput name="schedule80LA.total_deduction" form={form} disabled /></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7Schedule80LA;
