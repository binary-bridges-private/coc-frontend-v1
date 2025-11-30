import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7ScheduleDPMData } from './itr-7-schedule-dpm.types.ts';

export interface Itr7ScheduleDPMProps {
    form: UseFormReturn<ITR7ScheduleDPMData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleDPMData>;
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

const Itr7ScheduleDPM: React.FC<Itr7ScheduleDPMProps> = ({ form }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule DPM: Depreciation on Plant and Machinery</h2>
                <p className="text-sm text-gray-600 mb-4">(Other than assets on which full capital expenditure is allowable as deduction under any other section)</p>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">1</th>
                                <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block of assets</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan={4}>Plant and machinery</th>
                            </tr>
                            <tr>
                                <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2</th>
                                <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate (%)</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">15 (i)</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">30 (ii)</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">40 (iii)</th>
                                <th className="px-4 py-2 border text-center text-xs font-medium text-gray-500 uppercase tracking-wider">45 (iv)</th>
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
                                { id: 12, label: "Additional depreciation, if any, on 4", key: "additional_depreciation_on_4" },
                                { id: 13, label: "Additional depreciation, if any, on 7", key: "additional_depreciation_on_7" },
                                { id: 14, label: "Additional depreciation relating to immediately preceding year on asset put to use for less than 180 days", key: "additional_depreciation_preceding_year" },
                                { id: 15, label: "Total depreciation (10+11+12+13+14)", key: "total_depreciation" },
                                { id: 16, label: "Depreciation disallowed under section 38(2) of the I.T. Act (out of column 15)", key: "depreciation_disallowed_sec_38_2" },
                                { id: 17, label: "Net aggregate depreciation (15-16)", key: "net_aggregate_depreciation" },
                                { id: 18, label: "Proportionate aggregate depreciation allowable in the event of succession, amalgamation, demerger etc. (out of column 17)", key: "proportionate_aggregate_depreciation" },
                                { id: 19, label: "Expenditure incurred in connection with transfer of asset/ assets", key: "expenditure_transfer_asset" },
                                { id: 20, label: "Capital gains/ loss under section 50 (5 + 8 -3 - 4 -7 -19) (enter negative only, if block ceases to exist)", key: "capital_gains_loss_sec_50" },
                                { id: 21, label: "Written down value on the last day of previous year* (6+ 9 -15) (enter 0, if result is negative)", key: "wdv_last_day_previous_year" },
                            ].map((row) => (
                                <tr key={row.id}>
                                    <td className="px-4 py-2 border text-sm text-gray-500 text-center">{row.id}</td>
                                    <td className="px-4 py-2 border text-sm text-gray-900">{row.label}</td>
                                    <td className="px-4 py-2 border">
                                        <NumberInput name={`plant_machinery.rate_15.${row.key}`} form={form} />
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <NumberInput name={`plant_machinery.rate_30.${row.key}`} form={form} />
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <NumberInput name={`plant_machinery.rate_40.${row.key}`} form={form} />
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <NumberInput name={`plant_machinery.rate_45.${row.key}`} form={form} />
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

export default Itr7ScheduleDPM;
