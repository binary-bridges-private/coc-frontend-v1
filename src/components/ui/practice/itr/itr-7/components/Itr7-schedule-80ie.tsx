import React, { useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { ITR7Schedule80IEData } from './itr-7-schedule-80ie.types.ts';

export interface Itr7Schedule80IEProps {
    form: UseFormReturn<ITR7Schedule80IEData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7Schedule80IEData>;
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

const Itr7Schedule80IE: React.FC<Itr7Schedule80IEProps> = ({ form }) => {
    const scheduleData = useWatch({ control: form.control, name: 'schedule80IE' });

    useEffect(() => {
        if (!scheduleData) return;

        const states = [
            'assam', 'arunachal_pradesh', 'manipur', 'mizoram',
            'meghalaya', 'nagaland', 'tripura', 'sikkim'
        ] as const;

        let total = 0;

        states.forEach(state => {
            const u1 = Number(scheduleData[state]?.undertaking1) || 0;
            const u2 = Number(scheduleData[state]?.undertaking2) || 0;
            total += u1 + u2;
        });

        form.setValue('schedule80IE.total_deduction_north_east', total);
        form.setValue('schedule80IE.total_deduction_80ie', total);

    }, [scheduleData, form]);

    const renderStateRows = (label: string, key: string, rowLabel1: string, rowLabel2: string) => (
        <>
            <tr className="bg-white border-b">
                <td className="px-2 py-2 border font-medium w-[50px]" rowSpan={2}>{label}</td>
                <td className="px-2 py-2 border w-[200px]" rowSpan={2}>{label === 'aa' ? 'Assam' : label === 'ab' ? 'Arunachal Pradesh' : label === 'ac' ? 'Manipur' : label === 'ad' ? 'Mizoram' : label === 'ae' ? 'Meghalaya' : label === 'af' ? 'Nagaland' : label === 'ag' ? 'Tripura' : 'Sikkim'}</td>
                <td className="px-2 py-2 border w-[50px] text-center font-bold">{rowLabel1}</td>
                <td className="px-2 py-2 border w-[200px] font-medium">Undertaking no. 1</td>
                <td className="px-2 py-2 border">
                    <NumberInput name={`schedule80IE.${key}.undertaking1`} form={form} />
                    <div className="text-xs text-gray-500 italic">(30 of Form 10CCB of the undertaking)</div>
                </td>
            </tr>
            <tr className="bg-white border-b">
                <td className="px-2 py-2 border w-[50px] text-center font-bold">{rowLabel2}</td>
                <td className="px-2 py-2 border w-[200px] font-medium">Undertaking no. 2</td>
                <td className="px-2 py-2 border">
                    <NumberInput name={`schedule80IE.${key}.undertaking2`} form={form} />
                    <div className="text-xs text-gray-500 italic">(30 of Form 10CCB of the undertaking)</div>
                </td>
            </tr>
        </>
    );

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule 80-IE</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Deductions under section 80-IE
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <tbody>
                            <tr className="bg-gray-50 border-b">
                                <td className="px-2 py-2 border font-bold w-[50px]">a</td>
                                <td className="px-2 py-2 border font-bold" colSpan={4}>Deduction in respect of undertaking located in North-East</td>
                            </tr>
                            {renderStateRows('aa', 'assam', 'aa1', 'aa2')}
                            {renderStateRows('ab', 'arunachal_pradesh', 'ab1', 'ab2')}
                            {renderStateRows('ac', 'manipur', 'ac1', 'ac2')}
                            {renderStateRows('ad', 'mizoram', 'ad1', 'ad2')}
                            {renderStateRows('ae', 'meghalaya', 'ae1', 'ae2')}
                            {renderStateRows('af', 'nagaland', 'af1', 'af2')}
                            {renderStateRows('ag', 'tripura', 'ag1', 'ag2')}
                            {renderStateRows('ah', 'sikkim', 'ah1', 'ah2')}

                            <tr className="bg-white border-b font-bold">
                                <td className="px-2 py-2 border text-center">ai</td>
                                <td className="px-2 py-2 border" colSpan={3}>Total deduction for undertakings located in North-east (total of aa1 to ah2)</td>
                                <td className="px-2 py-2 border"><NumberInput name="schedule80IE.total_deduction_north_east" form={form} disabled /></td>
                            </tr>
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-2 border text-center">b</td>
                                <td className="px-2 py-2 border" colSpan={3}>Total deduction under section 80-IE: (ai)</td>
                                <td className="px-2 py-2 border"><NumberInput name="schedule80IE.total_deduction_80ie" form={form} disabled /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7Schedule80IE;
