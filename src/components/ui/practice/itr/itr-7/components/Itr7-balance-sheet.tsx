import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7FormData } from '../itr-7.types.ts';

export interface ITR7BalanceSheetProps {
  form: UseFormReturn<ITR7FormData>;
}

const Section: React.FC<{
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}> = ({ title, expanded, onToggle, children }) => (
  <div className="border rounded-lg">
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

const TextInput: React.FC<{ label: string; name: keyof ITR7FormData; form: UseFormReturn<ITR7FormData>; type?: string; placeholder?: string; className?: string; }>
= ({ label, name, form, type = 'text', placeholder, className }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full border rounded px-3 py-2 mt-1 ${className ?? ''}`}
      {...form.register(name)}
    />
  </div>
);

const NumberInput: React.FC<{ label: string; name: keyof ITR7FormData; form: UseFormReturn<ITR7FormData>; }>
= ({ label, name, form }) => (
  <TextInput label={label} name={name} form={form} type="number" />
);

// Component: Balance Sheet (Part A-BS)
const Itr7BalanceSheet: React.FC<ITR7BalanceSheetProps> = ({ form }) => {
  const [expanded, setExpanded] = React.useState<{ [key: string]: boolean }>({
    equity: true,
    liabilitiesNonCurrent: false,
    liabilitiesCurrent: false,
    assetsNonCurrent: false,
    assetsCurrent: false,
  });
  const toggle = (key: string) => setExpanded(s => ({ ...s, [key]: !s[key] }));

  return (
    <div className="space-y-6">
      {/* I. Equity and Liabilities */}
      <Section title="I. Equity and Liabilities" expanded={expanded.equity} onToggle={() => toggle('equity')}>
        {/* 1. Shareholder’s fund */}
        <div className="space-y-4">
          <h4 className="font-semibold">1. Shareholder’s fund</h4>
          {/* A. Share capital */}
          <div className="bg-gray-50 p-4 rounded space-y-3">
            <h5 className="font-medium">A. Share capital</h5>
            <NumberInput label="i Authorised (Ai)" name="bs_share_capital_authorised_ai" form={form} />
            <NumberInput label="ii Issued, Subscribed and fully Paid up (Aii)" name="bs_share_capital_issued_subscribed_paidup_aii" form={form} />
            <NumberInput label="iii Subscribed but not fully paid (Aiii)" name="bs_share_capital_subscribed_not_fully_paid_aiii" form={form} />
            <NumberInput label="iv Total (Aiv = Ai + Aiii)" name="bs_share_capital_total_aiv" form={form} />
          </div>

          {/* B. Reserves and Surplus */}
          <div className="bg-gray-50 p-4 rounded space-y-3">
            <h5 className="font-medium">B. Reserves and Surplus</h5>
            <NumberInput label="i Capital Reserve (Bi)" name="bs_reserves_capital_bi" form={form} />
            <NumberInput label="ii Capital Redemption Reserve (Bii)" name="bs_reserves_capital_redemption_bii" form={form} />
            <NumberInput label="iii Securities Premium Reserve (Biii)" name="bs_reserves_securities_premium_biii" form={form} />
            <NumberInput label="iv Debenture Redemption Reserve (Biv)" name="bs_reserves_debenture_redemption_biv" form={form} />
            <NumberInput label="v Revaluation Reserve (Bv)" name="bs_reserves_revaluation_bv" form={form} />
            <NumberInput label="vi Share options outstanding amount (Bvi)" name="bs_reserves_share_options_outstanding_bvi" form={form} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <NumberInput label="vii a Other reserve (specify nature and amount) (vii a)" name="bs_reserves_other_vii_a" form={form} />
              <NumberInput label="vii b Other reserve (vii b)" name="bs_reserves_other_vii_b" form={form} />
              <NumberInput label="vii c Total (vii a + vii b) (Bvii)" name="bs_reserves_other_total_bvii" form={form} />
            </div>
            <NumberInput label="viii Surplus i.e. Balance in profit and loss account (Bviii)" name="bs_reserves_surplus_bviii" form={form} />
            <NumberInput label="ix Total (Bi + Bii + Biii + Biv + Bv + Bvi + Bvii + Bviii) (Bix)" name="bs_reserves_total_bix" form={form} />
          </div>

          <NumberInput label="C Money received against share warrants (1C)" name="bs_money_against_share_warrants_1c" form={form} />
          <NumberInput label="D Total Shareholder’s fund (Aiv + Bix + 1C) (1D)" name="bs_total_shareholders_fund_1d" form={form} />
        </div>

        {/* 2. Share application money pending allotment */}
        <div className="space-y-3 pt-4 border-t">
          <h5 className="font-medium">2. Share application money pending allotment</h5>
          <NumberInput label="i Pending for less than one year (i)" name="bs_share_app_pending_lt1yr_2i" form={form} />
          <NumberInput label="ii Pending for more than one year (ii)" name="bs_share_app_pending_gt1yr_2ii" form={form} />
          <NumberInput label="iii Total (i + ii) (2)" name="bs_share_app_pending_total_2iii" form={form} />
        </div>
      </Section>

      {/* 3. Non-current liabilities */}
      <Section title="3. Non-current liabilities" expanded={expanded.liabilitiesNonCurrent} onToggle={() => toggle('liabilitiesNonCurrent')}>
        {/* A Long-term borrowings */}
        <div className="bg-gray-50 p-4 rounded space-y-3">
          <h5 className="font-medium">A. Long-term borrowings</h5>
          <div className="space-y-2">
            <h6 className="font-medium">i Bonds/debentures</h6>
            <NumberInput label="a Foreign currency (ia)" name="bs_ncl_bonds_foreign_ia" form={form} />
            <NumberInput label="b Rupee (ib)" name="bs_ncl_bonds_rupee_ib" form={form} />
            <NumberInput label="c Total (ia + ib) (ic)" name="bs_ncl_bonds_total_ic" form={form} />
          </div>
          <div className="space-y-2">
            <h6 className="font-medium">ii Term loans</h6>
            <NumberInput label="a Foreign currency (iia)" name="bs_ncl_termloan_foreign_iia" form={form} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <NumberInput label="b1 Rupee loans - From Banks (b1)" name="bs_ncl_termloan_rupee_banks_b1" form={form} />
              <NumberInput label="b2 Rupee loans - From others (b2)" name="bs_ncl_termloan_rupee_others_b2" form={form} />
              <NumberInput label="b3 Total (b1 + b2) (b3)" name="bs_ncl_termloan_rupee_total_b3" form={form} />
            </div>
            <NumberInput label="c Total Term loans (iia + b3) (iic)" name="bs_ncl_termloan_total_iic" form={form} />
          </div>
          <NumberInput label="iii Deferred payment liabilities (iii)" name="bs_ncl_deferred_payment_liabilities_iii" form={form} />
          <NumberInput label="iv Deposits from related parties (iv)" name="bs_ncl_deposits_related_iv" form={form} />
          <NumberInput label="v Other deposits (v)" name="bs_ncl_other_deposits_v" form={form} />
          <NumberInput label="vi Loans and advances from related parties (vi)" name="bs_ncl_loans_adv_rel_vi" form={form} />
          <NumberInput label="vii Other loans and advances (vii)" name="bs_ncl_other_loans_adv_vii" form={form} />
          <NumberInput label="viii Long-term maturities of finance lease obligations (viii)" name="bs_ncl_finance_lease_maturities_viii" form={form} />
          <NumberInput label="ix Total Long-term borrowings (ic + iic + iii + iv + v + vi + vii + viii) (3A)" name="bs_ncl_longterm_borrowings_total_3a" form={form} />
        </div>
        <NumberInput label="B Deferred tax liabilities (net) (3B)" name="bs_ncl_deferred_tax_liability_net_3b" form={form} />
        <div className="bg-gray-50 p-4 rounded space-y-3">
          <h5 className="font-medium">C. Other long-term liabilities</h5>
          <NumberInput label="i Trade payables (i)" name="bs_ncl_other_longterm_trade_payables_i" form={form} />
          <NumberInput label="ii Others (ii)" name="bs_ncl_other_longterm_others_ii" form={form} />
          <NumberInput label="iii Total Other long-term liabilities (i + ii) (3C)" name="bs_ncl_other_longterm_total_3c" form={form} />
        </div>
        <div className="bg-gray-50 p-4 rounded space-y-3">
          <h5 className="font-medium">D. Long-term provisions</h5>
          <NumberInput label="i Provision for employee benefits (i)" name="bs_ncl_longterm_provisions_employee_i" form={form} />
          <NumberInput label="ii Others (ii)" name="bs_ncl_longterm_provisions_others_ii" form={form} />
          <NumberInput label="iii Total (i + ii) (3D)" name="bs_ncl_longterm_provisions_total_3d" form={form} />
        </div>
        <NumberInput label="E Total Non-current liabilities (3A + 3B + 3C + 3D) (3E)" name="bs_ncl_total_3e" form={form} />
      </Section>

      {/* 4. Current liabilities */}
      <Section title="4. Current liabilities" expanded={expanded.liabilitiesCurrent} onToggle={() => toggle('liabilitiesCurrent')}>
        <div className="bg-gray-50 p-4 rounded space-y-3">
          <h5 className="font-medium">A. Short-term borrowings</h5>
          <div className="space-y-2">
            <h6 className="font-medium">i Loans repayable on demand</h6>
            <NumberInput label="a From Banks (ia)" name="bs_cl_str_loans_banks_ia" form={form} />
            <NumberInput label="b From Non-Banking Finance Companies (ib)" name="bs_cl_str_loans_nbfc_ib" form={form} />
            <NumberInput label="c From other financial institutions (ic)" name="bs_cl_str_loans_fin_inst_ic" form={form} />
            <NumberInput label="d From others (id)" name="bs_cl_str_loans_others_id" form={form} />
            <NumberInput label="e Total Loans repayable on demand (ia + ib + ic + id) (ie)" name="bs_cl_str_loans_total_ie" form={form} />
          </div>
          <NumberInput label="ii Deposits from related parties (ii)" name="bs_cl_deposits_related_ii" form={form} />
          <NumberInput label="iii Loans and advances from related parties (iii)" name="bs_cl_loans_adv_related_iii" form={form} />
          <NumberInput label="iv Other loans and advances (iv)" name="bs_cl_other_loans_adv_iv" form={form} />
          <NumberInput label="v Other deposits (v)" name="bs_cl_other_deposits_v" form={form} />
          <NumberInput label="vi Total Short-term borrowings (ie + ii + iii + iv + v) (4A)" name="bs_cl_shortterm_borrowings_total_4a" form={form} />
        </div>
        <div className="bg-gray-50 p-4 rounded space-y-3">
          <h5 className="font-medium">B. Trade payables</h5>
          <NumberInput label="i Outstanding for more than 1 year (i)" name="bs_cl_trade_payables_gt1yr_i" form={form} />
          <NumberInput label="ii Others (ii)" name="bs_cl_trade_payables_others_ii" form={form} />
          <NumberInput label="iii Total Trade payables (i + ii) (4B)" name="bs_cl_trade_payables_total_4b" form={form} />
        </div>
        <div className="bg-gray-50 p-4 rounded space-y-3">
          <h5 className="font-medium">C. Other current liabilities</h5>
          <NumberInput label="i Current maturities of long-term debt (i)" name="bs_cl_other_current_maturity_ltd_i" form={form} />
          <NumberInput label="ii Current maturities of finance lease obligations (ii)" name="bs_cl_other_current_maturity_lease_ii" form={form} />
          <NumberInput label="iii Interest accrued but not due on borrowings (iii)" name="bs_cl_other_interest_accrued_not_due_iii" form={form} />
          <NumberInput label="iv Interest accrued and due on borrowings (iv)" name="bs_cl_other_interest_accrued_due_iv" form={form} />
          <NumberInput label="v Income received in advance (v)" name="bs_cl_other_income_received_in_advance_v" form={form} />
          <NumberInput label="vi Unpaid dividends (vi)" name="bs_cl_other_unpaid_dividends_vi" form={form} />
          <NumberInput label="vii Application money received for allotment of securities and due for refund and interest accrued thereon (vii)" name="bs_cl_other_application_money_refund_vii" form={form} />
          <NumberInput label="viii Unpaid matured deposits and interest accrued thereon (viii)" name="bs_cl_other_unpaid_matured_deposits_viii" form={form} />
          <NumberInput label="ix Unpaid matured debentures and interest accrued thereon (ix)" name="bs_cl_other_unpaid_matured_debentures_ix" form={form} />
          <NumberInput label="x Other payables (x)" name="bs_cl_other_other_payables_x" form={form} />
          <NumberInput label="xi Total Other current liabilities (i + ii + iii + iv + v + vi + vii + viii + ix + x) (4C)" name="bs_cl_other_current_total_4c" form={form} />
        </div>
        <div className="bg-gray-50 p-4 rounded space-y-3">
          <h5 className="font-medium">D. Short-term provisions</h5>
          <NumberInput label="i Provision for employee benefit (i)" name="bs_cl_shortterm_prov_employee_i" form={form} />
          <NumberInput label="ii Provision for Income-tax (ii)" name="bs_cl_shortterm_prov_incometax_ii" form={form} />
          <NumberInput label="iii Proposed Dividend (iii)" name="bs_cl_shortterm_prov_dividend_iii" form={form} />
          <NumberInput label="iv Tax on dividend (iv)" name="bs_cl_shortterm_prov_tax_on_dividend_iv" form={form} />
          <NumberInput label="v Other (v)" name="bs_cl_shortterm_prov_other_v" form={form} />
          <NumberInput label="vi Total Short-term provisions (i + ii + iii + iv + v) (4D)" name="bs_cl_shortterm_prov_total_4d" form={form} />
        </div>
        <NumberInput label="E Total Current liabilities (4A + 4B + 4C + 4D) (4E)" name="bs_cl_total_4e" form={form} />
        <NumberInput label="Total Equity and liabilities (1D + 2 + 3E + 4E) (I)" name="bs_total_equity_liabilities_i" form={form} />
      </Section>

      {/* II. Assets */}
      <Section title="II. Assets" expanded={expanded.assetsNonCurrent} onToggle={() => toggle('assetsNonCurrent')}>
        {/* 1. Non-current assets */}
        <div className="space-y-4">
          <h4 className="font-semibold">1. Non-current assets</h4>
          {/* A. Fixed assets */}
          <div className="bg-gray-50 p-4 rounded space-y-3">
            <h5 className="font-medium">A. Fixed assets</h5>
            {/* i Tangible assets */}
            <div className="bg-white p-4 rounded space-y-3">
              <h6 className="font-medium">i Tangible assets</h6>
              <NumberInput label="a Gross block (ia)" name="bs_nca_fixed_tangible_gross_ia" form={form} />
              <NumberInput label="b Depreciation (ib)" name="bs_nca_fixed_tangible_dep_ib" form={form} />
              <NumberInput label="c Impairment losses (ic)" name="bs_nca_fixed_tangible_impairment_ic" form={form} />
              <NumberInput label="d Net block (ia - ib - ic) (id)" name="bs_nca_fixed_tangible_net_id" form={form} />
            </div>
            {/* ii Intangible assets */}
            <div className="bg-white p-4 rounded space-y-3">
              <h6 className="font-medium">ii Intangible assets</h6>
              <NumberInput label="a Gross block (iia)" name="bs_nca_fixed_intangible_gross_iia" form={form} />
              <NumberInput label="b Amortization (iib)" name="bs_nca_fixed_intangible_amort_iib" form={form} />
              <NumberInput label="c Impairment losses (iic)" name="bs_nca_fixed_intangible_impairment_iic" form={form} />
              <NumberInput label="d Net block (iia - iib - iic) (iid)" name="bs_nca_fixed_intangible_net_iid" form={form} />
            </div>
            <NumberInput label="iii Capital work-in-progress (iii)" name="bs_nca_fixed_cwip_iii" form={form} />
            <NumberInput label="iv Intangible assets under development (iv)" name="bs_nca_fixed_intangible_under_dev_iv" form={form} />
            <NumberInput label="v Total Fixed assets (id + iid + iii + iv) (Av)" name="bs_nca_fixed_total_av" form={form} />
          </div>

          {/* B. Non-current investments */}
          <div className="bg-gray-50 p-4 rounded space-y-3">
            <h5 className="font-medium">B. Non-current investments</h5>
            <div className="bg-white p-4 rounded space-y-3">
              <h6 className="font-medium">i Investment in property (i)"</h6>
              <NumberInput label="Amount (i)" name="bs_nca_invest_property_i" form={form} />
            </div>
            <div className="bg-white p-4 rounded space-y-3">
              <h6 className="font-medium">ii Investments in Equity instruments</h6>
              <NumberInput label="a Listed equities (iia)" name="bs_nca_invest_equity_listed_iia" form={form} />
              <NumberInput label="b Unlisted equities (iib)" name="bs_nca_invest_equity_unlisted_iib" form={form} />
              <NumberInput label="c Total (iia + iib) (iic)" name="bs_nca_invest_equity_total_iic" form={form} />
            </div>
            <NumberInput label="iii Investments in Preference shares (iii)" name="bs_nca_invest_preference_shares_iii" form={form} />
            <NumberInput label="iv Investments in Government or trust securities (iv)" name="bs_nca_invest_govt_trust_iv" form={form} />
            <NumberInput label="v Investments in Debenture or bonds (v)" name="bs_nca_invest_debenture_bonds_v" form={form} />
            <NumberInput label="vi Investments in Mutual funds (vi)" name="bs_nca_invest_mutual_funds_vi" form={form} />
            <NumberInput label="vii Investments in Partnership firms (vii)" name="bs_nca_invest_partnership_vii" form={form} />
            <NumberInput label="viii Others Investments (viii)" name="bs_nca_invest_others_viii" form={form} />
            <NumberInput label="ix Total Non-current investments (i + iic + iii + iv + v + vi + vii + viii) (Bix)" name="bs_nca_invest_total_bix" form={form} />
          </div>

          {/* C. Deferred tax assets (Net) */}
          <NumberInput label="C Deferred tax assets (Net) (C)" name="bs_nca_deferred_tax_assets_net_c" form={form} />

          {/* D. Long-term loans and advances */}
          <div className="bg-gray-50 p-4 rounded space-y-3">
            <h5 className="font-medium">D. Long-term loans and advances</h5>
            <NumberInput label="i Capital advances (i)" name="bs_nca_lta_capital_adv_i" form={form} />
            <NumberInput label="ii Security deposits (ii)" name="bs_nca_lta_security_deposits_ii" form={form} />
            <NumberInput label="iii Loans and advances to related parties (iii)" name="bs_nca_lta_loans_adv_related_iii" form={form} />
            <NumberInput label="iv Other Loans and advances (iv)" name="bs_nca_lta_other_loans_adv_iv" form={form} />
            <NumberInput label="v Total Long-term loans and advances (i + ii + iii + iv) (Dv)" name="bs_nca_lta_total_dv" form={form} />
            <div className="bg-white p-4 rounded space-y-2">
              <h6 className="font-medium">vi Long-term loans and advances included in Dv which is</h6>
              <NumberInput label="a for the purpose of business or profession (via)" name="bs_nca_lta_included_business_via" form={form} />
              <NumberInput label="b not for the purpose of business or profession (vib)" name="bs_nca_lta_included_not_business_vib" form={form} />
              <NumberInput label="c given to shareholder as per section 2(22)(e) (vic)" name="bs_nca_lta_included_222e_vic" form={form} />
            </div>
          </div>

          {/* E. Other non-current assets */}
          <div className="bg-gray-50 p-4 rounded space-y-3">
            <h5 className="font-medium">E. Other non-current assets</h5>
            <div className="bg-white p-4 rounded space-y-2">
              <h6 className="font-medium">i Long-term trade receivables</h6>
              <NumberInput label="a Secured, considered good (ia)" name="bs_nca_other_traderec_sec_good_ia" form={form} />
              <NumberInput label="b Unsecured, considered good (ib)" name="bs_nca_other_traderec_unsec_good_ib" form={form} />
              <NumberInput label="c Doubtful (ic)" name="bs_nca_other_traderec_doubtful_ic" form={form} />
              <NumberInput label="d Total Other non-current assets (ia + ib + ic) (id)" name="bs_nca_other_traderec_total_id" form={form} />
            </div>
            <NumberInput label="ii Others (ii)" name="bs_nca_other_others_ii" form={form} />
            <NumberInput label="iii Total (id + ii) (Eiii)" name="bs_nca_other_total_eiii" form={form} />
            <NumberInput label="iv Non-current assets included in Eiii given to shareholder as per section 2(22)(e) (iv)" name="bs_nca_other_included_222e_iv" form={form} />
            <NumberInput label="F Total Non-current assets (Av + Bix + C + Dv + Eiii) (1F)" name="bs_nca_total_1f" form={form} />
          </div>
        </div>
      </Section>

      {/* 2. Current assets */}
      <Section title="2. Current assets" expanded={expanded.assetsCurrent} onToggle={() => toggle('assetsCurrent')}>
        <div className="space-y-4">
          {/* A. Current investments */}
          <div className="bg-gray-50 p-4 rounded space-y-3">
            <h5 className="font-medium">A. Current investments</h5>
            <div className="bg-white p-4 rounded space-y-3">
              <h6 className="font-medium">i Investment in Equity instruments</h6>
              <NumberInput label="a Listed equities (ia)" name="bs_ca_invest_equity_listed_ia" form={form} />
              <NumberInput label="b Unlisted equities (ib)" name="bs_ca_invest_equity_unlisted_ib" form={form} />
              <NumberInput label="c Total (ia + ib) (ic)" name="bs_ca_invest_equity_total_ic" form={form} />
            </div>
            <NumberInput label="ii Investment in Preference shares (ii)" name="bs_ca_invest_preference_shares_ii" form={form} />
            <NumberInput label="iii Investment in government or trust securities (iii)" name="bs_ca_invest_govt_trust_iii" form={form} />
            <NumberInput label="iv Investment in debentures or bonds (iv)" name="bs_ca_invest_debenture_bonds_iv" form={form} />
            <NumberInput label="v Investment in Mutual funds (v)" name="bs_ca_invest_mutual_funds_v" form={form} />
            <NumberInput label="vi Investment in partnership firms (vi)" name="bs_ca_invest_partnership_vi" form={form} />
            <NumberInput label="vii Other investment (vii)" name="bs_ca_invest_other_vii" form={form} />
            <NumberInput label="viii Total Current investments (ic + ii + iii + iv + v + vi + vii) (Aviii)" name="bs_ca_invest_total_aviii" form={form} />
          </div>

          {/* B. Inventories */}
          <div className="bg-gray-50 p-4 rounded space-y-3">
            <h5 className="font-medium">B. Inventories</h5>
            <NumberInput label="i Raw materials (i)" name="bs_ca_inventories_raw_i" form={form} />
            <NumberInput label="ii Work-in-progress (ii)" name="bs_ca_inventories_wip_ii" form={form} />
            <NumberInput label="iii Finished goods (iii)" name="bs_ca_inventories_finished_iii" form={form} />
            <NumberInput label="iv Stock-in-trade (iv)" name="bs_ca_inventories_stock_in_trade_iv" form={form} />
            <NumberInput label="v Stores and spares (v)" name="bs_ca_inventories_stores_spares_v" form={form} />
            <NumberInput label="vi Loose tools (vi)" name="bs_ca_inventories_loose_tools_vi" form={form} />
            <NumberInput label="vii Others (vii)" name="bs_ca_inventories_others_vii" form={form} />
            <NumberInput label="viii Total Inventories (i + ii + iii + iv + v + vi + vii) (Bviii)" name="bs_ca_inventories_total_bviii" form={form} />
          </div>

          {/* C. Trade receivables */}
          <div className="bg-gray-50 p-4 rounded space-y-3">
            <h5 className="font-medium">C. Trade receivables</h5>
            <NumberInput label="i Outstanding for more than 6 months (i)" name="bs_ca_receivables_gt6mo_i" form={form} />
            <NumberInput label="ii Others (ii)" name="bs_ca_receivables_others_ii" form={form} />
            <NumberInput label="iii Total Trade receivables (i + ii + iii) (Ciii)" name="bs_ca_receivables_total_ciii" form={form} />
          </div>

          {/* D. Cash and cash equivalents */}
          <div className="bg-gray-50 p-4 rounded space-y-3">
            <h5 className="font-medium">D. Cash and cash equivalents</h5>
            <NumberInput label="i Balances with Banks (i)" name="bs_ca_cash_bank_balances_i" form={form} />
            <NumberInput label="ii Cheques, drafts in hand (ii)" name="bs_ca_cash_cheques_drafts_ii" form={form} />
            <NumberInput label="iii Cash in hand (iii)" name="bs_ca_cash_in_hand_iii" form={form} />
            <NumberInput label="iv Others (iv)" name="bs_ca_cash_others_iv" form={form} />
            <NumberInput label="v Total Cash and cash equivalents (i + ii + iii + iv) (Dv)" name="bs_ca_cash_total_dv" form={form} />
          </div>

          {/* E. Short-term loans and advances */}
          <div className="bg-gray-50 p-4 rounded space-y-3">
            <h5 className="font-medium">E. Short-term loans and advances</h5>
            <NumberInput label="i Loans and advances to related parties (i)" name="bs_ca_st_loans_adv_related_i" form={form} />
            <NumberInput label="ii Others (ii)" name="bs_ca_st_loans_adv_others_ii" form={form} />
            <NumberInput label="iii Total Short-term loans and advances (i + ii) (Eiii)" name="bs_ca_st_loans_adv_total_eiii" form={form} />
            <div className="bg-white p-4 rounded space-y-2">
              <h6 className="font-medium">iv Short-term loans and advances included in Eiii which is</h6>
              <NumberInput label="a for the purpose of business or profession (iva)" name="bs_ca_st_loans_included_business_iva" form={form} />
              <NumberInput label="b not for the purpose of business or profession (ivb)" name="bs_ca_st_loans_included_not_business_ivb" form={form} />
              <NumberInput label="c given to a shareholder as per section 2(22)(e) (ivc)" name="bs_ca_st_loans_included_222e_ivc" form={form} />
            </div>
          </div>

          {/* F. Other current assets */}
          <NumberInput label="F Other current assets (F)" name="bs_ca_other_current_assets_f" form={form} />

          {/* G. Total Current assets */}
          <NumberInput label="G Total Current assets (Aviii + Bviii + Ciii + Dv + Eiii + F) (2G)" name="bs_ca_total_2g" form={form} />

          {/* Total Assets */}
          <NumberInput label="Total Assets (1F + 2G) (II)" name="bs_total_assets_ii" form={form} />
        </div>
      </Section>

      {/* Footer note */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4">
        <p className="text-sm text-green-800">Part A-BS Balance Sheet fields scaffolded with clear labels matching the provided layout. Hook up totals with computed values if needed.</p>
      </div>
    </div>
  );
};

export default Itr7BalanceSheet;
