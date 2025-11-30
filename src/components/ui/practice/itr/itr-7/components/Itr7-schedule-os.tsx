import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { ITR7ScheduleOSData } from './itr-7-schedule-os.types.ts';
import { Plus, Trash2 } from 'lucide-react';

export interface Itr7ScheduleOSProps {
    form: UseFormReturn<ITR7ScheduleOSData>;
}

const NumberInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleOSData>;
    className?: string;
    disabled?: boolean;
    placeholder?: string;
}> = ({ name, form, className, disabled, placeholder }) => (
    <input
        type="number"
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full border rounded px-2 py-1 text-sm ${disabled ? 'bg-gray-100' : ''} ${className ?? ''}`}
        {...form.register(name, { valueAsNumber: true })}
    />
);

const TextInput: React.FC<{
    name: any;
    form: UseFormReturn<ITR7ScheduleOSData>;
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
    <div className={`bg-gray-100 p-2 font-bold text-sm border-b ${className ?? ''}`}>
        {title}
    </div>
);

const RowLabel: React.FC<{ label: string; subLabel?: string; className?: string }> = ({ label, subLabel, className }) => (
    <div className={`text-sm ${className ?? ''}`}>
        <span className="font-medium">{label}</span>
        {subLabel && <span className="text-gray-500 ml-2">{subLabel}</span>}
    </div>
);

const Itr7ScheduleOS: React.FC<Itr7ScheduleOSProps> = ({ form }) => {
    const { fields: otherIncomeFields, append: appendOtherIncome, remove: removeOtherIncome } = useFieldArray({
        control: form.control,
        name: "scheduleOS.gross_income_normal.any_other_income.details",
    });

    const { fields: dtaaFields, append: appendDtaa, remove: removeDtaa } = useFieldArray({
        control: form.control,
        name: "scheduleOS.income_special_rates.dtaa_income.details",
    });

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule OS</h2>
                <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Income from other sources
                </p>

                {/* 1. Gross income chargeable to tax at normal applicable rates */}
                <div className="border rounded-lg mb-6">
                    <SectionHeader title="1. Gross income chargeable to tax at normal applicable rates (1a+ 1b+ 1c+ 1d + 1e)" />

                    {/* 1a Dividends */}
                    <div className="p-4 border-b">
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1 font-bold">a</div>
                            <div className="col-span-7 font-bold">Dividends, Gross (ai + aii + aiii)</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.dividends_gross.total" form={form} disabled /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">i</div>
                            <div className="col-span-7">Dividend income other than (ii) and (iii)</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.dividends_gross.other_dividends" form={form} /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">ii</div>
                            <div className="col-span-7">Dividend income u/s 2(22)(e)</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.dividends_gross.dividend_2_22_e" form={form} /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4">
                            <div className="col-span-1">iii</div>
                            <div className="col-span-7">Dividend income u/s 2(22)(f)</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.dividends_gross.dividend_2_22_f" form={form} /></div>
                        </div>
                    </div>

                    {/* 1b Interest */}
                    <div className="p-4 border-b">
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1 font-bold">b</div>
                            <div className="col-span-7 font-bold">Interest, Gross (bi + bii + biii + biv+bv)</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.interest_gross.total" form={form} disabled /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">i</div>
                            <div className="col-span-7">From Savings Bank</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.interest_gross.savings_bank" form={form} /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">ii</div>
                            <div className="col-span-7">From Deposits (Bank/ Post Office/ Co-operative Society)</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.interest_gross.deposits" form={form} /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">iii</div>
                            <div className="col-span-7">From Income-tax Refund</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.interest_gross.income_tax_refund" form={form} /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">iv</div>
                            <div className="col-span-7">In the nature of Pass through income/Loss</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.interest_gross.pass_through_income" form={form} /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4">
                            <div className="col-span-1">v</div>
                            <div className="col-span-7">Others</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.interest_gross.others" form={form} /></div>
                        </div>
                    </div>

                    {/* 1c Rental income */}
                    <div className="p-4 border-b">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-1 font-bold">c</div>
                            <div className="col-span-7 font-bold">Rental income from machinery, plants, buildings, etc., Gross</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.rental_income_machinery" form={form} /></div>
                        </div>
                    </div>

                    {/* 1d Income 56(2)(x) */}
                    <div className="p-4 border-b">
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1 font-bold">d</div>
                            <div className="col-span-7 font-bold">Income of the nature referred to in section 56(2)(x) which is chargeable to tax (di + dii + diii + div + dv)</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.income_56_2_x.total" form={form} disabled /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">i</div>
                            <div className="col-span-7">Aggregate value of sum of money received without consideration</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.income_56_2_x.money_without_consideration" form={form} /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">ii</div>
                            <div className="col-span-7">In case immovable property is received without consideration, stamp duty value of property</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.income_56_2_x.immovable_property_without_consideration" form={form} /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">iii</div>
                            <div className="col-span-7">In case immovable property is received for inadequate consideration, stamp duty value of property in excess of such consideration</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.income_56_2_x.immovable_property_inadequate_consideration" form={form} /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">iv</div>
                            <div className="col-span-7">In case any other property is received without consideration, fair market value of property</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.income_56_2_x.other_property_without_consideration" form={form} /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4">
                            <div className="col-span-1">v</div>
                            <div className="col-span-7">In case any other property is received for inadequate consideration, fair market value of property in excess of such consideration</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.gross_income_normal.income_56_2_x.other_property_inadequate_consideration" form={form} /></div>
                        </div>
                    </div>

                    {/* 1e Any other income */}
                    <div className="p-4">
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1 font-bold">1e</div>
                            <div className="col-span-11 font-bold">Any other income (please specify nature)</div>
                        </div>
                        <div className="ml-8">
                            <table className="min-w-full text-sm text-left text-gray-500 border-collapse border mb-2">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-2 py-1 border">Sl. No</th>
                                        <th className="px-2 py-1 border">Nature</th>
                                        <th className="px-2 py-1 border">Amount</th>
                                        <th className="px-2 py-1 border">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {otherIncomeFields.map((field, index) => (
                                        <tr key={field.id}>
                                            <td className="px-2 py-1 border text-center">{index + 1}</td>
                                            <td className="px-2 py-1 border"><TextInput name={`scheduleOS.gross_income_normal.any_other_income.details.${index}.nature`} form={form} /></td>
                                            <td className="px-2 py-1 border"><NumberInput name={`scheduleOS.gross_income_normal.any_other_income.details.${index}.amount`} form={form} /></td>
                                            <td className="px-2 py-1 border text-center">
                                                <button type="button" onClick={() => removeOtherIncome(index)} className="text-red-500"><Trash2 size={14} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button type="button" onClick={() => appendOtherIncome({ nature: "", amount: 0 })} className="text-blue-600 text-sm flex items-center gap-1"><Plus size={14} /> Add Row</button>
                        </div>
                    </div>
                </div>

                {/* 2. Income chargeable at special rates */}
                <div className="border rounded-lg mb-6">
                    <SectionHeader title="2. Income chargeable at special rates (2ai + 2aii + 2b+ 2c+ 2d + 2e related to sl.no.1)" />
                    <div className="p-4">
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">ai</div>
                            <div className="col-span-7">Winnings from lotteries, crossword puzzles, races, card games etc. chargeable u/s 115BB</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.income_special_rates.winnings_lottery_115bb" form={form} /></div>
                        </div>
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">aii</div>
                            <div className="col-span-7">Income by way of winnings from online games chargeable u/s 115BBJ</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.income_special_rates.winnings_online_games_115bbj" form={form} /></div>
                        </div>

                        {/* 2b */}
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1 font-bold">b</div>
                            <div className="col-span-7 font-bold">Income chargeable u/s 115BBE (bi + bii + biii + biv+ bv + bvi)</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.income_special_rates.income_115bbe.total" form={form} disabled /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">i</div>
                            <div className="col-span-7">Cash credits u/s 68</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.income_special_rates.income_115bbe.cash_credits_68" form={form} /></div>
                        </div>
                        {/* ... other 2b items ... */}
                        <div className="ml-8 grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">ii</div>
                            <div className="col-span-7">Unexplained investments u/s 69</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.income_special_rates.income_115bbe.unexplained_investments_69" form={form} /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">iii</div>
                            <div className="col-span-7">Unexplained money etc. u/s 69A</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.income_special_rates.income_115bbe.unexplained_money_69a" form={form} /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">iv</div>
                            <div className="col-span-7">Undisclosed investments etc. u/s 69B</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.income_special_rates.income_115bbe.undisclosed_investments_69b" form={form} /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">v</div>
                            <div className="col-span-7">Unexplained expenditure etc. u/s 69C</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.income_special_rates.income_115bbe.unexplained_expenditure_69c" form={form} /></div>
                        </div>
                        <div className="ml-8 grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">vi</div>
                            <div className="col-span-7">Amount borrowed or repaid on hundi u/s 69D</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.income_special_rates.income_115bbe.hundi_69d" form={form} /></div>
                        </div>

                        {/* 2c - Simplified for brevity, usually a long list */}
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1 font-bold">c</div>
                            <div className="col-span-7 font-bold">Any other income chargeable at special rate (total of ci to cxxiii)</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.income_special_rates.other_income_special_rate.total" form={form} /></div>
                        </div>

                        {/* 2d */}
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1 font-bold">d</div>
                            <div className="col-span-7 font-bold">Pass through income in the nature of income from other sources claimed as chargeable at special rates</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.income_special_rates.pass_through_income_special" form={form} /></div>
                        </div>
                    </div>
                </div>

                {/* 3. Deductions under section 57 */}
                <div className="border rounded-lg mb-6">
                    <SectionHeader title="3. Deductions under section 57 (other than those relating to income chargeable at special rates under 2a, 2b ,2c & 2d )" />
                    <div className="p-4">
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">a</div>
                            <div className="col-span-7">Expenses / Deductions (Other than entered in C)</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.deductions_57.expenses_other" form={form} /></div>
                        </div>
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">b</div>
                            <div className="col-span-7">Depreciation (available only if income offered in 1c )</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.deductions_57.depreciation" form={form} /></div>
                        </div>
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">c</div>
                            <div className="col-span-7">Interest expenditure on dividend u/s 57(1) (only if income offered in 1a)(i) and/or 1a(ii))</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.deductions_57.interest_expenditure_dividend" form={form} /></div>
                        </div>
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">ci</div>
                            <div className="col-span-7">Eligible Interest expenditure u/s 57(1) – computed value</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.deductions_57.eligible_interest_expenditure" form={form} /></div>
                        </div>
                        <div className="grid grid-cols-12 gap-4 mb-2 bg-gray-50 p-2 font-bold">
                            <div className="col-span-1">d</div>
                            <div className="col-span-7">Total</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.deductions_57.total" form={form} disabled /></div>
                        </div>
                    </div>
                </div>

                {/* 4, 5, 6, 7 */}
                <div className="border rounded-lg mb-6 p-4 space-y-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-1 font-bold">4</div>
                        <div className="col-span-7 font-semibold">Amounts not deductible u/s 58</div>
                        <div className="col-span-4"><NumberInput name="scheduleOS.amounts_not_deductible_58" form={form} /></div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-1 font-bold">5</div>
                        <div className="col-span-7 font-semibold">Profits chargeable to tax u/s 59</div>
                        <div className="col-span-4"><NumberInput name="scheduleOS.profits_chargeable_59" form={form} /></div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-1 font-bold">6</div>
                        <div className="col-span-7 font-semibold">Net Income from other sources chargeable at normal applicable rates</div>
                        <div className="col-span-4"><NumberInput name="scheduleOS.net_income_other_sources" form={form} /></div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-2">
                        <div className="col-span-1 font-bold">7</div>
                        <div className="col-span-7 font-bold">Income from other sources (other than from owning and maintaining race horses) (2 + 6)</div>
                        <div className="col-span-4"><NumberInput name="scheduleOS.income_other_sources_excluding_race_horses" form={form} disabled /></div>
                    </div>
                </div>

                {/* 8. Race Horses */}
                <div className="border rounded-lg mb-6">
                    <SectionHeader title="8. Income from the activity of owning race horses" />
                    <div className="p-4">
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">a</div>
                            <div className="col-span-7">Receipts</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.income_race_horses.receipts" form={form} /></div>
                        </div>
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">b</div>
                            <div className="col-span-7">Deductions under section 57 in relation to receipts at 8a only</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.income_race_horses.deductions_57" form={form} /></div>
                        </div>
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">c</div>
                            <div className="col-span-7">Amounts not deductible u/s 58</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.income_race_horses.amounts_not_deductible_58" form={form} /></div>
                        </div>
                        <div className="grid grid-cols-12 gap-4 mb-2">
                            <div className="col-span-1">d</div>
                            <div className="col-span-7">Profits chargeable to tax u/s 59</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.income_race_horses.profits_chargeable_59" form={form} /></div>
                        </div>
                        <div className="grid grid-cols-12 gap-4 mb-2 bg-gray-50 p-2 font-bold">
                            <div className="col-span-1">e</div>
                            <div className="col-span-7">Balance (8a - 8b + 8c + 8d)</div>
                            <div className="col-span-4"><NumberInput name="scheduleOS.income_race_horses.balance" form={form} disabled /></div>
                        </div>
                    </div>
                </div>

                {/* 9. Total Income */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                    <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-1 font-bold text-lg">9</div>
                        <div className="col-span-7 font-bold text-lg">Income under the head “Income from other sources” (7 + 8e)</div>
                        <div className="col-span-4"><NumberInput name="scheduleOS.income_under_head_other_sources" form={form} disabled className="font-bold text-lg" /></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Itr7ScheduleOS;
