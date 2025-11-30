import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7ScheduleCGData } from './itr-7-schedule-cg.types.ts';

export interface Itr7ScheduleCGProps {
    form: UseFormReturn<ITR7ScheduleCGData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleCGData>;
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

const TextInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleCGData>;
    className?: string;
    disabled?: boolean;
}> = ({ name, form, className, disabled }) => (
    <input
        type="text"
        disabled={disabled}
        className={`w-full border rounded px-2 py-1 text-sm ${disabled ? 'bg-gray-100' : ''} ${className ?? ''}`}
        {...form.register(name)}
    />
);

const SectionHeader: React.FC<{ title: string; className?: string }> = ({ title, className }) => (
    <div className={`bg-gray-100 p-2 font-bold text-gray-800 border-b ${className ?? ''}`}>
        {title}
    </div>
);

const Itr7ScheduleCG: React.FC<Itr7ScheduleCGProps> = ({ form }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule CG: Capital Gains</h2>

                {/* A. Short-term Capital Gains */}
                <div className="mb-8 border rounded-lg overflow-hidden">
                    <SectionHeader title="A. Short-term Capital Gains (STCG) (Sub-items 4 & 5 are not applicable for residents)" />

                    {/* 1. Land or building */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">1. From sale of land or building or both</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">Date of purchase/acquisition</label>
                                    <input type="date" className="mt-1 block w-full border rounded px-2 py-1 text-sm" {...form.register("stcg.land_building.0.date_purchase")} />
                                </div>
                                <div className="col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">Date of sale/transfer</label>
                                    <input type="date" className="mt-1 block w-full border rounded px-2 py-1 text-sm" {...form.register("stcg.land_building.0.date_sale")} />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Full value of consideration received/receivable</div>
                                <div className="col-span-4"><NumberInput name="stcg.land_building.0.full_value_consideration" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Value of property as per stamp valuation authority</div>
                                <div className="col-span-4"><NumberInput name="stcg.land_building.0.value_property_stamp_authority" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Full value of consideration adopted as per section 50C</div>
                                <div className="col-span-4"><NumberInput name="stcg.land_building.0.full_value_consideration_adopted" form={form} /></div>
                            </div>

                            <div className="pl-4 border-l-2 border-gray-200 mt-2">
                                <div className="text-sm font-semibold mb-2">Deductions under section 48</div>
                                <div className="grid grid-cols-12 gap-4 items-center mb-2">
                                    <div className="col-span-8 text-sm">i. Cost of acquisition without indexation</div>
                                    <div className="col-span-4"><NumberInput name="stcg.land_building.0.deductions_sec_48.cost_acquisition" form={form} /></div>
                                </div>
                                <div className="grid grid-cols-12 gap-4 items-center mb-2">
                                    <div className="col-span-8 text-sm">ii. Cost of Improvement without indexation</div>
                                    <div className="col-span-4"><NumberInput name="stcg.land_building.0.deductions_sec_48.cost_improvement" form={form} /></div>
                                </div>
                                <div className="grid grid-cols-12 gap-4 items-center mb-2">
                                    <div className="col-span-8 text-sm">iii. Expenditure wholly and exclusively in connection with transfer</div>
                                    <div className="col-span-4"><NumberInput name="stcg.land_building.0.deductions_sec_48.expenditure_transfer" form={form} /></div>
                                </div>
                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-8 text-sm font-semibold">iv. Total (bi + bii + biii)</div>
                                    <div className="col-span-4"><NumberInput name="stcg.land_building.0.deductions_sec_48.total" form={form} /></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-12 gap-4 items-center mt-2">
                                <div className="col-span-8 text-sm font-semibold">Balance (aiii - biv)</div>
                                <div className="col-span-4"><NumberInput name="stcg.land_building.0.balance" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Deduction under section 54G/54GA</div>
                                <div className="col-span-4"><NumberInput name="stcg.land_building.0.deduction_sec_54" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-2 rounded">
                                <div className="col-span-8 text-sm font-bold">Short-term Capital Gains on Immovable property (1c - 1d)</div>
                                <div className="col-span-4"><NumberInput name="stcg.land_building.0.stcg_immovable_property" form={form} /></div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Slump sale */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">2. From slump sale</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Fair market value as per Rule 11UAE(2)</div>
                                <div className="col-span-4"><NumberInput name="stcg.slump_sale.fair_market_value_11uae2" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Fair market value as per Rule 11UAE(3)</div>
                                <div className="col-span-4"><NumberInput name="stcg.slump_sale.fair_market_value_11uae3" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Full value of consideration (higher of ai or aii)</div>
                                <div className="col-span-4"><NumberInput name="stcg.slump_sale.full_value_consideration" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Net worth of the under taking or division</div>
                                <div className="col-span-4"><NumberInput name="stcg.slump_sale.net_worth" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-2 rounded">
                                <div className="col-span-8 text-sm font-bold">Short term capital gains from slump sale (2aiii-2b)</div>
                                <div className="col-span-4"><NumberInput name="stcg.slump_sale.stcg_slump_sale" form={form} /></div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Equity share */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">3. From sale of equity share or unit of equity oriented Mutual Fund (MF) or unit of a business trust (STT paid)</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Full value of consideration</div>
                                <div className="col-span-4"><NumberInput name="stcg.equity_shares_units_stt.full_value_consideration" form={form} /></div>
                            </div>

                            <div className="pl-4 border-l-2 border-gray-200 mt-2">
                                <div className="text-sm font-semibold mb-2">Deductions under section 48</div>
                                <div className="grid grid-cols-12 gap-4 items-center mb-2">
                                    <div className="col-span-8 text-sm">i. Cost of acquisition without indexation</div>
                                    <div className="col-span-4"><NumberInput name="stcg.equity_shares_units_stt.deductions_sec_48.cost_acquisition" form={form} /></div>
                                </div>
                                <div className="grid grid-cols-12 gap-4 items-center mb-2">
                                    <div className="col-span-8 text-sm">ii. Cost of Improvement without indexation</div>
                                    <div className="col-span-4"><NumberInput name="stcg.equity_shares_units_stt.deductions_sec_48.cost_improvement" form={form} /></div>
                                </div>
                                <div className="grid grid-cols-12 gap-4 items-center mb-2">
                                    <div className="col-span-8 text-sm">iii. Expenditure wholly and exclusively in connection with transfer</div>
                                    <div className="col-span-4"><NumberInput name="stcg.equity_shares_units_stt.deductions_sec_48.expenditure_transfer" form={form} /></div>
                                </div>
                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-8 text-sm font-semibold">iv. Total (i + ii + iii)</div>
                                    <div className="col-span-4"><NumberInput name="stcg.equity_shares_units_stt.deductions_sec_48.total" form={form} /></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-12 gap-4 items-center mt-2">
                                <div className="col-span-8 text-sm font-semibold">Balance (3a - biv)</div>
                                <div className="col-span-4"><NumberInput name="stcg.equity_shares_units_stt.balance" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Loss to be disallowed u/s 94(7) or 94(8)</div>
                                <div className="col-span-4"><NumberInput name="stcg.equity_shares_units_stt.loss_disallowed_94_7_8" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-2 rounded">
                                <div className="col-span-8 text-sm font-bold">Short-term capital gain on equity share or equity oriented MF (STT paid) (3c + 3d)</div>
                                <div className="col-span-4"><NumberInput name="stcg.equity_shares_units_stt.stcg_equity_shares" form={form} /></div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Non-resident shares */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">4. For NON-RESIDENT, not being an FII- from sale of shares or debentures of an Indian company</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">STCG on transactions covered u/s 111A</div>
                                <div className="col-span-4"><NumberInput name="stcg.non_resident_shares.stcg_111a" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">STCG from sale of shares not covered in sl.no. 4a or sale of debentures</div>
                                <div className="col-span-4"><NumberInput name="stcg.non_resident_shares.stcg_other_shares" form={form} /></div>
                            </div>
                        </div>
                    </div>

                    {/* 5. FII Securities */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">5. For NON-RESIDENTS- from sale of securities (other than those at A3 above) by an FII as per section 115AD</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Full value of consideration received/receivable in respect of unquoted shares</div>
                                <div className="col-span-4"><NumberInput name="stcg.non_resident_fii_securities.full_value_consideration_quoted" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-2 rounded">
                                <div className="col-span-8 text-sm font-bold">Short-term capital gain on securities (other than those at A3 above) by an FII</div>
                                <div className="col-span-4"><NumberInput name="stcg.non_resident_fii_securities.stcg_securities_fii" form={form} /></div>
                            </div>
                        </div>
                    </div>

                    {/* 6. Other assets */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">6. From sale of assets other than at A1 or A2 or A3 or A4 or A5 above</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Full value of consideration received/receivable in respect of unquoted shares</div>
                                <div className="col-span-4"><NumberInput name="stcg.other_assets.full_value_consideration_unquoted" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-2 rounded">
                                <div className="col-span-8 text-sm font-bold">STCG on assets other than at A1 or A2 or A3 or A4 or A5 above</div>
                                <div className="col-span-4"><NumberInput name="stcg.other_assets.stcg_other_assets" form={form} /></div>
                            </div>
                        </div>
                    </div>

                    {/* 7. Deemed STCG */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">7. Amount deemed to be short term capital gains</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Amount deemed to be short term capital gains u/s 54D/54G/54GA</div>
                                <div className="col-span-4"><NumberInput name="stcg.amount_deemed_stcg.amount_deemed_stcg_other" form={form} /></div>
                            </div>
                        </div>
                    </div>

                    {/* 8. Pass Through Income */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">8. Pass Through Income/Loss in the nature of Short Term Capital Gain</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Pass Through Income/Loss chargeable @ 15%</div>
                                <div className="col-span-4"><NumberInput name="stcg.pass_through_income.stcg_15_percent" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Pass Through Income/Loss chargeable @ 30%</div>
                                <div className="col-span-4"><NumberInput name="stcg.pass_through_income.stcg_30_percent" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Pass Through Income/Loss chargeable at applicable rates</div>
                                <div className="col-span-4"><NumberInput name="stcg.pass_through_income.stcg_applicable_rate" form={form} /></div>
                            </div>
                        </div>
                    </div>

                    {/* 9. STCG Not Chargeable */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">9. Amount of STCG included in A1 – A8 but claimed as not chargeable to tax or chargeable at special rates in India as per DTAA</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Total amount of STCG not claimed as chargeable to tax in India as per DTAA</div>
                                <div className="col-span-4"><NumberInput name="stcg.stcg_not_chargeable_dta.total_stcg_not_chargeable" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Total amount of STCG claimed as chargeable to tax at special rates in India as per DTAA</div>
                                <div className="col-span-4"><NumberInput name="stcg.stcg_not_chargeable_dta.total_stcg_chargeable_special_rates" form={form} /></div>
                            </div>
                        </div>
                    </div>

                    {/* A(A). Buy Back */}
                    <div className="p-4 border-b">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-8 text-sm">Capital Loss on buy back of shares on or after 01st October 2024</div>
                            <div className="col-span-4"><NumberInput name="stcg.buy_back_shares" form={form} /></div>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 border-t">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-8 text-sm font-bold">10. Total Short-term Capital Gain</div>
                            <div className="col-span-4"><NumberInput name="stcg.total_stcg" form={form} /></div>
                        </div>
                    </div>
                </div>

                {/* B. Long-term Capital Gains */}
                <div className="mb-8 border rounded-lg overflow-hidden">
                    <SectionHeader title="B. Long-term capital gain (LTCG) (Sub-items 6, 7 & 8 are not applicable for residents)" />

                    {/* 1. Land or building */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">1. From sale of land or building or both</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">Date of purchase/acquisition</label>
                                    <input type="date" className="mt-1 block w-full border rounded px-2 py-1 text-sm" {...form.register("ltcg.land_building.0.date_purchase")} />
                                </div>
                                <div className="col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">Date of sale/transfer</label>
                                    <input type="date" className="mt-1 block w-full border rounded px-2 py-1 text-sm" {...form.register("ltcg.land_building.0.date_sale")} />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Full value of consideration received/receivable</div>
                                <div className="col-span-4"><NumberInput name="ltcg.land_building.0.full_value_consideration" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-2 rounded">
                                <div className="col-span-8 text-sm font-bold">Long-term Capital Gains on Immovable property (1c - 1d)</div>
                                <div className="col-span-4"><NumberInput name="ltcg.land_building.0.ltcg_immovable_property" form={form} /></div>
                            </div>

                            {/* Buyer Details for LTCG */}
                            <div className="mt-4 border-t pt-4">
                                <h4 className="font-semibold mb-2">Buyer Details</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-4 text-sm">Name of buyer(s)</div>
                                        <div className="col-span-8"><TextInput name="ltcg.land_building.0.buyer_details.0.name" form={form} /></div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-4 text-sm">PAN/Aadhaar No. of buyer(s)</div>
                                        <div className="col-span-8"><TextInput name="ltcg.land_building.0.buyer_details.0.pan_aadhaar" form={form} /></div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-4 text-sm">Percentage share</div>
                                        <div className="col-span-8"><NumberInput name="ltcg.land_building.0.buyer_details.0.percentage_share" form={form} /></div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-4 text-sm">Amount</div>
                                        <div className="col-span-8"><NumberInput name="ltcg.land_building.0.buyer_details.0.amount" form={form} /></div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-4 text-sm">Address of property</div>
                                        <div className="col-span-8"><TextInput name="ltcg.land_building.0.buyer_details.0.address" form={form} /></div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-4 text-sm">Pin code</div>
                                        <div className="col-span-8"><TextInput name="ltcg.land_building.0.buyer_details.0.pin_code" form={form} /></div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-4 text-sm">State code</div>
                                        <div className="col-span-8"><TextInput name="ltcg.land_building.0.buyer_details.0.state" form={form} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Slump sale */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">2. From slump sale</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Fair market value as per Rule 11UAE(2)</div>
                                <div className="col-span-4"><NumberInput name="ltcg.slump_sale.fair_market_value_11uae2" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-2 rounded">
                                <div className="col-span-8 text-sm font-bold">Long term capital gains from slump sale</div>
                                <div className="col-span-4"><NumberInput name="ltcg.slump_sale.ltcg_slump_sale" form={form} /></div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Unlisted bonds */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">3. From residents, from sale of unlisted bonds or unlisted debenture</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Full value of consideration</div>
                                <div className="col-span-4"><NumberInput name="ltcg.unlisted_bonds.full_value_consideration" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-2 rounded">
                                <div className="col-span-8 text-sm font-bold">LTCG on bonds or debenture</div>
                                <div className="col-span-4"><NumberInput name="ltcg.unlisted_bonds.ltcg_bonds" form={form} /></div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Listed securities */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">4. From sale of listed securities (other than a unit) or zero coupon bonds as per Section 112(1)</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Full value of consideration</div>
                                <div className="col-span-4"><NumberInput name="ltcg.listed_securities.full_value_consideration" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-2 rounded">
                                <div className="col-span-8 text-sm font-bold">Long Term Capital Gains on assets at B4</div>
                                <div className="col-span-4"><NumberInput name="ltcg.listed_securities.ltcg_securities_before_23_july" form={form} /></div>
                            </div>
                        </div>
                    </div>

                    {/* 5. Other assets */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">5. From sale of assets other than at B1 or B2 or B3 or B4 above</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Full value of consideration</div>
                                <div className="col-span-4"><NumberInput name="ltcg.other_assets.full_value_consideration" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-2 rounded">
                                <div className="col-span-8 text-sm font-bold">Long Term Capital Gains on assets at B5</div>
                                <div className="col-span-4"><NumberInput name="ltcg.other_assets.ltcg_other_assets" form={form} /></div>
                            </div>
                        </div>
                    </div>

                    {/* 6. Deemed LTCG */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">6. Amount deemed to be long term capital gains</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Amount deemed to be long term capital gains u/s 54D/54G/54GA</div>
                                <div className="col-span-4"><NumberInput name="ltcg.amount_deemed_ltcg.amount_deemed_ltcg_other" form={form} /></div>
                            </div>
                        </div>
                    </div>

                    {/* 7. Pass Through Income */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">7. Pass Through Income/Loss in the nature of Long Term Capital Gain</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Pass Through Income/Loss chargeable @ 10%</div>
                                <div className="col-span-4"><NumberInput name="ltcg.pass_through_income.ltcg_10_percent" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Pass Through Income/Loss chargeable @ 20%</div>
                                <div className="col-span-4"><NumberInput name="ltcg.pass_through_income.ltcg_20_percent" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Pass Through Income/Loss chargeable at applicable rates</div>
                                <div className="col-span-4"><NumberInput name="ltcg.pass_through_income.ltcg_applicable_rate" form={form} /></div>
                            </div>
                        </div>
                    </div>

                    {/* 8. LTCG Not Chargeable */}
                    <div className="p-4 border-b">
                        <h3 className="font-semibold mb-4">8. Amount of LTCG included in B1 – B7 but claimed as not chargeable to tax or chargeable at special rates in India as per DTAA</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Total amount of LTCG not claimed as chargeable to tax in India as per DTAA</div>
                                <div className="col-span-4"><NumberInput name="ltcg.ltcg_not_chargeable_dta.total_ltcg_not_chargeable" form={form} /></div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-8 text-sm">Total amount of LTCG claimed as chargeable to tax at special rates in India as per DTAA</div>
                                <div className="col-span-4"><NumberInput name="ltcg.ltcg_not_chargeable_dta.total_ltcg_chargeable_special_rates" form={form} /></div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 border-t">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-8 text-sm font-bold">9. Total Long-term Capital Gain</div>
                            <div className="col-span-4"><NumberInput name="ltcg.total_ltcg" form={form} /></div>
                        </div>
                    </div>
                </div>

                {/* E. Set-off of current year capital losses */}
                <div className="mb-8 border rounded-lg overflow-hidden">
                    <SectionHeader title="E. Set-off of current year capital losses with current year capital gains" />
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 border">Type of Capital Gain</th>
                                    <th className="px-4 py-2 border">Gain of current year</th>
                                    <th className="px-4 py-2 border">STCG 15%</th>
                                    <th className="px-4 py-2 border">STCG 20%</th>
                                    <th className="px-4 py-2 border">STCG 30%</th>
                                    <th className="px-4 py-2 border">STCG App. Rate</th>
                                    <th className="px-4 py-2 border">STCG DTAA</th>
                                    <th className="px-4 py-2 border">LTCG 10%</th>
                                    <th className="px-4 py-2 border">LTCG 12.5%</th>
                                    <th className="px-4 py-2 border">LTCG 20%</th>
                                    <th className="px-4 py-2 border">LTCG DTAA</th>
                                    <th className="px-4 py-2 border">Remaining Gain</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    "Short-term capital gains taxable at the rate of 15%",
                                    "Short-term capital gains taxable at the rate of 20%",
                                    "Short-term capital gains taxable at the rate of 30%",
                                    "Short-term capital gains taxable at applicable rates",
                                    "Short-term capital gains taxable at DTAA rates",
                                    "Long- term capital gains taxable at the rate of 10%",
                                    "Long- term capital gains taxable at the rate of 12.5%",
                                    "Long- term capital gains taxable at the rate of 20%",
                                    "Long- term capital gains taxable at the rate DTAA rates",
                                    "Total loss set off",
                                    "Loss remaining after set off"
                                ].map((label, index) => (
                                    <tr key={index} className="bg-white border-b">
                                        <td className="px-4 py-2 border font-medium text-gray-900">{label}</td>
                                        <td className="px-2 py-1 border"><NumberInput name={`set_off_losses.${index}.gain_current_year`} form={form} /></td>
                                        <td className="px-2 py-1 border"><NumberInput name={`set_off_losses.${index}.stcg_loss_15`} form={form} /></td>
                                        <td className="px-2 py-1 border"><NumberInput name={`set_off_losses.${index}.stcg_loss_20`} form={form} /></td>
                                        <td className="px-2 py-1 border"><NumberInput name={`set_off_losses.${index}.stcg_loss_30`} form={form} /></td>
                                        <td className="px-2 py-1 border"><NumberInput name={`set_off_losses.${index}.stcg_loss_applicable`} form={form} /></td>
                                        <td className="px-2 py-1 border"><NumberInput name={`set_off_losses.${index}.stcg_loss_dtaa`} form={form} /></td>
                                        <td className="px-2 py-1 border"><NumberInput name={`set_off_losses.${index}.ltcg_loss_10`} form={form} /></td>
                                        <td className="px-2 py-1 border"><NumberInput name={`set_off_losses.${index}.ltcg_loss_12_5`} form={form} /></td>
                                        <td className="px-2 py-1 border"><NumberInput name={`set_off_losses.${index}.ltcg_loss_20`} form={form} /></td>
                                        <td className="px-2 py-1 border"><NumberInput name={`set_off_losses.${index}.ltcg_loss_dtaa`} form={form} /></td>
                                        <td className="px-2 py-1 border"><NumberInput name={`set_off_losses.${index}.gain_remaining`} form={form} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* F. Information about accrual/receipt of capital gain */}
                <div className="mb-8 border rounded-lg overflow-hidden">
                    <SectionHeader title="F. Information about accrual/receipt of capital gain" />
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 border">Type of Capital Gain / Date</th>
                                    <th className="px-4 py-2 border">Upto 15/6</th>
                                    <th className="px-4 py-2 border">16/6 to 15/9</th>
                                    <th className="px-4 py-2 border">16/9 to 15/12</th>
                                    <th className="px-4 py-2 border">16/12 to 15/3</th>
                                    <th className="px-4 py-2 border">16/3 to 31/3</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    "Short-term capital gains taxable at the rate of 15%",
                                    "Short-term capital gains taxable at the rate of 20%",
                                    "Short-term capital gains taxable at the rate of 30%",
                                    "Short-term capital gains taxable at applicable rates",
                                    "Short-term capital gains taxable at DTAA rates",
                                    "Long- term capital gains taxable at the rate of 10%",
                                    "Long- term capital gains taxable at the rate of 12.5%",
                                    "Long- term capital gains taxable at the rate of 20%",
                                    "Long- term capital gains taxable at the rate DTAA rates",
                                    "Capital gains on transfer of Virtual Digital Asset taxable at the rate of 30%"
                                ].map((label, index) => (
                                    <tr key={index} className="bg-white border-b">
                                        <td className="px-4 py-2 border font-medium text-gray-900">{label}</td>
                                        <td className="px-2 py-1 border"><NumberInput name={`accrual_info.${index}.upto_15_6`} form={form} /></td>
                                        <td className="px-2 py-1 border"><NumberInput name={`accrual_info.${index}.upto_15_9`} form={form} /></td>
                                        <td className="px-2 py-1 border"><NumberInput name={`accrual_info.${index}.upto_15_12`} form={form} /></td>
                                        <td className="px-2 py-1 border"><NumberInput name={`accrual_info.${index}.upto_15_3`} form={form} /></td>
                                        <td className="px-2 py-1 border"><NumberInput name={`accrual_info.${index}.upto_31_3`} form={form} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Itr7ScheduleCG;
