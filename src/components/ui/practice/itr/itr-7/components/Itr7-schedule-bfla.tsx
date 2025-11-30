import React, { useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { ITR7ScheduleBFLAData } from './itr-7-schedule-bfla.types.ts';

export interface Itr7ScheduleBFLAProps {
    form: UseFormReturn<ITR7ScheduleBFLAData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleBFLAData>;
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

const Itr7ScheduleBFLA: React.FC<Itr7ScheduleBFLAProps> = ({ form }) => {
    const scheduleData = useWatch({ control: form.control, name: 'scheduleBFLA' });

    // Helper to calculate remaining income for a row
    const calculateRemaining = (rowKey: string) => {
        const details = scheduleData?.details as any;
        if (!details || !details[rowKey]) return 0;

        const income = Number(details[rowKey].income_after_cyla) || 0;
        const bfLoss = Number(details[rowKey].bf_loss_set_off) || 0;

        // Specific columns for specific rows
        let bfDepreciation = 0;
        if (rowKey === 'business_excluding_speculation') {
            bfDepreciation = Number(details.business_excluding_speculation?.bf_depreciation_set_off) || 0;
        }

        let bfAllowance = 0;
        if (rowKey === 'os_normal') {
            bfAllowance = Number(details.os_normal?.bf_allowance_35_4_set_off) || 0;
        }

        return Math.max(0, income - bfLoss - bfDepreciation - bfAllowance);
    };

    // Effect to update remaining income and totals
    useEffect(() => {
        if (!scheduleData?.details) return;

        const rows = [
            'house_property', 'business_excluding_speculation', 'life_insurance_business', 'speculation_income', 'specified_business_income',
            'stcg_15', 'stcg_20', 'stcg_30', 'stcg_applicable', 'stcg_special_dtaa',
            'ltcg_10', 'ltcg_12_5', 'ltcg_20', 'ltcg_special_dtaa',
            'os_normal', 'race_horses', 'os_special_dtaa'
        ];

        let totalBfLossSetOff = 0;
        let totalRemainingIncome = 0;

        rows.forEach(row => {
            const remaining = calculateRemaining(row);
            // Avoid infinite loop by checking if value changed
            const currentRemaining = form.getValues(`scheduleBFLA.details.${row}.current_year_income_remaining` as any);
            if (currentRemaining !== remaining) {
                form.setValue(`scheduleBFLA.details.${row}.current_year_income_remaining` as any, remaining);
            }

            // Safely access bf_loss_set_off
            const details = scheduleData.details as any;
            if (details[row] && 'bf_loss_set_off' in details[row]) {
                totalBfLossSetOff += Number(details[row].bf_loss_set_off) || 0;
            }

            totalRemainingIncome += remaining;
        });

        // Update totals
        form.setValue('scheduleBFLA.total_bf_loss_set_off', totalBfLossSetOff);
        form.setValue('scheduleBFLA.total_current_year_income_remaining', totalRemainingIncome);

    }, [scheduleData, form]);

    const renderRow = (slNo: string, label: string, key: string, subLabel?: string, disabledCols: number[] = []) => (
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-2 py-1 border text-center font-medium">{slNo}</td>
            <td className="px-2 py-1 border">
                <div className="font-medium">{label}</div>
                {subLabel && <div className="text-xs text-gray-500 italic">{subLabel}</div>}
            </td>
            <td className="px-2 py-1 border"><NumberInput name={`scheduleBFLA.details.${key}.income_after_cyla`} form={form} /></td>
            <td className={`px-2 py-1 border ${disabledCols.includes(2) ? 'bg-gray-200' : ''}`}>
                {key !== 'os_normal' && key !== 'os_special_dtaa' ? (
                    <NumberInput name={`scheduleBFLA.details.${key}.bf_loss_set_off`} form={form} disabled={disabledCols.includes(2)} />
                ) : (
                    <div className="bg-gray-200 h-full w-full"></div>
                )}
            </td>
            <td className={`px-2 py-1 border ${disabledCols.includes(3) ? 'bg-gray-200' : ''}`}>
                {key === 'business_excluding_speculation' ? (
                    <NumberInput name={`scheduleBFLA.details.${key}.bf_depreciation_set_off`} form={form} />
                ) : (
                    <div className="bg-gray-200 h-full w-full"></div>
                )}
            </td>
            <td className={`px-2 py-1 border ${disabledCols.includes(4) ? 'bg-gray-200' : ''}`}>
                {key === 'os_normal' ? (
                    <NumberInput name={`scheduleBFLA.details.${key}.bf_allowance_35_4_set_off`} form={form} />
                ) : (
                    <div className="bg-gray-200 h-full w-full"></div>
                )}
            </td>
            <td className="px-2 py-1 border"><NumberInput name={`scheduleBFLA.details.${key}.current_year_income_remaining`} form={form} disabled /></td>
        </tr>
    );

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule BFLA</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Details of Income after Set off of Brought Forward Losses of earlier years
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 border min-w-[50px]" rowSpan={2}>Sl.No</th>
                                <th className="px-2 py-2 border min-w-[200px]" rowSpan={2}>Head/ Source of Income</th>
                                <th className="px-2 py-2 border min-w-[120px]">Income after set off, if any, of current year’s losses as per 5 of Schedule CYLA)</th>
                                <th className="px-2 py-2 border min-w-[120px]">Brought forward loss set off</th>
                                <th className="px-2 py-2 border min-w-[120px]">Brought forward depreciation set off</th>
                                <th className="px-2 py-2 border min-w-[120px]">Brought forward allowance under section 35(4) set off</th>
                                <th className="px-2 py-2 border min-w-[120px]">Current year’s income remaining after set off</th>
                            </tr>
                            <tr>
                                <th className="px-2 py-1 border text-center">1</th>
                                <th className="px-2 py-1 border text-center">2</th>
                                <th className="px-2 py-1 border text-center">3</th>
                                <th className="px-2 py-1 border text-center">4</th>
                                <th className="px-2 py-1 border text-center">5</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRow('i', 'House property', 'house_property', '(5ii of Schedule CYLA)', [3, 4])}
                            {renderRow('ii', 'Business (excluding Income from Insurance Business , speculation income and income from specified business)', 'business_excluding_speculation', '(5iii of Schedule CYLA)')}
                            {renderRow('iii', 'Profit and gains from life insurance business u/s 115B', 'life_insurance_business', '(5iv of Schedule CYLA)', [3, 4])}
                            {renderRow('iv', 'Speculation Income', 'speculation_income', '(5v of Schedule CYLA)', [3, 4])}
                            {renderRow('v', 'Specified Business Income', 'specified_business_income', '(5vi of Schedule CYLA)', [3, 4])}
                            {renderRow('via', 'Short-term capital gain taxable @ 15%', 'stcg_15', '(5viia of Schedule CYLA)', [3, 4])}
                            {renderRow('vib', 'Short-term capital gain taxable @ 20%', 'stcg_20', '(5viib of schedule CYLA)', [3, 4])}
                            {renderRow('vii', 'Short-term capital gain taxable @ 30%', 'stcg_30', '( 5viii of Schedule CYLA)', [3, 4])}
                            {renderRow('viii', 'Short-term capital gain taxable at applicable rates', 'stcg_applicable', '(5ix of Schedule CYLA)', [3, 4])}
                            {renderRow('ix', 'Short-term capital gain taxable at special rates in India as per DTAA', 'stcg_special_dtaa', '(5x of Schedule CYLA)', [3, 4])}
                            {renderRow('xa', 'Long-term capital gain taxable @ 10%', 'ltcg_10', '(5xia of Schedule CYLA)', [3, 4])}
                            {renderRow('xb', 'Long-term capital gain taxable @ 12.5%', 'ltcg_12_5', '(5xib of schedule CYLA)', [3, 4])}
                            {renderRow('xi', 'Long term capital gain taxable @ 20%', 'ltcg_20', '( 5xii of Schedule CYLA)', [3, 4])}
                            {renderRow('xii', 'Long term capital gains taxable at special rates in India as per DTAA', 'ltcg_special_dtaa', '(5xiii of Schedule CYLA)', [3, 4])}
                            {renderRow('xiii', 'Net income from other sources chargeable at normal applicable rates', 'os_normal', '(5xiv of Schedule CYLA)', [2, 3])}
                            {renderRow('xiv', 'Profit from owning and maintaining race horses', 'race_horses', '(5xv of Schedule CYLA)', [3, 4])}
                            {renderRow('xv', 'Income from other sources income taxable at special rates in India as per DTAA', 'os_special_dtaa', '(5xvi of Schedule CYLA)', [2, 3, 4])}

                            {/* Total brought forward loss set off */}
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-1 border text-center">xvi</td>
                                <td className="px-2 py-1 border">Total of brought forward loss set off</td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleBFLA.total_bf_loss_set_off" form={form} disabled /></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                            </tr>

                            {/* Current year's income remaining */}
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-1 border text-center">xvii</td>
                                <td className="px-2 py-1 border">Current year’s income remaining after set off Total of 5i + 5ii + 5iii + 5iv+ 5v + 5via + 5vib + 5vii + 5viii + 5ix + 5xa + 5xb + 5xi +5xii+5xiii+ 5xiv + 5xv)</td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleBFLA.total_current_year_income_remaining" form={form} disabled /></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7ScheduleBFLA;
