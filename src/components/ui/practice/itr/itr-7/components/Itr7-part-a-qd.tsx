import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7PartAQDData } from './itr-7-part-a-qd.types.ts';

export interface Itr7PartAQDProps {
    form: UseFormReturn<ITR7PartAQDData>;
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
    form: UseFormReturn<ITR7PartAQDData>;
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

const Itr7PartAQD: React.FC<Itr7PartAQDProps> = ({ form }) => {
    const [expanded, setExpanded] = React.useState<{ [key: string]: boolean }>({
        trading: true,
        manufacturing: true,
    });

    const toggle = (key: string) => setExpanded((s) => ({ ...s, [key]: !s[key] }));

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Part A - QD: Quantitative Details</h2>
                <p className="text-sm text-gray-500 mb-4">(mandatory, if liable for audit under section 44AB)</p>

                {/* (a) Trading concern */}
                <Section title="(a) In the case of a trading concern" expanded={expanded.trading} onToggle={() => toggle('trading')}>
                    <div className="space-y-4">
                        <NumberInput label="1. Opening stock" name="trading_concern.opening_stock" form={form} />
                        <NumberInput label="2. Purchase during the previous year" name="trading_concern.purchase_previous_year" form={form} />
                        <NumberInput label="3. Sales during the previous year" name="trading_concern.sales_previous_year" form={form} />
                        <NumberInput label="4. Closing stock" name="trading_concern.closing_stock" form={form} />
                        <NumberInput label="5. Shortage/ excess, if any" name="trading_concern.shortage_excess" form={form} />
                    </div>
                </Section>

                {/* (b) Manufacturing concern */}
                <Section title="(b) In the case of a manufacturing concern" expanded={expanded.manufacturing} onToggle={() => toggle('manufacturing')}>
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-4">6. Raw materials</h4>
                            <div className="space-y-4">
                                <NumberInput label="a. Opening stock" name="manufacturing_concern.raw_materials.opening_stock" form={form} />
                                <NumberInput label="b. Purchases during the previous year" name="manufacturing_concern.raw_materials.purchases_previous_year" form={form} />
                                <NumberInput label="c. Consumption during the previous year" name="manufacturing_concern.raw_materials.consumption_previous_year" form={form} />
                                <NumberInput label="d. Sales during the previous year" name="manufacturing_concern.raw_materials.sales_previous_year" form={form} />
                                <NumberInput label="e. Closing stock" name="manufacturing_concern.raw_materials.closing_stock" form={form} />
                                <NumberInput label="f. Yield finished products" name="manufacturing_concern.raw_materials.yield_finished_products" form={form} />
                                <NumberInput label="g. Percentage of yield" name="manufacturing_concern.raw_materials.percentage_yield" form={form} />
                                <NumberInput label="h. Shortage/ excess, if any" name="manufacturing_concern.raw_materials.shortage_excess" form={form} />
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-4">7. Finished products/ By-products</h4>
                            <div className="space-y-4">
                                <NumberInput label="a. Opening stock" name="manufacturing_concern.finished_products.opening_stock" form={form} />
                                <NumberInput label="b. Purchase during the previous year" name="manufacturing_concern.finished_products.purchase_previous_year" form={form} />
                                <NumberInput label="c. Quantity manufactured during the previous year" name="manufacturing_concern.finished_products.quantity_manufactured" form={form} />
                                <NumberInput label="d. Sales during the previous year" name="manufacturing_concern.finished_products.sales_previous_year" form={form} />
                                <NumberInput label="e. Closing stock" name="manufacturing_concern.finished_products.closing_stock" form={form} />
                                <NumberInput label="f. Shortage/ excess, if any" name="manufacturing_concern.finished_products.shortage_excess" form={form} />
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    );
};

export default Itr7PartAQD;
