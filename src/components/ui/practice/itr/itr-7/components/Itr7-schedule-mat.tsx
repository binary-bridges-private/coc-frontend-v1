import React, { useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { ITR7ScheduleMATData } from './itr-7-schedule-mat.types.ts';

export interface Itr7ScheduleMATProps {
    form: UseFormReturn<ITR7ScheduleMATData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleMATData>;
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

const CheckboxInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleMATData>;
    value: string;
}> = ({ name, form, value }) => (
    <input
        type="checkbox"
        value={value}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        {...form.register(name)}
    />
);

const Itr7ScheduleMAT: React.FC<Itr7ScheduleMATProps> = ({ form }) => {
    const scheduleData = useWatch({ control: form.control, name: 'scheduleMAT' });

    useEffect(() => {
        if (!scheduleData) return;

        // Calculate total additions (5n)
        const additions = scheduleData.additions || {};
        const totalAdditions =
            (Number(additions.income_tax_provision) || 0) +
            (Number(additions.reserve_except_33ac) || 0) +
            (Number(additions.provisions_unascertained_liability) || 0) +
            (Number(additions.provisions_losses_subsidiary) || 0) +
            (Number(additions.dividend_paid_proposed) || 0) +
            (Number(additions.expenditure_exempt_income) || 0) +
            (Number(additions.expenditure_aop_boi_section_86) || 0) +
            (Number(additions.expenditure_foreign_company_115jb) || 0) +
            (Number(additions.notional_loss_capital_assets_115jb) || 0) +
            (Number(additions.expenditure_royalty_115bbf) || 0) +
            (Number(additions.depreciation_revaluation) || 0) +
            (Number(additions.gain_transfer_units_115jb) || 0) +
            (Number(additions.others_additions) || 0);

        form.setValue('scheduleMAT.additions.total_additions', totalAdditions);

        // Calculate total deductions (6l)
        const deductions = scheduleData.deductions || {};
        const totalDeductions =
            (Number(deductions.amount_withdrawn_reserve) || 0) +
            (Number(deductions.income_exempt_10_11_12) || 0) +
            (Number(deductions.amount_withdrawn_revaluation) || 0) +
            (Number(deductions.share_income_aop_boi_section_86) || 0) +
            (Number(deductions.income_foreign_company_115jb) || 0) +
            (Number(deductions.notional_gain_capital_assets_115jb) || 0) +
            (Number(deductions.loss_transfer_units_115jb) || 0) +
            (Number(deductions.income_royalty_115jb) || 0) +
            (Number(deductions.loss_brought_forward_depreciation) || 0) +
            (Number(deductions.profit_sick_company) || 0) +
            (Number(deductions.others_deductions) || 0);

        form.setValue('scheduleMAT.deductions.total_deductions', totalDeductions);

        // Calculate book profit (7 = 4 + 5n - 6l)
        const bookProfit = (Number(scheduleData.profit_before_tax) || 0) + totalAdditions - totalDeductions;
        form.setValue('scheduleMAT.book_profit_115jb', bookProfit);

        // Calculate Ind-AS additions and deductions if applicable
        if (scheduleData.ind_as_compliance === 'Yes' && scheduleData.ind_as_details) {
            const indAsAdd = scheduleData.ind_as_details.additions || {};
            const totalIndAsAdd =
                (Number(indAsAdd.amounts_credited_comprehensive_income) || 0) +
                (Number(indAsAdd.amounts_debited_non_cash_assets) || 0) +
                (Number(indAsAdd.one_fifth_transition_amount) || 0) +
                (Number(indAsAdd.others_additions) || 0);
            form.setValue('scheduleMAT.ind_as_details.additions.total_additions', totalIndAsAdd);

            const indAsDed = scheduleData.ind_as_details.deductions || {};
            const totalIndAsDed =
                (Number(indAsDed.amounts_debited_comprehensive_income) || 0) +
                (Number(indAsDed.amounts_credited_non_cash_assets) || 0) +
                (Number(indAsDed.one_fifth_transition_amount_deduction) || 0) +
                (Number(indAsDed.others_deductions) || 0);
            form.setValue('scheduleMAT.ind_as_details.deductions.total_deductions', totalIndAsDed);

            // Calculate deemed total income (9 = 7 + 8e - 8j)
            const deemedIncome = bookProfit + totalIndAsAdd - totalIndAsDed;
            form.setValue('scheduleMAT.deemed_total_income_115jb', deemedIncome);
        } else {
            form.setValue('scheduleMAT.deemed_total_income_115jb', bookProfit);
        }

        // Calculate tax payable (10 = 9% of (9a) + 15% of (9b))
        const taxPayable =
            ((Number(scheduleData.deemed_income_ifsc_units) || 0) * 0.09) +
            ((Number(scheduleData.deemed_income_other_units) || 0) * 0.15);
        form.setValue('scheduleMAT.tax_payable_115jb', taxPayable);

    }, [scheduleData, form]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule MAT</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Computation of Minimum Alternate Tax payable under section 115JB
                </p>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 border-collapse border">
                        <tbody>
                            {/* Section 1-3: Basic Questions */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border font-bold w-[50px]">1</td>
                                <td className="px-2 py-2 border" colSpan={2}>
                                    If Profit and Loss Account is prepared in accordance with the provisions of Parts II of Schedule III to the Companies Act, 2013 (If yes, write 'Y', If no write 'N')
                                </td>
                                <td className="px-2 py-2 border w-[100px]">
                                    <CheckboxInput name="scheduleMAT.profit_loss_account_prepared_part_ii" form={form} value="Yes" />
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border font-bold">2</td>
                                <td className="px-2 py-2 border" colSpan={2}>
                                    If 1 is no, whether profit and loss account is prepared in accordance with the provisions of the Act governing such company (If yes, write 'Y', if no write 'N')
                                </td>
                                <td className="px-2 py-2 border">
                                    <CheckboxInput name="scheduleMAT.profit_loss_prepared_per_act" form={form} value="Yes" />
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border font-bold">3</td>
                                <td className="px-2 py-2 border" colSpan={2}>
                                    Whether, the Profit and Loss Account referred to in item 1 above, the same accounting policies, accounting standards and same method and rates for calculating depreciation have been followed as have been adopted for preparing such accounts laid before the company at its annual general body meeting? (If yes, write '1', if no write 'N')
                                </td>
                                <td className="px-2 py-2 border">
                                    <CheckboxInput name="scheduleMAT.accounting_policies_followed" form={form} value="Yes" />
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border font-bold">4</td>
                                <td className="px-2 py-2 border" colSpan={2}>
                                    Profit after tax as shown in the Profit and Loss Account (enter item 56 of Part A-P&L) v (enter item 56 of Part A- P&L Ind AS) (as applicable)
                                </td>
                                <td className="px-2 py-2 border text-center font-bold">4</td>
                                <td className="px-2 py-2 border">
                                    <NumberInput name="scheduleMAT.profit_before_tax" form={form} />
                                </td>
                            </tr>

                            {/* Section 5: Additions */}
                            <tr className="bg-gray-50 border-b">
                                <td className="px-2 py-2 border font-bold">5</td>
                                <td className="px-2 py-2 border font-bold" colSpan={4}>Additions (if debited in profit and loss account)</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold w-[50px]">a</td>
                                <td className="px-2 py-2 border">Income-tax paid or payable or its provision including the amount of deferred tax and the provision thereof</td>
                                <td className="px-2 py-2 border text-center font-bold">5a</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.additions.income_tax_provision" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">b</td>
                                <td className="px-2 py-2 border">Reserve (except reserve under section 33AC)</td>
                                <td className="px-2 py-2 border text-center font-bold">5b</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.additions.reserve_except_33ac" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">c</td>
                                <td className="px-2 py-2 border">Provisions for unascertained liability</td>
                                <td className="px-2 py-2 border text-center font-bold">5c</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.additions.provisions_unascertained_liability" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">d</td>
                                <td className="px-2 py-2 border">Provisions for losses of subsidiary companies</td>
                                <td className="px-2 py-2 border text-center font-bold">5d</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.additions.provisions_losses_subsidiary" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">e</td>
                                <td className="px-2 py-2 border">Dividend paid or proposed</td>
                                <td className="px-2 py-2 border text-center font-bold">5e</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.additions.dividend_paid_proposed" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">f</td>
                                <td className="px-2 py-2 border">Expenditure related to exempt income under sections [10, 11 or 12 [exempt income excludes income exempt under section 10(38)]</td>
                                <td className="px-2 py-2 border text-center font-bold">5f</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.additions.expenditure_exempt_income" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">g</td>
                                <td className="px-2 py-2 border">Expenditure related to share in income of AOP/ BOI on which no income-tax is payable as per section 86</td>
                                <td className="px-2 py-2 border text-center font-bold">5g</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.additions.expenditure_aop_boi_section_86" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">h</td>
                                <td className="px-2 py-2 border">Expenditure in case of foreign company referred to in clause (b) of explanation 1 to section 115JB</td>
                                <td className="px-2 py-2 border text-center font-bold">5h</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.additions.expenditure_foreign_company_115jb" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">i</td>
                                <td className="px-2 py-2 border">Notional loss on transfer of certain capital assets or units referred to in clause (c) of explanation 1 to section 115JB</td>
                                <td className="px-2 py-2 border text-center font-bold">5i</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.additions.notional_loss_capital_assets_115jb" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">j</td>
                                <td className="px-2 py-2 border">Expenditure relatable to income by way of royalty in respect of patent chargeable to tax u/s 115BBF</td>
                                <td className="px-2 py-2 border text-center font-bold">5j</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.additions.expenditure_royalty_115bbf" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">k</td>
                                <td className="px-2 py-2 border">Depreciation attributable to revaluation of assets</td>
                                <td className="px-2 py-2 border text-center font-bold">5k</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.additions.depreciation_revaluation" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">l</td>
                                <td className="px-2 py-2 border">Gain on transfer of units referred to in clause (k) of explanation 1 to section 115JB</td>
                                <td className="px-2 py-2 border text-center font-bold">5l</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.additions.gain_transfer_units_115jb" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">m</td>
                                <td className="px-2 py-2 border">Others (including residual unadjusted items and provision for diminution in the value of any asset)</td>
                                <td className="px-2 py-2 border text-center font-bold">5m</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.additions.others_additions" form={form} /></td>
                            </tr>
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">n</td>
                                <td className="px-2 py-2 border">Total additions (5a+5b+5c+5d+5e+5f+5g+5h+5i+5j+5k+5l+5m)</td>
                                <td className="px-2 py-2 border text-center font-bold">5n</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.additions.total_additions" form={form} disabled /></td>
                            </tr>

                            {/* Section 6: Deductions */}
                            <tr className="bg-gray-50 border-b">
                                <td className="px-2 py-2 border font-bold">6</td>
                                <td className="px-2 py-2 border font-bold" colSpan={4}>Deductions</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">a</td>
                                <td className="px-2 py-2 border">Amount withdrawn from reserve or provisions if credited to Profit and Loss account</td>
                                <td className="px-2 py-2 border text-center font-bold">6a</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.deductions.amount_withdrawn_reserve" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">b</td>
                                <td className="px-2 py-2 border">Income exempt under sections 10, 11 or 12 [exempt income excludes income exempt under section 10(38)]</td>
                                <td className="px-2 py-2 border text-center font-bold">6b</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.deductions.income_exempt_10_11_12" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">c</td>
                                <td className="px-2 py-2 border">Amount withdrawn from revaluation reserve and credited to the Profit and Loss account to the extent it does not exceed the amount of depreciation attributable to revaluation of asset</td>
                                <td className="px-2 py-2 border text-center font-bold">6c</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.deductions.amount_withdrawn_revaluation" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">d</td>
                                <td className="px-2 py-2 border">Share in income of AOP/ BOI on which no income-tax is payable as per section 86 credited to Profit and Loss account</td>
                                <td className="px-2 py-2 border text-center font-bold">6d</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.deductions.share_income_aop_boi_section_86" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">e</td>
                                <td className="px-2 py-2 border">Income in case of foreign company referred to in clause (iid) of explanation 1 to section 115JB</td>
                                <td className="px-2 py-2 border text-center font-bold">6e</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.deductions.income_foreign_company_115jb" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">f</td>
                                <td className="px-2 py-2 border">Notional gain on transfer of certain capital assets or units referred to in clause (iic) of explanation 1 to section 115JB</td>
                                <td className="px-2 py-2 border text-center font-bold">6f</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.deductions.notional_gain_capital_assets_115jb" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">g</td>
                                <td className="px-2 py-2 border">Loss on transfer of units referred to in clause (iii) of explanation 1 to section 115JB</td>
                                <td className="px-2 py-2 border text-center font-bold">6g</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.deductions.loss_transfer_units_115jb" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">h</td>
                                <td className="px-2 py-2 border">Income by way of royalty referred to in clause (iig) of explanation 1 to section 115JB</td>
                                <td className="px-2 py-2 border text-center font-bold">6h</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.deductions.income_royalty_115jb" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">i</td>
                                <td className="px-2 py-2 border">Loss brought forward or unabsorbed depreciation whichever is less or both as may be applicable</td>
                                <td className="px-2 py-2 border text-center font-bold">6i</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.deductions.loss_brought_forward_depreciation" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">j</td>
                                <td className="px-2 py-2 border">Profit of sick industrial company till net worth is equal to or exceeds accumulated losses</td>
                                <td className="px-2 py-2 border text-center font-bold">6j</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.deductions.profit_sick_company" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">k</td>
                                <td className="px-2 py-2 border">Others (including residual unadjusted items and the amount of deferred tax credited in P&L A/c)</td>
                                <td className="px-2 py-2 border text-center font-bold">6k</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.deductions.others_deductions" form={form} /></td>
                            </tr>
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">l</td>
                                <td className="px-2 py-2 border">Total deductions (6a+6b+6c+6d+6e+6f+6g+6h+6i+6j+6k)</td>
                                <td className="px-2 py-2 border text-center font-bold">6l</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.deductions.total_deductions" form={form} disabled /></td>
                            </tr>

                            {/* Section 7: Book Profit */}
                            <tr className="bg-white border-b font-bold">
                                <td className="px-2 py-2 border">7</td>
                                <td className="px-2 py-2 border" colSpan={2}>Book profit under section 115JB (4+ 5n – 6l)</td>
                                <td className="px-2 py-2 border text-center">7</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.book_profit_115jb" form={form} disabled /></td>
                            </tr>

                            {/* Section 8: Indian Accounting Standards */}
                            <tr className="bg-gray-50 border-b">
                                <td className="px-2 py-2 border font-bold">8</td>
                                <td className="px-2 py-2 border" colSpan={4}>
                                    <div className="mb-2">Whether the financial statements of the company are drawn up in compliance to the Indian Accounting Standards (Ind-AS) specified in Annexure to the companies (Indian Accounting Standards) Rules, 2015. If yes, furnish the details below:-</div>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2">
                                            <CheckboxInput name="scheduleMAT.ind_as_compliance" form={form} value="Yes" />
                                            <span>Yes</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <CheckboxInput name="scheduleMAT.ind_as_compliance" form={form} value="No" />
                                            <span>No</span>
                                        </label>
                                    </div>
                                </td>
                            </tr>

                            {/* Ind-AS Additions */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold" colSpan={4}>A. Additions to book profit under sub-sections (2A) to (2C) of section 115JB</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">a</td>
                                <td className="px-2 py-2 border">Amounts credited to other comprehensive income in statement of profit & loss under the head "items that will not be reclassified to profit & loss"</td>
                                <td className="px-2 py-2 border text-center font-bold">8a</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.ind_as_details.additions.amounts_credited_comprehensive_income" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">b</td>
                                <td className="px-2 py-2 border">Amounts debited to the statement of profit & loss on distribution of non-cash assets to shareholders in a demerger</td>
                                <td className="px-2 py-2 border text-center font-bold">8b</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.ind_as_details.additions.amounts_debited_non_cash_assets" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">c</td>
                                <td className="px-2 py-2 border">One fifth of the transition amount as referred to in section 115JB (2C) (if applicable)</td>
                                <td className="px-2 py-2 border text-center font-bold">8c</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.ind_as_details.additions.one_fifth_transition_amount" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">d</td>
                                <td className="px-2 py-2 border">Others (including residual adjustment)</td>
                                <td className="px-2 py-2 border text-center font-bold">8d</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.ind_as_details.additions.others_additions" form={form} /></td>
                            </tr>
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">e</td>
                                <td className="px-2 py-2 border">Total additions (8a + 8b + 8c + 8d)</td>
                                <td className="px-2 py-2 border text-center font-bold">8e</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.ind_as_details.additions.total_additions" form={form} disabled /></td>
                            </tr>

                            {/* Ind-AS Deductions */}
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold" colSpan={4}>B. Deductions from book profit under sub-sections (2A) to (2C) of section 115JB</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">f</td>
                                <td className="px-2 py-2 border">Amounts debited to other comprehensive income in statement of profit & loss under the head "items that will not be reclassified to profit & loss"</td>
                                <td className="px-2 py-2 border text-center font-bold">8f</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.ind_as_details.deductions.amounts_debited_comprehensive_income" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">g</td>
                                <td className="px-2 py-2 border">Amounts credited to the statement of profit & loss on distribution of non-cash assets to shareholders in a demerger</td>
                                <td className="px-2 py-2 border text-center font-bold">8g</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.ind_as_details.deductions.amounts_credited_non_cash_assets" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">h</td>
                                <td className="px-2 py-2 border">One fifth of the transition amount as referred to in section 115JB (2C) (if applicable)</td>
                                <td className="px-2 py-2 border text-center font-bold">8h</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.ind_as_details.deductions.one_fifth_transition_amount_deduction" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">i</td>
                                <td className="px-2 py-2 border">Others (including residual adjustment)</td>
                                <td className="px-2 py-2 border text-center font-bold">8i</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.ind_as_details.deductions.others_deductions" form={form} /></td>
                            </tr>
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">j</td>
                                <td className="px-2 py-2 border">Total deductions (8f + 8g + 8h + 8i)</td>
                                <td className="px-2 py-2 border text-center font-bold">8j</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.ind_as_details.deductions.total_deductions" form={form} disabled /></td>
                            </tr>

                            {/* Section 9: Deemed Total Income */}
                            <tr className="bg-white border-b font-bold">
                                <td className="px-2 py-2 border">9</td>
                                <td className="px-2 py-2 border" colSpan={2}>Deemed total income under section 115JB (7 + 8e – 8j)</td>
                                <td className="px-2 py-2 border text-center">9</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.deemed_total_income_115jb" form={form} disabled /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">a</td>
                                <td className="px-2 py-2 border">Deemed total income u/s 115JB from Units located in IFSC, if any</td>
                                <td className="px-2 py-2 border text-center font-bold">9a</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.deemed_income_ifsc_units" form={form} /></td>
                            </tr>
                            <tr className="bg-white border-b">
                                <td className="px-2 py-2 border"></td>
                                <td className="px-2 py-2 border font-bold">b</td>
                                <td className="px-2 py-2 border">Deemed total income u/s 115JB from other Units (9 - 9a)</td>
                                <td className="px-2 py-2 border text-center font-bold">9b</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.deemed_income_other_units" form={form} /></td>
                            </tr>

                            {/* Section 10: Tax Payable */}
                            <tr className="bg-gray-100 border-b font-bold">
                                <td className="px-2 py-2 border">10</td>
                                <td className="px-2 py-2 border" colSpan={2}>Tax payable under section 115JB [9% of (9a)+ 15% of (9b)]</td>
                                <td className="px-2 py-2 border text-center">10</td>
                                <td className="px-2 py-2 border"><NumberInput name="scheduleMAT.tax_payable_115jb" form={form} disabled /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Itr7ScheduleMAT;
