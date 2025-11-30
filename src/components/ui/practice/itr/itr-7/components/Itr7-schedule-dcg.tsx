import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7ScheduleDCGData } from './itr-7-schedule-dcg.types.ts';

export interface Itr7ScheduleDCGProps {
    form: UseFormReturn<ITR7ScheduleDCGData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleDCGData>;
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

const Itr7ScheduleDCG: React.FC<Itr7ScheduleDCGProps> = ({ form }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule DCG: Deemed Capital Gains on sale of depreciable assets</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* 1. Plant and machinery */}
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 border text-sm font-bold text-gray-900 w-10">1</td>
                                <td className="px-4 py-2 border text-sm font-bold text-gray-900" colSpan={3}>Plant and machinery</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900 w-10">a</td>
                                <td className="px-4 py-2 border text-sm text-gray-900">Block entitled for depreciation @ 15 per cent (Schedule DPM - 20i)</td>
                                <td className="px-4 py-2 border w-48"><NumberInput name="plant_machinery.block_15_percent" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900">b</td>
                                <td className="px-4 py-2 border text-sm text-gray-900">Block entitled for depreciation @ 30 per cent (Schedule DPM – 20ii)</td>
                                <td className="px-4 py-2 border"><NumberInput name="plant_machinery.block_30_percent" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900">c</td>
                                <td className="px-4 py-2 border text-sm text-gray-900">Block entitled for depreciation @ 40 per cent (Schedule DPM - 20iii)</td>
                                <td className="px-4 py-2 border"><NumberInput name="plant_machinery.block_40_percent" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900">d</td>
                                <td className="px-4 py-2 border text-sm text-gray-900">Block entitled for depreciation @ 45 per cent (Schedule DPM - 20iii)</td>
                                <td className="px-4 py-2 border"><NumberInput name="plant_machinery.block_45_percent" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900">e</td>
                                <td className="px-4 py-2 border text-sm font-semibold text-gray-900">Total ( 1a +1b + 1c+1e)</td>
                                <td className="px-4 py-2 border"><NumberInput name="plant_machinery.total" form={form} /></td>
                            </tr>

                            {/* 2. Building */}
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 border text-sm font-bold text-gray-900">2</td>
                                <td className="px-4 py-2 border text-sm font-bold text-gray-900" colSpan={3}>Building (not including land)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900">a</td>
                                <td className="px-4 py-2 border text-sm text-gray-900">Block entitled for depreciation @ 5 per cent (Schedule DOA- 17ii)</td>
                                <td className="px-4 py-2 border"><NumberInput name="building.block_5_percent" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900">b</td>
                                <td className="px-4 py-2 border text-sm text-gray-900">Block entitled for depreciation @ 10 per cent (Schedule DOA- 17iii)</td>
                                <td className="px-4 py-2 border"><NumberInput name="building.block_10_percent" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900">c</td>
                                <td className="px-4 py-2 border text-sm text-gray-900">Block entitled for depreciation @ 40 per cent (Schedule DOA- 17iv)</td>
                                <td className="px-4 py-2 border"><NumberInput name="building.block_40_percent" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900">d</td>
                                <td className="px-4 py-2 border text-sm font-semibold text-gray-900">Total ( 2a + 2b + 2c)</td>
                                <td className="px-4 py-2 border"><NumberInput name="building.total" form={form} /></td>
                            </tr>

                            {/* 3, 4, 5, 6 */}
                            <tr>
                                <td className="px-4 py-2 border text-sm font-bold text-gray-900">3</td>
                                <td className="px-4 py-2 border text-sm text-gray-900" colSpan={2}>Furniture and fittings (Schedule DOA- 17v)</td>
                                <td className="px-4 py-2 border"><NumberInput name="furniture_fittings" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm font-bold text-gray-900">4</td>
                                <td className="px-4 py-2 border text-sm text-gray-900" colSpan={2}>Intangible assets (Schedule DOA- 17vi)</td>
                                <td className="px-4 py-2 border"><NumberInput name="intangible_assets" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm font-bold text-gray-900">5</td>
                                <td className="px-4 py-2 border text-sm text-gray-900" colSpan={2}>Ships (Schedule DOA- 17vii)</td>
                                <td className="px-4 py-2 border"><NumberInput name="ships" form={form} /></td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className="px-4 py-2 border text-sm font-bold text-gray-900">6</td>
                                <td className="px-4 py-2 border text-sm font-bold text-gray-900" colSpan={2}>Total ( 1e+2d+3+4+5)</td>
                                <td className="px-4 py-2 border"><NumberInput name="total" form={form} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7ScheduleDCG;
