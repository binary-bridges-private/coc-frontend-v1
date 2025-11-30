import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7ScheduleBPData } from './itr-7-schedule-bp.types.ts';

export interface Itr7ScheduleBPProps {
    form: UseFormReturn<ITR7ScheduleBPData>;
}

const Section: React.FC<{
    title: string;
    expanded: boolean;
    onToggle: () => void;
    children?: React.ReactNode;
}> = ({ title, expanded, onToggle, children }) => (
    <div className="border rounded-lg mb-4">
        <button
            type="button"
            onClick={onToggle}
            className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
            <span>{title}</span>
            <span className="text-xl">{expanded ? '−' : '+'}</span>
        </button>
        {expanded && <div className="p-6 space-y-4">{children}</div>}
    </div>
);

const NumberInput: React.FC<{
    label: string;
    name: any;
    form: UseFormReturn<ITR7ScheduleBPData>;
    className?: string;
}> = ({ label, name, form, className }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type="number"
            className={`w-full border rounded px-3 py-2 ${className ?? ''}`}
            {...form.register(name, { valueAsNumber: true })}
        />
    </div>
);

const TextInput: React.FC<{
    label: string;
    name: any;
    form: UseFormReturn<ITR7ScheduleBPData>;
    className?: string;
}> = ({ label, name, form, className }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type="text"
            className={`w-full border rounded px-3 py-2 ${className ?? ''}`}
            {...form.register(name)}
        />
    </div>
);

const Itr7ScheduleBP: React.FC<Itr7ScheduleBPProps> = ({ form }) => {
    const [expanded, setExpanded] = React.useState<{ [key: string]: boolean }>({
        partA: true,
        partB: true,
        partC: true,
        partD: true,
        partE: true,
    });

    const toggle = (key: string) => setExpanded((s) => ({ ...s, [key]: !s[key] }));

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule BP: Computation of income from business or profession</h2>

                {/* A. From business or profession other than speculative business and specified business */}
                <Section title="A. From business or profession other than speculative business and specified business" expanded={expanded.partA} onToggle={() => toggle('partA')}>
                    <div className="space-y-4">
                        <NumberInput label="1. Profit before tax as per profit and loss account (item 53, 61(ii) and 62(b) of Part A-P&L) / (item 53 of Part A-P&L – Ind AS) (as applicable)" name="business_profession_other_than_speculative_specified.profit_before_tax" form={form} />
                        <NumberInput label="2a. Net profit or loss from speculative business included in 1 (enter –ve sign in case of loss) (Sl. No. 12b of Schedule Trading Account or Trading-Ind As account) (as applicable)" name="business_profession_other_than_speculative_specified.net_profit_loss_speculative_included" form={form} />
                        <NumberInput label="2b. Net profit or Loss from Specified Business u/s 35AD included in 1 (enter –ve sign in case of loss)" name="business_profession_other_than_speculative_specified.net_profit_loss_specified_included" form={form} />

                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-2">3. Income/ receipts credited to profit and loss account considered under other heads of income or chargeable u/s 115BBF or chargeable u/s 115BBG or chargeable u/s 115BBH</h4>
                            <NumberInput label="a. House property" name="business_profession_other_than_speculative_specified.income_credited_pl_other_heads.house_property" form={form} />
                            <NumberInput label="b. Capital gains" name="business_profession_other_than_speculative_specified.income_credited_pl_other_heads.capital_gains" form={form} />
                            <NumberInput label="c. Other sources" name="business_profession_other_than_speculative_specified.income_credited_pl_other_heads.other_sources" form={form} />
                            <NumberInput label="ci. Dividend income" name="business_profession_other_than_speculative_specified.income_credited_pl_other_heads.dividend_income" form={form} />
                            <NumberInput label="cii. other than Dividend" name="business_profession_other_than_speculative_specified.income_credited_pl_other_heads.other_than_dividend" form={form} />
                            <NumberInput label="d. u/s 115BBF" name="business_profession_other_than_speculative_specified.income_credited_pl_other_heads.u_s_115bbf" form={form} />
                            <NumberInput label="e. u/s 115BBG" name="business_profession_other_than_speculative_specified.income_credited_pl_other_heads.u_s_115bbg" form={form} />
                            <NumberInput label="f. u/s 115BBH (net of Cost of Acquisition, if any) (Item No. A of Schedule VDA)" name="business_profession_other_than_speculative_specified.income_credited_pl_other_heads.u_s_115bbh" form={form} />
                        </div>

                        <NumberInput label="4a. Profit or loss included in 1, which is referred to in section 44B/44BB/44BBA/44BBB/44BBC/44AE/44D/44DA/Chapter-XII-G/ First Schedule of Income-tax Act (other than 115B) (Dropdown to be provided)" name="business_profession_other_than_speculative_specified.profit_included_referred_sections" form={form} />
                        <NumberInput label="4b. Profit and gains from life insurance business referred to in section 115B" name="business_profession_other_than_speculative_specified.profit_life_insurance_business" form={form} />
                        <NumberInput label="4c. Profit from activities covered under rule 7, 7A, 7B(1), 7B(1A) and 8 (Dropdown to be provided)" name="business_profession_other_than_speculative_specified.profit_activities_rule_7_8" form={form} />
                        <NumberInput label="4d. Profit from eligible business of selling raw diamonds (refer rule 10TIA)" name="business_profession_other_than_speculative_specified.profit_selling_raw_diamonds" form={form} />

                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-2">5. Income credited to Profit and Loss account (included in 1) which is exempt</h4>
                            <NumberInput label="a. Share of income from firm(s)" name="business_profession_other_than_speculative_specified.exempt_income_credited_pl.share_from_firm" form={form} />
                            <NumberInput label="b. Share of income from AOP/ BOI" name="business_profession_other_than_speculative_specified.exempt_income_credited_pl.share_from_aop_boi" form={form} />
                            <div className="space-y-4 border-l-2 border-gray-200 pl-4 my-2">
                                <h5 className="text-sm font-medium text-gray-700">c. Any other exempt income (specify nature and amount)</h5>
                                <div className="grid grid-cols-2 gap-4">
                                    <TextInput label="i. Nature" name="business_profession_other_than_speculative_specified.exempt_income_credited_pl.other_exempt_income.i.nature" form={form} />
                                    <NumberInput label="Amount" name="business_profession_other_than_speculative_specified.exempt_income_credited_pl.other_exempt_income.i.amount" form={form} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <TextInput label="ii. Nature" name="business_profession_other_than_speculative_specified.exempt_income_credited_pl.other_exempt_income.ii.nature" form={form} />
                                    <NumberInput label="Amount" name="business_profession_other_than_speculative_specified.exempt_income_credited_pl.other_exempt_income.ii.amount" form={form} />
                                </div>
                                <NumberInput label="iii. Total (ci + cii)" name="business_profession_other_than_speculative_specified.exempt_income_credited_pl.other_exempt_income.total" form={form} />
                            </div>
                            <NumberInput label="d. Total exempt income (5a + 5b + 5ciii)" name="business_profession_other_than_speculative_specified.exempt_income_credited_pl.total_exempt_income" form={form} />
                        </div>

                        <NumberInput label="6. Balance (1 – 2a – 2b – 3a - 3b – 3c – 3d – 3e – 3f–4– 5d)" name="business_profession_other_than_speculative_specified.balance_after_adjustments" form={form} />

                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-2">7. Expenses debited to profit and loss account considered under other heads of income/related to income chargeable u/s 115BBF or u/s 115BBG or u/s 115BBH</h4>
                            <NumberInput label="a. House property" name="business_profession_other_than_speculative_specified.expenses_debited_pl_other_heads.house_property" form={form} />
                            <NumberInput label="b. Capital gains" name="business_profession_other_than_speculative_specified.expenses_debited_pl_other_heads.capital_gains" form={form} />
                            <NumberInput label="c. Other sources" name="business_profession_other_than_speculative_specified.expenses_debited_pl_other_heads.other_sources" form={form} />
                            <NumberInput label="d. u/s 115BBF" name="business_profession_other_than_speculative_specified.expenses_debited_pl_other_heads.u_s_115bbf" form={form} />
                            <NumberInput label="e. u/s 115BBG" name="business_profession_other_than_speculative_specified.expenses_debited_pl_other_heads.u_s_115bbg" form={form} />
                            <NumberInput label="f. u/s 115BBH (other than Cost of Acquisition)" name="business_profession_other_than_speculative_specified.expenses_debited_pl_other_heads.u_s_115bbh" form={form} />
                        </div>

                        <NumberInput label="8a. Expenses debited to profit and loss account which relate to exempt income" name="business_profession_other_than_speculative_specified.expenses_related_exempt_income" form={form} />
                        <NumberInput label="8b. Expenses debited to profit and loss account which relate to exempt income and disallowed u/s 14A (16 of Part A-OI)" name="business_profession_other_than_speculative_specified.expenses_related_exempt_income_disallowed_14a" form={form} />
                        <NumberInput label="9. Total (7a + 7b + 7c + 7d + 7e + 7f+ 8a+8b)" name="business_profession_other_than_speculative_specified.total_expenses_other_heads" form={form} />
                        <NumberInput label="10. Adjusted profit or loss (6+9)" name="business_profession_other_than_speculative_specified.adjusted_profit_loss" form={form} />
                        <NumberInput label="11. Depreciation and amortization debited to profit and loss account" name="business_profession_other_than_speculative_specified.depreciation_debited_pl" form={form} />

                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-2">12. Depreciation allowable under Income-tax Act</h4>
                            <NumberInput label="i. Depreciation allowable under section 32(1)(ii) and 32(1)(iia) (item 6 of Schedule-DEP)" name="business_profession_other_than_speculative_specified.depreciation_allowable_it_act.section_32_1_ii_iia" form={form} />
                            <NumberInput label="ii. Depreciation allowable under section 32(1)(i) (Make your own computation refer Appendix-IA of IT Rules)" name="business_profession_other_than_speculative_specified.depreciation_allowable_it_act.section_32_1_i" form={form} />
                            <NumberInput label="iii. Total (12i + 12ii)" name="business_profession_other_than_speculative_specified.depreciation_allowable_it_act.total" form={form} />
                        </div>

                        <NumberInput label="13. Profit or loss after adjustment for depreciation (10 + 11 – 12iii)" name="business_profession_other_than_speculative_specified.profit_loss_after_depreciation_adjustment" form={form} />
                        <NumberInput label="14. Amounts debited to the profit and loss account, to the extent disallowable under section 36 (6s of Part A-OI)" name="business_profession_other_than_speculative_specified.amounts_debited_pl_disallowable.section_36" form={form} />
                        <NumberInput label="15. Amounts debited to the profit and loss account, to the extent disallowable under section 37 (7k of Part A-OI)" name="business_profession_other_than_speculative_specified.amounts_debited_pl_disallowable.section_37" form={form} />
                        <NumberInput label="16. Amounts debited to the profit and loss account, to the extent disallowable under section 40 (8Aj of Part A-OI)" name="business_profession_other_than_speculative_specified.amounts_debited_pl_disallowable.section_40" form={form} />
                        <NumberInput label="17. Amounts debited to the profit and loss account, to the extent disallowable under section 40A (9f of Part A-OI)" name="business_profession_other_than_speculative_specified.amounts_debited_pl_disallowable.section_40a" form={form} />
                        <NumberInput label="18. Any amount debited to profit and loss account of the previous year but disallowable under section 43B (11i of Part A-OI)" name="business_profession_other_than_speculative_specified.amounts_debited_pl_disallowable.section_43b" form={form} />
                        <NumberInput label="19. Interest disallowable under section 23 of the Micro, Small and Medium Enterprises Development Act, 2006" name="business_profession_other_than_speculative_specified.interest_disallowable_msme" form={form} />
                        <NumberInput label="20. Deemed income under section 41" name="business_profession_other_than_speculative_specified.deemed_income_section_41" form={form} />
                        <NumberInput label="21. Deemed income under section 32AC/ 32AD/ 33AB/ 33ABA/35ABA/ 35ABB/ 35AC/ 40A(3A)/ 33AC/ 72A/ 80HHD/ 80-IA" name="business_profession_other_than_speculative_specified.deemed_income_section_32ac_etc" form={form} />
                        <NumberInput label="22. Deemed income under section 43CA" name="business_profession_other_than_speculative_specified.deemed_income_section_43ca" form={form} />
                        <NumberInput label="23. Any other item of addition under section 28 to 44DB" name="business_profession_other_than_speculative_specified.any_other_item_addition_28_to_44db" form={form} />
                        <NumberInput label="24. Any other income not included in profit and loss account/any other expense not allowable (including income from salary, commission, bonus and interest from firms in which company is a partner)" name="business_profession_other_than_speculative_specified.any_other_income_not_included_pl" form={form} />
                        <NumberInput label="25. Increase in profit or decrease in loss on account of ICDS adjustments and deviation in method of valuation of stock (Column 3a + 4d of Part A- OI)" name="business_profession_other_than_speculative_specified.increase_profit_icds" form={form} />
                        <NumberInput label="26. Total (14 + 15 + 16 + 17 + 18 + 19 + 20 + 21+22 +23+24+25)" name="business_profession_other_than_speculative_specified.total_additions" form={form} />

                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-2">Deductions</h4>
                            <NumberInput label="27. Deduction allowable under section 32(1)(iii)" name="business_profession_other_than_speculative_specified.deductions_allowable.section_32_1_iii" form={form} />
                            <NumberInput label="28. Amount allowable as deduction under section 32AC" name="business_profession_other_than_speculative_specified.deductions_allowable.section_32ac" form={form} />
                            <NumberInput label="29. Amount of deduction under section 35 or 35CCC or 35CCD in excess of the amount debited to profit and loss account (item x(4) of Schedule ESR) (if amount deductible under section 35 or 35CCC or 35CCD is lower than amount debited to P&L account, it will go to item 24)" name="business_profession_other_than_speculative_specified.deductions_allowable.section_35_35ccc_35ccd_excess" form={form} />
                            <NumberInput label="30. Any amount disallowed under section 40 in any preceding previous year but allowable during the previous year(8B of Part A-OI)" name="business_profession_other_than_speculative_specified.deductions_allowable.section_40_preceding_year" form={form} />
                            <NumberInput label="31. Any amount disallowed under section 43B in any preceding previous year but allowable during the previous year (10i of Part A-OI)" name="business_profession_other_than_speculative_specified.deductions_allowable.section_43b_preceding_year" form={form} />
                            <NumberInput label="32. Any other amount allowable as deduction" name="business_profession_other_than_speculative_specified.deductions_allowable.any_other_amount" form={form} />
                            <NumberInput label="33. Decrease in profit or increase in loss on account of ICDS adjustments and deviation in method of valuation of stock (Column 3b + 4e of Part A-OI)" name="business_profession_other_than_speculative_specified.deductions_allowable.decrease_profit_icds" form={form} />
                            <NumberInput label="34. Total (27+28+29+30+31+32+33)" name="business_profession_other_than_speculative_specified.deductions_allowable.total_deductions" form={form} />
                        </div>

                        <NumberInput label="35. Income (13+26-34)" name="business_profession_other_than_speculative_specified.income_business_profession" form={form} />

                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-2">36. Profits and gains of business or profession deemed to be under -</h4>
                            <NumberInput label="i. Section 44AE (61(ii) of schedule P&L )" name="business_profession_other_than_speculative_specified.profits_gains_deemed_under_sections.section_44ae" form={form} />
                            <NumberInput label="ii. Section 44B" name="business_profession_other_than_speculative_specified.profits_gains_deemed_under_sections.section_44b" form={form} />
                            <NumberInput label="iii. Section 44BB" name="business_profession_other_than_speculative_specified.profits_gains_deemed_under_sections.section_44bb" form={form} />
                            <NumberInput label="iv. Section 44BBA" name="business_profession_other_than_speculative_specified.profits_gains_deemed_under_sections.section_44bba" form={form} />
                            <NumberInput label="va. Section 44BBB" name="business_profession_other_than_speculative_specified.profits_gains_deemed_under_sections.section_44bbb" form={form} />
                            <NumberInput label="vb. Section 44BBC" name="business_profession_other_than_speculative_specified.profits_gains_deemed_under_sections.section_44bbc" form={form} />
                            <NumberInput label="vi. Section 44D" name="business_profession_other_than_speculative_specified.profits_gains_deemed_under_sections.section_44d" form={form} />
                            <NumberInput label="vii. Section 44DA" name="business_profession_other_than_speculative_specified.profits_gains_deemed_under_sections.section_44da" form={form} />
                            <NumberInput label="viii. Chapter-XII-G (tonnage)" name="business_profession_other_than_speculative_specified.profits_gains_deemed_under_sections.chapter_xii_g" form={form} />
                            <NumberInput label="ix. First Schedule of Income-tax Act (other than 115B)" name="business_profession_other_than_speculative_specified.profits_gains_deemed_under_sections.first_schedule_other_than_115b" form={form} />
                            <NumberInput label="x. Total (36i to 36ix)" name="business_profession_other_than_speculative_specified.profits_gains_deemed_under_sections.total" form={form} />
                        </div>

                        <NumberInput label="37. Net profit or loss from business or profession other than speculative and specified business (36+36x)" name="business_profession_other_than_speculative_specified.net_profit_loss_business_profession" form={form} />
                    </div>
                </Section>

                {/* B. Speculative Business */}
                <Section title="B. Speculative Business" expanded={expanded.partB} onToggle={() => toggle('partB')}>
                    <div className="space-y-4">
                        <NumberInput label="38. Net Profit or loss from business or profession other than speculative business and specified business after applying rule 7A, 7B or 8, if applicable (If rule 7A, 7B or 8 is not applicable, enter same figure as in 37) (If loss take the figure to 2i of item F) (38a+ 38b + 38c + 38d + 38e + 38f)" name="speculative_business.net_profit_loss_speculative" form={form} />
                        <div className="bg-gray-50 p-4 rounded">
                            <NumberInput label="a. Income chargeable under Rule 7" name="speculative_business.income_chargeable_rule_7_etc.income_chargeable" form={form} />
                            <NumberInput label="b. Deemed income chargeable under Rule 7A" name="speculative_business.income_chargeable_rule_7_etc.deemed_income_rule_7a" form={form} />
                            <NumberInput label="c. Deemed income chargeable under Rule 7B(1)" name="speculative_business.income_chargeable_rule_7_etc.deemed_income_rule_7b_1" form={form} />
                            <NumberInput label="d. Deemed income chargeable under Rule 7B(1A)" name="speculative_business.income_chargeable_rule_7_etc.deemed_income_rule_7b_1a" form={form} />
                            <NumberInput label="e. Deemed income chargeable under Rule 8" name="speculative_business.income_chargeable_rule_7_etc.deemed_income_rule_8" form={form} />
                            <NumberInput label="f. Income other than Rule 7A, 7B & 8 (Item No. 37)" name="speculative_business.income_chargeable_rule_7_etc.income_other_than_rule_7a_etc" form={form} />
                        </div>
                        <NumberInput label="39. Balance of income deemed to be from agriculture, after applying Rule 7, 7A, 7B(1), 7B(1A) and Rule 8 for the purpose of aggregation of income as per Finance Act [4c-(38a+38b+38c+38d+38e)]" name="speculative_business.balance_income_deemed_agriculture" form={form} />
                        <NumberInput label="40. Net profit or loss from speculative business as per profit or loss account" name="speculative_business.net_profit_loss_speculative_business" form={form} />
                        <NumberInput label="41. Additions in accor7dance with section 28 to 44DB" name="speculative_business.additions_accordance_28_to_44db" form={form} />
                        <NumberInput label="42. Deductions in accordance with section 28 to 44DB" name="speculative_business.deductions_accordance_28_to_44db" form={form} />
                        <NumberInput label="43. Income from speculative business (40+41-42) (if loss, take the figure to 6xvii of schedule CFL)" name="speculative_business.income_speculative_business" form={form} />
                    </div>
                </Section>

                {/* C. Specified Business */}
                <Section title="C. Computation of income from specified business under section 35AD" expanded={expanded.partC} onToggle={() => toggle('partC')}>
                    <div className="space-y-4">
                        <NumberInput label="44. Net profit or loss from specified business as per profit or loss account" name="specified_business.net_profit_loss_specified" form={form} />
                        <NumberInput label="45. Additions in accordance with section 28 to 44DB" name="specified_business.additions_accordance_28_to_44db" form={form} />
                        <NumberInput label="46. Deductions in accordance with section 28 to 44DB (other than deduction under section,- (i) 35AD, (ii) 32 or 35 on which deduction u/s 35AD is claimed)" name="specified_business.deductions_accordance_28_to_44db_other_than_35ad" form={form} />
                        <NumberInput label="47. Profit or loss from specified business (44+45-46)" name="specified_business.profit_loss_specified_business" form={form} />
                        <NumberInput label="48. Deductions in accordance with section 35AD(1)" name="specified_business.deductions_accordance_35ad_1" form={form} />
                        <NumberInput label="49. Income from Specified Business) (47-48 )(if loss, take the figure to 7xvii of schedule CFL)" name="specified_business.income_specified_business" form={form} />
                        <TextInput label="50. Relevant clause of sub-section (5) of section 35AD which covers the specified business (to be selected from drop down menu)" name="specified_business.relevant_clause_35ad_5" form={form} />
                    </div>
                </Section>

                {/* D. Income Chargeable */}
                <Section title="D. Income chargeable under the head 'Profits and gains from business or profession' (A38+B43+C49)" expanded={expanded.partD} onToggle={() => toggle('partD')}>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <NumberInput label="D. Income chargeable under the head 'Profits and gains from business or profession' (A38+B43+C49)" name="income_chargeable_head_profits_gains" form={form} />
                    </div>
                </Section>

                {/* E. Intra head set off */}
                <Section title="E. Intra head set off of business loss of current year" expanded={expanded.partE} onToggle={() => toggle('partE')}>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sl.</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type of Business income</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Income of current year (Fill this column only if figure is zero or positive) (1)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business loss set off (2)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business income remaining after set off (3) = (1) - (2)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">i</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Loss to be set off (Fill this row only if figure is</td>
                                    <td className="px-6 py-4 whitespace-nowrap bg-gray-100"></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">(A38)</td>
                                    <td className="px-6 py-4 whitespace-nowrap bg-gray-100"></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ii</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Income from speculative</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">(B43)</td>
                                    <td className="px-6 py-4 whitespace-nowrap"><NumberInput label="" name="intra_head_set_off.speculative_income.loss_set_off" form={form} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><NumberInput label="" name="intra_head_set_off.speculative_income.income_remaining" form={form} /></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">iii</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Income from specified</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">(C49)</td>
                                    <td className="px-6 py-4 whitespace-nowrap"><NumberInput label="" name="intra_head_set_off.specified_income.loss_set_off" form={form} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><NumberInput label="" name="intra_head_set_off.specified_income.income_remaining" form={form} /></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">iv</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Income from Life Insurance business u/s 115B</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">(4b)</td>
                                    <td className="px-6 py-4 whitespace-nowrap"><NumberInput label="" name="intra_head_set_off.life_insurance_income.loss_set_off" form={form} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><NumberInput label="" name="intra_head_set_off.life_insurance_income.income_remaining" form={form} /></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">iva</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Income of Foreign Company from eligible business of selling raw diamonds (refer rule 10TIA)</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">(4d)</td>
                                    <td className="px-6 py-4 whitespace-nowrap bg-gray-300"></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><NumberInput label="" name="intra_head_set_off.foreign_company_income.income_remaining" form={form} /></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">v</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total loss set off (ii + iii)</td>
                                    <td className="px-6 py-4 whitespace-nowrap"><NumberInput label="" name="intra_head_set_off.total_loss_set_off" form={form} /></td>
                                    <td className="px-6 py-4 whitespace-nowrap bg-gray-300"></td>
                                    <td className="px-6 py-4 whitespace-nowrap bg-gray-300"></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">vi</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Loss remaining after set off (i - v)</td>
                                    <td className="px-6 py-4 whitespace-nowrap bg-gray-100"></td>
                                    <td className="px-6 py-4 whitespace-nowrap bg-gray-300"></td>
                                    <td className="px-6 py-4 whitespace-nowrap"><NumberInput label="" name="intra_head_set_off.loss_remaining_after_set_off" form={form} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Section>
            </div>
        </div>
    );
};

export default Itr7ScheduleBP;
