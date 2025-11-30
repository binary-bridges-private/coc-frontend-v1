import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { ITR7ScheduleHPData } from './itr-7-schedule-hp.types.ts';

export interface Itr7ScheduleHPProps {
    form: UseFormReturn<ITR7ScheduleHPData>;
}

const NumberInput: React.FC<{
    label: string;
    name: any;
    form: UseFormReturn<ITR7ScheduleHPData>;
    className?: string;
}> = ({ label, name, form, className }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type="number"
            className={`w-full border rounded px-3 py-2 ${className ?? ''}`}
            {...form.register(name, { valueAsNumber: true })}
        />
    </div>
);

const TextInput: React.FC<{
    label: string;
    name: any;
    form: UseFormReturn<ITR7ScheduleHPData>;
    className?: string;
}> = ({ label, name, form, className }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type="text"
            className={`w-full border rounded px-3 py-2 ${className ?? ''}`}
            {...form.register(name)}
        />
    </div>
);

const RadioInput: React.FC<{
    label: string;
    name: any;
    options: { label: string; value: string }[];
    form: UseFormReturn<ITR7ScheduleHPData>;
}> = ({ label, name, options, form }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="flex gap-4">
            {options.map((option) => (
                <label key={option.value} className="flex items-center gap-2">
                    <input
                        type="radio"
                        value={option.value}
                        {...form.register(name)}
                        className="h-4 w-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                </label>
            ))}
        </div>
    </div>
);

const Itr7ScheduleHP: React.FC<Itr7ScheduleHPProps> = ({ form }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "properties"
    });

    // Ensure at least one property exists
    React.useEffect(() => {
        if (fields.length === 0) {
            append({
                type_of_property: 'let_out',
                tenant_name: '',
                tenant_pan_aadhaar: '',
            });
        }
    }, [fields, append]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule HP: Details of Income from House Property</h2>

                {fields.map((field, index) => (
                    <div key={field.id} className="mb-8 border-b pb-8 last:border-0">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Property {index + 1}</h3>
                            {index > 0 && (
                                <button type="button" onClick={() => remove(index)} className="text-red-600 hover:text-red-800">
                                    Remove Property
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            <RadioInput
                                label="Tick the applicable option"
                                name={`properties.${index}.type_of_property`}
                                options={[
                                    { label: 'Let out', value: 'let_out' },
                                    { label: 'Deemed let out', value: 'deemed_let_out' },
                                ]}
                                form={form}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <TextInput label="Name of Tenant" name={`properties.${index}.tenant_name`} form={form} />
                                <TextInput label="PAN/Aadhaar No. of Tenant" name={`properties.${index}.tenant_pan_aadhaar`} form={form} />
                                <TextInput label="PAN/TAN/Aadhaar No. of Tenant (if TDS credit claimed)" name={`properties.${index}.tenant_pan_tan_aadhaar_tds`} form={form} />
                            </div>

                            <NumberInput label="a. Gross rent received or receivable or lettable value" name={`properties.${index}.gross_rent_received`} form={form} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <NumberInput label="b. The amount of rent which cannot be realized" name={`properties.${index}.rent_cannot_be_realized`} form={form} />
                                <NumberInput label="c. Tax paid to local authorities" name={`properties.${index}.tax_paid_local_authorities`} form={form} />
                            </div>

                            <NumberInput label="d. Total (1b + 1c)" name={`properties.${index}.total_1b_1c`} form={form} />
                            <NumberInput label="e. Annual value (1a - 1d)" name={`properties.${index}.annual_value`} form={form} />
                            <NumberInput label="f. Annual value of the property owned (own percentage share x 1e)" name={`properties.${index}.annual_value_property_owned`} form={form} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <NumberInput label="g. 30% of 1f" name={`properties.${index}.standard_deduction_30_percent`} form={form} />
                                <NumberInput label="h. Interest payable on borrowed capital" name={`properties.${index}.interest_payable_borrowed_capital`} form={form} />
                            </div>

                            <NumberInput label="i. Total (1g + 1h)" name={`properties.${index}.total_1g_1h`} form={form} />
                            <NumberInput label="j. Arrears/Unrealised rent received during the year less 30%" name={`properties.${index}.arrears_unrealised_rent_received`} form={form} />
                            <NumberInput label="k. Income from house property 1 (1f - 1i + 1j)" name={`properties.${index}.income_from_house_property`} form={form} />
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={() => append({ type_of_property: 'let_out', tenant_name: '', tenant_pan_aadhaar: '' })}
                    className="mb-6 px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                >
                    + Add Another Property
                </button>

                <div className="space-y-4 pt-4 border-t">
                    <NumberInput label="2. Pass through income/loss if any" name="pass_through_income_loss" form={form} />
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <NumberInput label="3. Income under the head 'Income from house property' (Σ 1k + 2)" name="total_income_house_property" form={form} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Itr7ScheduleHP;
