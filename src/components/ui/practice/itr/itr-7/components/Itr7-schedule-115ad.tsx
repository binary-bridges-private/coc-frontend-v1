import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { ITR7Schedule115ADData } from './itr-7-schedule-115ad.types.ts';
import { Plus, Trash2 } from 'lucide-react';

export interface Itr7Schedule115ADProps {
    form: UseFormReturn<ITR7Schedule115ADData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7Schedule115ADData>;
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
    form: UseFormReturn<ITR7Schedule115ADData>;
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

const SelectInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7Schedule115ADData>;
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

const Itr7Schedule115AD: React.FC<Itr7Schedule115ADProps> = ({ form }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "schedule115ad.details",
    });

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule 115AD(1)(b)(iii)-Proviso</h2>
                <p className="text-sm text-gray-600 mb-4">
                    From sale of equity share in a company or unit of equity oriented fund or unit of a business trust on which STT is paid under section 112A rws 115AD(1)(b)(iii) proviso
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 border min-w-[50px]">S. No.</th>
                                <th className="px-2 py-2 border min-w-[150px]">Share/Unit Acquired (On or before/after 31st Jan 2018)</th>
                                <th className="px-2 py-2 border min-w-[150px]">Share/Unit transferred (Before/on or after 23rd July 2024)</th>
                                <th className="px-2 py-2 border min-w-[100px]">ISIN Code</th>
                                <th className="px-2 py-2 border min-w-[150px]">Name of the Share/Unit</th>
                                <th className="px-2 py-2 border min-w-[100px]">No. of Shares/Units</th>
                                <th className="px-2 py-2 border min-w-[100px]">Sale-price per Share/Unit</th>
                                <th className="px-2 py-2 border min-w-[150px]">Full Value Consideration (4*5)</th>
                                <th className="px-2 py-2 border min-w-[150px]">Cost of acquisition without indexation (higher of 8 or 9)</th>
                                <th className="px-2 py-2 border min-w-[100px]">Cost of acquisition</th>
                                <th className="px-2 py-2 border min-w-[150px]">If acquired before 01.02.2018 - Lower of 11 and 6</th>
                                <th className="px-2 py-2 border min-w-[150px]">FMV per share/unit as on 31st Jan 2018</th>
                                <th className="px-2 py-2 border min-w-[150px]">Total FMV (4*10)</th>
                                <th className="px-2 py-2 border min-w-[150px]">Expenditure wholly and exclusively in connection with transfer</th>
                                <th className="px-2 py-2 border min-w-[100px]">Total deductions (7+12)</th>
                                <th className="px-2 py-2 border min-w-[100px]">Balance (6-13)</th>
                                <th className="px-2 py-2 border min-w-[50px]">Action</th>
                            </tr>
                            <tr>
                                <th className="px-2 py-1 border text-center">(Col 1)</th>
                                <th className="px-2 py-1 border text-center">(Col 1a)</th>
                                <th className="px-2 py-1 border text-center">(Col 1b)</th>
                                <th className="px-2 py-1 border text-center">(Col 2)</th>
                                <th className="px-2 py-1 border text-center">(Col 3)</th>
                                <th className="px-2 py-1 border text-center">(Col 4)</th>
                                <th className="px-2 py-1 border text-center">(Col 5)</th>
                                <th className="px-2 py-1 border text-center">(Col 6)</th>
                                <th className="px-2 py-1 border text-center">(Col 7)</th>
                                <th className="px-2 py-1 border text-center">(Col 8)</th>
                                <th className="px-2 py-1 border text-center">(Col 9)</th>
                                <th className="px-2 py-1 border text-center">(Col 10)</th>
                                <th className="px-2 py-1 border text-center">(Col 11)</th>
                                <th className="px-2 py-1 border text-center">(Col 12)</th>
                                <th className="px-2 py-1 border text-center">(Col 13)</th>
                                <th className="px-2 py-1 border text-center">(Col 14)</th>
                                <th className="px-2 py-1 border"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={field.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-2 py-1 border text-center">{index + 1}</td>
                                    <td className="px-2 py-1 border">
                                        <SelectInput
                                            name={`schedule115ad.details.${index}.share_acquired_date`}
                                            form={form}
                                            options={[
                                                { value: "On or before 31st Jan 2018", label: "On or before 31st Jan 2018" },
                                                { value: "After 31st Jan 2018", label: "After 31st Jan 2018" },
                                            ]}
                                        />
                                    </td>
                                    <td className="px-2 py-1 border">
                                        <SelectInput
                                            name={`schedule115ad.details.${index}.share_transferred_date`}
                                            form={form}
                                            options={[
                                                { value: "Before 23rd July 2024", label: "Before 23rd July 2024" },
                                                { value: "On or after 23rd July 2024", label: "On or after 23rd July 2024" },
                                            ]}
                                        />
                                    </td>
                                    <td className="px-2 py-1 border"><TextInput name={`schedule115ad.details.${index}.isin_code`} form={form} /></td>
                                    <td className="px-2 py-1 border"><TextInput name={`schedule115ad.details.${index}.name_share_unit`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`schedule115ad.details.${index}.no_of_shares`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`schedule115ad.details.${index}.sale_price_per_share`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`schedule115ad.details.${index}.full_value_consideration`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`schedule115ad.details.${index}.cost_acquisition_without_indexation`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`schedule115ad.details.${index}.cost_acquisition`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`schedule115ad.details.${index}.lower_of_11_and_6`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`schedule115ad.details.${index}.fair_market_value_per_share`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`schedule115ad.details.${index}.total_fair_market_value`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`schedule115ad.details.${index}.expenditure_transfer`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`schedule115ad.details.${index}.total_deductions`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`schedule115ad.details.${index}.balance`} form={form} /></td>
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
                            <div className="col-span-8 text-sm font-semibold">i. Total of Col 14 where transfer was before 23rd July 2024</div>
                            <div className="col-span-4"><NumberInput name="schedule115ad.total_transfer_before_23_july" form={form} /></div>
                        </div>
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-8 text-sm font-semibold">ii. Total of Col 14 where transfer was on or after 23rd July 2024</div>
                            <div className="col-span-4"><NumberInput name="schedule115ad.total_transfer_after_23_july" form={form} /></div>
                        </div>
                        <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-2 rounded">
                            <div className="col-span-8 text-sm font-bold">iii. Total of LTCG u/s 112A rws 115AD(1)(b)(iii) proviso</div>
                            <div className="col-span-4"><NumberInput name="schedule115ad.total_ltcg_115ad" form={form} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Itr7Schedule115AD;
