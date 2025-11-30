import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { ITR7ScheduleRAData } from './itr-7-schedule-ra.types.ts';

export interface Itr7ScheduleRAProps {
    form: UseFormReturn<ITR7ScheduleRAData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleRAData>;
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
    form: UseFormReturn<ITR7ScheduleRAData>;
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

const Itr7ScheduleRA: React.FC<Itr7ScheduleRAProps> = ({ form }) => {
    const { fields, replace } = useFieldArray({
        control: form.control,
        name: 'scheduleRA.details',
    });

    const scheduleData = useWatch({ control: form.control, name: 'scheduleRA' });

    useEffect(() => {
        if (fields.length === 0) {
            replace([
                { donee_name_address: '', donee_pan: '', donation_cash: 0, donation_other_mode: 0, total_donation: 0, eligible_amount: 0 },
                { donee_name_address: '', donee_pan: '', donation_cash: 0, donation_other_mode: 0, total_donation: 0, eligible_amount: 0 },
                { donee_name_address: '', donee_pan: '', donation_cash: 0, donation_other_mode: 0, total_donation: 0, eligible_amount: 0 },
            ]);
        }
    }, [fields.length, replace]);

    useEffect(() => {
        if (!scheduleData?.details) return;

        let totalCash = 0;
        let totalOther = 0;
        let totalDonation = 0;
        let totalEligible = 0;

        scheduleData.details.forEach((row, index) => {
            const cash = Number(row.donation_cash) || 0;
            const other = Number(row.donation_other_mode) || 0;
            const total = cash + other;

            if (row.total_donation !== total) {
                form.setValue(`scheduleRA.details.${index}.total_donation`, total);
            }

            totalCash += cash;
            totalOther += other;
            totalDonation += total;
            totalEligible += Number(row.eligible_amount) || 0;
        });

        form.setValue('scheduleRA.total_donation.donation_cash', totalCash);
        form.setValue('scheduleRA.total_donation.donation_other_mode', totalOther);
        form.setValue('scheduleRA.total_donation.total_donation', totalDonation);
        form.setValue('scheduleRA.total_donation.eligible_amount', totalEligible);

    }, [scheduleData, form]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule RA</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Details of donations to research associations etc. [deduction under sections 35(1)(ii) or 35(1)(iia) or 35(1)(iii) or 35(2AA)]
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 border min-w-[50px]" rowSpan={2}>S. No.</th>
                                <th className="px-2 py-2 border min-w-[200px]" rowSpan={2}>Name and address of donee</th>
                                <th className="px-2 py-2 border min-w-[120px]" rowSpan={2}>PAN of Donee</th>
                                <th className="px-2 py-2 border min-w-[300px]" colSpan={3}>Amount of donation</th>
                                <th className="px-2 py-2 border min-w-[120px]" rowSpan={2}>Eligible Amount of donation</th>
                            </tr>
                            <tr>
                                <th className="px-2 py-1 border text-center">Donation in cash</th>
                                <th className="px-2 py-1 border text-center">Donation in other mode</th>
                                <th className="px-2 py-1 border text-center">Total Donation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={field.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-2 py-1 border text-center">
                                        {index === 0 ? 'i' : index === 1 ? 'ii' : 'iii'}
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <TextInput name={`scheduleRA.details.${index}.donee_name_address`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <TextInput name={`scheduleRA.details.${index}.donee_pan`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <NumberInput name={`scheduleRA.details.${index}.donation_cash`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <NumberInput name={`scheduleRA.details.${index}.donation_other_mode`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <NumberInput name={`scheduleRA.details.${index}.total_donation`} form={form} disabled />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <NumberInput name={`scheduleRA.details.${index}.eligible_amount`} form={form} />
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-1 border"></td>
                                <td className="px-2 py-1 border" colSpan={2}>Total</td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleRA.total_donation.donation_cash" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleRA.total_donation.donation_other_mode" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleRA.total_donation.total_donation" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleRA.total_donation.eligible_amount" form={form} disabled /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7ScheduleRA;
