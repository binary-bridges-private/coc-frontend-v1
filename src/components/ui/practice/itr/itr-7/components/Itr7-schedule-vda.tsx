import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { ITR7ScheduleVDAData } from './itr-7-schedule-vda.types.ts';
import { Plus, Trash2 } from 'lucide-react';

export interface Itr7ScheduleVDAProps {
    form: UseFormReturn<ITR7ScheduleVDAData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleVDAData>;
    className?: string;
    disabled?: boolean;
    placeholder?: string;
}> = ({ name, form, className, disabled, placeholder }) => (
    <input
        type="number"
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full border rounded px-2 py-1 text-sm ${disabled ? 'bg-gray-100' : ''} ${className ?? ''}`}
        {...form.register(name, { valueAsNumber: true })}
    />
);

const DateInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleVDAData>;
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

const SelectInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleVDAData>;
    options: { value: string; label: string }[];
    className?: string;
    disabled?: boolean;
}> = ({ name, form, options, className, disabled }) => (
    <select
        disabled={disabled}
        className={`w-full border rounded px-2 py-1 text-sm ${disabled ? 'bg-gray-100' : ''} ${className ?? ''}`}
        {...form.register(name)}
    >
        <option value="">Select</option>
        {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
);

const Itr7ScheduleVDA: React.FC<Itr7ScheduleVDAProps> = ({ form }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "scheduleVDA.details",
    });

    const details = useWatch({
        control: form.control,
        name: "scheduleVDA.details",
    });

    // Calculate totals
    useEffect(() => {
        if (!details) return;

        let totalBusiness = 0;
        let totalCapitalGain = 0;

        details.forEach((item, index) => {
            const consideration = item.consideration_received || 0;
            const cost = item.cost_acquisition || 0;
            const income = Math.max(0, consideration - cost); // Enter nil in case of loss

            // Update the calculated income field
            if (item.income_from_transfer !== income) {
                form.setValue(`scheduleVDA.details.${index}.income_from_transfer`, income);
            }

            if (item.head_taxed === "Business") {
                totalBusiness += income;
            } else if (item.head_taxed === "Capital Gain") {
                totalCapitalGain += income;
            }
        });

        form.setValue("scheduleVDA.total_business_income", totalBusiness);
        form.setValue("scheduleVDA.total_capital_gain_income", totalCapitalGain);

    }, [details, form]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule VDA</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Income from transfer of Virtual Digital Assets
                </p>
                <p className="text-xs text-gray-500 mb-4 italic">
                    (Note: Details of every transaction are to be filled, wherein every ‘transfer’ is a transaction)
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 border min-w-[50px]">Sl. No.</th>
                                <th className="px-2 py-2 border min-w-[120px]">Date of Acquisition</th>
                                <th className="px-2 py-2 border min-w-[120px]">Date of Transfer</th>
                                <th className="px-2 py-2 border min-w-[150px]">Head under which income to be taxed (Business/Capital Gain)</th>
                                <th className="px-2 py-2 border min-w-[200px]">Cost of Acquisition (In case of gift; a. Enter the amount on which tax is paid u/s 56(2)(x) if any b. In any other case cost to previous owner)</th>
                                <th className="px-2 py-2 border min-w-[120px]">Consideration Received</th>
                                <th className="px-2 py-2 border min-w-[150px]">Income from transfer of Virtual Digital Assets (enter nil in case of loss) (Col. 6 – Col. 5)</th>
                                <th className="px-2 py-2 border min-w-[50px]">Action</th>
                            </tr>
                            <tr>
                                <th className="px-2 py-1 border text-center">(Col. 1)</th>
                                <th className="px-2 py-1 border text-center">(Col. 2)</th>
                                <th className="px-2 py-1 border text-center">(Col. 3)</th>
                                <th className="px-2 py-1 border text-center">(Col. 4)</th>
                                <th className="px-2 py-1 border text-center">(Col. 5)</th>
                                <th className="px-2 py-1 border text-center">(Col. 6)</th>
                                <th className="px-2 py-1 border text-center">(Col. 7)</th>
                                <th className="px-2 py-1 border"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={field.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-2 py-1 border text-center">{index + 1}</td>
                                    <td className="px-2 py-1 border">
                                        <DateInput name={`scheduleVDA.details.${index}.date_acquisition`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <DateInput name={`scheduleVDA.details.${index}.date_transfer`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <SelectInput
                                            name={`scheduleVDA.details.${index}.head_taxed`}
                                            form={form}
                                            options={[
                                                { value: "Business", label: "Business" },
                                                { value: "Capital Gain", label: "Capital Gain" },
                                            ]}
                                        />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <NumberInput name={`scheduleVDA.details.${index}.cost_acquisition`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <NumberInput name={`scheduleVDA.details.${index}.consideration_received`} form={form} />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <NumberInput name={`scheduleVDA.details.${index}.income_from_transfer`} form={form} disabled />
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
                        </tbody>
                    </table>
                </div>
                <div className="mt-4">
                    <button
                        type="button"
                        onClick={() => append({})}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        <Plus size={16} />
                        Add Row
                    </button>
                </div>

                <div className="mt-8 border-t pt-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-1 font-bold">A.</div>
                            <div className="col-span-7 text-sm font-semibold">Total (Sum of all Positive Incomes of Business Income in Col. 7)</div>
                            <div className="col-span-4"><NumberInput name="scheduleVDA.total_business_income" form={form} disabled /></div>
                        </div>
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-1 font-bold">B.</div>
                            <div className="col-span-7 text-sm font-semibold">Total (Sum of all Positive Incomes of Capital Gain in Col. 7)</div>
                            <div className="col-span-4"><NumberInput name="scheduleVDA.total_capital_gain_income" form={form} disabled /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Itr7ScheduleVDA;
