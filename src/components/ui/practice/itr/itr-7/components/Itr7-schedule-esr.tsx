import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7ScheduleESRData } from './itr-7-schedule-esr.types.ts';

export interface Itr7ScheduleESRProps {
    form: UseFormReturn<ITR7ScheduleESRData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleESRData>;
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

const Itr7ScheduleESR: React.FC<Itr7ScheduleESRProps> = ({ form }) => {
    const sections = [
        { key: '35_1_i', label: '35(1)(i)' },
        { key: '35_1_ii', label: '35(1)(ii)' },
        { key: '35_1_iia', label: '35(1)(iia)' },
        { key: '35_1_iii', label: '35(1)(iii)' },
        { key: '35_1_iv', label: '35(1)(iv)' },
        { key: '35_2aa', label: '35(2AA)' },
        { key: '35_2ab', label: '35(2AB)' },
        { key: '35ccc', label: '35CCC' },
        { key: '35ccd', label: '35CCD' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule ESR: Expenditure on scientific Research etc.</h2>
                <p className="text-sm text-gray-600 mb-4">(Deduction under section 35 or 35CCC or 35CCD)</p>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">Sl No</th>
                                <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expenditure of the nature referred to in section (1)</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Amount, if any, debited to profit and loss account (2)</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Amount of deduction allowable (3)</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Amount of deduction in excess of the amount debited to profit and loss account (4) = (3) - (2)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sections.map((section, index) => (
                                <tr key={section.key}>
                                    <td className="px-4 py-2 border text-sm text-gray-500 text-center">{['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix'][index]}</td>
                                    <td className="px-4 py-2 border text-sm font-medium text-gray-900">{section.label}</td>
                                    <td className="px-4 py-2 border">
                                        <NumberInput name={`esr_items.${index}.amount_debited_pl`} form={form} />
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <NumberInput name={`esr_items.${index}.amount_deduction_allowable`} form={form} />
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <NumberInput name={`esr_items.${index}.amount_deduction_excess`} form={form} />
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-gray-100 font-bold">
                                <td className="px-4 py-2 border text-sm text-gray-900 text-center">x</td>
                                <td className="px-4 py-2 border text-sm text-gray-900">Total</td>
                                <td className="px-4 py-2 border">
                                    <NumberInput name="total_esr.amount_debited_pl" form={form} />
                                </td>
                                <td className="px-4 py-2 border">
                                    <NumberInput name="total_esr.amount_deduction_allowable" form={form} />
                                </td>
                                <td className="px-4 py-2 border">
                                    <NumberInput name="total_esr.amount_deduction_excess" form={form} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                    <strong>NOTE:</strong> In case any deduction is claimed under sections 35(1)(ii) or 35(1)(iia) or 35(1)(iii) or 35(2AA), please provide the details as per Schedule RA.
                </div>
            </div>
        </div>
    );
};

export default Itr7ScheduleESR;
