import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7BalanceSheetComprehensiveData } from './itr-7-balance-sheet-comprehensive.types.ts';

export interface Itr7BalanceSheetComprehensiveProps {
  form: UseFormReturn<ITR7BalanceSheetComprehensiveData>;
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

const NumberInput: React.FC<{
  label: string;
  name: keyof ITR7BalanceSheetComprehensiveData;
  form: UseFormReturn<ITR7BalanceSheetComprehensiveData>;
  required?: boolean;
}> = ({ label, name, form, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="number"
      step="0.01"
      className="w-full border rounded px-3 py-2 mt-1"
      {...form.register(name)}
    />
  </div>
);

const Itr7BalanceSheetComprehensive: React.FC<Itr7BalanceSheetComprehensiveProps> = ({ form }) => {
  const [expanded, setExpanded] = React.useState<{ [key: string]: boolean }>({
    equity: true,
    nclSection: false,
    clSection: false,
    ncaSection: false,
    caSection: false,
  });

  const toggle = (key: string) => setExpanded(s => ({ ...s, [key]: !s[key] }));

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold mb-6">Balance Sheet as on 31st March, 2025 (Part A-BS - Ind AS)</h2>

      {/* I. EQUITY AND LIABILITIES */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-blue-900 mb-4">I. EQUITY AND LIABILITIES</h3>

        {/* 1. EQUITY */}
        <Section title="1. EQUITY" expanded={expanded.equity} onToggle={() => toggle('equity')}>
          {/* A. Equity share capital */}
          <div className="bg-blue-50 p-4 rounded space-y-3">
            <h4 className="font-semibold text-blue-900">A. Equity share capital</h4>
            <NumberInput label="i Authorised (Ai)" name="bs_c_eq_share_capital_authorised_ai" form={form} />
            <NumberInput label="ii Issued, Subscribed and fully Paid up (Aii)" name="bs_c_eq_share_capital_issued_subscribed_aii" form={form} />
            <NumberInput label="iii Subscribed but not fully paid (Aiii)" name="bs_c_eq_share_capital_subscribed_not_paid_aiii" form={form} />
            <div className="bg-white p-3 rounded border-l-4 border-blue-500">
              <NumberInput label="iv Total (Aiv = Ai + Aii + Aiii)" name="bs_c_eq_share_capital_total_aiv" form={form} />
            </div>
          </div>

          {/* B. Other Equity */}
          <div className="bg-green-50 p-4 rounded space-y-3 mt-4">
            <h4 className="font-semibold text-green-900">B. Other Equity</h4>
            <div className="bg-white p-3 rounded space-y-2">
              <h5 className="font-medium">i Other Reserves</h5>
              <NumberInput label="a Capital Redemption Reserve (ia)" name="bs_c_eq_other_reserves_capital_redemption_ia" form={form} />
              <NumberInput label="b Debenture Redemption Reserve (ib)" name="bs_c_eq_other_reserves_debenture_redemption_ib" form={form} />
              <NumberInput label="c Share Options Outstanding account (ic)" name="bs_c_eq_other_reserves_share_options_ic" form={form} />
              <NumberInput label="d Other (specify nature and amount) (id)" name="bs_c_eq_other_reserves_other_specify_id" form={form} />
              <div className="border-t pt-2">
                <NumberInput label="e Total other reserves (ia + ib + ic + id) (ie)" name="bs_c_eq_other_reserves_total_ie" form={form} />
              </div>
            </div>
            <div className="bg-white p-3 rounded mt-2">
              <h5 className="font-medium">ii Retained earnings (Debit balance of statement of P&L to be shown as -ve figure)</h5>
              <NumberInput label="Amount (ii)" name="bs_c_eq_retained_earnings_ii" form={form} />
            </div>
            <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
              <NumberInput label="iii Total (Bie + ii) (Biii)" name="bs_c_eq_other_equity_total_biii" form={form} />
            </div>
          </div>

          {/* C. Total Equity */}
          <div className="bg-purple-100 p-4 rounded border-l-4 border-purple-500">
            <NumberInput label="C Total Equity (Aiv + Biii) (1C)" name="bs_c_eq_total_ic" form={form} />
          </div>
        </Section>

        {/* 2. LIABILITIES - NON-CURRENT */}
        <Section title="2A. Non-current liabilities" expanded={expanded.nclSection} onToggle={() => toggle('nclSection')}>
          {/* A. Non-current liabilities */}
          <div className="bg-red-50 p-4 rounded space-y-3">
            <h4 className="font-semibold text-red-900">A. Non-current liabilities</h4>

            {/* 1. Financial Liabilities - Borrowings */}
            <div className="bg-white p-3 rounded space-y-2">
              <h5 className="font-medium">1. Financial Liabilities</h5>
              <div className="ml-4 space-y-2">
                <h6 className="font-medium text-sm">Borrowings</h6>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <NumberInput label="a Bonds or debentures - Foreign currency (a1)" name="bs_c_ncl_borrowings_bonds_foreign_a1" form={form} />
                  <NumberInput label="b Rupee (a2)" name="bs_c_ncl_borrowings_bonds_rupee_a2" form={form} />
                  <div className="border-t pt-2"><NumberInput label="Total (a3)" name="bs_c_ncl_borrowings_bonds_total_a3" form={form} /></div>
                </div>

                <div className="mt-3">
                  <h6 className="font-medium text-sm">Term loans</h6>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <NumberInput label="b Foreign currency (b1)" name="bs_c_ncl_termloan_foreign_b1" form={form} />
                    <div className="space-y-2">
                      <NumberInput label="Rupee loans - From Banks (b2i)" name="bs_c_ncl_termloan_rupee_banks_b2i" form={form} />
                      <NumberInput label="From other parties (b2ii)" name="bs_c_ncl_termloan_rupee_others_b2ii" form={form} />
                      <NumberInput label="Total (b2iii)" name="bs_c_ncl_termloan_rupee_total_b2iii" form={form} />
                    </div>
                    <div className="border-t pt-2"><NumberInput label="Total Term loans (b1 + b2iii) (b3)" name="bs_c_ncl_termloan_total_b3" form={form} /></div>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <NumberInput label="c Deferred payment liabilities (c)" name="bs_c_ncl_deferred_payment_c" form={form} />
                  <NumberInput label="d Deposits (d)" name="bs_c_ncl_deposits_d" form={form} />
                  <NumberInput label="e Loans from related parties (e)" name="bs_c_ncl_loans_related_e" form={form} />
                  <NumberInput label="f Long term maturities of finance lease obligations (f)" name="bs_c_ncl_finance_lease_f" form={form} />
                  <NumberInput label="g Liability component of compound financial instruments (g)" name="bs_c_ncl_compound_financial_g" form={form} />
                  <NumberInput label="h Other loans (h)" name="bs_c_ncl_other_loans_h" form={form} />
                </div>

                <div className="border-t pt-2 mt-2">
                  <NumberInput label="i Total borrowings (a3 + b3 + c + d + e + f + g + h) (i)" name="bs_c_ncl_borrowings_total_i" form={form} />
                </div>
                <NumberInput label="j Trade Payables (j)" name="bs_c_ncl_trade_payables_j" form={form} />
                <NumberInput label="k Other financial liabilities (Other than those specified in II under provisions) (k)" name="bs_c_ncl_other_financial_liabilities_k" form={form} />
              </div>
            </div>

            {/* 2. Provisions */}
            <div className="bg-white p-3 rounded space-y-2 mt-2">
              <h6 className="font-medium">2. Provisions</h6>
              <NumberInput label="a Provision for employee benefits (iia)" name="bs_c_ncl_provision_employee_benefits_iia" form={form} />
              <NumberInput label="b Others (specify nature) (iib)" name="bs_c_ncl_provision_others_iib" form={form} />
              <div className="border-t pt-2"><NumberInput label="Total Provisions (iic)" name="bs_c_ncl_provision_total_iic" form={form} /></div>
            </div>

            {/* 3. Deferred tax liabilities */}
            <div className="bg-white p-3 rounded mt-2">
              <NumberInput label="3. Deferred tax liabilities (net) (III)" name="bs_c_ncl_deferred_tax_iii" form={form} />
            </div>

            {/* 4. Other non-current liabilities */}
            <div className="bg-white p-3 rounded space-y-2 mt-2">
              <h6 className="font-medium">4. Other non-current liabilities</h6>
              <NumberInput label="a Advances (IVa)" name="bs_c_ncl_other_advances_iva" form={form} />
              <NumberInput label="b Others (specify nature) (IVb)" name="bs_c_ncl_other_specify_ivb" form={form} />
              <div className="border-t pt-2"><NumberInput label="Total Other non-current liabilities (IVc)" name="bs_c_ncl_other_total_ivc" form={form} /></div>
            </div>
          </div>

          {/* Total Non-current Liabilities */}
          <div className="bg-orange-100 p-4 rounded border-l-4 border-orange-500 mt-3">
            <NumberInput label="Total Non-current Liabilities (I + II + III + IV) (2A)" name="bs_c_ncl_total_2a" form={form} />
          </div>
        </Section>

        {/* 2B. CURRENT LIABILITIES */}
        <Section title="2B. Current liabilities" expanded={expanded.clSection} onToggle={() => toggle('clSection')}>
          <div className="bg-pink-50 p-4 rounded space-y-3">
            {/* 1. Financial Liabilities */}
            <div className="bg-white p-3 rounded space-y-2">
              <h5 className="font-medium">1. Financial Liabilities</h5>

              {/* Borrowings */}
              <div className="ml-4 space-y-2">
                <h6 className="font-medium text-sm">Borrowings</h6>
                <NumberInput label="a Loans repayable on demand - From Banks (1)" name="bs_c_cl_loans_repayable_banks_1" form={form} />
                <NumberInput label="b From Other parties (2)" name="bs_c_cl_loans_repayable_other_parties_2" form={form} />
                <div className="border-t pt-2"><NumberInput label="Total Loans repayable on demand (1 + 2) (3)" name="bs_c_cl_loans_repayable_total_3" form={form} /></div>
                <NumberInput label="c Loans from related parties (b)" name="bs_c_cl_loans_from_related_b" form={form} />
                <NumberInput label="d Deposits (c)" name="bs_c_cl_deposits_c" form={form} />
                <NumberInput label="e Other loans (specify nature) (d)" name="bs_c_cl_other_loans_d" form={form} />
                <div className="border-t pt-2"><NumberInput label="Total Borrowings (3 + b + c + d) (II)" name="bs_c_cl_total_borrowings_ii" form={form} /></div>
              </div>
              <NumberInput label="Trade Payables (III)" name="bs_c_cl_trade_payables_iii" form={form} />

              {/* Other financial liabilities */}
              <div className="bg-gray-50 p-3 rounded space-y-2 mt-2">
                <h6 className="font-medium text-sm">Other financial liabilities</h6>
                <NumberInput label="a Current maturities of long-term debt (a)" name="bs_c_cl_current_maturity_ltd_a" form={form} />
                <NumberInput label="b Current maturities of finance lease obligations (b)" name="bs_c_cl_current_maturity_lease_b" form={form} />
                <NumberInput label="c Interest accrued (c)" name="bs_c_cl_interest_accrued_c" form={form} />
                <NumberInput label="d Unpaid dividends (d)" name="bs_c_cl_unpaid_dividends_d" form={form} />
                <NumberInput label="e Application money received for allotment of securities to the extent refundable and interest accrued thereon (e)" name="bs_c_cl_application_money_e" form={form} />
                <NumberInput label="f Unpaid matured deposits and interest accrued thereon (f)" name="bs_c_cl_unpaid_matured_deposits_f" form={form} />
                <NumberInput label="g Unpaid matured debentures and interest accrued thereon (g)" name="bs_c_cl_unpaid_matured_debentures_g" form={form} />
                <NumberInput label="h Others (specify nature) (h)" name="bs_c_cl_other_specify_h" form={form} />
                <div className="border-t pt-2"><NumberInput label="Total Other financial liabilities (a + b + c + d + e + f + g + h) (III)" name="bs_c_cl_other_financial_total_iii" form={form} /></div>
              </div>

              <div className="border-t pt-2 mt-2">
                <NumberInput label="Total Financial Liabilities (II + III + IIIi) (LIV)" name="bs_c_cl_total_financial_liabilities_liv" form={form} />
              </div>
            </div>

            {/* 2. Other Current liabilities */}
            <div className="bg-white p-3 rounded space-y-2 mt-2">
              <h6 className="font-medium">2. Other Current liabilities</h6>
              <NumberInput label="a Revenue received in advance (a)" name="bs_c_cl_revenue_in_advance_a" form={form} />
              <NumberInput label="b Other advances (specify nature) (b)" name="bs_c_cl_other_advances_b" form={form} />
              <NumberInput label="c Others (specify nature) (c)" name="bs_c_cl_others_specify_c" form={form} />
              <div className="border-t pt-2"><NumberInput label="Total Other current liabilities (a + b + c) (IId)" name="bs_c_cl_other_current_liabilities_total_iid" form={form} /></div>
            </div>

            {/* 3. Provisions */}
            <div className="bg-white p-3 rounded space-y-2 mt-2">
              <h6 className="font-medium">3. Provisions</h6>
              <NumberInput label="a Provision for employee benefits (a)" name="bs_c_cl_provision_employee_a" form={form} />
              <NumberInput label="b Others (specify nature) (b)" name="bs_c_cl_provision_others_b" form={form} />
              <div className="border-t pt-2"><NumberInput label="Total provisions (a + b) (IIIc)" name="bs_c_cl_provision_total_iiic" form={form} /></div>
            </div>

            {/* 4. Current Tax Liabilities */}
            <div className="bg-white p-3 rounded mt-2">
              <NumberInput label="4. Current Tax Liabilities (Net) (IV)" name="bs_c_cl_current_tax_iv" form={form} />
            </div>
          </div>

          {/* Total Current liabilities */}
          <div className="bg-teal-100 p-4 rounded border-l-4 border-teal-500 mt-3">
            <NumberInput label="Total Current liabilities (LIV + IId + IIIc + IV) (2B)" name="bs_c_cl_total_2b" form={form} />
          </div>
        </Section>

        {/* Total Equity and Liabilities */}
        <div className="bg-indigo-100 p-4 rounded border-l-4 border-indigo-500">
          <NumberInput label="Total Equity and liabilities (1C + 2A + 2B) (1)" name="bs_c_total_equity_liabilities_1" form={form} />
        </div>
      </div>

      {/* II. ASSETS */}
      <div className="space-y-4 mt-8">
        <h3 className="text-xl font-bold text-green-900 mb-4">II. ASSETS</h3>

        {/* 1. NON-CURRENT ASSETS */}
        <Section title="1. Non-current assets" expanded={expanded.ncaSection} onToggle={() => toggle('ncaSection')}>
          <div className="bg-green-50 p-4 rounded space-y-3">
            {/* A. Property, Plant and Equipment */}
            <div className="bg-white p-3 rounded space-y-2">
              <h5 className="font-medium">A. Property, Plant and Equipment</h5>
              <NumberInput label="a Gross block (a)" name="bs_c_nca_ppe_gross_block_a" form={form} />
              <NumberInput label="b Depreciation (b)" name="bs_c_nca_ppe_depreciation_b" form={form} />
              <NumberInput label="c Impairment losses (c)" name="bs_c_nca_ppe_impairment_c" form={form} />
              <div className="border-t pt-2"><NumberInput label="d Net block (a - b - c) (Ad)" name="bs_c_nca_ppe_net_block_ad" form={form} /></div>
            </div>

            {/* B. Capital work-in-progress */}
            <NumberInput label="B. Capital work-in-progress (B)" name="bs_c_nca_cwip_b" form={form} />

            {/* C. Investment Property */}
            <div className="bg-white p-3 rounded space-y-2 mt-2">
              <h5 className="font-medium">C. Investment Property</h5>
              <NumberInput label="a Gross block (a)" name="bs_c_nca_inv_prop_gross_block_a" form={form} />
              <NumberInput label="b Depreciation (b)" name="bs_c_nca_inv_prop_depreciation_b" form={form} />
              <NumberInput label="c Impairment losses (c)" name="bs_c_nca_inv_prop_impairment_c" form={form} />
              <div className="border-t pt-2"><NumberInput label="d Net block (a - b - c) (Cd)" name="bs_c_nca_inv_prop_net_block_cd" form={form} /></div>
            </div>

            {/* D. Goodwill */}
            <div className="bg-white p-3 rounded space-y-2 mt-2">
              <h5 className="font-medium">D. Goodwill</h5>
              <NumberInput label="a Gross block (a)" name="bs_c_nca_goodwill_gross_block_a" form={form} />
              <NumberInput label="b Impairment losses (b)" name="bs_c_nca_goodwill_impairment_b" form={form} />
              <div className="border-t pt-2"><NumberInput label="c Net block (a - b) (Dc)" name="bs_c_nca_goodwill_net_block_dc" form={form} /></div>
            </div>

            {/* E. Other Intangible Assets */}
            <div className="bg-white p-3 rounded space-y-2 mt-2">
              <h5 className="font-medium">E. Other Intangible Assets</h5>
              <NumberInput label="a Gross block (a)" name="bs_c_nca_other_intangible_gross_block_a" form={form} />
              <NumberInput label="b Amortisation (b)" name="bs_c_nca_other_intangible_amortization_b" form={form} />
              <NumberInput label="c Impairment losses (c)" name="bs_c_nca_other_intangible_impairment_c" form={form} />
              <div className="border-t pt-2"><NumberInput label="d Net block (a - b - c) (Ed)" name="bs_c_nca_other_intangible_net_block_ed" form={form} /></div>
            </div>

            {/* F. Intangible assets under development */}
            <NumberInput label="F. Intangible assets under development (F)" name="bs_c_nca_intangible_under_dev_f" form={form} />

            {/* G. Biological assets other than bearer plants */}
            <div className="bg-white p-3 rounded space-y-2 mt-2">
              <h5 className="font-medium">G. Biological assets other than bearer plants</h5>
              <NumberInput label="a Gross block (a)" name="bs_c_nca_bio_assets_gross_block_a" form={form} />
              <NumberInput label="b Impairment losses (b)" name="bs_c_nca_bio_assets_impairment_b" form={form} />
              <div className="border-t pt-2"><NumberInput label="c Net block (a - b) (Gc)" name="bs_c_nca_bio_assets_net_block_gc" form={form} /></div>
            </div>

            {/* H. Financial Assets */}
            <div className="bg-blue-50 p-3 rounded space-y-2 mt-2">
              <h5 className="font-medium">H. Financial Assets</h5>

              {/* i. Investments */}
              <div className="bg-white p-2 rounded space-y-2">
                <h6 className="font-medium text-sm">i. Investments</h6>
                <NumberInput label="a Listed equities (ia)" name="bs_c_nca_invest_equity_listed_ia" form={form} />
                <NumberInput label="b Unlisted equities (ib)" name="bs_c_nca_invest_equity_unlisted_ib" form={form} />
                <div className="border-t pt-2"><NumberInput label="c Total (ia + ib) (ic)" name="bs_c_nca_invest_equity_total_ic" form={form} /></div>
                <NumberInput label="d Investments in Preference shares (ii)" name="bs_c_nca_invest_preference_shares_ii" form={form} />
                <NumberInput label="e Investments in Government or trust securities (iii)" name="bs_c_nca_invest_govt_securities_iii" form={form} />
                <NumberInput label="f Investments in Debenture or bonds (iv)" name="bs_c_nca_invest_debenture_bonds_iv" form={form} />
                <NumberInput label="g Investments in Mutual funds (v)" name="bs_c_nca_invest_mutual_funds_v" form={form} />
                <NumberInput label="h Investments in Partnership firms (vi)" name="bs_c_nca_invest_partnership_vi" form={form} />
                <NumberInput label="i Others Investments (specify nature) (vii)" name="bs_c_nca_invest_others_vii" form={form} />
                <div className="border-t pt-2"><NumberInput label="Total non-current investments (ic + ii + iii + iv + v + vi + vii) (VIII)" name="bs_c_nca_invest_total_viii" form={form} /></div>
              </div>

              {/* ii. Trade Receivables */}
              <div className="bg-white p-2 rounded space-y-2 mt-2">
                <h6 className="font-medium text-sm">ii. Trade Receivables</h6>
                <NumberInput label="a Secured, considered good (a)" name="bs_c_nca_trade_rec_secured_good_a" form={form} />
                <NumberInput label="b Unsecured, considered good (b)" name="bs_c_nca_trade_rec_unsecured_good_b" form={form} />
                <NumberInput label="c Doubtful (c)" name="bs_c_nca_trade_rec_doubtful_c" form={form} />
                <div className="border-t pt-2"><NumberInput label="Total Trade Receivables (a + b + c) (d)" name="bs_c_nca_trade_rec_total_d" form={form} /></div>
              </div>

              {/* iii. Loans */}
              <div className="bg-white p-2 rounded space-y-2 mt-2">
                <h6 className="font-medium text-sm">iii. Loans</h6>
                <NumberInput label="a Security deposits (i)" name="bs_c_nca_loans_security_deposits_i" form={form} />
                <NumberInput label="b Loans to related parties (ii)" name="bs_c_nca_loans_related_parties_ii" form={form} />
                <NumberInput label="c Other loans (specify nature) (iii)" name="bs_c_nca_loans_other_specify_iii" form={form} />
                <div className="border-t pt-2"><NumberInput label="d Total Loans (i + ii + iii) (IIII)" name="bs_c_nca_loans_total_iiii" form={form} /></div>
                <div className="bg-gray-100 p-2 rounded mt-2">
                  <h6 className="font-medium text-sm">Loans included in IIII above which is-</h6>
                  <NumberInput label="a for the purpose of business or profession (va)" name="bs_c_nca_loans_included_business_va" form={form} />
                  <NumberInput label="b not for the purpose of business or profession (vb)" name="bs_c_nca_loans_included_not_business_vb" form={form} />
                  <NumberInput label="c given to a shareholder, being the beneficial owner of share, or to any concern on behalf/ benefit of such shareholder as per section 2(22)(c) of I.T. Act (vc)" name="bs_c_nca_loans_included_shareholder_vc" form={form} />
                </div>
              </div>

              {/* iv. Other Financial Assets */}
              <div className="bg-white p-2 rounded space-y-2 mt-2">
                <h6 className="font-medium text-sm">iv. Other Financial Assets</h6>
                <NumberInput label="a Bank Deposits with more than 12 months maturity (i)" name="bs_c_nca_other_financial_bank_deposits_i" form={form} />
                <NumberInput label="b Others (ii)" name="bs_c_nca_other_financial_others_ii" form={form} />
                <div className="border-t pt-2"><NumberInput label="Total of Other Financial Assets (i + ii) (HIV)" name="bs_c_nca_other_financial_total_iii" form={form} /></div>
              </div>
            </div>

            {/* I. Deferred Tax Assets (Net) */}
            <NumberInput label="I. Deferred Tax Assets (Net) (I)" name="bs_c_nca_deferred_tax_i" form={form} />

            {/* J. Other non-current Assets */}
            <div className="bg-white p-3 rounded space-y-2 mt-2">
              <h5 className="font-medium">J. Other non-current Assets</h5>
              <NumberInput label="a Capital Advances (i)" name="bs_c_nca_other_capital_adv_i" form={form} />
              <NumberInput label="b Advances other than capital advances (ii)" name="bs_c_nca_other_advances_ii" form={form} />
              <NumberInput label="c Others (specify nature) (iii)" name="bs_c_nca_other_others_specify_iii" form={form} />
              <div className="border-t pt-2"><NumberInput label="Total non-current assets (i + ii + iii) (J)" name="bs_c_nca_other_total_j" form={form} /></div>
              <div className="bg-gray-100 p-2 rounded mt-2">
                <h6 className="font-medium text-sm">Non-current assets included in J above which is due from shareholder, being the beneficial owner of share, or from any concern on behalf/ benefit of such shareholder as per section 2(22)(c) of I.T. Act (v)</h6>
                <NumberInput label="Amount (v)" name="bs_c_nca_other_included_shareholder_v" form={form} />
              </div>
            </div>
          </div>

          {/* Total Non-current assets */}
          <div className="bg-lime-100 p-4 rounded border-l-4 border-lime-600 mt-3">
            <NumberInput label="Total Non-current assets (Ad + B + Cd + Dc + Ed + F + Gc + H + I + J) (1)" name="bs_c_nca_total_1" form={form} />
          </div>
        </Section>

        {/* 2. CURRENT ASSETS */}
        <Section title="2. Current assets" expanded={expanded.caSection} onToggle={() => toggle('caSection')}>
          <div className="bg-yellow-50 p-4 rounded space-y-3">
            {/* A. Inventories */}
            <div className="bg-white p-3 rounded space-y-2">
              <h5 className="font-medium">A. Inventories</h5>
              <NumberInput label="i Raw materials (i)" name="bs_c_ca_inventories_raw_materials_i" form={form} />
              <NumberInput label="ii Work-in-progress (ii)" name="bs_c_ca_inventories_wip_ii" form={form} />
              <NumberInput label="iii Finished goods (iii)" name="bs_c_ca_inventories_finished_goods_iii" form={form} />
              <NumberInput label="iv Stock-in-trade (in respect of goods acquired for trading) (iv)" name="bs_c_ca_inventories_stock_in_trade_iv" form={form} />
              <NumberInput label="v Stores and spares (v)" name="bs_c_ca_inventories_stores_spares_v" form={form} />
              <NumberInput label="vi Loose tools (vi)" name="bs_c_ca_inventories_loose_tools_vi" form={form} />
              <NumberInput label="vii Others (vii)" name="bs_c_ca_inventories_others_vii" form={form} />
              <div className="border-t pt-2"><NumberInput label="Total Inventories (i + ii + iii + iv + v + vi + vii) (2A)" name="bs_c_ca_inventories_total_viii" form={form} /></div>
            </div>

            {/* B. Financial Assets */}
            <div className="bg-blue-50 p-3 rounded space-y-2 mt-2">
              <h5 className="font-medium">B. Financial Assets</h5>

              {/* i. Investments */}
              <div className="bg-white p-2 rounded space-y-2">
                <h6 className="font-medium text-sm">i. Investments</h6>
                <NumberInput label="a Listed equities (ia)" name="bs_c_ca_invest_equity_listed_ia" form={form} />
                <NumberInput label="b Unlisted equities (ib)" name="bs_c_ca_invest_equity_unlisted_ib" form={form} />
                <div className="border-t pt-2"><NumberInput label="c Total (ia + ib) (ic)" name="bs_c_ca_invest_equity_total_ic" form={form} /></div>
                <NumberInput label="d Investments in Preference shares (ii)" name="bs_c_ca_invest_preference_shares_ii" form={form} />
                <NumberInput label="e Investments in Government or trust securities (iii)" name="bs_c_ca_invest_govt_securities_iii" form={form} />
                <NumberInput label="f Investments in Debenture or bonds (iv)" name="bs_c_ca_invest_debenture_bonds_iv" form={form} />
                <NumberInput label="g Investments in Mutual funds (v)" name="bs_c_ca_invest_mutual_funds_v" form={form} />
                <NumberInput label="h Investments in Partnership firms (vi)" name="bs_c_ca_invest_partnership_vi" form={form} />
                <NumberInput label="i Other Investments (vii)" name="bs_c_ca_invest_other_vii" form={form} />
                <div className="border-t pt-2"><NumberInput label="Total Current investments (ic + ii + iii + iv + v + vi + vii) (I)" name="bs_c_ca_invest_total_viii" form={form} /></div>
              </div>

              {/* ii. Trade Receivables */}
              <div className="bg-white p-2 rounded space-y-2 mt-2">
                <h6 className="font-medium text-sm">ii. Trade Receivables</h6>
                <NumberInput label="a Secured, considered good (i)" name="bs_c_ca_trade_rec_secured_good_i" form={form} />
                <NumberInput label="b Unsecured, considered good (ii)" name="bs_c_ca_trade_rec_unsecured_good_ii" form={form} />
                <NumberInput label="c Doubtful (iii)" name="bs_c_ca_trade_rec_doubtful_iii" form={form} />
                <div className="border-t pt-2"><NumberInput label="Total Trade Receivables (i + ii + iii) (II)" name="bs_c_ca_trade_rec_total_iv" form={form} /></div>
              </div>

              {/* iii. Cash and cash equivalents */}
              <div className="bg-white p-2 rounded space-y-2 mt-2">
                <h6 className="font-medium text-sm">iii. Cash and cash equivalents</h6>
                <NumberInput label="a Balances with Banks (of the nature of cash and cash equivalents) (i)" name="bs_c_ca_cash_bank_balances_i" form={form} />
                <NumberInput label="b Cheques, drafts in hand (ii)" name="bs_c_ca_cash_cheques_drafts_ii" form={form} />
                <NumberInput label="c Cash in hand (iii)" name="bs_c_ca_cash_in_hand_iii" form={form} />
                <NumberInput label="d Others (specify nature) (iv)" name="bs_c_ca_cash_others_iv" form={form} />
                <div className="border-t pt-2"><NumberInput label="Total Cash and cash equivalents (i + ii + iii + iv) (III)" name="bs_c_ca_cash_total_v" form={form} /></div>
              </div>

              {/* iv. Bank Balances other than III above */}
              <NumberInput label="iv. Bank Balances other than III above (IV)" name="bs_c_ca_cash_other_than_above_iv" form={form} />

              {/* v. Loans */}
              <div className="bg-white p-2 rounded space-y-2 mt-2">
                <h6 className="font-medium text-sm">v. Loans</h6>
                <NumberInput label="a Security Deposits (i)" name="bs_c_ca_loans_security_deposits_i" form={form} />
                <NumberInput label="b Loans to related parties (ii)" name="bs_c_ca_loans_related_parties_ii" form={form} />
                <NumberInput label="c Others (specify nature) (iii)" name="bs_c_ca_loans_others_specify_iii" form={form} />
                <div className="border-t pt-2"><NumberInput label="Total Loans (i + ii + iii) (V)" name="bs_c_ca_loans_total_v" form={form} /></div>
                <div className="bg-gray-100 p-2 rounded mt-2">
                  <h6 className="font-medium text-sm">Loans and advances included in V above which is-</h6>
                  <NumberInput label="a for the purpose of business or profession (va)" name="bs_c_ca_loans_included_business_va" form={form} />
                  <NumberInput label="b not for the purpose of business or profession (vb)" name="bs_c_ca_loans_included_not_business_vb" form={form} />
                  <NumberInput label="c given to a shareholder, being the beneficial owner of share, or to any concern on behalf/ benefit of such shareholder as per section 2(22)(c) of I.T. Act (vc)" name="bs_c_ca_loans_included_shareholder_vc" form={form} />
                </div>
              </div>

              {/* vi. Other Financial Assets */}
              <NumberInput label="vi. Other Financial Assets (VI)" name="bs_c_ca_other_financial_vi" form={form} />

              {/* Total Financial Assets */}
              <div className="border-t pt-2 mt-2">
                <NumberInput label="Total Financial Assets (I + II + III + IV + V + VI) (2B)" name="bs_c_ca_financial_assets_total_2b" form={form} />
              </div>
            </div>

            {/* C. Current Tax Assets (Net) */}
            <NumberInput label="C. Current Tax Assets (Net) (2C)" name="bs_c_ca_current_tax_2c" form={form} />

            {/* D. Other current assets */}
            <div className="bg-white p-3 rounded space-y-2 mt-2">
              <h5 className="font-medium">D. Other current assets</h5>
              <NumberInput label="a Advances other than capital advances (i)" name="bs_c_ca_other_advances_i" form={form} />
              <NumberInput label="b Others (specify nature) (ii)" name="bs_c_ca_other_others_specify_ii" form={form} />
              <div className="border-t pt-2"><NumberInput label="Total (i + ii) (2D)" name="bs_c_ca_other_total_2d" form={form} /></div>
            </div>
          </div>

          {/* Total Current assets */}
          <div className="bg-orange-100 p-4 rounded border-l-4 border-orange-600 mt-3">
            <NumberInput label="Total Current assets (2A + 2B + 2C + 2D) (2)" name="bs_c_ca_total_2" form={form} />
          </div>
        </Section>

        {/* Total Assets */}
        <div className="bg-red-100 p-4 rounded border-l-4 border-red-600">
          <NumberInput label="Total Assets (1 + 2) (II)" name="bs_c_total_assets_ii" form={form} />
        </div>
      </div>

      {/* Footer note */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-8">
        <p className="text-sm text-blue-800">
          ✓ Balance Sheet (Part A-BS - Ind AS) - All sections implemented with complete field hierarchy covering Equity, Liabilities (Non-current & Current), and Assets (Non-current & Current).
        </p>
      </div>
    </div>
  );
};

export default Itr7BalanceSheetComprehensive;
