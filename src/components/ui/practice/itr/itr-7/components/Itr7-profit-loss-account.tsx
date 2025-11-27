import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7ProfitLossAccountData } from './itr-7-profit-loss-account.types.ts';

export interface Itr7ProfitLossAccountProps {
  form: UseFormReturn<ITR7ProfitLossAccountData>;
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
    red: 'from-red-600 to-red-700 hover:from-red-700 hover:to-red-800',
    indigo: 'from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800',
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
  name: keyof ITR7ProfitLossAccountData;
  form: UseFormReturn<ITR7ProfitLossAccountData>;
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

const SelectInput: React.FC<{
  label: string;
  name: keyof ITR7ProfitLossAccountData;
  form: UseFormReturn<ITR7ProfitLossAccountData>;
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

const Itr7ProfitLossAccount: React.FC<Itr7ProfitLossAccountProps> = ({ form }) => {
  const [expandedSections, setExpandedSections] = React.useState<{ [key: string]: boolean }>({
    grossProfit: true,
    otherIncome: true,
    credits: false,
    expenses: false,
    compensation: false,
    insurance: false,
    commission: false,
    royalty: false,
    professional: false,
    rates: false,
    otherExpenses: false,
    badDebts: false,
    provisions: false,
    interest: false,
    tax: false,
    appropriations: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="p-6 space-y-4">
      <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profit and Loss Account</h2>
        <p className="text-gray-600 text-sm">
          For the financial year 2024-25 (Fill items 13 to 60 in a case where regular books of account are maintained, otherwise fill items 61 to 62 as applicable)
        </p>
      </div>

      {/* 13. Gross Profit */}
      <Section
        title="13. Gross profit transferred from Trading Account"
        isExpanded={expandedSections.grossProfit}
        onToggle={() => toggleSection('grossProfit')}
        color="green"
      >
        <NumberInput
          label="Amount (12+12b)"
          name="pla_gross_profit_transferred_13"
          form={form}
          hint="Denoted as '13'"
        />
      </Section>

      {/* 14. Other Income */}
      <Section
        title="14. Other Income"
        isExpanded={expandedSections.otherIncome}
        onToggle={() => toggleSection('otherIncome')}
        color="blue"
      >
        <div className="space-y-4">
          <NumberInput
            label="i Rent"
            name="pla_other_income_rent_i"
            form={form}
          />
          <NumberInput
            label="ii Commission"
            name="pla_other_income_commission_ii"
            form={form}
          />
          <NumberInput
            label="iii Dividend income"
            name="pla_other_income_dividend_income_iii"
            form={form}
          />
          <NumberInput
            label="iv Interest income"
            name="pla_other_income_interest_income_iv"
            form={form}
          />
          <NumberInput
            label="v Profit on sale of fixed assets"
            name="pla_other_income_profit_fixed_assets_v"
            form={form}
          />
          <NumberInput
            label="vi Profit on sale of investment being securities chargeable to Securities Transaction Tax (STT)"
            name="pla_other_income_profit_securities_stt_vi"
            form={form}
          />
          <NumberInput
            label="vii Profit on sale of other investment"
            name="pla_other_income_profit_other_investment_vii"
            form={form}
          />
          <NumberInput
            label="viii Gain (loss) on account of foreign exchange fluctuation u/s VAA"
            name="pla_other_income_gain_forex_fluctuation_viii"
            form={form}
          />
          <NumberInput
            label="ix Profit on conversion of inventory into capital asset u/s 28(via)"
            name="pla_other_income_profit_conversion_inventory_capital_ix"
            form={form}
          />
          <NumberInput
            label="x Agricultural income"
            name="pla_other_income_agricultural_income_x"
            form={form}
          />
          <div className="border-t pt-3 space-y-4">
            <div className="text-sm font-semibold text-gray-700">
              xi Any other income (specify nature and amount)
            </div>
            <NumberInput
              label="a"
              name="pla_other_income_other_a_xiia"
              form={form}
            />
            <NumberInput
              label="b"
              name="pla_other_income_other_b_xiib"
              form={form}
            />
            <NumberInput
              label="c Total (xiia + xiib)"
              name="pla_other_income_other_total_xiic"
              form={form}
              hint="Denoted as 'xiic'"
              readonly
            />
          </div>
          <div className="border-t pt-3">
            <NumberInput
              label="xii Total of other income"
              name="pla_other_income_total_xii"
              form={form}
              hint="Denoted as 'xii'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* 15. Total Credits */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200">
        <NumberInput
          label="15. Total of credits to profit and loss account (13+14xii)"
          name="pla_total_credits_15"
          form={form}
          hint="Denoted as '15'"
          readonly
        />
      </div>

      {/* EXPENSES SECTION */}
      <div className="text-lg font-bold text-gray-800 bg-gray-100 p-3 rounded mb-4 border-l-4 border-red-600">
        Expenses
      </div>

      {/* Individual Expense Items */}
      <div className="space-y-4">
        <NumberInput
          label="16. Freight outward"
          name="pla_freight_outward_16"
          form={form}
        />
        <NumberInput
          label="17. Consumption of stores and spare parts"
          name="pla_consumption_stores_spare_parts_17"
          form={form}
        />
        <NumberInput
          label="18. Power and fuel"
          name="pla_power_fuel_18"
          form={form}
        />
        <NumberInput
          label="19. Rents"
          name="pla_rents_19"
          form={form}
        />
        <NumberInput
          label="20. Repairs to building"
          name="pla_repairs_building_20"
          form={form}
        />
        <NumberInput
          label="21. Repairs to machinery"
          name="pla_repairs_machinery_21"
          form={form}
        />
      </div>

      {/* 22. Compensation to Employees */}
      <Section
        title="22. Compensation to employees"
        isExpanded={expandedSections.compensation}
        onToggle={() => toggleSection('compensation')}
        color="indigo"
      >
        <div className="space-y-4">
          <NumberInput
            label="i Salaries and wages"
            name="pla_compensation_employees_salaries_wages_i"
            form={form}
          />
          <NumberInput
            label="ii Bonus"
            name="pla_compensation_employees_bonus_ii"
            form={form}
          />
          <NumberInput
            label="iii Reimbursement of medical expenses"
            name="pla_compensation_employees_reimbursement_medical_iii"
            form={form}
          />
          <NumberInput
            label="iv Leave encashment"
            name="pla_compensation_employees_leave_encashment_iv"
            form={form}
          />
          <NumberInput
            label="v Leave travel benefits"
            name="pla_compensation_employees_leave_travel_benefits_v"
            form={form}
          />
          <NumberInput
            label="vi Contribution to approved superannuation fund"
            name="pla_compensation_employees_contribution_superannuation_vi"
            form={form}
          />
          <NumberInput
            label="vii Contribution to recognised provident fund"
            name="pla_compensation_employees_contribution_provident_vii"
            form={form}
          />
          <NumberInput
            label="viii Contribution to recognised gratuity fund"
            name="pla_compensation_employees_contribution_gratuity_viii"
            form={form}
          />
          <NumberInput
            label="ix Contribution to any other fund"
            name="pla_compensation_employees_contribution_other_fund_ix"
            form={form}
          />
          <NumberInput
            label="x Any other benefit to employees"
            name="pla_compensation_employees_other_benefit_x"
            form={form}
          />
          <div className="border-t pt-3">
            <NumberInput
              label="Total compensation to employees (total of xxi to 22x)"
              name="pla_compensation_employees_total_xxi"
              form={form}
              hint="Denoted as 'xxi' or '22x'"
              readonly
            />
          </div>
          <div className="border-t pt-3 space-y-4">
            <SelectInput
              label="Whether any compensation, included in 22xi, paid to non-residents"
              name="pla_compensation_non_residents_xiia"
              form={form}
              options={[
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
              ]}
            />
            <NumberInput
              label="If Yes, amount paid to non-residents"
              name="pla_compensation_non_residents_amount_xiib"
              form={form}
            />
          </div>
        </div>
      </Section>

      {/* 23. Insurance */}
      <Section
        title="23. Insurance"
        isExpanded={expandedSections.insurance}
        onToggle={() => toggleSection('insurance')}
        color="purple"
      >
        <div className="space-y-4">
          <NumberInput
            label="i Medical Insurance"
            name="pla_insurance_medical_i"
            form={form}
          />
          <NumberInput
            label="ii Life Insurance"
            name="pla_insurance_life_ii"
            form={form}
          />
          <NumberInput
            label="iii Keyman's Insurance"
            name="pla_insurance_keyman_iii"
            form={form}
          />
          <NumberInput
            label="iv Other Insurance including factory, office, car, goods, etc."
            name="pla_insurance_other_iv"
            form={form}
          />
          <div className="border-t pt-3">
            <NumberInput
              label="Total expenditure on insurance (23i + 23ii + 23iii + 23iv)"
              name="pla_insurance_total_23"
              form={form}
              hint="Denoted as '23v'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* Additional Expense Items */}
      <div className="space-y-4">
        <NumberInput
          label="24. Workmen and staff welfare expenses"
          name="pla_workmen_staff_welfare_24"
          form={form}
        />
        <NumberInput
          label="25. Entertainment"
          name="pla_entertainment_25"
          form={form}
        />
        <NumberInput
          label="26. Hospitality"
          name="pla_hospitality_26"
          form={form}
        />
        <NumberInput
          label="27. Conference"
          name="pla_conference_27"
          form={form}
        />
        <NumberInput
          label="28. Sales promotion including publicity (other than advertisement)"
          name="pla_sales_promotion_publicity_28"
          form={form}
        />
        <NumberInput
          label="29. Advertisement"
          name="pla_advertisement_29"
          form={form}
        />
      </div>

      {/* 30. Commission */}
      <Section
        title="30. Commission"
        isExpanded={expandedSections.commission}
        onToggle={() => toggleSection('commission')}
        color="blue"
      >
        <div className="space-y-4">
          <NumberInput
            label="i Paid outside India, or paid in India to a non-resident other than a company or a foreign company"
            name="pla_commission_outside_india_i"
            form={form}
          />
          <NumberInput
            label="ii To others"
            name="pla_commission_to_others_ii"
            form={form}
          />
          <div className="border-t pt-3">
            <NumberInput
              label="Total (i + ii)"
              name="pla_commission_total_xxxiii"
              form={form}
              hint="Denoted as 'xxxiii'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* 31. Royalty */}
      <Section
        title="31. Royalty"
        isExpanded={expandedSections.royalty}
        onToggle={() => toggleSection('royalty')}
        color="blue"
      >
        <div className="space-y-4">
          <NumberInput
            label="i Paid outside India, or paid in India to a non-resident other than a company or a foreign company"
            name="pla_royalty_outside_india_i"
            form={form}
          />
          <NumberInput
            label="ii To others"
            name="pla_royalty_to_others_ii"
            form={form}
          />
          <div className="border-t pt-3">
            <NumberInput
              label="Total (i + ii)"
              name="pla_royalty_total_xxxiii"
              form={form}
              hint="Denoted as 'xxxiii'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* 32. Professional/Consultancy fees */}
      <Section
        title="32. Professional/Consultancy fees for technical services"
        isExpanded={expandedSections.professional}
        onToggle={() => toggleSection('professional')}
        color="blue"
      >
        <div className="space-y-4">
          <NumberInput
            label="i Paid outside India, or paid in India to a non-resident other than a company or a foreign company"
            name="pla_professional_fees_outside_india_i"
            form={form}
          />
          <NumberInput
            label="ii To others"
            name="pla_professional_fees_to_others_ii"
            form={form}
          />
          <div className="border-t pt-3">
            <NumberInput
              label="Total (i + ii)"
              name="pla_professional_fees_total_xxxii"
              form={form}
              hint="Denoted as 'xxxii'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* More Expense Items */}
      <div className="space-y-4">
        <NumberInput
          label="33. Hotel, boarding and Lodging"
          name="pla_hotel_boarding_lodging_33"
          form={form}
        />
        <NumberInput
          label="34. Traveling expenses other than on foreign traveling"
          name="pla_traveling_expenses_34"
          form={form}
        />
        <NumberInput
          label="35. Foreign travelling expenses"
          name="pla_foreign_travelling_expenses_35"
          form={form}
        />
        <NumberInput
          label="36. Conveyance expenses"
          name="pla_conveyance_expenses_36"
          form={form}
        />
        <NumberInput
          label="37. Telephone expenses"
          name="pla_telephone_expenses_37"
          form={form}
        />
        <NumberInput
          label="38. Guest House expenses"
          name="pla_guest_house_expenses_38"
          form={form}
        />
        <NumberInput
          label="39. Club expenses"
          name="pla_club_expenses_39"
          form={form}
        />
        <NumberInput
          label="40. Festival celebration expenses"
          name="pla_festival_celebration_expenses_40"
          form={form}
        />
        <NumberInput
          label="41. Scholarship"
          name="pla_scholarship_41"
          form={form}
        />
        <NumberInput
          label="42. Gift"
          name="pla_gift_42"
          form={form}
        />
        <NumberInput
          label="43. Donation"
          name="pla_donation_43"
          form={form}
        />
      </div>

      {/* 44. Rates and Taxes */}
      <Section
        title="44. Rates and taxes, paid or payable to Government or any local body (excluding taxes on income)"
        isExpanded={expandedSections.rates}
        onToggle={() => toggleSection('rates')}
        color="purple"
      >
        <div className="space-y-4">
          <NumberInput
            label="i Union excise duty"
            name="pla_rates_taxes_union_excise_duty_i"
            form={form}
          />
          <NumberInput
            label="ii Service tax"
            name="pla_rates_taxes_service_tax_ii"
            form={form}
          />
          <NumberInput
            label="iii VAT/Sales tax"
            name="pla_rates_taxes_vat_sales_tax_iii"
            form={form}
          />
          <NumberInput
            label="iv Cess"
            name="pla_rates_taxes_cess_iv"
            form={form}
          />
          <NumberInput
            label="v Central Goods & Service Tax (CGST)"
            name="pla_rates_taxes_cgst_v"
            form={form}
          />
          <NumberInput
            label="vi State Goods & Services Tax (SGST)"
            name="pla_rates_taxes_sgst_vi"
            form={form}
          />
          <NumberInput
            label="vii Integrated Goods & Services Tax (IGST)"
            name="pla_rates_taxes_igst_vii"
            form={form}
          />
          <NumberInput
            label="viii Union Territory Goods & Services Tax (UTGST)"
            name="pla_rates_taxes_utgst_viii"
            form={form}
          />
          <NumberInput
            label="ix Any other duty, tax, duty or cess incl STT and CTT"
            name="pla_rates_taxes_other_duty_tax_stt_ix"
            form={form}
          />
          <div className="border-t pt-3">
            <NumberInput
              label="Total rates and taxes paid or payable"
              name="pla_rates_taxes_total_44x"
              form={form}
              hint="Denoted as '44x'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* 45. Audit fee */}
      <NumberInput
        label="45. Audit fee"
        name="pla_audit_fee_45"
        form={form}
      />

      {/* 46. Other expenses */}
      <Section
        title="46. Other expenses (specify nature and amount)"
        isExpanded={expandedSections.otherExpenses}
        onToggle={() => toggleSection('otherExpenses')}
        color="blue"
      >
        <div className="space-y-4">
          <NumberInput
            label="i"
            name="pla_other_expenses_i"
            form={form}
          />
          <NumberInput
            label="ii"
            name="pla_other_expenses_ii"
            form={form}
          />
          <div className="border-t pt-3">
            <NumberInput
              label="Total (i + ii)"
              name="pla_other_expenses_total_46iii"
              form={form}
              hint="Denoted as 'iii'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* 47. Bad Debts */}
      <Section
        title="47. Bad debts (specify PAN/Aadhaar No. of the person, if available, for whom Bad Debt for amount of Rs. 1 lakh or more is claimed and amount)"
        isExpanded={expandedSections.badDebts}
        onToggle={() => toggleSection('badDebts')}
        color="red"
      >
        <div className="space-y-4">
          <NumberInput
            label="i Rows can be added as required Total [47(i(1)+47(i2)+47(i(3)]"
            name="pla_bad_debts_total_47i"
            form={form}
          />
          <NumberInput
            label="ii Others (more than Rs. 1 lakh) where PAN/Aadhaar No. is not available"
            name="pla_bad_debts_others_47ii"
            form={form}
          />
          <div className="border-t pt-3">
            <NumberInput
              label="Total Bad Debt (47i + 47ii + 47iii)"
              name="pla_bad_debts_total_47iii"
              form={form}
              hint="Denoted as 'iii'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* 48-49. Provisions */}
      <div className="space-y-4">
        <NumberInput
          label="48. Provision for bad and doubtful debts"
          name="pla_provision_bad_doubtful_debts_48"
          form={form}
        />
        <NumberInput
          label="49. Other provisions"
          name="pla_other_provisions_49"
          form={form}
        />
      </div>

      {/* 50. Profit before interest, depreciation and taxes */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border-2 border-blue-200">
        <NumberInput
          label="50. Profit before interest, depreciation and taxes [15 - (16 to 49)]"
          name="pla_profit_before_interest_depreciation_taxes_50"
          form={form}
          hint="Denoted as '50'"
          readonly
        />
      </div>

      {/* 51. Interest */}
      <Section
        title="51. Interest"
        isExpanded={expandedSections.interest}
        onToggle={() => toggleSection('interest')}
        color="green"
      >
        <div className="space-y-4">
          <NumberInput
            label="i Paid outside India, or paid in India to a non-resident other than a company or a foreign company"
            name="pla_interest_outside_india_i"
            form={form}
          />
          <NumberInput
            label="ii To others"
            name="pla_interest_to_others_ii"
            form={form}
          />
          <div className="border-t pt-3">
            <NumberInput
              label="Total (i + ii)"
              name="pla_interest_total_51iii"
              form={form}
              hint="Denoted as 'iii'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* 52-53. Depreciation and Net Profit */}
      <div className="space-y-4">
        <NumberInput
          label="52. Depreciation and amortization"
          name="pla_depreciation_amortization_52"
          form={form}
        />
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border-2 border-indigo-200">
        <NumberInput
          label="53. Net profit before taxes (50 - 51iii - 52)"
          name="pla_net_profit_before_taxes_53"
          form={form}
          hint="Denoted as '53'"
          readonly
        />
      </div>

      {/* 54-56. Tax Provisions */}
      <Section
        title="Tax Calculations"
        isExpanded={expandedSections.tax}
        onToggle={() => toggleSection('tax')}
        color="red"
      >
        <div className="space-y-4">
          <NumberInput
            label="54. Provision for current tax"
            name="pla_provision_current_tax_54"
            form={form}
          />
          <NumberInput
            label="55. Provision for Deferred Tax"
            name="pla_provision_deferred_tax_55"
            form={form}
          />
          <div className="border-t pt-3">
            <NumberInput
              label="56. Profit after tax (53 - 54 - 55)"
              name="pla_profit_after_tax_56"
              form={form}
              hint="Denoted as '56'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* 57-58. Balance and Available Amount */}
      <div className="space-y-4">
        <NumberInput
          label="57. Balance brought forward from previous year"
          name="pla_balance_brought_forward_57"
          form={form}
        />
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200">
        <NumberInput
          label="58. Amount available for appropriation (56 + 57)"
          name="pla_amount_available_appropriation_58"
          form={form}
          hint="Denoted as '58'"
          readonly
        />
      </div>

      {/* 59. Appropriations */}
      <Section
        title="59. Appropriations"
        isExpanded={expandedSections.appropriations}
        onToggle={() => toggleSection('appropriations')}
        color="purple"
      >
        <div className="space-y-4">
          <NumberInput
            label="i Transfer to reserves and surplus"
            name="pla_appropriations_transfer_reserves_surplus_i"
            form={form}
          />
          <NumberInput
            label="ii Proposed dividend/ Interim dividend"
            name="pla_appropriations_proposed_dividend_ii"
            form={form}
          />
          <NumberInput
            label="iii Tax on dividend/ Tax on dividend for earlier years"
            name="pla_appropriations_tax_dividend_iii"
            form={form}
          />
          <NumberInput
            label="iv Appropriation towards Corporate Social Responsibility (CSR) activities"
            name="pla_appropriations_csr_iv"
            form={form}
          />
          <NumberInput
            label="v Any other appropriation"
            name="pla_appropriations_other_v"
            form={form}
          />
          <div className="border-t pt-3">
            <NumberInput
              label="vi Total (59i + 59ii + 59iii + 59iv + 59v)"
              name="pla_appropriations_total_59vi"
              form={form}
              hint="Denoted as 'vi'"
              readonly
            />
          </div>
        </div>
      </Section>

      {/* 60. Balance carried to balance sheet */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border-2 border-orange-200">
        <NumberInput
          label="60. Balance carried to balance sheet (58 - 59vi)"
          name="pla_balance_carried_balance_sheet_60"
          form={form}
          hint="Denoted as '60'"
          readonly
        />
      </div>

      {/* 61-62. Foreign Company and Presumptive Income */}
      <div className="text-lg font-bold text-gray-800 bg-gray-100 p-3 rounded mb-4 border-l-4 border-purple-600 mt-6">
        61. Computation of Presumptive Income from Goods Carriages
      </div>

      <NumberInput
        label="Total presumptive income from goods carriage u/s 4AAE"
        name="pla_presumptive_income_goods_carriage_total_61ii"
        form={form}
        hint="Denoted as '61ii'"
      />

      <div className="text-lg font-bold text-gray-800 bg-gray-100 p-3 rounded mb-4 border-l-4 border-purple-600 mt-6">
        62. Foreign Company
      </div>

      <div className="space-y-4">
        <NumberInput
          label="a Gross receipts / Turnover"
          name="pla_foreign_company_gross_receipts_62a"
          form={form}
        />
        <NumberInput
          label="b Net profit"
          name="pla_foreign_company_net_profit_62b"
          form={form}
        />
      </div>

      {/* Info Box */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-6 rounded">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> The Profit and Loss Account shows all revenues, expenses, and appropriations for the financial year. 
          This is the comprehensive statement that determines the taxable profit and retained earnings to be carried forward to the balance sheet.
        </p>
      </div>
    </div>
  );
};

export default Itr7ProfitLossAccount;
