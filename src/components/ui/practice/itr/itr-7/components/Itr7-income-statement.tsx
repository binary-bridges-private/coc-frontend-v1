import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7IncomeStatementData } from './itr-7-income-statement.types.ts';

interface Itr7IncomeStatementProps {
  form: UseFormReturn<ITR7IncomeStatementData>;
}

const Itr7IncomeStatement: React.FC<Itr7IncomeStatementProps> = ({ form }) => {
  const { register, watch, formState: { errors } } = form;
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    revenue: true,
    duties: false,
    profession: false,
    directExpenses: false,
    purchasedDuties: false,
    manufacturing: false,
    intraday: false,
    summary: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const watchedValues = watch();

  const calculateTotalOperatingRevenues = () => {
    const iiia = watchedValues.other_operating_revenues_a || 0;
    const iiib = watchedValues.other_operating_revenues_b || 0;
    return iiia + iiib;
  };

  const calculateTotalGrossReceipts = () => {
    const i = watchedValues.sale_of_goods || 0;
    const ii = watchedValues.sale_of_services || 0;
    const iiic = watchedValues.other_operating_revenues_total || calculateTotalOperatingRevenues();
    return i + ii + iiic;
  };

  const calculateTotalDutiesTaxesSold = () => {
    const duties = [
      watchedValues.union_excise_duties || 0,
      watchedValues.service_tax || 0,
      watchedValues.vat_sales_tax || 0,
      watchedValues.central_goods_service_tax_cgst || 0,
      watchedValues.state_goods_services_tax_sgst || 0,
      watchedValues.integrated_goods_services_tax_igst || 0,
      watchedValues.union_territory_goods_services_tax_utgst || 0,
      watchedValues.any_other_duty_tax_and_cess || 0,
    ];
    return duties.reduce((a, b) => a + b, 0);
  };

  const calculateTotalDutiesTaxesPurchased = () => {
    const duties = [
      watchedValues.custom_duty_purchased || 0,
      watchedValues.counter_vailing_duty || 0,
      watchedValues.special_additional_duty || 0,
      watchedValues.union_excise_duty_purchased || 0,
      watchedValues.service_tax_purchased || 0,
      watchedValues.vat_sales_tax_purchased || 0,
      watchedValues.cgst_purchased || 0,
      watchedValues.sgst_purchased || 0,
      watchedValues.igst_purchased || 0,
      watchedValues.utgst_purchased || 0,
      watchedValues.any_other_tax_purchased || 0,
    ];
    return duties.reduce((a, b) => a + b, 0);
  };

  const calculateDirectExpenses = () => {
    return (watchedValues.carriage_inward || 0) + 
           (watchedValues.power_and_fuel || 0) + 
           (watchedValues.other_direct_expenses_iii || 0);
  };

  const calculateGrossProfitBusinessProfession = () => {
    return (watchedValues.total_credits_trading_account || 0) -
           (watchedValues.opening_stock_finished_goods || 0) -
           (watchedValues.purchases_net || 0) -
           calculateDirectExpenses() -
           calculateTotalDutiesTaxesPurchased() -
           (watchedValues.cost_of_goods_produced_manufacturing || 0);
  };

  const Section: React.FC<{ title: string; children: React.ReactNode; isExpanded: boolean; onToggle: () => void; icon: string; color: string }> = 
    ({ title, children, isExpanded, onToggle, icon, color }) => (
      <div className="border rounded-lg mb-4 overflow-hidden">
        <button
          onClick={onToggle}
          className={`w-full px-6 py-4 flex items-center justify-between text-white font-semibold transition-colors ${color}`}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{icon}</span>
            <span>{title}</span>
          </div>
          <span className="text-xl">{isExpanded ? '−' : '+'}</span>
        </button>
        {isExpanded && (
          <div className="bg-white p-6 space-y-4 border-t">
            {children}
          </div>
        )}
      </div>
    );

  const NumberInput: React.FC<{ label: string; name: keyof ITR7IncomeStatementData; required?: boolean }> = 
    ({ label, name, required }) => (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="number"
          {...register(name, { valueAsNumber: true })}
          placeholder="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors[name] && <span className="text-red-500 text-sm mt-1">{String(errors[name]?.message)}</span>}
      </div>
    );

  const TextInput: React.FC<{ label: string; name: keyof ITR7IncomeStatementData }> = 
    ({ label, name }) => (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
          type="text"
          {...register(name as any)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );

  const ReadOnlyField: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div className="mb-4 p-3 bg-gray-100 rounded-md">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="text-lg font-semibold text-gray-900">₹ {value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Income Statement (Ind-AS)</h1>
        <p className="text-gray-600">Trading Account for the Financial Year 2024-25</p>
      </div>

      {/* Section A: Revenue from Operations */}
      <Section
        title="A. Revenue from Operations"
        icon="📊"
        isExpanded={expandedSections.revenue}
        onToggle={() => toggleSection('revenue')}
        color="bg-gradient-to-r from-blue-600 to-blue-700"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NumberInput label="I. Sale of Goods" name="sale_of_goods" />
          <NumberInput label="II. Sale of Services" name="sale_of_services" />
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <h3 className="font-semibold text-blue-900 mb-4">III. Other Operating Revenues</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NumberInput label="a) Other Operating Revenues (a)" name="other_operating_revenues_a" />
            <NumberInput label="b) Other Operating Revenues (b)" name="other_operating_revenues_b" />
          </div>
          <ReadOnlyField label="c) Total (a + b)" value={calculateTotalOperatingRevenues()} />
        </div>

        <ReadOnlyField 
          label="IV. Total Gross Receipts from Business (I + II + IIIc)" 
          value={calculateTotalGrossReceipts()} 
        />
      </Section>

      {/* Section B: Gross receipts from Profession */}
      <Section
        title="B. Gross Receipts from Profession"
        icon="💼"
        isExpanded={expandedSections.profession}
        onToggle={() => toggleSection('profession')}
        color="bg-gradient-to-r from-green-600 to-green-700"
      >
        <NumberInput label="Gross Receipts from Profession" name="gross_receipts_from_profession" />
      </Section>

      {/* Section C: Duties, Taxes and Cess Received/Receivable */}
      <Section
        title="C. Duties, Taxes & Cess (Goods/Services Sold)"
        icon="🏛️"
        isExpanded={expandedSections.duties}
        onToggle={() => toggleSection('duties')}
        color="bg-gradient-to-r from-purple-600 to-purple-700"
      >
        <div className="space-y-4">
          <NumberInput label="i. Union Excise Duties" name="union_excise_duties" />
          <NumberInput label="ii. Service Tax" name="service_tax" />
          <NumberInput label="iii. VAT/Sales Tax" name="vat_sales_tax" />
          <NumberInput label="iv. Central Goods & Service Tax (CGST)" name="central_goods_service_tax_cgst" />
          <NumberInput label="v. State Goods & Services Tax (SGST)" name="state_goods_services_tax_sgst" />
          <NumberInput label="vi. Integrated Goods & Services Tax (IGST)" name="integrated_goods_services_tax_igst" />
          <NumberInput label="vii. Union Territory Goods & Services Tax (UTGST)" name="union_territory_goods_services_tax_utgst" />
          <NumberInput label="viii. Any Other Duty, Tax and Cess" name="any_other_duty_tax_and_cess" />
        </div>
        <div className="mt-4 pt-4 border-t">
          <ReadOnlyField 
            label="Total (i+ii+iii+iv+v+vi+vii+viii)" 
            value={calculateTotalDutiesTaxesSold()} 
          />
        </div>
      </Section>

      {/* Total Revenue from Operations and Credits */}
      <Section
        title="Trading Account Summary"
        icon="📈"
        isExpanded={expandedSections.summary}
        onToggle={() => toggleSection('summary')}
        color="bg-gradient-to-r from-red-600 to-red-700"
      >
        <ReadOnlyField 
          label="D. Total Revenue from Operations (A + B + C)" 
          value={(watchedValues.total_revenue_from_operations || 0)} 
        />
        <NumberInput label="5. Closing Stock of Finished Goods" name="closing_stock_finished_goods" />
        <ReadOnlyField 
          label="6. Total Credits to Trading Account (4D + 5)" 
          value={(watchedValues.total_credits_trading_account || 0)} 
        />
      </Section>

      {/* Opening Stock and Purchases */}
      <Section
        title="Opening Stock & Purchases"
        icon="📦"
        isExpanded={expandedSections.manufacturing}
        onToggle={() => toggleSection('manufacturing')}
        color="bg-gradient-to-r from-indigo-600 to-indigo-700"
      >
        <NumberInput label="7. Opening Stock of Finished Goods" name="opening_stock_finished_goods" />
        <NumberInput label="8. Purchases (Net of Refunds & Duty/Tax)" name="purchases_net" />
      </Section>

      {/* Section 9: Direct Expenses */}
      <Section
        title="9. Direct Expenses"
        icon="🔧"
        isExpanded={expandedSections.directExpenses}
        onToggle={() => toggleSection('directExpenses')}
        color="bg-gradient-to-r from-yellow-600 to-yellow-700"
      >
        <NumberInput label="i. Carriage Inward" name="carriage_inward" />
        <NumberInput label="ii. Power and Fuel" name="power_and_fuel" />
        <NumberInput label="iii. Other Direct Expenses" name="other_direct_expenses_iii" />
        <div className="mt-4 pt-4 border-t">
          <ReadOnlyField 
            label="Total Direct Expenses" 
            value={calculateDirectExpenses()} 
          />
        </div>
      </Section>

      {/* Section 10: Duties and Taxes Purchased */}
      <Section
        title="10. Duties & Taxes (Goods/Services Purchased)"
        icon="🏪"
        isExpanded={expandedSections.purchasedDuties}
        onToggle={() => toggleSection('purchasedDuties')}
        color="bg-gradient-to-r from-orange-600 to-orange-700"
      >
        <div className="space-y-4">
          <NumberInput label="i. Custom Duty" name="custom_duty_purchased" />
          <NumberInput label="ii. Counter Vailing Duty" name="counter_vailing_duty" />
          <NumberInput label="iii. Special Additional Duty" name="special_additional_duty" />
          <NumberInput label="iv. Union Excise Duty" name="union_excise_duty_purchased" />
          <NumberInput label="v. Service Tax" name="service_tax_purchased" />
          <NumberInput label="vi. VAT/Sales Tax" name="vat_sales_tax_purchased" />
          <NumberInput label="vii. Central Goods & Service Tax (CGST)" name="cgst_purchased" />
          <NumberInput label="viii. State Goods & Services Tax (SGST)" name="sgst_purchased" />
          <NumberInput label="ix. Integrated Goods & Services Tax (IGST)" name="igst_purchased" />
          <NumberInput label="x. Union Territory Goods & Services Tax (UTGST)" name="utgst_purchased" />
          <NumberInput label="xi. Any Other Tax, Paid or Payable" name="any_other_tax_purchased" />
        </div>
        <div className="mt-4 pt-4 border-t">
          <ReadOnlyField 
            label="Total (10i + 10ii + 10iii + 10iv + 10v + 10vi + 10vii + 10viii + 10ix + 10x + 10xi)" 
            value={calculateTotalDutiesTaxesPurchased()} 
          />
        </div>
      </Section>

      {/* Manufacturing and Intraday Trading */}
      <Section
        title="Manufacturing & Intraday Trading"
        icon="⚙️"
        isExpanded={expandedSections.intraday}
        onToggle={() => toggleSection('intraday')}
        color="bg-gradient-to-r from-pink-600 to-pink-700"
      >
        <NumberInput label="11. Cost of Goods Produced - Transferred from Manufacturing Account" name="cost_of_goods_produced_manufacturing" />
        <NumberInput label="12a. Turnover from Intraday Trading" name="turnover_intraday_trading" />
        <NumberInput label="12b. Income from Intraday Trading" name="income_from_intraday_trading" />
      </Section>

      {/* Gross Profit Summary */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg p-6 mt-6 text-white">
        <h3 className="text-xl font-bold mb-4">Gross Profit Calculation</h3>
        <div className="space-y-2 text-sm">
          <p>Total Credits to Trading Account: ₹ {((watchedValues.total_credits_trading_account || 0)).toLocaleString('en-IN')}</p>
          <p>Less: Opening Stock: ₹ {((watchedValues.opening_stock_finished_goods || 0)).toLocaleString('en-IN')}</p>
          <p>Less: Purchases (Net): ₹ {((watchedValues.purchases_net || 0)).toLocaleString('en-IN')}</p>
          <p>Less: Direct Expenses: ₹ {calculateDirectExpenses().toLocaleString('en-IN')}</p>
          <p>Less: Duties & Taxes (Purchased): ₹ {calculateTotalDutiesTaxesPurchased().toLocaleString('en-IN')}</p>
          <p>Less: Cost of Goods Produced: ₹ {((watchedValues.cost_of_goods_produced_manufacturing || 0)).toLocaleString('en-IN')}</p>
          <div className="border-t pt-2 mt-2">
            <p className="text-lg font-bold">
              12. Gross Profit from Business/Profession: ₹ {calculateGrossProfitBusinessProfession().toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <p className="text-blue-800 text-sm">
          <strong>Note:</strong> This Income Statement follows Ind-AS compliant format. The Gross Profit is automatically calculated and transferred to the Profit & Loss Account. All monetary values should be entered in rupees.
        </p>
      </div>
    </div>
  );
};

export default Itr7IncomeStatement;
