import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { ITR7Schedule80GGCData } from './itr-7-schedule-80ggc.types.ts';
import { Plus, Trash2 } from 'lucide-react';

export interface Itr7Schedule80GGCProps {
    form: UseFormReturn<ITR7Schedule80GGCData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7Schedule80GGCData>;
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
    form: UseFormReturn<ITR7Schedule80GGCData>;
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
    form: UseFormReturn<ITR7Schedule80GGCData>;
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

const Itr7Schedule80GGC: React.FC<Itr7Schedule80GGCProps> = ({ form }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'schedule80GGC.details',
    });

    const scheduleData = useWatch({ control: form.control, name: 'schedule80GGC' });

    useEffect(() => {
        if (fields.length === 0) {
            append({ date: '', contribution_cash: 0, contribution_other_mode: 0, total_contribution: 0, eligible_amount: 0, transaction_ref_no: '', ifs_code: '' });
        }
    }, [fields.length, append]);

    useEffect(() => {
        if (!scheduleData?.details) return;

        let totalCash = 0;
        let totalOther = 0;
        let totalContribution = 0;
        let totalEligible = 0;

        scheduleData.details.forEach((row, index) => {
            const cash = Number(row.contribution_cash) || 0;
            const other = Number(row.contribution_other_mode) || 0;
            const total = cash + other;

            if (row.total_contribution !== total) {
                form.setValue(`schedule80GGC.details.${index}.total_contribution`, total);
            }

            totalCash += cash;
            totalOther += other;
            totalContribution += total;
            totalEligible += Number(row.eligible_amount) || 0;
        });

        form.setValue('schedule80GGC.total_contribution.contribution_cash', totalCash);
        form.setValue('schedule80GGC.total_contribution.contribution_other_mode', totalOther);
        form.setValue('schedule80GGC.total_contribution.total_contribution', totalContribution);
        form.setValue('schedule80GGC.total_contribution.eligible_amount', totalEligible);

    }, [scheduleData, form]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule 80GGC</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Details of contributions made to political parties
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 border min-w-[50px]" rowSpan={2}>S. No.</th>
                                <th className="px-2 py-2 border min-w-[120px]" rowSpan={2}>Date</th>
                                <th className="px-2 py-2 border min-w-[300px]" colSpan={3}>Amount of contribution</th>
                                <th className="px-2 py-2 border min-w-[120px]" rowSpan={2}>Eligible amount of contribution</th>
                                <th className="px-2 py-2 border min-w-[200px]" rowSpan={2}>Transaction Reference number for UPI transfer or Cheque number/IMPS/NEFT/RTGS</th>
                                <th className="px-2 py-2 border min-w-[100px]" rowSpan={2}>IFS code of Bank</th>
                                <th className="px-2 py-2 border min-w-[50px]" rowSpan={2}></th>
                            </tr>
                            <tr>
                                <th className="px-2 py-1 border text-center">Contribution in cash</th>
                                <th className="px-2 py-1 border text-center">Contribution in other mode</th>
                                <th className="px-2 py-1 border text-center">Total Contribution</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={field.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-2 py-1 border text-center">{index + 1}</td>
                                    <td className="px-2 py-1 border">
                                        <DateInput name={`schedule80GGC.details.${index}.date`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <NumberInput name={`schedule80GGC.details.${index}.contribution_cash`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <NumberInput name={`schedule80GGC.details.${index}.contribution_other_mode`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <NumberInput name={`schedule80GGC.details.${index}.total_contribution`} form={form} disabled />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <NumberInput name={`schedule80GGC.details.${index}.eligible_amount`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <TextInput name={`schedule80GGC.details.${index}.transaction_ref_no`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <TextInput name={`schedule80GGC.details.${index}.ifs_code`} form={form} />
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
                                        onClick={() => append({ date: '', contribution_cash: 0, contribution_other_mode: 0, total_contribution: 0, eligible_amount: 0, transaction_ref_no: '', ifs_code: '' })}
                                        className="flex items-center justify-center text-blue-600 hover:text-blue-800 mx-auto"
                                    >
                                        <Plus size={16} className="mr-1" /> Add Row
                                    </button>
                                </td>
                            </tr>
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-1 border"></td>
                                <td className="px-2 py-1 border">Total contribution</td>
                                <td className="px-2 py-1 border"><NumberInput name="schedule80GGC.total_contribution.contribution_cash" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="schedule80GGC.total_contribution.contribution_other_mode" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="schedule80GGC.total_contribution.total_contribution" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="schedule80GGC.total_contribution.eligible_amount" form={form} disabled /></td>
                                <td className="px-2 py-1 border" colSpan={3}></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7Schedule80GGC;
