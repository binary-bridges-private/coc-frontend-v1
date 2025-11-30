import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { ITR7Schedule80GData } from './itr-7-schedule-80g.types.ts';
import { Plus, Trash2 } from 'lucide-react';

export interface Itr7Schedule80GProps {
    form: UseFormReturn<ITR7Schedule80GData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7Schedule80GData>;
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
    form: UseFormReturn<ITR7Schedule80GData>;
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

const DonationSection: React.FC<{
    form: UseFormReturn<ITR7Schedule80GData>;
    sectionKey: 'donations_100_percent_no_limit' | 'donations_50_percent_no_limit' | 'donations_100_percent_limit' | 'donations_50_percent_limit';
    title: string;
    label: string;
    showARN?: boolean;
}> = ({ form, sectionKey, title, label, showARN }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: `schedule80G.${sectionKey}.details` as any,
    });

    const sectionData = useWatch({ control: form.control, name: `schedule80G.${sectionKey}` });

    useEffect(() => {
        if (!sectionData?.details) return;

        let totalEligible = 0;

        sectionData.details.forEach((item: any, index: number) => {
            const cash = Number(item.donation_cash) || 0;
            const other = Number(item.donation_other_mode) || 0;
            const total = cash + other;

            if (item.total_donation !== total) {
                form.setValue(`schedule80G.${sectionKey}.details.${index}.total_donation` as any, total);
            }

            // In a real scenario, eligible amount logic might be complex (limits etc). 
            // For now, we assume user enters eligible amount or it equals total (simplified).
            // The image shows "Eligible Amount of donation" as an input column.

            totalEligible += Number(item.eligible_amount) || 0;
        });

        form.setValue(`schedule80G.${sectionKey}.total_eligible_amount` as any, totalEligible);

    }, [sectionData, form, sectionKey]);

    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
                <span className="font-bold">{label}</span>
                <span className="font-semibold">{title}</span>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-2 py-2 border min-w-[200px]" rowSpan={2}>Name and address of donee</th>
                            <th className="px-2 py-2 border min-w-[120px]" rowSpan={2}>PAN of Donee</th>
                            {showARN && <th className="px-2 py-2 border min-w-[120px]" rowSpan={2}>ARN (Donation Reference Number)</th>}
                            <th className="px-2 py-2 border min-w-[300px]" colSpan={3}>Amount of donation</th>
                            <th className="px-2 py-2 border min-w-[120px]" rowSpan={2}>Eligible Amount of donation</th>
                            <th className="px-2 py-2 border min-w-[50px]" rowSpan={2}></th>
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
                                <td className="px-2 py-1 border">
                                    <TextInput name={`schedule80G.${sectionKey}.details.${index}.donee_name_address`} form={form} />
                                </td>
                                <td className="px-2 py-1 border">
                                    <TextInput name={`schedule80G.${sectionKey}.details.${index}.donee_pan`} form={form} />
                                </td>
                                {showARN && (
                                    <td className="px-2 py-1 border">
                                        <TextInput name={`schedule80G.${sectionKey}.details.${index}.arn`} form={form} />
                                    </td>
                                )}
                                <td className="px-2 py-1 border">
                                    <NumberInput name={`schedule80G.${sectionKey}.details.${index}.donation_cash`} form={form} />
                                </td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name={`schedule80G.${sectionKey}.details.${index}.donation_other_mode`} form={form} />
                                </td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name={`schedule80G.${sectionKey}.details.${index}.total_donation`} form={form} disabled />
                                </td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name={`schedule80G.${sectionKey}.details.${index}.eligible_amount`} form={form} />
                                </td>
                                <td className="px-2 py-1 border text-center">
                                    <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={showARN ? 8 : 7} className="px-2 py-2 border text-center">
                                <button
                                    type="button"
                                    onClick={() => append({ donee_name_address: '', donee_pan: '', donation_cash: 0, donation_other_mode: 0, total_donation: 0, eligible_amount: 0 })}
                                    className="flex items-center justify-center text-blue-600 hover:text-blue-800 mx-auto"
                                >
                                    <Plus size={16} className="mr-1" /> Add Donation
                                </button>
                            </td>
                        </tr>
                        <tr className="bg-gray-100 border-b font-bold">
                            <td className="px-2 py-1 border" colSpan={showARN ? 6 : 5}>Total</td>
                            <td className="px-2 py-1 border"></td>
                            <td className="px-2 py-1 border">
                                <NumberInput name={`schedule80G.${sectionKey}.total_eligible_amount`} form={form} disabled />
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Itr7Schedule80G: React.FC<Itr7Schedule80GProps> = ({ form }) => {
    const scheduleData = useWatch({ control: form.control, name: 'schedule80G' });

    useEffect(() => {
        if (!scheduleData) return;
        const total = (scheduleData.donations_100_percent_no_limit?.total_eligible_amount || 0) +
            (scheduleData.donations_50_percent_no_limit?.total_eligible_amount || 0) +
            (scheduleData.donations_100_percent_limit?.total_eligible_amount || 0) +
            (scheduleData.donations_50_percent_limit?.total_eligible_amount || 0);

        form.setValue('schedule80G.total_donations_eligible', total);
    }, [scheduleData, form]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule 80G</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Details of donations entitled for deduction under section 80G
                </p>

                <DonationSection form={form} sectionKey="donations_100_percent_no_limit" label="A" title="Donations entitled for 100% deduction without qualifying limit" />
                <DonationSection form={form} sectionKey="donations_50_percent_no_limit" label="B" title="Donations entitled for 50% deduction without qualifying limit" />
                <DonationSection form={form} sectionKey="donations_100_percent_limit" label="C" title="Donations entitled for 100% deduction subject to qualifying limit" />
                <DonationSection form={form} sectionKey="donations_50_percent_limit" label="D" title="Donations entitled for 50% deduction subject to qualifying limit" showARN={true} />

                <div className="mt-4 border-t pt-4">
                    <div className="grid grid-cols-12 gap-4 items-center font-bold">
                        <div className="col-span-1">E</div>
                        <div className="col-span-7">Total donations (Aiv + Biv + Civ + Div)</div>
                        <div className="col-span-4">
                            <NumberInput name="schedule80G.total_donations_eligible" form={form} disabled />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Itr7Schedule80G;
