import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { ITR7ScheduleCFLData } from './itr-7-schedule-cfl.types.ts';

const ASSESSMENT_YEARS = [
    '2017-18', '2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24', '2024-25'
];

interface Itr7ScheduleCFLProps {
    form: UseFormReturn<ITR7ScheduleCFLData>;
}

const NumberInput = ({ name, form, disabled }: { name: string; form: UseFormReturn<any>; disabled?: boolean }) => (
    <input
        type="number"
        {...form.register(name)}
        className={`w-full p-1 border rounded text-right ${disabled ? 'bg-gray-100' : ''}`}
        disabled={disabled}
    />
);

const DateInput = ({ name, form, disabled }: { name: string; form: UseFormReturn<any>; disabled?: boolean }) => (
    <input
        type="date"
        {...form.register(name)}
        className={`w-full p-1 border rounded ${disabled ? 'bg-gray-100' : ''}`}
        disabled={disabled}
    />
);

const Itr7ScheduleCFL: React.FC<Itr7ScheduleCFLProps> = ({ form }) => {
    const { fields, replace } = useFieldArray({
        control: form.control,
        name: 'scheduleCFL.details',
    });

    const scheduleData = useWatch({ control: form.control, name: 'scheduleCFL' });

    useEffect(() => {
        if (fields.length === 0) {
            replace(ASSESSMENT_YEARS.map(year => ({
                assessment_year: year,
                date_of_filing: '',
                house_property_loss: 0,
                business_loss: { brought_forward: 0, adjusted_115baa: 0, available_for_set_off: 0 },
                speculative_business_loss: 0,
                specified_business_loss: 0,
                life_insurance_business_loss: 0,
                stcl: 0,
                ltcl: 0,
                race_horses_loss: 0,
            })));
        }
    }, [fields.length, replace]);

    // Calculations
    useEffect(() => {
        if (!scheduleData?.details) return;

        // Calculate 5c for each row
        scheduleData.details.forEach((row, index) => {
            const bf = Number(row.business_loss?.brought_forward) || 0;
            const adj = Number(row.business_loss?.adjusted_115baa) || 0;
            const available = Math.max(0, bf - adj);
            if (row.business_loss?.available_for_set_off !== available) {
                form.setValue(`scheduleCFL.details.${index}.business_loss.available_for_set_off`, available);
            }
        });

        // Calculate Total of earlier year losses b/f (xvi)
        const totalXVI = {
            house_property_loss: 0,
            business_loss: { brought_forward: 0, adjusted_115baa: 0, available_for_set_off: 0 },
            speculative_business_loss: 0,
            specified_business_loss: 0,
            life_insurance_business_loss: 0,
            stcl: 0,
            ltcl: 0,
            race_horses_loss: 0,
        };

        scheduleData.details.forEach(row => {
            totalXVI.house_property_loss += Number(row.house_property_loss) || 0;
            totalXVI.business_loss.brought_forward += Number(row.business_loss?.brought_forward) || 0;
            totalXVI.business_loss.adjusted_115baa += Number(row.business_loss?.adjusted_115baa) || 0;
            totalXVI.business_loss.available_for_set_off += Number(row.business_loss?.available_for_set_off) || 0;
            totalXVI.speculative_business_loss += Number(row.speculative_business_loss) || 0;
            totalXVI.specified_business_loss += Number(row.specified_business_loss) || 0;
            totalXVI.life_insurance_business_loss += Number(row.life_insurance_business_loss) || 0;
            totalXVI.stcl += Number(row.stcl) || 0;
            totalXVI.ltcl += Number(row.ltcl) || 0;
            totalXVI.race_horses_loss += Number(row.race_horses_loss) || 0;
        });

        // Update XVI
        form.setValue('scheduleCFL.total_earlier_year_losses', totalXVI);

        // Calculate XX (xviii - xix)
        const xviii = scheduleData.current_year_losses || {};
        const xix = scheduleData.current_year_loss_distributed || {};

        const xx = {
            house_property_loss: Math.max(0, (Number(xviii.house_property_loss) || 0) - (Number(xix.house_property_loss) || 0)),
            business_loss_available: Math.max(0, (Number(xviii.business_loss_available) || 0) - (Number(xix.business_loss_available) || 0)),
            speculative_business_loss: Math.max(0, (Number(xviii.speculative_business_loss) || 0) - (Number(xix.speculative_business_loss) || 0)),
            specified_business_loss: Math.max(0, (Number(xviii.specified_business_loss) || 0) - (Number(xix.specified_business_loss) || 0)),
            life_insurance_business_loss: Math.max(0, (Number(xviii.life_insurance_business_loss) || 0) - (Number(xix.life_insurance_business_loss) || 0)),
            stcl: Math.max(0, (Number(xviii.stcl) || 0) - (Number(xix.stcl) || 0)),
            ltcl: Math.max(0, (Number(xviii.ltcl) || 0) - (Number(xix.ltcl) || 0)),
            race_horses_loss: Math.max(0, (Number(xviii.race_horses_loss) || 0) - (Number(xix.race_horses_loss) || 0)),
        };

        // Update XX
        form.setValue('scheduleCFL.current_year_losses_carried_forward', xx);

        // Calculate XXI (xvi - xvii + xx)
        const xvii = scheduleData.adjustment_of_above_losses || {};

        const xxi = {
            house_property_loss: Math.max(0, totalXVI.house_property_loss - (Number(xvii.house_property_loss) || 0) + xx.house_property_loss),
            business_loss_available: Math.max(0, totalXVI.business_loss.available_for_set_off - (Number(xvii.business_loss_available) || 0) + xx.business_loss_available),
            speculative_business_loss: Math.max(0, totalXVI.speculative_business_loss - (Number(xvii.speculative_business_loss) || 0) + xx.speculative_business_loss),
            specified_business_loss: Math.max(0, totalXVI.specified_business_loss - (Number(xvii.specified_business_loss) || 0) + xx.specified_business_loss),
            life_insurance_business_loss: Math.max(0, totalXVI.life_insurance_business_loss - (Number(xvii.life_insurance_business_loss) || 0) + xx.life_insurance_business_loss),
            stcl: Math.max(0, totalXVI.stcl - (Number(xvii.stcl) || 0) + xx.stcl),
            ltcl: Math.max(0, totalXVI.ltcl - (Number(xvii.ltcl) || 0) + xx.ltcl),
            race_horses_loss: Math.max(0, totalXVI.race_horses_loss - (Number(xvii.race_horses_loss) || 0) + xx.race_horses_loss),
        };

        // Update XXI
        form.setValue('scheduleCFL.total_loss_carried_forward', xxi);

    }, [scheduleData, form]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule CFL</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Details of Losses to be carried forward to future years
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-2 py-2 border min-w-[40px]" rowSpan={2}>S. No.</th>
                                <th className="px-2 py-2 border min-w-[80px]" rowSpan={2}>Assessment Year</th>
                                <th className="px-2 py-2 border min-w-[100px]" rowSpan={2}>Date of Filing (DD/MM/YYYY)</th>
                                <th className="px-2 py-2 border min-w-[100px]" rowSpan={2}>House property loss</th>
                                <th className="px-2 py-2 border min-w-[300px]" colSpan={3}>Loss from business other than loss from speculative business and specified business</th>
                                <th className="px-2 py-2 border min-w-[100px]" rowSpan={2}>Loss from speculative business</th>
                                <th className="px-2 py-2 border min-w-[100px]" rowSpan={2}>Loss from specified business</th>
                                <th className="px-2 py-2 border min-w-[100px]" rowSpan={2}>Loss from life insurance business u/s 115B</th>
                                <th className="px-2 py-2 border min-w-[100px]" rowSpan={2}>Short-term capital loss</th>
                                <th className="px-2 py-2 border min-w-[100px]" rowSpan={2}>Long-term Capital loss</th>
                                <th className="px-2 py-2 border min-w-[100px]" rowSpan={2}>Loss from owning and maintaining race horses</th>
                            </tr>
                            <tr>
                                <th className="px-2 py-1 border text-center">Brought forward business loss</th>
                                <th className="px-2 py-1 border text-center">Amount as adjusted on account of opting for taxation section 115BAA</th>
                                <th className="px-2 py-1 border text-center">Brought forward Business loss available for set off during the year</th>
                            </tr>
                            <tr>
                                <th className="px-2 py-1 border text-center">1</th>
                                <th className="px-2 py-1 border text-center">2</th>
                                <th className="px-2 py-1 border text-center">3</th>
                                <th className="px-2 py-1 border text-center">4</th>
                                <th className="px-2 py-1 border text-center">5a</th>
                                <th className="px-2 py-1 border text-center">5b</th>
                                <th className="px-2 py-1 border text-center">5c=5a-5b</th>
                                <th className="px-2 py-1 border text-center">6</th>
                                <th className="px-2 py-1 border text-center">7</th>
                                <th className="px-2 py-1 border text-center">8</th>
                                <th className="px-2 py-1 border text-center">9</th>
                                <th className="px-2 py-1 border text-center">10</th>
                                <th className="px-2 py-1 border text-center">11</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={field.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-2 py-1 border text-center">{index + 1}</td>
                                    <td className="px-2 py-1 border text-center">{field.assessment_year}</td>
                                    <td className="px-2 py-1 border"><DateInput name={`scheduleCFL.details.${index}.date_of_filing`} form={form} /></td>
                                    <td className="px-2 py-1 border bg-gray-200"></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`scheduleCFL.details.${index}.business_loss.brought_forward`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`scheduleCFL.details.${index}.business_loss.adjusted_115baa`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`scheduleCFL.details.${index}.business_loss.available_for_set_off`} form={form} disabled /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`scheduleCFL.details.${index}.speculative_business_loss`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`scheduleCFL.details.${index}.specified_business_loss`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`scheduleCFL.details.${index}.life_insurance_business_loss`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`scheduleCFL.details.${index}.stcl`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`scheduleCFL.details.${index}.ltcl`} form={form} /></td>
                                    <td className="px-2 py-1 border"><NumberInput name={`scheduleCFL.details.${index}.race_horses_loss`} form={form} /></td>
                                </tr>
                            ))}

                            {/* Total of earlier year losses b/f */}
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-1 border text-center">xvi</td>
                                <td className="px-2 py-1 border" colSpan={2}>Total of earlier year losses b/f</td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_earlier_year_losses.house_property_loss" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_earlier_year_losses.business_loss.brought_forward" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_earlier_year_losses.business_loss.adjusted_115baa" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_earlier_year_losses.business_loss.available_for_set_off" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_earlier_year_losses.speculative_business_loss" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_earlier_year_losses.specified_business_loss" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_earlier_year_losses.life_insurance_business_loss" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_earlier_year_losses.stcl" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_earlier_year_losses.ltcl" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_earlier_year_losses.race_horses_loss" form={form} disabled /></td>
                            </tr>

                            {/* Adjustment of above losses in Schedule BFLA */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-1 border text-center">xvii</td>
                                <td className="px-2 py-1 border" colSpan={2}>
                                    Adjustment of above losses in Schedule BFLA
                                    <div className="text-xs text-gray-500">(2ii of Schedule BFLA)</div>
                                </td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCFL.adjustment_of_above_losses.house_property_loss" form={form} />
                                    <div className="text-xs text-gray-500">(2i of Schedule BFLA)</div>
                                </td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCFL.adjustment_of_above_losses.business_loss_available" form={form} />
                                    <div className="text-xs text-gray-500">(2ii of Schedule BFLA)</div>
                                </td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCFL.adjustment_of_above_losses.speculative_business_loss" form={form} />
                                    <div className="text-xs text-gray-500">(2iv of Schedule BFLA)</div>
                                </td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCFL.adjustment_of_above_losses.specified_business_loss" form={form} />
                                    <div className="text-xs text-gray-500">(2v of Schedule BFLA)</div>
                                </td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCFL.adjustment_of_above_losses.life_insurance_business_loss" form={form} />
                                    <div className="text-xs text-gray-500">(2iii of Schedule BFLA)</div>
                                </td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.adjustment_of_above_losses.stcl" form={form} /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.adjustment_of_above_losses.ltcl" form={form} /></td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCFL.adjustment_of_above_losses.race_horses_loss" form={form} />
                                    <div className="text-xs text-gray-500">(2xiv of Schedule BFLA)</div>
                                </td>
                            </tr>

                            {/* 2025-26 (Current year losses) */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-1 border text-center">xviii</td>
                                <td className="px-2 py-1 border" colSpan={2}>
                                    2025-26 (Current year losses)
                                    <div className="text-xs text-gray-500">(3xviii of Schedule CYLA)</div>
                                </td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCFL.current_year_losses.house_property_loss" form={form} />
                                    <div className="text-xs text-gray-500">(2xviii of Schedule CYLA)</div>
                                </td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCFL.current_year_losses.business_loss_available" form={form} />
                                    <div className="text-xs text-gray-500">(B43 of Schedule BP, if -ve)</div>
                                </td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCFL.current_year_losses.speculative_business_loss" form={form} />
                                    <div className="text-xs text-gray-500">(C49 of Schedule BP, if -ve)</div>
                                </td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCFL.current_year_losses.specified_business_loss" form={form} />
                                    <div className="text-xs text-gray-500">(4b of Schedule BP, if -ve)</div>
                                </td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCFL.current_year_losses.life_insurance_business_loss" form={form} />
                                    <div className="text-xs text-gray-500">(2xii + 3xii + 4xii + 5xii + 6xii) of item E of Schedule CG)</div>
                                </td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCFL.current_year_losses.stcl" form={form} />
                                    <div className="text-xs text-gray-500">(7xii + 8xii + 9xii + 10xii) of item E of Schedule CG</div>
                                </td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCFL.current_year_losses.ltcl" form={form} />
                                </td>
                                <td className="px-2 py-1 border">
                                    <NumberInput name="scheduleCFL.current_year_losses.race_horses_loss" form={form} />
                                    <div className="text-xs text-gray-500">(8e of Schedule OS, if -ve)</div>
                                </td>
                            </tr>

                            {/* Current year loss distributed among the unit-holder */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-1 border text-center">xix</td>
                                <td className="px-2 py-1 border" colSpan={2}>
                                    Current year loss distributed among the unit-holder (Applicable for Investment fund only)
                                </td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.current_year_loss_distributed.house_property_loss" form={form} /></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.current_year_loss_distributed.business_loss_available" form={form} /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.current_year_loss_distributed.speculative_business_loss" form={form} /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.current_year_loss_distributed.specified_business_loss" form={form} /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.current_year_loss_distributed.life_insurance_business_loss" form={form} /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.current_year_loss_distributed.stcl" form={form} /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.current_year_loss_distributed.ltcl" form={form} /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.current_year_loss_distributed.race_horses_loss" form={form} /></td>
                            </tr>

                            {/* Current year losses to be carried forward */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-1 border text-center">xx</td>
                                <td className="px-2 py-1 border" colSpan={2}>
                                    Current year losses to be carried forward (xviii-xix)
                                </td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.current_year_losses_carried_forward.house_property_loss" form={form} disabled /></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.current_year_losses_carried_forward.business_loss_available" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.current_year_losses_carried_forward.speculative_business_loss" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.current_year_losses_carried_forward.specified_business_loss" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.current_year_losses_carried_forward.life_insurance_business_loss" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.current_year_losses_carried_forward.stcl" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.current_year_losses_carried_forward.ltcl" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.current_year_losses_carried_forward.race_horses_loss" form={form} disabled /></td>
                            </tr>

                            {/* Total loss Carried forward to future years */}
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-1 border text-center">xxi</td>
                                <td className="px-2 py-1 border" colSpan={2}>
                                    Total loss Carried forward to future years (xvi-xvii+xx)
                                </td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_loss_carried_forward.house_property_loss" form={form} disabled /></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border bg-gray-200"></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_loss_carried_forward.business_loss_available" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_loss_carried_forward.speculative_business_loss" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_loss_carried_forward.specified_business_loss" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_loss_carried_forward.life_insurance_business_loss" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_loss_carried_forward.stcl" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_loss_carried_forward.ltcl" form={form} disabled /></td>
                                <td className="px-2 py-1 border"><NumberInput name="scheduleCFL.total_loss_carried_forward.race_horses_loss" form={form} disabled /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7ScheduleCFL;
