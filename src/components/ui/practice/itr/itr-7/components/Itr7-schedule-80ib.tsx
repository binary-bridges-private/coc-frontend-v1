import React, { useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { ITR7Schedule80IBData } from './itr-7-schedule-80ib.types.ts';

export interface Itr7Schedule80IBProps {
    form: UseFormReturn<ITR7Schedule80IBData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7Schedule80IBData>;
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

const Itr7Schedule80IB: React.FC<Itr7Schedule80IBProps> = ({ form }) => {
    const scheduleData = useWatch({ control: form.control, name: 'schedule80IB' });

    useEffect(() => {
        if (!scheduleData) return;

        const a1 = Number(scheduleData.section_80ib_9?.undertaking1) || 0;
        const a2 = Number(scheduleData.section_80ib_9?.undertaking2) || 0;
        const b1 = Number(scheduleData.section_80ib_10?.undertaking1) || 0;
        const b2 = Number(scheduleData.section_80ib_10?.undertaking2) || 0;
        const c1 = Number(scheduleData.section_80ib_11a?.undertaking1) || 0;
        const c2 = Number(scheduleData.section_80ib_11a?.undertaking2) || 0;
        const d1 = Number(scheduleData.section_80ib_11a_integrated?.undertaking1) || 0;
        const d2 = Number(scheduleData.section_80ib_11a_integrated?.undertaking2) || 0;

        const total = a1 + a2 + b1 + b2 + c1 + c2 + d1 + d2;

        form.setValue('schedule80IB.total_deduction', total);

    }, [scheduleData, form]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule 80-IB</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Deductions under section 80-IB
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <tbody>
                            {/* a */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border font-medium w-[50px]" rowSpan={2}>a</td>
                                <td className="px-2 py-2 border w-[400px]" rowSpan={2}>
                                    Deduction in the case of undertaking which begins commercial production or refining of mineral oil [Section 80-IB(9)]
                                </td>
                                <td className="px-2 py-2 border w-[50px] text-center font-bold">a1</td>
                                <td className="px-2 py-2 border w-[200px] font-medium">Undertaking no. 1</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="schedule80IB.section_80ib_9.undertaking1" form={form} />
                                    <div className="text-xs text-gray-500 italic">(30 of Form 10CCB of the undertaking)</div>
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border w-[50px] text-center font-bold">a2</td>
                                <td className="px-2 py-2 border w-[200px] font-medium">Undertaking no. 2</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="schedule80IB.section_80ib_9.undertaking2" form={form} />
                                    <div className="text-xs text-gray-500 italic">(30 of Form 10CCB of the undertaking)</div>
                                </td>
                            </tr>

                            {/* b */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border font-medium w-[50px]" rowSpan={2}>b</td>
                                <td className="px-2 py-2 border w-[400px]" rowSpan={2}>
                                    Deduction in the case of an undertaking developing and building housing projects [Section 80-IB(10)]
                                </td>
                                <td className="px-2 py-2 border w-[50px] text-center font-bold">b1</td>
                                <td className="px-2 py-2 border w-[200px] font-medium">Undertaking no. 1</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="schedule80IB.section_80ib_10.undertaking1" form={form} />
                                    <div className="text-xs text-gray-500 italic">(30 of Form 10CCB of the undertaking)</div>
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border w-[50px] text-center font-bold">b2</td>
                                <td className="px-2 py-2 border w-[200px] font-medium">Undertaking no. 2</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="schedule80IB.section_80ib_10.undertaking2" form={form} />
                                    <div className="text-xs text-gray-500 italic">(30 of Form 10CCB of the undertaking)</div>
                                </td>
                            </tr>

                            {/* c */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border font-medium w-[50px]" rowSpan={2}>c</td>
                                <td className="px-2 py-2 border w-[400px]" rowSpan={2}>
                                    Deduction in the case of an undertaking engaged in processing, preservation and packaging of fruits, vegetables, meat, meat products, poultry, marine or dairy products [Section 80-IB(11A)]
                                </td>
                                <td className="px-2 py-2 border w-[50px] text-center font-bold">c1</td>
                                <td className="px-2 py-2 border w-[200px] font-medium">Undertaking no. 1</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="schedule80IB.section_80ib_11a.undertaking1" form={form} />
                                    <div className="text-xs text-gray-500 italic">(30 of Form 10CCB of the undertaking)</div>
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border w-[50px] text-center font-bold">c2</td>
                                <td className="px-2 py-2 border w-[200px] font-medium">Undertaking no. 2</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="schedule80IB.section_80ib_11a.undertaking2" form={form} />
                                    <div className="text-xs text-gray-500 italic">(30 of Form 10CCB of the undertaking)</div>
                                </td>
                            </tr>

                            {/* d */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border font-medium w-[50px]" rowSpan={2}>d</td>
                                <td className="px-2 py-2 border w-[400px]" rowSpan={2}>
                                    Deduction in the case of an undertaking engaged in integrated business of handling, storage and transportation of food grains [Section 80-IB(11A)]
                                </td>
                                <td className="px-2 py-2 border w-[50px] text-center font-bold">d1</td>
                                <td className="px-2 py-2 border w-[200px] font-medium">Undertaking no. 1</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="schedule80IB.section_80ib_11a_integrated.undertaking1" form={form} />
                                    <div className="text-xs text-gray-500 italic">(30 of Form 10CCB of the undertaking)</div>
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border w-[50px] text-center font-bold">d2</td>
                                <td className="px-2 py-2 border w-[200px] font-medium">Undertaking no. 2</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="schedule80IB.section_80ib_11a_integrated.undertaking2" form={form} />
                                    <div className="text-xs text-gray-500 italic">(30 of Form 10CCB of the undertaking)</div>
                                </td>
                            </tr>

                            {/* Total */}
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-2 border text-center">e</td>
                                <td className="px-2 py-2 border" colSpan={3}>Total deduction under section 80-IB (Total of a1 to d2)</td>
                                <td className="px-2 py-2 border"><NumberInput name="schedule80IB.total_deduction" form={form} disabled /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7Schedule80IB;
