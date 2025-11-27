export interface ITR7BalanceSheetComprehensiveData {
  // ============================================
  // I. EQUITY AND LIABILITIES
  // ============================================

  // 1. EQUITY
  // A. Equity share capital
  bs_c_eq_share_capital_authorised_ai?: number;
  bs_c_eq_share_capital_issued_subscribed_aii?: number;
  bs_c_eq_share_capital_subscribed_not_paid_aiii?: number;
  bs_c_eq_share_capital_total_aiv?: number;

  // B. Other Equity
  // i. Other Reserves
  bs_c_eq_other_reserves_capital_redemption_ia?: number;
  bs_c_eq_other_reserves_debenture_redemption_ib?: number;
  bs_c_eq_other_reserves_share_options_ic?: number;
  bs_c_eq_other_reserves_other_specify_id?: number;
  bs_c_eq_other_reserves_total_ie?: number;

  // ii. Retained earnings (Debit balance of statement of P&L)
  bs_c_eq_retained_earnings_ii?: number;

  // iii. Total (Bie + ii)
  bs_c_eq_other_equity_total_biii?: number;

  // C. Total Equity (Aiv + Biii)
  bs_c_eq_total_ic?: number;

  // ============================================
  // 2. LIABILITIES
  // ============================================

  // 2A - NON-CURRENT LIABILITIES
  // A. Non-current liabilities
  // 1. Financial Liabilities
  // Borrowings
  bs_c_ncl_borrowings_bonds_foreign_a1?: number;
  bs_c_ncl_borrowings_bonds_rupee_a2?: number;
  bs_c_ncl_borrowings_bonds_total_a3?: number;

  // Term loans
  bs_c_ncl_termloan_foreign_b1?: number;
  bs_c_ncl_termloan_rupee_banks_b2i?: number;
  bs_c_ncl_termloan_rupee_others_b2ii?: number;
  bs_c_ncl_termloan_rupee_total_b2iii?: number;
  bs_c_ncl_termloan_total_b3?: number;

  bs_c_ncl_deferred_payment_c?: number;
  bs_c_ncl_deposits_d?: number;
  bs_c_ncl_loans_related_e?: number;
  bs_c_ncl_finance_lease_f?: number;
  bs_c_ncl_compound_financial_g?: number;
  bs_c_ncl_other_loans_h?: number;

  bs_c_ncl_borrowings_total_i?: number;
  bs_c_ncl_trade_payables_j?: number;
  bs_c_ncl_other_financial_liabilities_k?: number;

  // 2. Provisions
  bs_c_ncl_provision_employee_benefits_iia?: number;
  bs_c_ncl_provision_others_iib?: number;
  bs_c_ncl_provision_total_iic?: number;

  // 3. Deferred tax liabilities (net)
  bs_c_ncl_deferred_tax_iii?: number;

  // 4. Other non-current liabilities
  bs_c_ncl_other_advances_iva?: number;
  bs_c_ncl_other_specify_ivb?: number;
  bs_c_ncl_other_total_ivc?: number;

  // Total Non-current Liabilities (I + II + III + IV)
  bs_c_ncl_total_2a?: number;

  // 2B - CURRENT LIABILITIES
  // 1. Financial Liabilities
  // Borrowings
  bs_c_cl_loans_repayable_banks_1?: number;
  bs_c_cl_loans_repayable_other_parties_2?: number;
  bs_c_cl_loans_repayable_total_3?: number;

  bs_c_cl_loans_from_related_b?: number;
  bs_c_cl_deposits_c?: number;
  bs_c_cl_other_loans_d?: number;

  bs_c_cl_total_borrowings_ii?: number;
  bs_c_cl_trade_payables_iii?: number;

  // Other financial liabilities
  bs_c_cl_current_maturity_ltd_a?: number;
  bs_c_cl_current_maturity_lease_b?: number;
  bs_c_cl_interest_accrued_c?: number;
  bs_c_cl_unpaid_dividends_d?: number;
  bs_c_cl_application_money_e?: number;
  bs_c_cl_unpaid_matured_deposits_f?: number;
  bs_c_cl_unpaid_matured_debentures_g?: number;
  bs_c_cl_other_specify_h?: number;
  bs_c_cl_other_financial_total_iii?: number;

  bs_c_cl_total_financial_liabilities_liv?: number;

  // 2. Other Current liabilities
  bs_c_cl_revenue_in_advance_a?: number;
  bs_c_cl_other_advances_b?: number;
  bs_c_cl_others_specify_c?: number;
  bs_c_cl_other_current_liabilities_total_iid?: number;

  // 3. Provisions
  bs_c_cl_provision_employee_a?: number;
  bs_c_cl_provision_others_b?: number;
  bs_c_cl_provision_total_iiic?: number;

  // 4. Current Tax Liabilities (Net)
  bs_c_cl_current_tax_iv?: number;

  // Total Current liabilities (I + II + III + IV)
  bs_c_cl_total_2b?: number;

  // Total Equity and liabilities (1C + 2A + 2B)
  bs_c_total_equity_liabilities_1?: number;

  // ============================================
  // II. ASSETS
  // ============================================

  // 1. NON-CURRENT ASSETS
  // A. Property, Plant and Equipment
  bs_c_nca_ppe_gross_block_a?: number;
  bs_c_nca_ppe_depreciation_b?: number;
  bs_c_nca_ppe_impairment_c?: number;
  bs_c_nca_ppe_net_block_ad?: number;

  // B. Capital work-in-progress
  bs_c_nca_cwip_b?: number;

  // C. Investment Property
  bs_c_nca_inv_prop_gross_block_a?: number;
  bs_c_nca_inv_prop_depreciation_b?: number;
  bs_c_nca_inv_prop_impairment_c?: number;
  bs_c_nca_inv_prop_net_block_cd?: number;

  // D. Goodwill
  bs_c_nca_goodwill_gross_block_a?: number;
  bs_c_nca_goodwill_impairment_b?: number;
  bs_c_nca_goodwill_net_block_dc?: number;

  // E. Other Intangible Assets
  bs_c_nca_other_intangible_gross_block_a?: number;
  bs_c_nca_other_intangible_amortization_b?: number;
  bs_c_nca_other_intangible_impairment_c?: number;
  bs_c_nca_other_intangible_net_block_ed?: number;

  // F. Intangible assets under development
  bs_c_nca_intangible_under_dev_f?: number;

  // G. Biological assets other than bearer plants
  bs_c_nca_bio_assets_gross_block_a?: number;
  bs_c_nca_bio_assets_impairment_b?: number;
  bs_c_nca_bio_assets_net_block_gc?: number;

  // H. Financial Assets
  // i. Investments
  bs_c_nca_invest_equity_listed_ia?: number;
  bs_c_nca_invest_equity_unlisted_ib?: number;
  bs_c_nca_invest_equity_total_ic?: number;
  bs_c_nca_invest_preference_shares_ii?: number;
  bs_c_nca_invest_govt_securities_iii?: number;
  bs_c_nca_invest_debenture_bonds_iv?: number;
  bs_c_nca_invest_mutual_funds_v?: number;
  bs_c_nca_invest_partnership_vi?: number;
  bs_c_nca_invest_others_vii?: number;
  bs_c_nca_invest_total_viii?: number;

  // ii. Trade Receivables
  bs_c_nca_trade_rec_secured_good_a?: number;
  bs_c_nca_trade_rec_unsecured_good_b?: number;
  bs_c_nca_trade_rec_doubtful_c?: number;
  bs_c_nca_trade_rec_total_d?: number;

  // iii. Loans
  bs_c_nca_loans_security_deposits_i?: number;
  bs_c_nca_loans_related_parties_ii?: number;
  bs_c_nca_loans_other_specify_iii?: number;
  bs_c_nca_loans_total_iiii?: number;
  bs_c_nca_loans_included_business_va?: number;
  bs_c_nca_loans_included_not_business_vb?: number;
  bs_c_nca_loans_included_shareholder_vc?: number;

  // iv. Other Financial Assets
  bs_c_nca_other_financial_bank_deposits_i?: number;
  bs_c_nca_other_financial_others_ii?: number;
  bs_c_nca_other_financial_total_iii?: number;

  // i. Deferred Tax Assets (Net)
  bs_c_nca_deferred_tax_i?: number;

  // J. Other non-current Assets
  bs_c_nca_other_capital_adv_i?: number;
  bs_c_nca_other_advances_ii?: number;
  bs_c_nca_other_others_specify_iii?: number;
  bs_c_nca_other_total_j?: number;
  bs_c_nca_other_included_shareholder_v?: number;

  // Total Non-current assets (Ad + B + Cd + Dc + Ed + F + Gc + H + I + J)
  bs_c_nca_total_1?: number;

  // ============================================
  // 2. CURRENT ASSETS
  // ============================================

  // A. Inventories
  bs_c_ca_inventories_raw_materials_i?: number;
  bs_c_ca_inventories_wip_ii?: number;
  bs_c_ca_inventories_finished_goods_iii?: number;
  bs_c_ca_inventories_stock_in_trade_iv?: number;
  bs_c_ca_inventories_stores_spares_v?: number;
  bs_c_ca_inventories_loose_tools_vi?: number;
  bs_c_ca_inventories_others_vii?: number;
  bs_c_ca_inventories_total_viii?: number;

  // B. Financial Assets
  // i. Investments
  bs_c_ca_invest_equity_listed_ia?: number;
  bs_c_ca_invest_equity_unlisted_ib?: number;
  bs_c_ca_invest_equity_total_ic?: number;
  bs_c_ca_invest_preference_shares_ii?: number;
  bs_c_ca_invest_govt_securities_iii?: number;
  bs_c_ca_invest_debenture_bonds_iv?: number;
  bs_c_ca_invest_mutual_funds_v?: number;
  bs_c_ca_invest_partnership_vi?: number;
  bs_c_ca_invest_other_vii?: number;
  bs_c_ca_invest_total_viii?: number;

  // ii. Trade Receivables
  bs_c_ca_trade_rec_secured_good_i?: number;
  bs_c_ca_trade_rec_unsecured_good_ii?: number;
  bs_c_ca_trade_rec_doubtful_iii?: number;
  bs_c_ca_trade_rec_total_iv?: number;

  // iii. Cash and cash equivalents
  bs_c_ca_cash_bank_balances_i?: number;
  bs_c_ca_cash_cheques_drafts_ii?: number;
  bs_c_ca_cash_in_hand_iii?: number;
  bs_c_ca_cash_others_iv?: number;
  bs_c_ca_cash_total_v?: number;

  // iv. Bank Balances other than above
  bs_c_ca_cash_other_than_above_iv?: number;

  // v. Loans
  bs_c_ca_loans_security_deposits_i?: number;
  bs_c_ca_loans_related_parties_ii?: number;
  bs_c_ca_loans_others_specify_iii?: number;
  bs_c_ca_loans_total_v?: number;
  bs_c_ca_loans_included_business_va?: number;
  bs_c_ca_loans_included_not_business_vb?: number;
  bs_c_ca_loans_included_shareholder_vc?: number;

  // vi. Other Financial Assets
  bs_c_ca_other_financial_vi?: number;

  // Total Financial Assets (i + ii + iii + iv + v + vi)
  bs_c_ca_financial_assets_total_2b?: number;

  // C. Current Tax Assets (Net)
  bs_c_ca_current_tax_2c?: number;

  // D. Other current assets
  bs_c_ca_other_advances_i?: number;
  bs_c_ca_other_others_specify_ii?: number;
  bs_c_ca_other_total_iii?: number;
  bs_c_ca_other_total_2d?: number;

  // Total Current assets (A + B + C + D)
  bs_c_ca_total_2?: number;

  // Total Assets (1 + 2)
  bs_c_total_assets_ii?: number;
}

export type ITR7BalanceSheetComprehensiveField = keyof ITR7BalanceSheetComprehensiveData;