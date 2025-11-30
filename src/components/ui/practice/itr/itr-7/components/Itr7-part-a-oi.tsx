import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7PartAOIData } from './itr-7-part-a-oi.types.ts';

export interface Itr7PartAOIProps {
    form: UseFormReturn<ITR7PartAOIData>;
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
    form: UseFormReturn<ITR7PartAOIData>;
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

const RadioInput: React.FC<{
    label: string;
    name: any;
    options: { label: string; value: string | boolean }[];
    form: UseFormReturn<ITR7PartAOIData>;
}> = ({ label, name, options, form }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="flex gap-4">
            {options.map((option) => (
                <label key={String(option.value)} className="flex items-center gap-2">
                    <input
                        type="radio"
                        value={String(option.value)}
                        {...form.register(name)}
                        className="h-4 w-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                </label>
            ))}
        </div>
    </div>
);

const Itr7PartAOI: React.FC<Itr7PartAOIProps> = ({ form }) => {
    const [expanded, setExpanded] = React.useState<{ [key: string]: boolean }>({
        accounting: true,
        closingStock: true,
        amountsNotCredited: true,
        amountsDebited36: true,
        amountsDebited37: true,
        amountsDebited40: true,
        amountsDebited40A: true,
        amountsDisallowed43B: true,
        outstandingCredit: true,
        otherInformation: true,
    });

    const toggle = (key: string) => setExpanded((s) => ({ ...s, [key]: !s[key] }));

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Part A - OI: Other Information</h2>

                {/* 1-3. Accounting Method */}
                <Section title="Method of Accounting" expanded={expanded.accounting} onToggle={() => toggle('accounting')}>
                    <div className="space-y-4">
                        <RadioInput
                            label="1. Method of accounting employed in the previous year"
                            name="method_of_accounting"
                            options={[
                                { label: 'Mercantile', value: 'mercantile' },
                                { label: 'Cash', value: 'cash' },
                            ]}
                            form={form}
                        />
                        <RadioInput
                            label="2. Is there any change in method of accounting?"
                            name="change_in_method_of_accounting"
                            options={[
                                { label: 'Yes', value: 'true' },
                                { label: 'No', value: 'false' },
                            ]}
                            form={form}
                        />
                        <NumberInput
                            label="3a. Increase in the profit or decrease in loss because of deviation, if any, as per Income Computation Disclosure Standards notified under section 145(2) [column XI(3) of Schedule ICDS]"
                            name="icds_deviation_increase_profit"
                            form={form}
                        />
                        <NumberInput
                            label="3b. Decrease in the profit or increase in loss because of deviation, if any, as per Income Computation Disclosure Standards notified under section 145(2) [column XI(4) of Schedule ICDS]"
                            name="icds_deviation_decrease_profit"
                            form={form}
                        />
                    </div>
                </Section>

                {/* 4. Closing Stock Valuation */}
                <Section title="4. Method of valuation of closing stock" expanded={expanded.closingStock} onToggle={() => toggle('closingStock')}>
                    <div className="space-y-4">
                        <RadioInput
                            label="a. Raw Material (if at cost or market rates whichever is less write 1, if at cost write 2, if at market rate write 3)"
                            name="closing_stock_valuation_method.raw_material"
                            options={[
                                { label: '1', value: '1' },
                                { label: '2', value: '2' },
                                { label: '3', value: '3' },
                            ]}
                            form={form}
                        />
                        <RadioInput
                            label="b. Finished goods (if at cost or market rates whichever is less write 1, if at cost write 2, if at market rate write 3)"
                            name="closing_stock_valuation_method.finished_goods"
                            options={[
                                { label: '1', value: '1' },
                                { label: '2', value: '2' },
                                { label: '3', value: '3' },
                            ]}
                            form={form}
                        />
                        <RadioInput
                            label="c. Is there any change in stock valuation method?"
                            name="closing_stock_valuation_method.change_in_method"
                            options={[
                                { label: 'Yes', value: 'true' },
                                { label: 'No', value: 'false' },
                            ]}
                            form={form}
                        />
                        <NumberInput
                            label="d. Increase in the profit or decrease in loss because of deviation, if any, from the method of valuation specified under section 145A"
                            name="closing_stock_valuation_method.increase_profit_deviation"
                            form={form}
                        />
                        <NumberInput
                            label="e. Decrease in the profit or increase in loss because of deviation, if any, from the method of valuation specified under section 145A"
                            name="closing_stock_valuation_method.decrease_profit_deviation"
                            form={form}
                        />
                    </div>
                </Section>

                {/* 5. Amounts not credited to P&L */}
                <Section title="5. Amounts not credited to the profit and loss account" expanded={expanded.amountsNotCredited} onToggle={() => toggle('amountsNotCredited')}>
                    <div className="space-y-4">
                        <NumberInput label="a. Items falling within the scope of section 28" name="amounts_not_credited_to_pl.section_28_items" form={form} />
                        <NumberInput label="b. Proforma credits, drawbacks, refund of duty of customs/excise/service tax/sales tax/VAT/GST" name="amounts_not_credited_to_pl.proforma_credits" form={form} />
                        <NumberInput label="c. Escalation claims accepted during the previous year" name="amounts_not_credited_to_pl.escalation_claims" form={form} />
                        <NumberInput label="d. Any other item of income" name="amounts_not_credited_to_pl.other_income" form={form} />
                        <NumberInput label="e. Capital receipt, if any" name="amounts_not_credited_to_pl.capital_receipt" form={form} />
                        <NumberInput label="f. Total (5a to 5e)" name="amounts_not_credited_to_pl.total" form={form} />
                    </div>
                </Section>

                {/* 6. Amounts debited to P&L (u/s 36) */}
                <Section title="6. Amounts debited to P&L disallowable u/s 36" expanded={expanded.amountsDebited36} onToggle={() => toggle('amountsDebited36')}>
                    <div className="space-y-4">
                        <NumberInput label="a. Premium paid for insurance against risk of damage or destruction of stocks or store [36(1)(i)]" name="amounts_debited_to_pl_disallowable_u_s_36.insurance_premium_stock" form={form} />
                        <NumberInput label="b. Premium paid for insurance on the health of employees [36(1)(ib)]" name="amounts_debited_to_pl_disallowable_u_s_36.insurance_premium_health" form={form} />
                        <NumberInput label="c. Bonus or commission to employees otherwise payable as profits/dividend [36(1)(ii)]" name="amounts_debited_to_pl_disallowable_u_s_36.bonus_commission_employees" form={form} />
                        <NumberInput label="d. Interest paid in respect of borrowed capital [36(1)(iii)]" name="amounts_debited_to_pl_disallowable_u_s_36.interest_borrowed_capital" form={form} />
                        <NumberInput label="e. Discount on a zero-coupon bond [36(1)(iiia)]" name="amounts_debited_to_pl_disallowable_u_s_36.discount_zero_coupon_bond" form={form} />
                        <NumberInput label="f. Contributions to a recognised provident fund [36(1)(iv)]" name="amounts_debited_to_pl_disallowable_u_s_36.pf_contribution" form={form} />
                        <NumberInput label="g. Contributions to an approved superannuation fund [36(1)(iv)]" name="amounts_debited_to_pl_disallowable_u_s_36.superannuation_fund_contribution" form={form} />
                        <NumberInput label="h. Contribution to a pension scheme referred to in section 80CCD [36(1)(iva)]" name="amounts_debited_to_pl_disallowable_u_s_36.pension_scheme_contribution" form={form} />
                        <NumberInput label="i. Contributions to an approved gratuity fund [36(1)(v)]" name="amounts_debited_to_pl_disallowable_u_s_36.gratuity_fund_contribution" form={form} />
                        <NumberInput label="j. Contributions to any other fund" name="amounts_debited_to_pl_disallowable_u_s_36.other_fund_contribution" form={form} />
                        <NumberInput label="k. Sum received from employees as contribution to any fund not credited to employees account on/before due date [36(1)(va)]" name="amounts_debited_to_pl_disallowable_u_s_36.employee_contribution_pf_superannuation" form={form} />
                        <NumberInput label="l. Bad and doubtful debts [36(1)(vii)]" name="amounts_debited_to_pl_disallowable_u_s_36.bad_doubtful_debts" form={form} />
                        <NumberInput label="m. Provision for bad and doubtful debts [36(1)(viia)]" name="amounts_debited_to_pl_disallowable_u_s_36.provision_bad_doubtful_debts" form={form} />
                        <NumberInput label="n. Amount transferred to any special reserve [36(1)(viii)]" name="amounts_debited_to_pl_disallowable_u_s_36.transfer_special_reserve" form={form} />
                        <NumberInput label="o. Expenditure for promoting family planning amongst employees [36(1)(ix)]" name="amounts_debited_to_pl_disallowable_u_s_36.family_planning_expenditure" form={form} />
                        <NumberInput label="p. Securities transaction tax paid [36(1)(xv)]" name="amounts_debited_to_pl_disallowable_u_s_36.securities_transaction_tax" form={form} />
                        <NumberInput label="q. Marked to market loss or other expected loss as per ICDS [36(1)(xviii)]" name="amounts_debited_to_pl_disallowable_u_s_36.marked_to_market_loss" form={form} />
                        <NumberInput label="r. Any other disallowance" name="amounts_debited_to_pl_disallowable_u_s_36.other_disallowance" form={form} />
                        <NumberInput label="s. Total amount disallowable under section 36 (total of 6a to 6r)" name="amounts_debited_to_pl_disallowable_u_s_36.total" form={form} />

                        <div className="bg-gray-50 p-4 rounded mt-4">
                            <h4 className="font-medium mb-2">t. Total number of employees (mandatory if recognized Provident Fund)</h4>
                            <NumberInput label="i. Deployed in India" name="amounts_debited_to_pl_disallowable_u_s_36.total_employees.deployed_in_india" form={form} />
                            <NumberInput label="ii. Deployed outside India" name="amounts_debited_to_pl_disallowable_u_s_36.total_employees.deployed_outside_india" form={form} />
                            <NumberInput label="iii. Total" name="amounts_debited_to_pl_disallowable_u_s_36.total_employees.total" form={form} />
                        </div>
                    </div>
                </Section>

                {/* 7. Amounts debited to P&L (u/s 37) */}
                <Section title="7. Amounts debited to P&L disallowable u/s 37" expanded={expanded.amountsDebited37} onToggle={() => toggle('amountsDebited37')}>
                    <div className="space-y-4">
                        <NumberInput label="a. Expenditure of capital nature [37(1)]" name="amounts_debited_to_pl_disallowable_u_s_37.capital_expenditure" form={form} />
                        <NumberInput label="b. Expenditure of personal nature [37(1)]" name="amounts_debited_to_pl_disallowable_u_s_37.personal_expenditure" form={form} />
                        <NumberInput label="c. Expenditure NOT for the purpose of business or profession [37(1)]" name="amounts_debited_to_pl_disallowable_u_s_37.non_business_expenditure" form={form} />
                        <NumberInput label="d. Expenditure on advertisement in souvenir etc. of political party [37(2B)]" name="amounts_debited_to_pl_disallowable_u_s_37.political_party_advertisement" form={form} />
                        <NumberInput label="e. Penalty or fine for violation of any law" name="amounts_debited_to_pl_disallowable_u_s_37.penalty_fine_violation_law" form={form} />
                        <NumberInput label="f. Any other penalty or fine" name="amounts_debited_to_pl_disallowable_u_s_37.other_penalty_fine" form={form} />
                        <NumberInput label="g. Expenditure for any purpose which is an offence or prohibited by law" name="amounts_debited_to_pl_disallowable_u_s_37.offence_prohibited_law_expenditure" form={form} />
                        <NumberInput label="h. Expenditure incurred on CSR" name="amounts_debited_to_pl_disallowable_u_s_37.csr_expenditure" form={form} />
                        <NumberInput label="i. Amount of any liability of a contingent nature" name="amounts_debited_to_pl_disallowable_u_s_37.contingent_liability" form={form} />
                        <NumberInput label="j. Any other amount not allowable under section 37" name="amounts_debited_to_pl_disallowable_u_s_37.other_amount" form={form} />
                        <NumberInput label="k. Total amount disallowable under section 37 (total of 7a to 7j)" name="amounts_debited_to_pl_disallowable_u_s_37.total" form={form} />
                    </div>
                </Section>

                {/* 8. Amounts debited to P&L (u/s 40) */}
                <Section title="8. Amounts debited to P&L disallowable u/s 40" expanded={expanded.amountsDebited40} onToggle={() => toggle('amountsDebited40')}>
                    <div className="space-y-4">
                        <h4 className="font-semibold">A. Amounts debited to the profit and loss account, to the extent disallowable under section 40</h4>
                        <NumberInput label="a. Disallowable u/s 40(a)(i) (Non-compliance Chapter XVII-B)" name="amounts_debited_to_pl_disallowable_u_s_40.non_compliance_xvii_b_40_a_i" form={form} />
                        <NumberInput label="b. Disallowable u/s 40(a)(ia) (Non-compliance Chapter XVII-B)" name="amounts_debited_to_pl_disallowable_u_s_40.non_compliance_xvii_b_40_a_ia" form={form} />
                        <NumberInput label="c. Disallowable u/s 40(a)(ib) (Non-compliance Chapter VIII Finance Act 2016)" name="amounts_debited_to_pl_disallowable_u_s_40.non_compliance_viii_finance_act_2016" form={form} />
                        <NumberInput label="d. Disallowable u/s 40(a)(iii) (Non-compliance Chapter XVII-B)" name="amounts_debited_to_pl_disallowable_u_s_40.non_compliance_xvii_b_40_a_iii" form={form} />
                        <NumberInput label="e. Tax or rate levied or assessed on the basis of profits [40(a)(ii)]" name="amounts_debited_to_pl_disallowable_u_s_40.tax_on_profits" form={form} />
                        <NumberInput label="f. Amount paid as wealth tax [40(a)(iia)]" name="amounts_debited_to_pl_disallowable_u_s_40.wealth_tax" form={form} />
                        <NumberInput label="g. Amount paid by way of royalty, license fee, service fee etc. [40(a)(iib)]" name="amounts_debited_to_pl_disallowable_u_s_40.royalty_license_fee" form={form} />
                        <NumberInput label="h. Interest, salary, bonus, commission or remuneration to partner/member [40(b)/40(ba)]" name="amounts_debited_to_pl_disallowable_u_s_40.salary_interest_partner" form={form} />
                        <NumberInput label="i. Any other disallowance" name="amounts_debited_to_pl_disallowable_u_s_40.other_disallowance" form={form} />
                        <NumberInput label="j. Total amount disallowable under section 40 (total of Aa to Ai)" name="amounts_debited_to_pl_disallowable_u_s_40.total" form={form} />

                        <div className="pt-4 border-t">
                            <NumberInput label="B. Any amount disallowed under section 40 in any preceding previous year but allowable during the previous year" name="disallowed_u_s_40_preceding_year_allowable" form={form} />
                        </div>
                    </div>
                </Section>

                {/* 9. Amounts debited to P&L (u/s 40A) */}
                <Section title="9. Amounts debited to P&L disallowable u/s 40A" expanded={expanded.amountsDebited40A} onToggle={() => toggle('amountsDebited40A')}>
                    <div className="space-y-4">
                        <NumberInput label="a. Amounts paid to persons specified in section 40A(2)(b)" name="amounts_debited_to_pl_disallowable_u_s_40a.payment_to_specified_persons" form={form} />
                        <NumberInput label="b. Amount paid otherwise than by account payee cheque/draft/ECS [40A(3)]" name="amounts_debited_to_pl_disallowable_u_s_40a.payment_otherwise_than_account_payee" form={form} />
                        <NumberInput label="c. Provision for payment of gratuity [40A(7)]" name="amounts_debited_to_pl_disallowable_u_s_40a.provision_gratuity" form={form} />
                        <NumberInput label="d. Contribution to any fund, trust, company, AOP, BOI, etc. [40A(9)]" name="amounts_debited_to_pl_disallowable_u_s_40a.contribution_fund_trust" form={form} />
                        <NumberInput label="e. Any other disallowance" name="amounts_debited_to_pl_disallowable_u_s_40a.other_disallowance" form={form} />
                        <NumberInput label="f. Total amount disallowable under section 40A (Total of 9a to 9e)" name="amounts_debited_to_pl_disallowable_u_s_40a.total" form={form} />
                    </div>
                </Section>

                {/* 10. Disallowed u/s 43B in preceding year but allowable now */}
                <Section title="10. Disallowed u/s 43B in preceding year but allowable now" expanded={expanded.amountsDisallowed43B} onToggle={() => toggle('amountsDisallowed43B')}>
                    <div className="space-y-4">
                        <NumberInput label="a. Any sum in the nature of tax, duty, cess or fee under any law" name="disallowed_u_s_43b_preceding_year_allowable.tax_duty_cess" form={form} />
                        <NumberInput label="b. Any sum payable by way of contribution to any provident fund or superannuation fund or gratuity fund or any other fund for the welfare of employees" name="disallowed_u_s_43b_preceding_year_allowable.contribution_pf_superannuation_gratuity" form={form} />
                        <NumberInput label="c. Any sum payable to an employee as bonus or commission for services rendered" name="disallowed_u_s_43b_preceding_year_allowable.bonus_commission_employees" form={form} />
                        <NumberInput label="d. Any sum payable as interest on any loan or borrowing from any public financial institution or a State financial corporation or a State Industrial investment corporation" name="disallowed_u_s_43b_preceding_year_allowable.interest_loan_public_financial_institution" form={form} />
                        <NumberInput label="da. Any sum payable as interest on any loan or borrowing from such class of non-banking financial companies as may be notified by the Central Government, in accordance with the terms and conditions of the agreement governing such loan or borrowing" name="disallowed_u_s_43b_preceding_year_allowable.interest_loan_nbfc" form={form} />
                        <NumberInput label="e. Any sum payable as interest on any loan or borrowing from any scheduled bank or a co-operative bank other than a primary agricultural credit society or a primary co-operative agricultural and rural development bank" name="disallowed_u_s_43b_preceding_year_allowable.interest_loan_scheduled_bank" form={form} />
                        <NumberInput label="f. Any sum payable towards leave encashment" name="disallowed_u_s_43b_preceding_year_allowable.leave_encashment" form={form} />
                        <NumberInput label="g. Any sum payable to the Indian Railways for the use of railway assets" name="disallowed_u_s_43b_preceding_year_allowable.payment_railways" form={form} />
                        <NumberInput label="h. Any sum payable to a micro or small enterprise beyond the time limit specified in section 15 of the Micro, Small and Medium Enterprises Development Act, 2006" name="disallowed_u_s_43b_preceding_year_allowable.payment_msme" form={form} />
                        <NumberInput label="i. Total amount allowable under section 43B (total of 10a to 10h)" name="disallowed_u_s_43b_preceding_year_allowable.total" form={form} />
                    </div>
                </Section>

                {/* 11. Debited to P&L but disallowable u/s 43B */}
                <Section title="11. Debited to P&L but disallowable u/s 43B" expanded={expanded.amountsDisallowed43B} onToggle={() => toggle('amountsDisallowed43B')}>
                    <div className="space-y-4">
                        <NumberInput label="a. Any sum in the nature of tax, duty, cess or fee under any law" name="debited_to_pl_disallowable_u_s_43b.tax_duty_cess" form={form} />
                        <NumberInput label="b. Any sum payable by way of contribution to any provident fund or superannuation fund or gratuity fund or any other fund for the welfare of employees" name="debited_to_pl_disallowable_u_s_43b.contribution_pf_superannuation_gratuity" form={form} />
                        <NumberInput label="c. Any sum payable to an employee as bonus or commission for services rendered" name="debited_to_pl_disallowable_u_s_43b.bonus_commission_employees" form={form} />
                        <NumberInput label="d. Any sum payable as interest on any loan or borrowing from any public financial institution or a State financial corporation or a State Industrial investment corporation" name="debited_to_pl_disallowable_u_s_43b.interest_loan_public_financial_institution" form={form} />
                        <NumberInput label="da. Any sum payable as interest on any loan or borrowing from such class of non-banking financial companies as may be notified by the Central Government, in accordance with the terms and conditions of the agreement governing such loan or borrowing" name="debited_to_pl_disallowable_u_s_43b.interest_loan_nbfc" form={form} />
                        <NumberInput label="e. Any sum payable as interest on any loan or borrowing from any scheduled bank or a co-operative bank other than a primary agricultural credit society or a primary co-operative agricultural and rural development bank" name="debited_to_pl_disallowable_u_s_43b.interest_loan_scheduled_bank" form={form} />
                        <NumberInput label="f. Any sum payable towards leave encashment" name="debited_to_pl_disallowable_u_s_43b.leave_encashment" form={form} />
                        <NumberInput label="g. Any sum payable to the Indian Railways for the use of railway assets" name="debited_to_pl_disallowable_u_s_43b.payment_railways" form={form} />
                        <NumberInput label="h. Any sum payable to a micro or small enterprise beyond the time limit specified in section 15 of the Micro, Small and Medium Enterprises Development Act, 2006" name="debited_to_pl_disallowable_u_s_43b.payment_msme" form={form} />
                        <NumberInput label="i. Total amount disallowable under Section 43B (total of 11a to 11h)" name="debited_to_pl_disallowable_u_s_43b.total" form={form} />
                    </div>
                </Section>

                {/* 12. Outstanding Credit */}
                <Section title="12. Amount of credit outstanding" expanded={expanded.outstandingCredit} onToggle={() => toggle('outstandingCredit')}>
                    <div className="space-y-4">
                        <NumberInput label="a. Union Excise Duty" name="credit_outstanding.union_excise_duty" form={form} />
                        <NumberInput label="b. Service tax" name="credit_outstanding.service_tax" form={form} />
                        <NumberInput label="c. VAT/sales tax" name="credit_outstanding.vat_sales_tax" form={form} />
                        <NumberInput label="d. Central Goods & Service Tax (CGST)" name="credit_outstanding.cgst" form={form} />
                        <NumberInput label="e. State Goods & Services Tax (SGST)" name="credit_outstanding.sgst" form={form} />
                        <NumberInput label="f. Integrated Goods & Services Tax (IGST)" name="credit_outstanding.igst" form={form} />
                        <NumberInput label="g. Union Territory Goods & Services Tax (UTGST)" name="credit_outstanding.utgst" form={form} />
                        <NumberInput label="h. Any other tax" name="credit_outstanding.other_tax" form={form} />
                        <NumberInput label="i. Total amount outstanding (total of 12a to 12h)" name="credit_outstanding.total" form={form} />
                    </div>
                </Section>

                {/* 13-17. Other Information */}
                <Section title="Other Information" expanded={expanded.otherInformation} onToggle={() => toggle('otherInformation')}>
                    <div className="space-y-4">
                        <NumberInput label="13. Amounts deemed to be profits and gains under section 33AB or 33ABA or 33AC" name="deemed_profits_u_s_33ab_33aba_33ac" form={form} />
                        <NumberInput label="14. Any amount of profit chargeable to tax under section 41" name="profit_chargeable_u_s_41" form={form} />
                        <NumberInput label="15. Amount of income or expenditure of prior period credited or debited to the profit and loss account (net)" name="prior_period_income_expenditure" form={form} />
                        <NumberInput label="16. Amount of expenditure disallowed u/s 14A" name="expenditure_disallowed_u_s_14a" form={form} />
                        <RadioInput
                            label="17. Whether assessee is exercising option under subsection 2A of section 92CE"
                            name="exercising_option_u_s_92ce"
                            options={[
                                { label: 'Yes', value: 'true' },
                                { label: 'No', value: 'false' },
                            ]}
                            form={form}
                        />
                    </div>
                </Section>
            </div>
        </div>
    );
};

export default Itr7PartAOI;
