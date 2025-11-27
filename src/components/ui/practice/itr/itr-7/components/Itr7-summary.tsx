import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7SummaryData } from './itr-7-summary.types.ts';

export interface Itr7SummaryProps {
  form: UseFormReturn<ITR7SummaryData>;
}

const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  icon?: string;
}> = ({ title, children, isExpanded, onToggle, icon }) => (
  <div className="border rounded-lg mb-4 overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-4 py-3 font-semibold flex items-center justify-between transition"
    >
      <span className="flex items-center gap-2">
        {icon && <span className="text-xl">{icon}</span>}
        {title}
      </span>
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
  name: keyof ITR7SummaryData;
  form: UseFormReturn<ITR7SummaryData>;
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

const TextInput: React.FC<{
  label: string;
  name: keyof ITR7SummaryData;
  form: UseFormReturn<ITR7SummaryData>;
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
      type="text"
      readOnly={readonly}
      className={`w-full border rounded px-3 py-2 ${readonly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
      {...form.register(name as any)}
    />
    {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
  </div>
);

const TextAreaInput: React.FC<{
  label: string;
  name: keyof ITR7SummaryData;
  form: UseFormReturn<ITR7SummaryData>;
  required?: boolean;
  rows?: number;
  hint?: string;
}> = ({ label, name, form, required, rows = 3, hint }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <textarea
      rows={rows}
      className="w-full border rounded px-3 py-2 bg-white"
      {...form.register(name as any)}
    />
    {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
  </div>
);

const SelectInput: React.FC<{
  label: string;
  name: keyof ITR7SummaryData;
  form: UseFormReturn<ITR7SummaryData>;
  options: { label: string; value: string }[];
  hint?: string;
}> = ({ label, name, form, options, hint }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      className="w-full border rounded px-3 py-2 bg-white"
      {...form.register(name as any)}
    >
      <option value="">Select an option</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
  </div>
);

const MetricCard: React.FC<{
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
}> = ({ label, value, unit = '', color = 'blue' }) => {
  const colorMap = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    green: 'bg-green-50 border-green-200 text-green-900',
    red: 'bg-red-50 border-red-200 text-red-900',
    purple: 'bg-purple-50 border-purple-200 text-purple-900',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-900',
  };

  return (
    <div className={`border rounded-lg p-4 ${colorMap[color as keyof typeof colorMap]}`}>
      <p className="text-sm font-medium text-opacity-75">{label}</p>
      <p className="text-2xl font-bold mt-1">
        {value}
        {unit && <span className="text-lg ml-1">{unit}</span>}
      </p>
    </div>
  );
};

const Itr7Summary: React.FC<Itr7SummaryProps> = ({ form }) => {
  const [expandedSections, setExpandedSections] = React.useState<{ [key: string]: boolean }>({
    verification: true,
    metrics: true,
    tax: false,
    ratios: false,
    compliance: false,
    disclosures: false,
    declaration: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="p-6 space-y-4">
      <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-6 rounded-lg mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">ITR-7 Summary & Verification</h2>
        <p className="text-gray-700 text-sm">
          Review all entered information and complete verification, schedules, and declarations
        </p>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <MetricCard label="Total Income" value="₹ 0" color="blue" />
        <MetricCard label="Profit Before Tax" value="₹ 0" color="green" />
        <MetricCard label="Profit After Tax" value="₹ 0" color="purple" />
        <MetricCard label="Total Assets" value="₹ 0" color="yellow" />
        <MetricCard label="Total Liabilities" value="₹ 0" color="red" />
        <MetricCard label="Net Worth" value="₹ 0" color="blue" />
      </div>

      {/* Schedule 1: Verification */}
      <Section
        title="Schedule 1: Verification"
        isExpanded={expandedSections.verification}
        onToggle={() => toggleSection('verification')}
        icon="✓"
      >
        <div className="space-y-4 bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-700">
            I hereby declare that to the best of my knowledge and belief, the particulars furnished above are true and complete.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Name of Declarant"
            name="summary_verification_name"
            form={form}
            required
          />
          <TextInput
            label="PAN"
            name="summary_verification_pan"
            form={form}
            required
          />
          <TextInput
            label="Place"
            name="summary_verification_place"
            form={form}
          />
          <TextInput
            label="Date (DD/MM/YYYY)"
            name="summary_verification_date"
            form={form}
          />
        </div>
        <div className="border-t pt-4 mt-4">
          <TextInput
            label="Digital Signature / Signature"
            name="summary_verification_signature"
            form={form}
          />
        </div>
      </Section>

      {/* Schedule 2: Key Financial Metrics */}
      <Section
        title="Schedule 2: Key Financial Metrics"
        isExpanded={expandedSections.metrics}
        onToggle={() => toggleSection('metrics')}
        icon="📊"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberInput
            label="Total Income"
            name="summary_total_income"
            form={form}
            hint="Sum of all income sources"
          />
          <NumberInput
            label="Gross Profit"
            name="summary_gross_profit"
            form={form}
          />
          <NumberInput
            label="Profit Before Tax"
            name="summary_profit_before_tax"
            form={form}
          />
          <NumberInput
            label="Profit After Tax"
            name="summary_profit_after_tax"
            form={form}
          />
          <NumberInput
            label="Total Assets"
            name="summary_total_assets"
            form={form}
          />
          <NumberInput
            label="Total Liabilities"
            name="summary_total_liabilities"
            form={form}
          />
          <NumberInput
            label="Net Worth / Equity"
            name="summary_net_worth"
            form={form}
          />
        </div>
      </Section>

      {/* Schedule 3: Tax Summary */}
      <Section
        title="Schedule 3: Tax Summary"
        isExpanded={expandedSections.tax}
        onToggle={() => toggleSection('tax')}
        icon="💰"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NumberInput
            label="Provision for Current Tax"
            name="summary_tax_provision_current"
            form={form}
          />
          <NumberInput
            label="Provision for Deferred Tax"
            name="summary_tax_provision_deferred"
            form={form}
          />
          <NumberInput
            label="Effective Tax Rate (%)"
            name="summary_tax_effective_rate"
            form={form}
            hint="As percentage"
          />
        </div>
      </Section>

      {/* Schedule 4: Financial Ratios */}
      <Section
        title="Schedule 4: Financial Ratios & Metrics"
        isExpanded={expandedSections.ratios}
        onToggle={() => toggleSection('ratios')}
        icon="📈"
      >
        <div className="space-y-4 bg-purple-50 p-3 rounded mb-4">
          <p className="text-xs text-gray-600">
            These ratios provide insights into the financial health and performance of the entity
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberInput
            label="Debt-to-Equity Ratio"
            name="summary_debt_equity_ratio"
            form={form}
          />
          <NumberInput
            label="Current Ratio"
            name="summary_current_ratio"
            form={form}
          />
          <NumberInput
            label="Quick Ratio"
            name="summary_quick_ratio"
            form={form}
          />
          <NumberInput
            label="Profit Margin (%)"
            name="summary_profit_margin"
            form={form}
          />
          <NumberInput
            label="Return on Assets (%)"
            name="summary_return_on_assets"
            form={form}
          />
          <NumberInput
            label="Return on Equity (%)"
            name="summary_return_on_equity"
            form={form}
          />
        </div>
      </Section>

      {/* Schedule 5: Compliance Checklist */}
      <Section
        title="Schedule 5: Compliance Checklist"
        isExpanded={expandedSections.compliance}
        onToggle={() => toggleSection('compliance')}
        icon="✅"
      >
        <div className="space-y-4">
          <SelectInput
            label="Are regular books of account maintained?"
            name="summary_books_maintained"
            form={form}
            options={[
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ]}
          />
          <SelectInput
            label="Has audit been conducted?"
            name="summary_audit_conducted"
            form={form}
            options={[
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ]}
          />
          <SelectInput
            label="Is entity registered under GST?"
            name="summary_gst_registered"
            form={form}
            options={[
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ]}
          />
          <SelectInput
            label="Are TDS compliance requirements met?"
            name="summary_tds_compliance"
            form={form}
            options={[
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ]}
          />
          <SelectInput
            label="Are schedules required to be annexed?"
            name="summary_schedule_required"
            form={form}
            options={[
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ]}
          />
        </div>
      </Section>

      {/* Schedule 6: Notes and Disclosures */}
      <Section
        title="Schedule 6: Notes and Disclosures"
        isExpanded={expandedSections.disclosures}
        onToggle={() => toggleSection('disclosures')}
        icon="📝"
      >
        <div className="space-y-4">
          <TextAreaInput
            label="Significant Accounting Policies"
            name="summary_accounting_policies"
            form={form}
            rows={3}
            hint="Describe key accounting policies used in preparation of financial statements"
          />
          <TextAreaInput
            label="Contingent Liabilities"
            name="summary_contingent_liabilities"
            form={form}
            rows={3}
            hint="Details of any contingent liabilities"
          />
          <TextAreaInput
            label="Commitments"
            name="summary_commitments"
            form={form}
            rows={3}
            hint="Details of capital and other commitments"
          />
          <TextAreaInput
            label="Related Party Transactions"
            name="summary_related_party_transactions"
            form={form}
            rows={3}
            hint="Details of related party transactions"
          />
          <TextAreaInput
            label="Events After Balance Sheet Date"
            name="summary_events_after_balance_sheet"
            form={form}
            rows={3}
            hint="Any significant events occurring after balance sheet date"
          />
        </div>
      </Section>

      {/* Schedule 7: Declaration */}
      <Section
        title="Schedule 7: Final Declaration"
        isExpanded={expandedSections.declaration}
        onToggle={() => toggleSection('declaration')}
        icon="📋"
      >
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-sm text-gray-700 font-semibold mb-2">Declaration</p>
            <TextAreaInput
              label="Declaration Text"
              name="summary_declaration_text"
              form={form}
              rows={4}
            />
          </div>

          <SelectInput
            label="Do you accept the declaration?"
            name="summary_declaration_acceptance"
            form={form}
            options={[
              { label: 'I Accept', value: 'Yes' },
              { label: 'I Do Not Accept', value: 'No' },
            ]}
            hint="By selecting 'I Accept', you confirm that all details provided are true and correct"
          />

          <TextInput
            label="Declaration Date (DD/MM/YYYY)"
            name="summary_declaration_date"
            form={form}
          />
        </div>
      </Section>

      {/* Summary Info Box */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 p-6 rounded-lg mt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">✓ Return Completion Checklist</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <span className="text-green-600">✓</span> Step 1: Personal Information completed
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600">✓</span> Step 2: Balance Sheet completed
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600">✓</span> Step 3: Balance Sheet (Comprehensive) completed
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600">✓</span> Step 4: Manufacturing Account completed
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600">✓</span> Step 5: Trading Account completed
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600">✓</span> Step 6: Profit and Loss Account completed
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-600">✓</span> Step 7: Summary & Verification completed
          </li>
        </ul>
      </div>

      {/* Final Submission Info */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Ready to Submit:</strong> Once you have completed all schedules and provided the verification details, 
          your ITR-7 return is ready for submission to the Income Tax Department. Please ensure all information is accurate and complete before final submission.
        </p>
      </div>
    </div>
  );
};

export default Itr7Summary;
