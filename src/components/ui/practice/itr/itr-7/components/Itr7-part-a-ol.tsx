import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7PartAOLData } from './itr-7-part-a-ol.types.ts';

export interface Itr7PartAOLProps {
    form: UseFormReturn<ITR7PartAOLData>;
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
    form: UseFormReturn<ITR7PartAOLData>;
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
    form: UseFormReturn<ITR7PartAOLData>;
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

const Itr7PartAOL: React.FC<Itr7PartAOLProps> = ({ form }) => {
    const [expanded, setExpanded] = React.useState<{ [key: string]: boolean }>({
        openingBalance: true,
        receipts: true,
        payments: true,
        closingBalance: true,
    });

    const toggle = (key: string) => setExpanded((s) => ({ ...s, [key]: !s[key] }));

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Part A - OL: Receipt and payment account of company under liquidation</h2>

                {/* 1. Opening balance */}
                <Section title="1. Opening balance" expanded={expanded.openingBalance} onToggle={() => toggle('openingBalance')}>
                    <div className="space-y-4">
                        <NumberInput label="i. Cash in hand" name="opening_balance.cash_in_hand" form={form} />
                        <NumberInput label="ii. Bank" name="opening_balance.bank" form={form} />
                        <NumberInput label="iii. Total opening balance" name="opening_balance.total" form={form} />
                    </div>
                </Section>

                {/* 2. Receipts */}
                <Section title="2. Receipts" expanded={expanded.receipts} onToggle={() => toggle('receipts')}>
                    <div className="space-y-4">
                        <NumberInput label="i. Interest" name="receipts.interest" form={form} />
                        <NumberInput label="ii. Dividend" name="receipts.dividend" form={form} />

                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-2">iii. Sale of assets (pls. specify nature and amount)</h4>
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                <TextInput label="a. Nature" name="receipts.sale_of_assets.nature_amount_a.nature" form={form} />
                                <NumberInput label="Amount" name="receipts.sale_of_assets.nature_amount_a.amount" form={form} />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                <TextInput label="b. Nature" name="receipts.sale_of_assets.nature_amount_b.nature" form={form} />
                                <NumberInput label="Amount" name="receipts.sale_of_assets.nature_amount_b.amount" form={form} />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                <TextInput label="c. Nature" name="receipts.sale_of_assets.nature_amount_c.nature" form={form} />
                                <NumberInput label="Amount" name="receipts.sale_of_assets.nature_amount_c.amount" form={form} />
                            </div>
                            <NumberInput label="d. Total (iiia + iiib + iiic)" name="receipts.sale_of_assets.total" form={form} />
                        </div>

                        <NumberInput label="iv. Realisation of dues/debtors" name="receipts.realisation_of_dues" form={form} />

                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-2">v. Others (pls. specify whether revenue/capital, nature and amount)</h4>
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                <TextInput label="a. Nature" name="receipts.others.nature_amount_a.nature" form={form} />
                                <NumberInput label="Amount" name="receipts.others.nature_amount_a.amount" form={form} />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                <TextInput label="b. Nature" name="receipts.others.nature_amount_b.nature" form={form} />
                                <NumberInput label="Amount" name="receipts.others.nature_amount_b.amount" form={form} />
                            </div>
                            <NumberInput label="c. Total of other receipts (va + vb)" name="receipts.others.total" form={form} />
                        </div>

                        <NumberInput label="vi. Total receipts (2i + 2ii + 2iiid+ 2iv + 2vc)" name="receipts.total_receipts" form={form} />
                    </div>
                </Section>

                {/* 3. Total of opening balance and receipts */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <NumberInput label="3. Total of opening balance and receipts" name="total_opening_balance_receipts" form={form} />
                </div>

                {/* 4. Payments */}
                <Section title="4. Payments" expanded={expanded.payments} onToggle={() => toggle('payments')}>
                    <div className="space-y-4">
                        <NumberInput label="i. Repayment of secured loan" name="payments.repayment_secured_loan" form={form} />
                        <NumberInput label="ii. Repayment of unsecured loan" name="payments.repayment_unsecured_loan" form={form} />
                        <NumberInput label="iii. Repayment to creditors" name="payments.repayment_creditors" form={form} />
                        <NumberInput label="iv. Commission" name="payments.commission" form={form} />

                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-2">v. Others (pls. specify)</h4>
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                <TextInput label="a. Nature" name="payments.others.nature_amount_a.nature" form={form} />
                                <NumberInput label="Amount" name="payments.others.nature_amount_a.amount" form={form} />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                <TextInput label="b. Nature" name="payments.others.nature_amount_b.nature" form={form} />
                                <NumberInput label="Amount" name="payments.others.nature_amount_b.amount" form={form} />
                            </div>
                            <NumberInput label="c. Total of other payments (4va + 4vb)" name="payments.others.total" form={form} />
                        </div>

                        <NumberInput label="vi. Total payments (4i + 4ii + 4iii + 4iv + 4vc)" name="payments.total_payments" form={form} />
                    </div>
                </Section>

                {/* 5. Closing balance */}
                <Section title="5. Closing balance" expanded={expanded.closingBalance} onToggle={() => toggle('closingBalance')}>
                    <div className="space-y-4">
                        <NumberInput label="i. Cash in hand" name="closing_balance.cash_in_hand" form={form} />
                        <NumberInput label="ii. Bank" name="closing_balance.bank" form={form} />
                        <NumberInput label="iii. Total of closing balance (5i + 5ii)" name="closing_balance.total" form={form} />
                    </div>
                </Section>

                {/* 6. Total of closing balance and payments */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <NumberInput label="6. Total of closing balance and payments (4vi + 5iii)" name="total_closing_balance_payments" form={form} />
                </div>
            </div>
        </div>
    );
};

export default Itr7PartAOL;
