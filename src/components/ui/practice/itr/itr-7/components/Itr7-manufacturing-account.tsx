import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7ManufacturingAccountData } from './itr-7-manufacturing-account.types.ts';

export interface Itr7ManufacturingAccountProps {
  form: UseFormReturn<ITR7ManufacturingAccountData>;
}

const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ title, children, isExpanded, onToggle }) => (
  <div className="border rounded-lg mb-4 overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 font-semibold flex items-center justify-between hover:from-blue-700 hover:to-blue-800 transition"
    >
      <span>{title}</span>
      <span className="text-xl">{isExpanded ? '−' : '+'}</span>
    </button>
    {isExpanded && (
      <div className="bg-white p-4 space-y-4">
        {children}
      </div>
    )}
  </div>
);

const NumberInput: React.FC<{
  label: string;
  name: keyof ITR7ManufacturingAccountData;
  form: UseFormReturn<ITR7ManufacturingAccountData>;
  required?: boolean;
  readonly?: boolean;
  hint?: string;
}> = ({ label, name, form, required, readonly, hint }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type="number"
      step="0.01"
      readOnly={readonly}
      className={`w-full border rounded px-3 py-2 ${readonly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
      {...form.register(name as any)}
    />
    {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
  </div>
);

const Itr7ManufacturingAccount: React.FC<Itr7ManufacturingAccountProps> = ({ form }) => {
  const [expandedSections, setExpandedSections] = React.useState<{ [key: string]: boolean }>({
    opening: true,
    purchases: false,
    wages: false,
    expenses: false,
    overheads: false,
    closing: false,
    summary: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="p-6 space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Manufacturing Account</h2>
        <p className="text-gray-600 text-sm">
          For the financial year 2024-25 (Fill items 1 to 3 in a case where regular books of account are maintained, otherwise fill items 61 to 62 as applicable)
        </p>
      </div>

      {/* 1. DEBITS TO MANUFACTURING ACCOUNT */}

      {/* A. Opening Inventory */}
      <Section
        title="A. Opening Inventory"
        isExpanded={expandedSections.opening}
        onToggle={() => toggleSection('opening')}
      >
        <div className="space-y-4">
          <NumberInput
            label="i Opening stock of raw-material"
            name="ma_opening_raw_material_i"
            form={form}
            hint="Denoted as 'i'"
          />
          <NumberInput
            label="ii Opening stock of Work in progress"
            name="ma_opening_work_in_progress_ii"
            form={form}
            hint="Denoted as 'ii'"
          />
          <div className="border-t pt-3">
            <NumberInput
              label="iii Total (i + ii)"
              name="ma_opening_inventory_total_iii"
              form={form}
              hint="Denoted as 'Aiii'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* B. Purchases */}
      <Section
        title="B. Purchases (net of refunds and duty or tax, if any)"
        isExpanded={expandedSections.purchases}
        onToggle={() => toggleSection('purchases')}
      >
        <NumberInput
          label="Amount"
          name="ma_purchases_net_b"
          form={form}
          hint="Denoted as 'B'"
        />
      </Section>

      {/* C. Direct Wages */}
      <Section
        title="C. Direct Wages"
        isExpanded={expandedSections.wages}
        onToggle={() => toggleSection('wages')}
      >
        <NumberInput
          label="Amount"
          name="ma_direct_wages_c"
          form={form}
          hint="Denoted as 'C'"
        />
      </Section>

      {/* D. Direct Expenses */}
      <Section
        title="D. Direct Expenses (Di + Dii + Diii)"
        isExpanded={expandedSections.expenses}
        onToggle={() => toggleSection('expenses')}
      >
        <div className="space-y-4">
          <NumberInput
            label="i Carriage inward"
            name="ma_direct_expenses_carriage_inward_i"
            form={form}
          />
          <NumberInput
            label="ii Power and fuel"
            name="ma_direct_expenses_power_fuel_ii"
            form={form}
          />
          <NumberInput
            label="iii Other direct expenses"
            name="ma_direct_expenses_other_iii"
            form={form}
          />
          <div className="border-t pt-3">
            <NumberInput
              label="Total (Di + Dii + Diii)"
              name="ma_direct_expenses_total_d"
              form={form}
              hint="Denoted as 'D'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* E. Factory Overheads */}
      <Section
        title="E. Factory Overheads"
        isExpanded={expandedSections.overheads}
        onToggle={() => toggleSection('overheads')}
      >
        <div className="space-y-4">
          <NumberInput
            label="i Indirect wages"
            name="ma_factory_overheads_indirect_wages_i"
            form={form}
          />
          <NumberInput
            label="ii Factory rent and rates"
            name="ma_factory_overheads_factory_rent_rates_ii"
            form={form}
          />
          <NumberInput
            label="iii Factory Insurance"
            name="ma_factory_overheads_factory_insurance_iii"
            form={form}
          />
          <NumberInput
            label="iv Factory fuel and power"
            name="ma_factory_overheads_factory_fuel_power_iv"
            form={form}
          />
          <NumberInput
            label="v Factory general expenses"
            name="ma_factory_overheads_factory_general_expenses_v"
            form={form}
          />
          <NumberInput
            label="vi Depreciation of factory machinery"
            name="ma_factory_overheads_depreciation_machinery_vi"
            form={form}
          />
          <div className="border-t pt-3">
            <NumberInput
              label="vii Total (F+ii+iii+iv+v+vi)"
              name="ma_factory_overheads_total_evii"
              form={form}
              hint="Denoted as 'Evii'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* F. Total of Debits */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200">
        <NumberInput
          label="F. Total of Debits to Manufacturing Account (Aiii+B+C+D+Evii)"
          name="ma_total_debits_1f"
          form={form}
          hint="Denoted as '1F'"
          readonly
        />
      </div>

      {/* 2. CLOSING STOCK */}
      <Section
        title="2. Closing Stock"
        isExpanded={expandedSections.closing}
        onToggle={() => toggleSection('closing')}
      >
        <div className="space-y-4">
          <NumberInput
            label="i Raw material"
            name="ma_closing_raw_material_2i"
            form={form}
            hint="Denoted as '2i'"
          />
          <NumberInput
            label="ii Work-in-progress"
            name="ma_closing_work_in_progress_2ii"
            form={form}
            hint="Denoted as '2ii'"
          />
          <div className="border-t pt-3">
            <NumberInput
              label="Total (2i + 2ii)"
              name="ma_closing_stock_total_2"
              form={form}
              hint="Denoted as '2'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* 3. COST OF GOODS PRODUCED */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border-2 border-orange-200">
        <NumberInput
          label="3. Cost of Goods Produced - transferred to Trading Account (1F - 2)"
          name="ma_cost_of_goods_produced_3"
          form={form}
          hint="Denoted as '3'"
          readonly
        />
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6 rounded">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> This Manufacturing Account shows the cost of production and is the first part of the Trading and Profit & Loss Account. 
          The cost of goods produced (item 3) is transferred to the Trading Account.
        </p>
      </div>
    </div>
  );
};

export default Itr7ManufacturingAccount;
