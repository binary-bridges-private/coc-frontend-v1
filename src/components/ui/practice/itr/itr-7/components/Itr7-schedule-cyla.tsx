import React, { useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { ITR7ScheduleCYLAData } from './itr-7-schedule-cyla.types.ts';

export interface Itr7ScheduleCYLAProps {
    form: UseFormReturn<ITR7ScheduleCYLAData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleCYLAData>;
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

const Itr7ScheduleCYLA: React.FC<Itr7ScheduleCYLAProps> = ({ form }) => {
    const scheduleData = useWatch({ control: form.control, name: 'scheduleCYLA' });

    // Helper to calculate remaining income for a row
    const calculateRemaining = (rowKey: string) => {
        const income = Number(scheduleData?.current_year_income?.[rowKey as keyof typeof scheduleData.current_year_income]?.income_current_year) || 0;
        const hpLoss = Number(scheduleData?.current_year_income?.[rowKey as keyof typeof scheduleData.current_year_income]?.hp_loss_set_off) || 0;
        const businessLoss = Number(scheduleData?.current_year_income?.[rowKey as keyof typeof scheduleData.current_year_income]?.business_loss_set_off) || 0;
        const osLoss = Number(scheduleData?.current_year_income?.[rowKey as keyof typeof scheduleData.current_year_income]?.os_loss_set_off) || 0;
        return Math.max(0, income - hpLoss - businessLoss - osLoss);
    };

    // Effect to update remaining income and totals
    useEffect(() => {
        if (!scheduleData) return;

        const rows = [
            'house_property', 'business_excluding_speculation', 'speculation_income', 'specified_business_income',
            'stcg_15', 'stcg_20', 'stcg_30', 'stcg_applicable', 'stcg_special_dtaa',
            'ltcg_10', 'ltcg_12_5', 'ltcg_20', 'ltcg_special_dtaa',
            'os_normal', 'race_horses', 'os_special_dtaa'
        ];

        let totalHpLossSetOff = 0;
        let totalBusinessLossSetOff = 0;
        let totalOsLossSetOff = 0;

        rows.forEach(row => {
            const remaining = calculateRemaining(row);
            // Avoid infinite loop by checking if value changed
            const currentRemaining = form.getValues(`scheduleCYLA.current_year_income.${row}.current_year_income_remaining` as any);
            if (currentRemaining !== remaining) {
                form.setValue(`scheduleCYLA.current_year_income.${row}.current_year_income_remaining` as any, remaining);
            }

            totalHpLossSetOff += Number(scheduleData?.current_year_income?.[row as keyof typeof scheduleData.current_year_income]?.hp_loss_set_off) || 0;
            totalBusinessLossSetOff += Number(scheduleData?.current_year_income?.[row as keyof typeof scheduleData.current_year_income]?.business_loss_set_off) || 0;
            totalOsLossSetOff += Number(scheduleData?.current_year_income?.[row as keyof typeof scheduleData.current_year_income]?.os_loss_set_off) || 0;
        });

        // Update totals
        form.setValue('scheduleCYLA.total_loss_set_off.hp_loss_set_off', totalHpLossSetOff);
        form.setValue('scheduleCYLA.total_loss_set_off.business_loss_set_off', totalBusinessLossSetOff);
        form.setValue('scheduleCYLA.total_loss_set_off.os_loss_set_off', totalOsLossSetOff);

        // Update remaining losses
        const hpLoss = Number(scheduleData?.loss_to_be_set_off?.house_property_loss) || 0;
        const businessLoss = Number(scheduleData?.loss_to_be_set_off?.business_loss) || 0;
        const osLoss = Number(scheduleData?.loss_to_be_set_off?.other_sources_loss) || 0;

        form.setValue('scheduleCYLA.loss_remaining_after_set_off.house_property_loss', hpLoss - totalHpLossSetOff);
        form.setValue('scheduleCYLA.loss_remaining_after_set_off.business_loss', businessLoss - totalBusinessLossSetOff);
        form.setValue('scheduleCYLA.loss_remaining_after_set_off.other_sources_loss', osLoss - totalOsLossSetOff);

    }, [scheduleData, form]);

    const renderRow = (slNo: string, label: string, key: string, subLabel?: string) => (
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-2 py-1 border text-center font-medium">{slNo}</td>
            <td className="px-2 py-1 border">
                <div className="font-medium">{label}</div>
                {subLabel && <div className="text-xs text-gray-500 italic">{subLabel}</div>}
            </td>
            <td className="px-2 py-1 border"><NumberInput name={`scheduleCYLA.current_year_income.${key}.income_current_year`} form={form} /></td>
            <td className="px-2 py-1 border"><NumberInput name={`scheduleCYLA.current_year_income.${key}.hp_loss_set_off`} form={form} /></td>
            <td className="px-2 py-1 border"><NumberInput name={`scheduleCYLA.current_year_income.${key}.business_loss_set_off`} form={form} /></td>
            <td className="px-2 py-1 border"><NumberInput name={`scheduleCYLA.current_year_income.${key}.os_loss_set_off`} form={form} /></td>
            <td className="px-2 py-1 border"><NumberInput name={`scheduleCYLA.current_year_income.${key}.current_year_income_remaining`} form={form} disabled /></td>
        </tr>
    );

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule CYLA</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Details of Income after Set off of current year losses
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 border min-w-[50px]" rowSpan={2}>Sl.No</th>
                                <th className="px-2 py-2 border min-w-[200px]" rowSpan={2}>Head/ Source of Income</th>
                                <th className="px-2 py-2 border min-w-[120px]">Income of current year</th>
                                <th className="px-2 py-2 border min-w-[120px]">House property loss of the current year set off</th>
                                <th className="px-2 py-2 border min-w-[120px]">Business Loss (other than speculation or specified business loss) of the current year set off</th>
                                <th className="px-2 py-2 border min-w-[120px]">Other sources loss (other than loss from race horses and amount chargeable to special rate of tax) of the current year set off</th>
                                <th className="px-2 py-2 border min-w-[120px]">Current year’s Income remaining after set off</th>
                            </tr>
                            <tr>
                                <th className="px-2 py-1 border text-center">1</th>
                                <th className="px-2 py-1 border text-center">2</th>
                                <th className="px-2 py-1 border text-center">3</th>
                                <th className="px-2 py-1 border text-center">4</th>
                                <th className="px-2 py-1 border text-center">5=1-2-3-4</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Loss to be set off row */}
                            <tr className="bg-gray-100 border-b">
                                <td className="px-2 py-1 border text-center font-bold">i</td>
                                <td className="px-2 py-1 border font-bold">
                                    Loss to be set off (Fill this row only, if computed figure is negative)
                                </td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCYLA.loss_to_be_set_off.house_property_loss" form={form} />
                                    <div className="text-xs text-gray-500 text-center">(3 of Schedule HP)</div>
                                </td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCYLA.loss_to_be_set_off.business_loss" form={form} />
                                    <div className="text-xs text-gray-500 text-center">(2vi of item E of Schedule BP)</div>
                                </td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCYLA.loss_to_be_set_off.other_sources_loss" form={form} />
                                    <div className="text-xs text-gray-500 text-center">(6 of Schedule-OS)</div>
                                </td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                            </tr>

                            {renderRow('ii', 'House property', 'house_property', '( 3 of Schedule HP)')}
                            {renderRow('iii', 'Business (excluding Income from life insurance business u/s 115B speculation income and income from specified business)', 'business_excluding_speculation', '( A38 of Schedule BP)')}
                            {renderRow('iv', 'Income from life insurance business u/s 115B', 'speculation_income', '(3iv of item E of Sch. BP)')}
                            {renderRow('v', 'Speculation income', 'speculation_income', '(3ii of item E of Sch. BP)')}
                            {renderRow('vi', 'Specified business income u/s 35AD', 'specified_business_income', '(3iii of item E of Sch. BP)')}
                            {renderRow('viia', 'Short-term capital gain taxable @ 15%', 'stcg_15', '(11ii of item E of Schedule CG)')}
                            {renderRow('viib', 'Short-term capital gain taxable @ 20%', 'stcg_20', '(11iii of item E of Schedule CG)')}
                            {renderRow('viii', 'Short-term capital gain taxable @ 30%', 'stcg_30', '( 11iv of item E of Schedule CG)')}
                            {renderRow('ix', 'Short-term capital gain taxable at applicable rates', 'stcg_applicable', '( 11v of item E of Schedule CG)')}
                            {renderRow('x', 'Short-term capital gain taxable at special rates in India as per DTAA', 'stcg_special_dtaa', '(11vi of item E of Schedule CG)')}
                            {renderRow('xia', 'Long term capital gain taxable @ 10%', 'ltcg_10', '(11vii of item E of Schedule CG)')}
                            {renderRow('xib', 'Long term capital gain taxable @ 12.5%', 'ltcg_12_5', '(11viii of item E of Schedule CG)')}
                            {renderRow('xii', 'Long term capital gain taxable @ 20%', 'ltcg_20', '(11ix of item E of Schedule CG)')}
                            {renderRow('xiii', 'Long term capital gains taxable at special rates in India as per DTAA', 'ltcg_special_dtaa', '(11x of item E of schedule CG)')}
                            {renderRow('xiv', 'Net income from other sources chargeable at normal applicable rates', 'os_normal', '( 6 of Schedule OS)')}
                            {renderRow('xv', 'Profit from the activity of owning and maintaining race horses', 'race_horses', '( 8e of Schedule OS)')}
                            {renderRow('xvi', 'Income from other sources taxable at special rates in India as per DTAA', 'os_special_dtaa', '(2e of Schedule OS)')}

                            {/* Total loss set off */}
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-1 border text-center">xvii</td>
                                <td className="px-2 py-1 border">Total loss set off</td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCYLA.total_loss_set_off.hp_loss_set_off" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCYLA.total_loss_set_off.business_loss_set_off" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCYLA.total_loss_set_off.os_loss_set_off" form={form} disabled /></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                            </tr>

                            {/* Loss remaining */}
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-1 border text-center">xviii</td>
                                <td className="px-2 py-1 border">Loss remaining after set-off (i – xvii)</td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCYLA.loss_remaining_after_set_off.house_property_loss" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCYLA.loss_remaining_after_set_off.business_loss" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCYLA.loss_remaining_after_set_off.other_sources_loss" form={form} disabled /></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7ScheduleCYLA;
