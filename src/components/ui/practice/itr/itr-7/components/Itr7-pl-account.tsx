import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7PLAccountData } from './itr-7-pl-account.types.ts';

interface Itr7PLAccountProps {
  form: UseFormReturn<ITR7PLAccountData>;
}

const Itr7PLAccount: React.FC<Itr7PLAccountProps> = ({ form }) => {
  const { register, watch, formState: { errors } } = form;
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    revenue: true,
    freight: false,
    repairs: false,
    compensation: false,
    insurance: false,
    expenses: false,
    commission: false,
    professional: false,
    travel: false,
    badDebts: false,
    interest: false,
    appropriations: false,
    oci: false,
    summary: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const watchedValues = watch();

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

  const NumberInput: React.FC<{ label: string; name: keyof ITR7PLAccountData; required?: boolean }> = 
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

  const ReadOnlyField: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div className="mb-4 p-3 bg-gray-100 rounded-md">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="text-lg font-semibold text-gray-900">₹ {value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
    </div>
  );

  const calculateCompensationTotal = () => {
    return (watchedValues.compensation_salaries_wages || 0) +
           (watchedValues.compensation_bonus || 0) +
           (watchedValues.compensation_medical_reimbursement || 0) +
           (watchedValues.compensation_leave_encashment || 0) +
           (watchedValues.compensation_leave_travel_benefits || 0) +
           (watchedValues.compensation_superannuation || 0) +
           (watchedValues.compensation_provident_fund || 0) +
           (watchedValues.compensation_gratuity_fund || 0) +
           (watchedValues.compensation_other_fund || 0) +
           (watchedValues.compensation_other_benefits || 0);
  };

  const calculateInsuranceTotal = () => {
    return (watchedValues.insurance_medical || 0) +
           (watchedValues.insurance_life || 0) +
           (watchedValues.insurance_keyman || 0) +
           (watchedValues.insurance_other || 0);
  };

  const calculateCommissionTotal = () => {
    return (watchedValues.commission_outside_india || 0) +
           (watchedValues.commission_to_others || 0);
  };

  const calculateRoyaltyTotal = () => {
    return (watchedValues.royalty_outside_india || 0) +
           (watchedValues.royalty_to_others || 0);
  };

  const calculateProfessionalFeesTotal = () => {
    return (watchedValues.professional_fees_outside_india || 0) +
           (watchedValues.professional_fees_to_others || 0);
  };

  const calculateRatesTaxesTotal = () => {
    return (watchedValues.rates_taxes_excise || 0) +
           (watchedValues.rates_taxes_service || 0) +
           (watchedValues.rates_taxes_vat || 0) +
           (watchedValues.rates_taxes_cess || 0) +
           (watchedValues.rates_taxes_cgst || 0) +
           (watchedValues.rates_taxes_sgst || 0) +
           (watchedValues.rates_taxes_igst || 0) +
           (watchedValues.rates_taxes_utgst || 0) +
           (watchedValues.rates_taxes_other || 0);
  };

  const calculateBadDebtsTotal = () => {
    return (watchedValues.bad_debts_47i || 0) +
           (watchedValues.bad_debts_47ii || 0) +
           (watchedValues.bad_debts_47iii || 0);
  };

  const calculateProfitBeforeInterestDepreciation = () => {
    const credits = watchedValues.total_credits_pl_account || 0;
    const debits = (watchedValues.freight_outward || 0) +
                   (watchedValues.consumption_stores_spare_parts || 0) +
                   (watchedValues.power_and_fuel || 0) +
                   (watchedValues.rents || 0) +
                   (watchedValues.repairs_building || 0) +
                   (watchedValues.repairs_machinery || 0) +
                   calculateCompensationTotal() +
                   calculateInsuranceTotal() +
                   (watchedValues.workmen_staff_welfare || 0) +
                   (watchedValues.entertainment || 0) +
                   (watchedValues.hospitality || 0) +
                   (watchedValues.conference || 0) +
                   (watchedValues.sales_promotion || 0) +
                   (watchedValues.advertisement || 0) +
                   calculateCommissionTotal() +
                   calculateRoyaltyTotal() +
                   calculateProfessionalFeesTotal() +
                   (watchedValues.hotel_boarding_lodging || 0) +
                   (watchedValues.traveling_expenses_domestic || 0) +
                   (watchedValues.foreign_travelling_expenses || 0) +
                   (watchedValues.conveyance_expenses || 0) +
                   (watchedValues.telephone_expenses || 0) +
                   (watchedValues.guest_house_expenses || 0) +
                   (watchedValues.club_expenses || 0) +
                   (watchedValues.festival_celebration_expenses || 0) +
                   (watchedValues.scholarship || 0) +
                   (watchedValues.gift || 0) +
                   (watchedValues.donation || 0) +
                   calculateRatesTaxesTotal() +
                   (watchedValues.audit_fee || 0) +
                   (watchedValues.other_expenses_total || 0) +
                   calculateBadDebtsTotal() +
                   (watchedValues.provision_bad_doubtful_debts || 0) +
                   (watchedValues.other_provisions || 0);
    
    return credits - debits;
  };

  const calculateInterestTotal = () => {
    return (watchedValues.interest_outside_india || 0) +
           (watchedValues.interest_to_others || 0);
  };

  const calculateAppropriationTotal = () => {
    return (watchedValues.appropriation_reserves_surplus || 0) +
           (watchedValues.appropriation_dividend || 0) +
           (watchedValues.appropriation_tax_dividend || 0) +
           (watchedValues.appropriation_csr || 0) +
           (watchedValues.appropriation_other || 0);
  };

  const calculateOCIReclassifiedTotal = () => {
    return (watchedValues.oci_reclassified_exchange_differences || 0) +
           (watchedValues.oci_reclassified_debt_instruments || 0) +
           (watchedValues.oci_reclassified_cash_flow_hedge || 0) +
           (watchedValues.oci_reclassified_associates_jv || 0) +
           (watchedValues.oci_reclassified_others || 0) +
           (watchedValues.oci_reclassified_income_tax || 0);
  };

  return (
    <div className="bg-white rounded-lg shadow p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profit and Loss Account (Ind-AS)</h1>
        <p className="text-gray-600">Financial Year 2024-25</p>
      </div>

      {/* Revenue Section */}
      <Section
        title="Revenue from Operations & Other Income"
        icon="📈"
        isExpanded={expandedSections.revenue}
        onToggle={() => toggleSection('revenue')}
        color="bg-gradient-to-r from-blue-600 to-blue-700"
      >
        <NumberInput label="13. Gross Profit transferred from Trading Account" name="gross_profit_transferred" />
        
        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <h3 className="font-semibold text-blue-900 mb-4">14. Other Income</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NumberInput label="i. Rent" name="other_income_rent" />
            <NumberInput label="ii. Commission" name="other_income_commission" />
            <NumberInput label="iii. Dividend Income" name="other_income_dividend" />
            <NumberInput label="iv. Interest Income" name="other_income_interest" />
            <NumberInput label="v. Profit on Sale of Fixed Assets" name="other_income_profit_fixed_assets" />
            <NumberInput label="vi. Profit on Sale of Investment (STT)" name="other_income_profit_sale_investment" />
            <NumberInput label="vii. Profit on Sale of Other Investment" name="other_income_profit_other_investment" />
            <NumberInput label="viii. Forex Gain/Loss" name="other_income_forex_gain_loss" />
            <NumberInput label="ix. Agricultural Income" name="other_income_agricultural" />
          </div>
          <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <NumberInput label="x. Any Other Income (a)" name="other_income_any_other_a" />
            <NumberInput label="x. Any Other Income (b)" name="other_income_any_other_b" />
          </div>
        </div>

        <ReadOnlyField 
          label="15. Total of Credits to P&L Account (13 + 14xii)" 
          value={(watchedValues.total_credits_pl_account || 0)} 
        />
      </Section>

      {/* Freight & Initial Expenses */}
      <Section
        title="Freight, Stores & Utilities"
        icon="🚚"
        isExpanded={expandedSections.freight}
        onToggle={() => toggleSection('freight')}
        color="bg-gradient-to-r from-green-600 to-green-700"
      >
        <NumberInput label="16. Freight Outward" name="freight_outward" />
        <NumberInput label="17. Consumption of Stores and Spare Parts" name="consumption_stores_spare_parts" />
        <NumberInput label="18. Power and Fuel" name="power_and_fuel" />
        <NumberInput label="19. Rents" name="rents" />
      </Section>

      {/* Repairs Section */}
      <Section
        title="Repairs & Maintenance"
        icon="🔧"
        isExpanded={expandedSections.repairs}
        onToggle={() => toggleSection('repairs')}
        color="bg-gradient-to-r from-purple-600 to-purple-700"
      >
        <NumberInput label="20. Repairs to Building" name="repairs_building" />
        <NumberInput label="21. Repairs to Machinery" name="repairs_machinery" />
      </Section>

      {/* Compensation to Employees */}
      <Section
        title="22. Compensation to Employees"
        icon="👥"
        isExpanded={expandedSections.compensation}
        onToggle={() => toggleSection('compensation')}
        color="bg-gradient-to-r from-red-600 to-red-700"
      >
        <div className="space-y-4">
          <NumberInput label="i. Salaries and Wages" name="compensation_salaries_wages" />
          <NumberInput label="ii. Bonus" name="compensation_bonus" />
          <NumberInput label="iii. Reimbursement of Medical Expenses" name="compensation_medical_reimbursement" />
          <NumberInput label="iv. Leave Encashment" name="compensation_leave_encashment" />
          <NumberInput label="v. Leave Travel Benefits" name="compensation_leave_travel_benefits" />
          <NumberInput label="vi. Contribution to Approved Superannuation Fund" name="compensation_superannuation" />
          <NumberInput label="vii. Contribution to Recognised Provident Fund" name="compensation_provident_fund" />
          <NumberInput label="viii. Contribution to Recognised Gratuity Fund" name="compensation_gratuity_fund" />
          <NumberInput label="ix. Contribution to Any Other Fund" name="compensation_other_fund" />
          <NumberInput label="x. Any Other Benefits to Employees" name="compensation_other_benefits" />
        </div>
        <div className="mt-4 pt-4 border-t">
          <ReadOnlyField 
            label="xi. Total Compensation (i to x)" 
            value={calculateCompensationTotal()} 
          />
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              xii. Compensation paid to non-residents (Yes/No)
            </label>
            <input
              type="text"
              {...register('compensation_paid_non_residents')}
              placeholder="Yes / No"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Section>

      {/* Insurance Section */}
      <Section
        title="23. Insurance"
        icon="🛡️"
        isExpanded={expandedSections.insurance}
        onToggle={() => toggleSection('insurance')}
        color="bg-gradient-to-r from-indigo-600 to-indigo-700"
      >
        <NumberInput label="i. Medical Insurance" name="insurance_medical" />
        <NumberInput label="ii. Life Insurance" name="insurance_life" />
        <NumberInput label="iii. Keyman's Insurance" name="insurance_keyman" />
        <NumberInput label="iv. Other Insurance (factory, office, car, goods, etc.)" name="insurance_other" />
        <div className="mt-4 pt-4 border-t">
          <ReadOnlyField 
            label="v. Total Expenditure on Insurance (i + ii + iii + iv)" 
            value={calculateInsuranceTotal()} 
          />
        </div>
      </Section>

      {/* General Expenses */}
      <Section
        title="General & Administrative Expenses"
        icon="📋"
        isExpanded={expandedSections.expenses}
        onToggle={() => toggleSection('expenses')}
        color="bg-gradient-to-r from-yellow-600 to-yellow-700"
      >
        <NumberInput label="24. Workmen and Staff Welfare Expenses" name="workmen_staff_welfare" />
        <NumberInput label="25. Entertainment" name="entertainment" />
        <NumberInput label="26. Hospitality" name="hospitality" />
        <NumberInput label="27. Conference" name="conference" />
        <NumberInput label="28. Sales Promotion (excluding advertisement)" name="sales_promotion" />
        <NumberInput label="29. Advertisement" name="advertisement" />
      </Section>

      {/* Commission, Royalty, Professional Fees */}
      <Section
        title="Commission, Royalty & Professional Fees"
        icon="💼"
        isExpanded={expandedSections.commission}
        onToggle={() => toggleSection('commission')}
        color="bg-gradient-to-r from-orange-600 to-orange-700"
      >
        <div className="space-y-6">
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-3">30. Commission</h4>
            <NumberInput label="i. Paid Outside India" name="commission_outside_india" />
            <NumberInput label="ii. To Others" name="commission_to_others" />
            <ReadOnlyField label="iii. Total Commission" value={calculateCommissionTotal()} />
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-3">31. Royalty</h4>
            <NumberInput label="i. Paid Outside India" name="royalty_outside_india" />
            <NumberInput label="ii. To Others" name="royalty_to_others" />
            <ReadOnlyField label="iii. Total Royalty" value={calculateRoyaltyTotal()} />
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-3">32. Professional/Consultancy Fees</h4>
            <NumberInput label="i. Paid Outside India" name="professional_fees_outside_india" />
            <NumberInput label="ii. To Others" name="professional_fees_to_others" />
            <ReadOnlyField label="iii. Total Professional Fees" value={calculateProfessionalFeesTotal()} />
          </div>
        </div>
      </Section>

      {/* Travel & Transport */}
      <Section
        title="Travel & Transport Expenses"
        icon="✈️"
        isExpanded={expandedSections.travel}
        onToggle={() => toggleSection('travel')}
        color="bg-gradient-to-r from-pink-600 to-pink-700"
      >
        <NumberInput label="33. Hotel, Boarding and Lodging" name="hotel_boarding_lodging" />
        <NumberInput label="34. Traveling Expenses (Domestic)" name="traveling_expenses_domestic" />
        <NumberInput label="35. Foreign Travelling Expenses" name="foreign_travelling_expenses" />
        <NumberInput label="36. Conveyance Expenses" name="conveyance_expenses" />
        <NumberInput label="37. Telephone Expenses" name="telephone_expenses" />
        <NumberInput label="38. Guest House Expenses" name="guest_house_expenses" />
        <NumberInput label="39. Club Expenses" name="club_expenses" />
      </Section>

      {/* Social & Miscellaneous */}
      <Section
        title="Social & Miscellaneous Expenses"
        icon="🎁"
        isExpanded={expandedSections.expenses}
        onToggle={() => toggleSection('expenses')}
        color="bg-gradient-to-r from-teal-600 to-teal-700"
      >
        <NumberInput label="40. Festival Celebration Expenses" name="festival_celebration_expenses" />
        <NumberInput label="41. Scholarship" name="scholarship" />
        <NumberInput label="42. Gift" name="gift" />
        <NumberInput label="43. Donation" name="donation" />
      </Section>

      {/* Rates & Taxes */}
      <Section
        title="44. Rates & Taxes"
        icon="💰"
        isExpanded={expandedSections.expenses}
        onToggle={() => toggleSection('expenses')}
        color="bg-gradient-to-r from-cyan-600 to-cyan-700"
      >
        <div className="space-y-4">
          <NumberInput label="i. Union Excise Duty" name="rates_taxes_excise" />
          <NumberInput label="ii. Service Tax" name="rates_taxes_service" />
          <NumberInput label="iii. VAT/Sales Tax" name="rates_taxes_vat" />
          <NumberInput label="iv. Cess" name="rates_taxes_cess" />
          <NumberInput label="v. CGST" name="rates_taxes_cgst" />
          <NumberInput label="vi. SGST" name="rates_taxes_sgst" />
          <NumberInput label="vii. IGST" name="rates_taxes_igst" />
          <NumberInput label="viii. UTGST" name="rates_taxes_utgst" />
          <NumberInput label="ix. Any Other Rate/Tax/Duty/Cess" name="rates_taxes_other" />
        </div>
        <div className="mt-4 pt-4 border-t">
          <ReadOnlyField 
            label="x. Total Rates and Taxes (i+ii+iii+iv+v+vi+vii+viii+ix)" 
            value={calculateRatesTaxesTotal()} 
          />
        </div>
      </Section>

      {/* Bad Debts & Audit Fee */}
      <Section
        title="Bad Debts, Provisions & Audit Fee"
        icon="📝"
        isExpanded={expandedSections.badDebts}
        onToggle={() => toggleSection('badDebts')}
        color="bg-gradient-to-r from-rose-600 to-rose-700"
      >
        <NumberInput label="45. Audit Fee" name="audit_fee" />
        
        <div className="bg-rose-50 p-4 rounded-lg mt-4">
          <h4 className="font-semibold text-rose-900 mb-3">46. Other Expenses</h4>
          <NumberInput label="i" name="other_expenses_a" />
          <NumberInput label="ii" name="other_expenses_b" />
          <ReadOnlyField label="iii. Total (i + ii)" value={(watchedValues.other_expenses_total || 0)} />
        </div>

        <div className="bg-rose-50 p-4 rounded-lg mt-4">
          <h4 className="font-semibold text-rose-900 mb-3">47. Bad Debts</h4>
          <NumberInput label="i. Bad Debts Total (with PAN details)" name="bad_debts_47i" />
          <NumberInput label="ii. Others (more than Rs. 1 lakh without PAN)" name="bad_debts_47ii" />
          <NumberInput label="iii. Others (less than Rs. 1 lakh)" name="bad_debts_47iii" />
          <ReadOnlyField label="iv. Total Bad Debt (i+ii+iii)" value={calculateBadDebtsTotal()} />
        </div>

        <NumberInput label="48. Provision for Bad and Doubtful Debts" name="provision_bad_doubtful_debts" />
        <NumberInput label="49. Other Provisions" name="other_provisions" />
      </Section>

      {/* Interest & Depreciation */}
      <Section
        title="Interest & Depreciation"
        icon="📊"
        isExpanded={expandedSections.interest}
        onToggle={() => toggleSection('interest')}
        color="bg-gradient-to-r from-violet-600 to-violet-700"
      >
        <ReadOnlyField 
          label="50. Profit Before Interest, Depreciation and Taxes" 
          value={calculateProfitBeforeInterestDepreciation()} 
        />

        <div className="bg-violet-50 p-4 rounded-lg mt-4">
          <h4 className="font-semibold text-violet-900 mb-3">51. Interest</h4>
          <NumberInput label="i. Paid Outside India" name="interest_outside_india" />
          <NumberInput label="ii. To Others" name="interest_to_others" />
          <ReadOnlyField label="iii. Total Interest (i+ii)" value={calculateInterestTotal()} />
        </div>

        <NumberInput label="52. Depreciation and Amortisation" name="depreciation_amortisation" />
        
        <ReadOnlyField 
          label="53. Net Profit Before Taxes (50 - 51iii - 52)" 
          value={(watchedValues.net_profit_before_taxes || 0)} 
        />
      </Section>

      {/* Tax & Profit Summary */}
      <Section
        title="Tax Provisions & Profit Summary"
        icon="💵"
        isExpanded={expandedSections.appropriations}
        onToggle={() => toggleSection('appropriations')}
        color="bg-gradient-to-r from-lime-600 to-lime-700"
      >
        <NumberInput label="54. Provision for Current Tax" name="provision_current_tax" />
        <NumberInput label="55. Provision for Deferred Tax" name="provision_deferred_tax" />
        <ReadOnlyField 
          label="56. Profit After Tax (53 - 54 - 55)" 
          value={(watchedValues.profit_after_tax || 0)} 
        />
        <NumberInput label="57. Balance Brought Forward from Previous Year" name="balance_brought_forward" />
        <ReadOnlyField 
          label="58. Amount Available for Appropriation (56 + 57)" 
          value={(watchedValues.amount_available_appropriation || 0)} 
        />
      </Section>

      {/* Appropriations */}
      <Section
        title="59. Appropriations"
        icon="💎"
        isExpanded={expandedSections.appropriations}
        onToggle={() => toggleSection('appropriations')}
        color="bg-gradient-to-r from-emerald-600 to-emerald-700"
      >
        <NumberInput label="i. Transfer to Reserves and Surplus" name="appropriation_reserves_surplus" />
        <NumberInput label="ii. Proposed Dividend/Interim Dividend" name="appropriation_dividend" />
        <NumberInput label="iii. Tax on Dividend" name="appropriation_tax_dividend" />
        <NumberInput label="iv. CSR Activities" name="appropriation_csr" />
        <NumberInput label="v. Any Other Appropriation" name="appropriation_other" />
        
        <div className="mt-4 pt-4 border-t">
          <ReadOnlyField 
            label="vi. Total Appropriations (i+ii+iii+iv+v)" 
            value={calculateAppropriationTotal()} 
          />
          <ReadOnlyField 
            label="60. Balance Carried to Balance Sheet (58 - 59vi)" 
            value={(watchedValues.balance_carried_to_bs || 0)} 
          />
        </div>
      </Section>

      {/* Other Comprehensive Income */}
      <Section
        title="61-62. Other Comprehensive Income & Total"
        icon="📈"
        isExpanded={expandedSections.oci}
        onToggle={() => toggleSection('oci')}
        color="bg-gradient-to-r from-sky-600 to-sky-700"
      >
        <div className="bg-sky-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-sky-900 mb-3">61A. Items Not Reclassified to P&L</h4>
          <NumberInput label="i. Changes in Revaluation Surplus" name="oci_not_reclassified_revaluation" />
          <NumberInput label="ii. Re-measurements of Defined Benefit Plans" name="oci_not_reclassified_defined_benefit" />
          <NumberInput label="iii. Equity Instruments through OCI" name="oci_not_reclassified_equity_instruments" />
        </div>

        <div className="bg-sky-50 p-4 rounded-lg">
          <h4 className="font-semibold text-sky-900 mb-3">61B. Items Reclassified to P&L</h4>
          <NumberInput label="i. Exchange Differences" name="oci_reclassified_exchange_differences" />
          <NumberInput label="ii. Debt Instruments through OCI" name="oci_reclassified_debt_instruments" />
          <NumberInput label="iii. Cash Flow Hedge" name="oci_reclassified_cash_flow_hedge" />
          <NumberInput label="iv. Associates and Joint Ventures" name="oci_reclassified_associates_jv" />
          <NumberInput label="v. Others (Specify nature)" name="oci_reclassified_others" />
          <NumberInput label="vi. Income Tax on Reclassifiable Items" name="oci_reclassified_income_tax" />
          <ReadOnlyField 
            label="vii. Total Reclassifiable Items" 
            value={calculateOCIReclassifiedTotal()} 
          />
        </div>

        <ReadOnlyField 
          label="62. Total Comprehensive Income (56 + 61A + 61B)" 
          value={(watchedValues.total_comprehensive_income || 0)} 
        />
      </Section>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <p className="text-blue-800 text-sm">
          <strong>Note:</strong> This Profit and Loss Account follows Ind-AS compliant format with comprehensive expense categorization, tax provisions, and other comprehensive income items. All monetary values should be entered in rupees.
        </p>
      </div>
    </div>
  );
};

export default Itr7PLAccount;
