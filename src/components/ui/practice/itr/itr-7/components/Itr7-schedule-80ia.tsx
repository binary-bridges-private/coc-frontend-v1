import React, { useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { ITR7Schedule80IAData } from './itr-7-schedule-80ia.types.ts';

export interface Itr7Schedule80IAProps {
    form: UseFormReturn<ITR7Schedule80IAData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7Schedule80IAData>;
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

const Itr7Schedule80IA: React.FC<Itr7Schedule80IAProps> = ({ form }) => {
    const scheduleData = useWatch({ control: form.control, name: 'schedule80IA' });

    useEffect(() => {
        if (!scheduleData) return;

        const a1 = Number(scheduleData.section_80ia_4_i?.undertaking1) || 0;
        const a2 = Number(scheduleData.section_80ia_4_i?.undertaking2) || 0;
        const b1 = Number(scheduleData.section_80ia_4_iv?.undertaking1) || 0;
        const b2 = Number(scheduleData.section_80ia_4_iv?.undertaking2) || 0;
        const c1 = Number(scheduleData.section_80ia_4_v?.undertaking1) || 0;
        const c2 = Number(scheduleData.section_80ia_4_v?.undertaking2) || 0;

        const total = a1 + a2 + b1 + b2 + c1 + c2;

        form.setValue('schedule80IA.total_deduction', total);

    }, [scheduleData, form]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule 80-IA</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Deductions under section 80-IA
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <tbody>
                            {/* a */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border font-medium w-[50px]" rowSpan={2}>a</td>
                                <td className="px-2 py-2 border w-[400px]" rowSpan={2}>
                                    Deduction in respect of profits of an enterprise referred to in section 80-IA(4)(i) [Infrastructure facility]
                                </td>
                                <td className="px-2 py-2 border w-[50px] text-center font-bold">a1</td>
                                <td className="px-2 py-2 border w-[200px] font-medium">Undertaking no. 1</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="schedule80IA.section_80ia_4_i.undertaking1" form={form} />
                                    <div className="text-xs text-gray-500 italic">(item 30 of Form 10CCB of the undertaking)</div>
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border w-[50px] text-center font-bold">a2</td>
                                <td className="px-2 py-2 border w-[200px] font-medium">Undertaking no. 2</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="schedule80IA.section_80ia_4_i.undertaking2" form={form} />
                                    <div className="text-xs text-gray-500 italic">(item 30 of Form 10CCB of the undertaking)</div>
                                </td>
                            </tr>

                            {/* b */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border font-medium w-[50px]" rowSpan={2}>b</td>
                                <td className="px-2 py-2 border w-[400px]" rowSpan={2}>
                                    Deduction in respect of profits of an undertaking referred to in section 80-IA(4)(iv) [Power]
                                </td>
                                <td className="px-2 py-2 border w-[50px] text-center font-bold">b1</td>
                                <td className="px-2 py-2 border w-[200px] font-medium">Undertaking no. 1</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="schedule80IA.section_80ia_4_iv.undertaking1" form={form} />
                                    <div className="text-xs text-gray-500 italic">(item 30 of Form 10CCB of the undertaking)</div>
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border w-[50px] text-center font-bold">b2</td>
                                <td className="px-2 py-2 border w-[200px] font-medium">Undertaking no. 2</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="schedule80IA.section_80ia_4_iv.undertaking2" form={form} />
                                    <div className="text-xs text-gray-500 italic">(item 30 of Form 10CCB of the undertaking)</div>
                                </td>
                            </tr>

                            {/* c */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border font-medium w-[50px]" rowSpan={2}>c</td>
                                <td className="px-2 py-2 border w-[400px]" rowSpan={2}>
                                    Deduction in respect of profits of an undertaking referred to in section 80-IA(4)(v) [Revival of power generating plant]
                                </td>
                                <td className="px-2 py-2 border w-[50px] text-center font-bold">c1</td>
                                <td className="px-2 py-2 border w-[200px] font-medium">Undertaking no. 1</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="schedule80IA.section_80ia_4_v.undertaking1" form={form} />
                                    <div className="text-xs text-gray-500 italic">(item 30 of Form 10CCB of the undertaking)</div>
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border w-[50px] text-center font-bold">c2</td>
                                <td className="px-2 py-2 border w-[200px] font-medium">Undertaking no. 2</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="schedule80IA.section_80ia_4_v.undertaking2" form={form} />
                                    <div className="text-xs text-gray-500 italic">(item 30 of Form 10CCB of the undertaking)</div>
                                </td>
                            </tr>

                            {/* Total */}
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-2 border text-center">d</td>
                                <td className="px-2 py-2 border" colSpan={3}>Total deductions under section 80-IA (a1 + a2 + b1 + b2 + c1+ c2)</td>
                                <td className="px-2 py-2 border"><NumberInput name="schedule80IA.total_deduction" form={form} disabled /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7Schedule80IA;
