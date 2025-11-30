import React, { useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { ITR7ScheduleICDSData } from './itr-7-schedule-icds.types.ts';

export interface Itr7ScheduleICDSProps {
    form: UseFormReturn<ITR7ScheduleICDSData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleICDSData>;
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

const Itr7ScheduleICDS: React.FC<Itr7ScheduleICDSProps> = ({ form }) => {
    const scheduleData = useWatch({ control: form.control, name: 'scheduleICDS' });

    useEffect(() => {
        if (!scheduleData) return;

        const keys = [
            'accounting_policies', 'valuation_of_inventories', 'construction_contracts',
            'revenue_recognition', 'tangible_fixed_assets', 'changes_in_forex_rates',
            'government_grants', 'securities', 'borrowing_costs', 'provisions_contingent_liabilities'
        ] as const;

        let totalIncrease = 0;
        let totalDecrease = 0;
        let totalNetEffect = 0;

        keys.forEach(key => {
            const increase = Number(scheduleData[key]?.increase) || 0;
            const decrease = Number(scheduleData[key]?.decrease) || 0;
            const netEffect = increase - decrease;

            if (scheduleData[key]?.net_effect !== netEffect) {
                form.setValue(`scheduleICDS.${key}.net_effect`, netEffect);
            }

            totalIncrease += increase;
            totalDecrease += decrease;
            totalNetEffect += netEffect;
        });

        form.setValue('scheduleICDS.total_effect.increase', totalIncrease);
        form.setValue('scheduleICDS.total_effect.decrease', totalDecrease);
        form.setValue('scheduleICDS.total_effect.net_effect', totalNetEffect);

    }, [scheduleData, form]);

    const renderRow = (slNo: string, label: string, key: string, subLabel?: string) => (
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-2 py-1 border text-center">{slNo}</td>
            <td className="px-2 py-1 border">
                <div>{label}</div>
                {subLabel && <div className="text-xs text-gray-500 italic">{subLabel}</div>}
            </td>
            <td className="px-2 py-1 border"><NumberInput name={`scheduleICDS.${key}.increase`} form={form} /></td>
            <td className="px-2 py-1 border"><NumberInput name={`scheduleICDS.${key}.decrease`} form={form} /></td>
            <td className="px-2 py-1 border"><NumberInput name={`scheduleICDS.${key}.net_effect`} form={form} disabled /></td>
        </tr>
    );

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule ICDS</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Effect of Income Computation Disclosure Standards on profit
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 border min-w-[50px]">Sl. No.</th>
                                <th className="px-2 py-2 border min-w-[400px]">ICDS</th>
                                <th className="px-2 py-2 border min-w-[150px]">Increase in Profit (Rs.)</th>
                                <th className="px-2 py-2 border min-w-[150px]">Decrease in profit (Rs.)</th>
                                <th className="px-2 py-2 border min-w-[150px]">Net Effect (Rs.)</th>
                            </tr>
                            <tr>
                                <th className="px-2 py-1 border text-center">(1)</th>
                                <th className="px-2 py-1 border text-center">(2)</th>
                                <th className="px-2 py-1 border text-center">(3)</th>
                                <th className="px-2 py-1 border text-center">(4)</th>
                                <th className="px-2 py-1 border text-center">(5)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRow('I', 'Accounting Policies', 'accounting_policies')}
                            {renderRow('II', 'Valuation of Inventories', 'valuation_of_inventories', '(other than the effect of change in method of valuation u/s 145A, if the same is separately reported at col. 4d or 4e of Part A-OI)')}
                            {renderRow('III', 'Construction Contracts', 'construction_contracts')}
                            {renderRow('IV', 'Revenue Recognition', 'revenue_recognition')}
                            {renderRow('V', 'Tangible Fixed Assets', 'tangible_fixed_assets')}
                            {renderRow('VI', 'Changes in Foreign Exchange Rates', 'changes_in_forex_rates')}
                            {renderRow('VII', 'Government Grants', 'government_grants')}
                            {renderRow('VIII', 'Securities', 'securities', '(other than the effect of change in method of valuation u/s 145A, if the same is separately reported at col. 4d or 4e of Part A-OI)')}
                            {renderRow('IX', 'Borrowing Costs', 'borrowing_costs')}
                            {renderRow('X', 'Provisions, Contingent Liabilities and Contingent Assets', 'provisions_contingent_liabilities')}

                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-1 border text-center">XI</td>
                                <td className="px-2 py-1 border">
                                    Total effect of ICDS adjustments on profit
                                    <div className="text-xs text-gray-500 font-normal">(I+II+III+IV+V+VI+VII+VIII+IX+X)</div>
                                </td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleICDS.total_effect.increase" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleICDS.total_effect.decrease" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleICDS.total_effect.net_effect" form={form} disabled /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7ScheduleICDS;
