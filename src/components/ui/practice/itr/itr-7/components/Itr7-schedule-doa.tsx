import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7ScheduleDOAData } from './itr-7-schedule-doa.types.ts';

export interface Itr7ScheduleDOAProps {
    form: UseFormReturn<ITR7ScheduleDOAData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleDOAData>;
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

const Itr7ScheduleDOA: React.FC<Itr7ScheduleDOAProps> = ({ form }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule DOA: Depreciation on other assets</h2>
                <p className="text-sm text-gray-600 mb-4">(Other than assets on which full capital expenditure is allowable as deduction)</p>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">1</th>
                                <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block of assets</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Land</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan={3}>Building (not including land)</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Furniture and fittings</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Intangible assets</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ships</th>
                            </tr>
                            <tr>
                                <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2</th>
                                <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate (%)</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nil (i)</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">5 (ii)</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">10 (iii)</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">40 (iv)</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">10 (v)</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">25 (vi)</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">20 (vii)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {[
                                { id: 3, label: "Written down value on the first day of previous year", key: "wdv_first_day_previous_year" },
                                { id: 4, label: "Additions for a period of 180 days or more in the previous year", key: "additions_180_days_or_more" },
                                { id: 5, label: "Consideration or other realization during the previous year out of 3 or 4", key: "consideration_realization_out_of_3_or_4" },
                                { id: 6, label: "Amount on which depreciation at full rate to be allowed (3 + 4 -5) (enter 0, if result is negative)", key: "amount_depreciation_full_rate" },
                                { id: 7, label: "Additions for a period of less than 180 days in the previous year", key: "additions_less_than_180_days" },
                                { id: 8, label: "Consideration or other realizations during the year out of 7", key: "consideration_realization_out_of_7" },
                                { id: 9, label: "Amount on which depreciation at half rate to be allowed (7 - 8) (enter 0, if result is negative)", key: "amount_depreciation_half_rate" },
                                { id: 10, label: "Depreciation on 6 at full rate", key: "depreciation_full_rate" },
                                { id: 11, label: "Depreciation on 9 at half rate", key: "depreciation_half_rate" },
                                { id: 12, label: "Total depreciation (10+11)", key: "total_depreciation" },
                                { id: 13, label: "Depreciation disallowed under section 38(2) of the I.T. Act (out of column 12)", key: "depreciation_disallowed_sec_38_2" },
                                { id: 14, label: "Net aggregate depreciation (12-13)", key: "net_aggregate_depreciation" },
                                { id: 15, label: "Proportionate aggregate depreciation allowable in the event of succession, amalgamation, demerger etc. (out of column 14)", key: "proportionate_aggregate_depreciation" },
                                { id: 16, label: "Expenditure incurred in connection with transfer of asset/ assets", key: "expenditure_transfer_asset" },
                                { id: 17, label: "Capital gains/ loss under section 50 (5 + 8 -3 - 4 -7 -16) (enter negative only, if block ceases to exist)", key: "capital_gains_loss_sec_50" },
                                { id: 18, label: "Written down value on the last day of previous year* (6+ 9 -12) (enter 0, if result is negative)", key: "wdv_last_day_previous_year" },
                            ].map((row) => (
                                <tr key={row.id}>
                                    <td className="px-4 py-2 border text-sm text-gray-500 text-center">{row.id}</td>
                                    <td className="px-4 py-2 border text-sm text-gray-900">{row.label}</td>
                                    <td className="px-4 py-2 border">
                                        <NumberInput name={`other_assets.land.${row.key}`} form={form} />
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <NumberInput name={`other_assets.building_5.${row.key}`} form={form} />
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <NumberInput name={`other_assets.building_10.${row.key}`} form={form} />
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <NumberInput name={`other_assets.building_40.${row.key}`} form={form} />
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <NumberInput name={`other_assets.furniture_10.${row.key}`} form={form} />
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <NumberInput name={`other_assets.intangible_25.${row.key}`} form={form} />
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <NumberInput name={`other_assets.ships_20.${row.key}`} form={form} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7ScheduleDOA;
