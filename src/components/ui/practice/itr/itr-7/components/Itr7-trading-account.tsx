import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7TradingAccountData } from './itr-7-trading-account.types.ts';

export interface Itr7TradingAccountProps {
  form: UseFormReturn<ITR7TradingAccountData>;
}

const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  color?: string;
}> = ({ title, children, isExpanded, onToggle, color = 'blue' }) => {
  const colorMap = {
    blue: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
    green: 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800',
    purple: 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800',
  };

  return (
    <div className="border rounded-lg mb-4 overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full bg-gradient-to-r ${colorMap[color as keyof typeof colorMap]} text-white px-4 py-3 font-semibold flex items-center justify-between transition`}
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
};

const NumberInput: React.FC<{
  label: string;
  name: keyof ITR7TradingAccountData;
  form: UseFormReturn<ITR7TradingAccountData>;
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

const Itr7TradingAccount: React.FC<Itr7TradingAccountProps> = ({ form }) => {
  const [expandedSections, setExpandedSections] = React.useState<{ [key: string]: boolean }>({
    sales: true,
    profession: false,
    duties: false,
    summary: false,
    closing: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="p-6 space-y-4">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Trading Account</h2>
        <p className="text-gray-600 text-sm">
          For the financial year 2024-25 (Fill items 4 to 12 in a case where regular books of account are maintained, otherwise fill items 61 to 62 as applicable)
        </p>
      </div>

      {/* 4. REVENUE FROM OPERATIONS */}
      <div className="text-lg font-bold text-gray-800 bg-gray-100 p-3 rounded mb-4 border-l-4 border-green-600">
        4. Revenue from Operations
      </div>

      {/* A. Sales/Gross receipts of business */}
      <Section
        title="A. Sales/Gross receipts of business (net of returns and refunds and duty or tax, if any)"
        isExpanded={expandedSections.sales}
        onToggle={() => toggleSection('sales')}
        color="green"
      >
        <div className="space-y-4">
          <NumberInput
            label="i Sale of goods"
            name="ta_sales_gross_receipts_sale_of_goods_i"
            form={form}
            hint="Denoted as 'i'"
          />
          <NumberInput
            label="ii Sale of services"
            name="ta_sales_gross_receipts_sale_of_services_ii"
            form={form}
            hint="Denoted as 'ii'"
          />

          <div className="border-t pt-3 space-y-4">
            <div className="text-sm font-semibold text-gray-700 mb-2">
              iii Other operating revenues (specify nature and amount)
            </div>
            <NumberInput
              label="a"
              name="ta_other_operating_revenues_a_iiia"
              form={form}
            />
            <NumberInput
              label="b"
              name="ta_other_operating_revenues_b_iiib"
              form={form}
            />
            <NumberInput
              label="c Total (iiia + iiib)"
              name="ta_other_operating_revenues_c_total_iiic"
              form={form}
              hint="Denoted as 'iiic'"
              readonly
            />
          </div>

          <div className="border-t pt-3">
            <NumberInput
              label="iv Total (i + ii + iiic)"
              name="ta_sales_gross_receipts_total_aiv"
              form={form}
              hint="Denoted as 'Aiv'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* B. Gross receipts from Profession */}
      <Section
        title="B. Gross receipts from Profession"
        isExpanded={expandedSections.profession}
        onToggle={() => toggleSection('profession')}
        color="blue"
      >
        <NumberInput
          label="Amount"
          name="ta_gross_receipts_profession_b"
          form={form}
          hint="Denoted as 'B'"
        />
      </Section>

      {/* C. Duties, taxes and cess */}
      <Section
        title="C. Duties, taxes and cess received or receivable in respect of goods and services sold or supplied"
        isExpanded={expandedSections.duties}
        onToggle={() => toggleSection('duties')}
        color="purple"
      >
        <div className="space-y-4">
          <NumberInput
            label="i Union Excise duties"
            name="ta_duties_union_excise_duties_i"
            form={form}
          />
          <NumberInput
            label="ii Service tax"
            name="ta_duties_service_tax_ii"
            form={form}
          />
          <NumberInput
            label="iii VAT/Sales tax"
            name="ta_duties_vat_sales_tax_iii"
            form={form}
          />
          <NumberInput
            label="iv Central Goods & Service Tax (CGST)"
            name="ta_duties_cgst_iv"
            form={form}
          />
          <NumberInput
            label="v State Goods & Services Tax (SGST)"
            name="ta_duties_sgst_v"
            form={form}
          />
          <NumberInput
            label="vi Integrated Goods & Services Tax (IGST)"
            name="ta_duties_igst_vi"
            form={form}
          />
          <NumberInput
            label="vii Union Territory Goods & Services Tax (UTGST)"
            name="ta_duties_utgst_vii"
            form={form}
          />
          <NumberInput
            label="viii Any other duty, tax and cess"
            name="ta_duties_other_duty_tax_cess_viii"
            form={form}
          />
          <div className="border-t pt-3">
            <NumberInput
              label="Total (i + ii + iii + iv + v + vi + vii + viii)"
              name="ta_duties_taxes_cess_total_cix"
              form={form}
              hint="Denoted as 'Cix'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* D. Total Revenue from operations */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200">
        <NumberInput
          label="D. Total Revenue from operations (Aiv + B + Cix)"
          name="ta_total_revenue_operations_4d"
          form={form}
          hint="Denoted as '4D'"
          readonly
        />
      </div>

      {/* 5. CLOSING STOCK OF FINISHED GOODS */}
      <div className="text-lg font-bold text-gray-800 bg-gray-100 p-3 rounded mb-4 border-l-4 border-orange-600">
        5. Closing Stock of Finished Goods
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border-2 border-orange-200">
        <NumberInput
          label="Amount"
          name="ta_closing_stock_finished_goods_5"
          form={form}
          hint="Denoted as '5'"
        />
      </div>

      {/* Info Box */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-6 rounded">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> The Trading Account shows the revenue from the sale of goods and services. 
          Item 4 (D) represents the total revenue from all business operations, and Item 5 shows the closing inventory of finished goods. 
          The closing stock of finished goods is a credit entry in the Trading Account.
        </p>
      </div>
    </div>
  );
};

export default Itr7TradingAccount;