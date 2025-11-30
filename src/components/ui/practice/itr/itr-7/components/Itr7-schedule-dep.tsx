import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7ScheduleDEPData } from './itr-7-schedule-dep.types.ts';

export interface Itr7ScheduleDEPProps {
    form: UseFormReturn<ITR7ScheduleDEPData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleDEPData>;
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

const Itr7ScheduleDEP: React.FC<Itr7ScheduleDEPProps> = ({ form }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule DEP: Summary of depreciation on assets</h2>
                <p className="text-sm text-gray-600 mb-4">(Other than on assets on which full capital expenditure is allowable as deduction under any other section)</p>

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
                                <td className="px-4 py-2 border text-sm text-gray-900">Block entitled for depreciation @ 15 per cent (Schedule DPM - 17i or 18i as applicable)</td>
                                <td className="px-4 py-2 border w-48"><NumberInput name="plant_machinery.block_15_percent" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900">b</td>
                                <td className="px-4 py-2 border text-sm text-gray-900">Block entitled for depreciation @ 30 per cent (Schedule DPM - 17ii or 18ii as applicable)</td>
                                <td className="px-4 py-2 border"><NumberInput name="plant_machinery.block_30_percent" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900">c</td>
                                <td className="px-4 py-2 border text-sm text-gray-900">Block entitled for depreciation @ 40 per cent (Schedule DPM - 17iii or 18iii as applicable)</td>
                                <td className="px-4 py-2 border"><NumberInput name="plant_machinery.block_40_percent" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900">d</td>
                                <td className="px-4 py-2 border text-sm text-gray-900">Block entitled for depreciation @ 45 per cent (Schedule DPM - 17iv or 18iv as applicable)</td>
                                <td className="px-4 py-2 border"><NumberInput name="plant_machinery.block_45_percent" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900">e</td>
                                <td className="px-4 py-2 border text-sm font-semibold text-gray-900">Total depreciation on plant and machinery ( 1a + 1b + 1c+1d)</td>
                                <td className="px-4 py-2 border"><NumberInput name="plant_machinery.total_depreciation" form={form} /></td>
                            </tr>

                            {/* 2. Building */}
                            <tr className="bg-gray-50">
                                <td className="px-4 py-2 border text-sm font-bold text-gray-900">2</td>
                                <td className="px-4 py-2 border text-sm font-bold text-gray-900" colSpan={3}>Building (not including land)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900">a</td>
                                <td className="px-4 py-2 border text-sm text-gray-900">Block entitled for depreciation @ 5 per cent (Schedule DOA- 14ii or 15ii as applicable)</td>
                                <td className="px-4 py-2 border"><NumberInput name="building.block_5_percent" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900">b</td>
                                <td className="px-4 py-2 border text-sm text-gray-900">Block entitled for depreciation @ 10 per cent (Schedule DOA- 14iii or 15iii as applicable)</td>
                                <td className="px-4 py-2 border"><NumberInput name="building.block_10_percent" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900">c</td>
                                <td className="px-4 py-2 border text-sm text-gray-900">Block entitled for depreciation @ 40 per cent (Schedule DOA- 14iv or 15iv as applicable)</td>
                                <td className="px-4 py-2 border"><NumberInput name="building.block_40_percent" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm text-gray-500"></td>
                                <td className="px-4 py-2 border text-sm text-gray-900">d</td>
                                <td className="px-4 py-2 border text-sm font-semibold text-gray-900">Total depreciation on building (2a+2b+2c)</td>
                                <td className="px-4 py-2 border"><NumberInput name="building.total_depreciation" form={form} /></td>
                            </tr>

                            {/* 3, 4, 5, 6 */}
                            <tr>
                                <td className="px-4 py-2 border text-sm font-bold text-gray-900">3</td>
                                <td className="px-4 py-2 border text-sm text-gray-900" colSpan={2}>Furniture and fittings(Schedule DOA- 14v or 15v as applicable)</td>
                                <td className="px-4 py-2 border"><NumberInput name="furniture_fittings" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm font-bold text-gray-900">4</td>
                                <td className="px-4 py-2 border text-sm text-gray-900" colSpan={2}>Intangible assets (Schedule DOA- 14vi or 15vi as applicable)</td>
                                <td className="px-4 py-2 border"><NumberInput name="intangible_assets" form={form} /></td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border text-sm font-bold text-gray-900">5</td>
                                <td className="px-4 py-2 border text-sm text-gray-900" colSpan={2}>Ships (Schedule DOA- 14vii or 15vii as applicable)</td>
                                <td className="px-4 py-2 border"><NumberInput name="ships" form={form} /></td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className="px-4 py-2 border text-sm font-bold text-gray-900">6</td>
                                <td className="px-4 py-2 border text-sm font-bold text-gray-900" colSpan={2}>Total depreciation ( 1e+2d+3+4+5)</td>
                                <td className="px-4 py-2 border"><NumberInput name="total_depreciation" form={form} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7ScheduleDEP;
