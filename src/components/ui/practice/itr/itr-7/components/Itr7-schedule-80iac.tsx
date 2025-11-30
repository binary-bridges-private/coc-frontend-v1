import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { ITR7Schedule80IACData } from './itr-7-schedule-80iac.types.ts';

export interface Itr7Schedule80IACProps {
    form: UseFormReturn<ITR7Schedule80IACData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7Schedule80IACData>;
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
    form: UseFormReturn<ITR7Schedule80IACData>;
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
    form: UseFormReturn<ITR7Schedule80IACData>;
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

const Itr7Schedule80IAC: React.FC<Itr7Schedule80IACProps> = ({ form }) => {
    const { fields, replace } = useFieldArray({
        control: form.control,
        name: 'schedule80IAC.details',
    });

    useEffect(() => {
        if (fields.length === 0) {
            replace([{ date_incorporation: '', nature_business: '', certificate_number: '', first_ay_claimed: '', amount_deduction: 0 }]);
        }
    }, [fields.length, replace]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule 80IAC</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Deduction in respect of eligible start-up [to be filled only if answer to A19(q) is ‘Yes’]
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 border min-w-[50px]">Sl. No.</th>
                                <th className="px-2 py-2 border min-w-[120px]">Date of incorporation of Startup</th>
                                <th className="px-2 py-2 border min-w-[200px]">Nature of business</th>
                                <th className="px-2 py-2 border min-w-[200px]">Certificate number as obtained from Inter Ministerial Board of Certification</th>
                                <th className="px-2 py-2 border min-w-[150px]">First AY in which deduction was claimed</th>
                                <th className="px-2 py-2 border min-w-[150px]">Amount of deduction claimed for current AY</th>
                            </tr>
                            <tr>
                                <th className="px-2 py-1 border text-center">(1)</th>
                                <th className="px-2 py-1 border text-center">(2)</th>
                                <th className="px-2 py-1 border text-center">(3)</th>
                                <th className="px-2 py-1 border text-center">(4)</th>
                                <th className="px-2 py-1 border text-center">(5)</th>
                                <th className="px-2 py-1 border text-center">(6)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={field.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-2 py-1 border text-center">{index + 1}</td>
                                    <td className="px-2 py-1 border">
                                        <DateInput name={`schedule80IAC.details.${index}.date_incorporation`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <TextInput name={`schedule80IAC.details.${index}.nature_business`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <TextInput name={`schedule80IAC.details.${index}.certificate_number`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <TextInput name={`schedule80IAC.details.${index}.first_ay_claimed`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <NumberInput name={`schedule80IAC.details.${index}.amount_deduction`} form={form} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7Schedule80IAC;
