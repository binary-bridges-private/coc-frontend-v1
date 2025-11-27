export interface ITR7FormData {
  // Part A-GEN - GENERAL (PERSONAL INFORMATION)
  
  // (A1) Name
  gen_name?: string;

  // ============================================
  // Part A-BS - BALANCE SHEET
  // ============================================
  
  // I. Equity and Liabilities
   bs_share_capital_authorised_ai?: number;
  bs_share_capital_issued_subscribed_paidup_aii?: number;
  bs_share_capital_subscribed_not_fully_paid_aiii?: number;
  bs_share_capital_total_aiv?: number;

  bs_reserves_capital_bi?: number;
  bs_reserves_capital_redemption_bii?: number;
  bs_reserves_securities_premium_biii?: number;
  bs_reserves_debenture_redemption_biv?: number;
  bs_reserves_revaluation_bv?: number;
  bs_reserves_share_options_outstanding_bvi?: number;
  bs_reserves_other_vii_a?: number;
  bs_reserves_other_vii_b?: number;
  bs_reserves_other_total_bvii?: number;
  bs_reserves_surplus_bviii?: number;
  bs_reserves_total_bix?: number;

  bs_money_against_share_warrants_1c?: number;
  bs_total_shareholders_fund_1d?: number;

  bs_share_app_pending_lt1yr_2i?: number;
  bs_share_app_pending_gt1yr_2ii?: number;
  bs_share_app_pending_total_2iii?: number;

  // 3. Non-current liabilities
  bs_ncl_bonds_foreign_ia?: number;
  bs_ncl_bonds_rupee_ib?: number;
  bs_ncl_bonds_total_ic?: number;

  bs_ncl_termloan_foreign_iia?: number;
  bs_ncl_termloan_rupee_banks_b1?: number;
  bs_ncl_termloan_rupee_others_b2?: number;
  bs_ncl_termloan_rupee_total_b3?: number;
  bs_ncl_termloan_total_iic?: number;

  bs_ncl_deferred_payment_liabilities_iii?: number;
  bs_ncl_deposits_related_iv?: number;
  bs_ncl_other_deposits_v?: number;
  bs_ncl_loans_adv_rel_vi?: number;
  bs_ncl_other_loans_adv_vii?: number;
  bs_ncl_finance_lease_maturities_viii?: number;
  bs_ncl_longterm_borrowings_total_3a?: number;

  bs_ncl_deferred_tax_liability_net_3b?: number;

  bs_ncl_other_longterm_trade_payables_i?: number;
  bs_ncl_other_longterm_others_ii?: number;
  bs_ncl_other_longterm_total_3c?: number;

  bs_ncl_longterm_provisions_employee_i?: number;
  bs_ncl_longterm_provisions_others_ii?: number;
  bs_ncl_longterm_provisions_total_3d?: number;

  bs_ncl_total_3e?: number;

  // 4. Current liabilities
  bs_cl_str_loans_banks_ia?: number;
  bs_cl_str_loans_nbfc_ib?: number;
  bs_cl_str_loans_fin_inst_ic?: number;
  bs_cl_str_loans_others_id?: number;
  bs_cl_str_loans_total_ie?: number;

  bs_cl_deposits_related_ii?: number;
  bs_cl_loans_adv_related_iii?: number;
  bs_cl_other_loans_adv_iv?: number;
  bs_cl_other_deposits_v?: number;
  bs_cl_shortterm_borrowings_total_4a?: number;

  bs_cl_trade_payables_gt1yr_i?: number;
  bs_cl_trade_payables_others_ii?: number;
  bs_cl_trade_payables_total_4b?: number;

  bs_cl_other_current_maturity_ltd_i?: number;
  bs_cl_other_current_maturity_lease_ii?: number;
  bs_cl_other_interest_accrued_not_due_iii?: number;
  bs_cl_other_interest_accrued_due_iv?: number;
  bs_cl_other_income_received_in_advance_v?: number;
  bs_cl_other_unpaid_dividends_vi?: number;
  bs_cl_other_application_money_refund_vii?: number;
  bs_cl_other_unpaid_matured_deposits_viii?: number;
  bs_cl_other_unpaid_matured_debentures_ix?: number;
  bs_cl_other_other_payables_x?: number;
  bs_cl_other_current_total_4c?: number;

  bs_cl_shortterm_prov_employee_i?: number;
  bs_cl_shortterm_prov_incometax_ii?: number;
  bs_cl_shortterm_prov_dividend_iii?: number;
  bs_cl_shortterm_prov_tax_on_dividend_iv?: number;
  bs_cl_shortterm_prov_other_v?: number;
  bs_cl_shortterm_prov_total_4d?: number;

  bs_cl_total_4e?: number;
  bs_total_equity_liabilities_i?: number;

  // II. Assets
  // 1. Non-current assets
  bs_nca_fixed_tangible_gross_ia?: number;
  bs_nca_fixed_tangible_dep_ib?: number;
  bs_nca_fixed_tangible_impairment_ic?: number;
  bs_nca_fixed_tangible_net_id?: number;

  bs_nca_fixed_intangible_gross_iia?: number;
  bs_nca_fixed_intangible_amort_iib?: number;
  bs_nca_fixed_intangible_impairment_iic?: number;
  bs_nca_fixed_intangible_net_iid?: number;

  bs_nca_fixed_cwip_iii?: number;
  bs_nca_fixed_intangible_under_dev_iv?: number;
  bs_nca_fixed_total_av?: number;

  bs_nca_invest_property_i?: number;
  bs_nca_invest_equity_listed_iia?: number;
  bs_nca_invest_equity_unlisted_iib?: number;
  bs_nca_invest_equity_total_iic?: number;
  bs_nca_invest_preference_shares_iii?: number;
  bs_nca_invest_govt_trust_iv?: number;
  bs_nca_invest_debenture_bonds_v?: number;
  bs_nca_invest_mutual_funds_vi?: number;
  bs_nca_invest_partnership_vii?: number;
  bs_nca_invest_others_viii?: number;
  bs_nca_invest_total_bix?: number;

  bs_nca_deferred_tax_assets_net_c?: number;

  bs_nca_lta_capital_adv_i?: number;
  bs_nca_lta_security_deposits_ii?: number;
  bs_nca_lta_loans_adv_related_iii?: number;
  bs_nca_lta_other_loans_adv_iv?: number;
  bs_nca_lta_total_dv?: number;
  bs_nca_lta_included_business_via?: number;
  bs_nca_lta_included_not_business_vib?: number;
  bs_nca_lta_included_222e_vic?: number;

  bs_nca_other_traderec_sec_good_ia?: number;
  bs_nca_other_traderec_unsec_good_ib?: number;
  bs_nca_other_traderec_doubtful_ic?: number;
  bs_nca_other_traderec_total_id?: number;
  bs_nca_other_others_ii?: number;
  bs_nca_other_total_eiii?: number;
  bs_nca_other_included_222e_iv?: number;
  bs_nca_total_1f?: number;

  // 2. Current assets
  bs_ca_invest_equity_listed_ia?: number;
  bs_ca_invest_equity_unlisted_ib?: number;
  bs_ca_invest_equity_total_ic?: number;
  bs_ca_invest_preference_shares_ii?: number;
  bs_ca_invest_govt_trust_iii?: number;
  bs_ca_invest_debenture_bonds_iv?: number;
  bs_ca_invest_mutual_funds_v?: number;
  bs_ca_invest_partnership_vi?: number;
  bs_ca_invest_other_vii?: number;
  bs_ca_invest_total_aviii?: number;

  bs_ca_inventories_raw_i?: number;
  bs_ca_inventories_wip_ii?: number;
  bs_ca_inventories_finished_iii?: number;
  bs_ca_inventories_stock_in_trade_iv?: number;
  bs_ca_inventories_stores_spares_v?: number;
  bs_ca_inventories_loose_tools_vi?: number;
  bs_ca_inventories_others_vii?: number;
  bs_ca_inventories_total_bviii?: number;

  bs_ca_receivables_gt6mo_i?: number;
  bs_ca_receivables_others_ii?: number;
  bs_ca_receivables_total_ciii?: number;

  bs_ca_cash_bank_balances_i?: number;
  bs_ca_cash_cheques_drafts_ii?: number;
  bs_ca_cash_in_hand_iii?: number;
  bs_ca_cash_others_iv?: number;
  bs_ca_cash_total_dv?: number;

  bs_ca_st_loans_adv_related_i?: number;
  bs_ca_st_loans_adv_others_ii?: number;
  bs_ca_st_loans_adv_total_eiii?: number;
  bs_ca_st_loans_included_business_iva?: number;
  bs_ca_st_loans_included_not_business_ivb?: number;
  bs_ca_st_loans_included_222e_ivc?: number;

  bs_ca_other_current_assets_f?: number;
  bs_ca_total_2g?: number;

  bs_total_assets_ii?: number;

  // ============================================
  // End Part A-BS
  // ============================================
  
  // (A2) PAN
  gen_pan?: string;
  
  // (A3) Name change
  gen_name_change?: string; // Yes/No
  gen_old_name?: string;
  
  // (A4) Corporate Identity Number (CIN)
  gen_cin?: string;
  
  // (A8) Flat/Door/Block No
  gen_flat_door_block?: string;
  
  // (A9) Name of Premises/Building/Village
  gen_premises_building?: string;
  
  // (A5) Date of incorporation
  gen_incorporation_date?: string; // DD/MM/YYYY
  
  // (A6) Date of commencement of business
  gen_commencement_date?: string; // DD/MM/YYYY
  
  // (A10) Road/Street/Post Office
  gen_road_street_post?: string;
  
  // (A11) Area/Locality
  gen_area_locality?: string;
  
  // (A7) Type of company
  gen_company_type?: 'domestic' | 'foreign';
  gen_company_classification?: string; // Public-6, Private-7
  
  // (A12) Town/City/District
  gen_town_city_district?: string;
  
  // (A13) State
  gen_state?: string;
  
  // (A14) Pin code/Zip code
  gen_pin_code?: string;
  
  // (A15) Country
  gen_country?: string;
  
  // (A16) Office Phone Number with STD code/Mobile No. 1
  gen_office_phone_std?: string;
  gen_office_phone_number?: string;
  
  // (A17) Mobile No. 2
  gen_mobile_2?: string;
  
  // (A18) Email Address-1
  gen_email_1?: string;
  
  // Email Address-2
  gen_email_2?: string;
  
  // (A19) Due date for filing return of income
  gen_due_date_type?: '31st October' | '30th November';
  
  // (A19)(aii) Filing status
  gen_filing_139_1?: boolean; // On or Before due date
  gen_filing_92cd?: boolean; // Modified return
  gen_filing_119_2b?: boolean; // After condonation of delay
  gen_filing_170a?: boolean; // After order by tribunal/court
  
  gen_filing_139_9?: boolean;
  gen_filing_142_1?: boolean;
  gen_filing_148?: boolean;
  gen_filing_153c?: boolean;
  
  // (A19)(b) Receipt Number
  gen_receipt_number?: string;
  gen_receipt_date?: string; // DD/MM/YYYY
  
  // (A19)(c) Response to notice
  gen_response_notice_139_9?: boolean;
  gen_response_notice_142_1?: boolean;
  gen_response_notice_148_153c?: boolean;
  gen_response_notice_119_2b?: boolean;
  gen_response_notice_170a?: boolean;
  gen_unique_doc_number?: string;
  gen_notice_order_date?: string;
  gen_92cd_advance_pricing?: boolean;
  
  // (d) Residential Status
  gen_residential_status?: 'resident' | 'non_resident';
  
  // (e) Taxation option - Section 115BA/115BAA/115BAB
  gen_taxation_115ba?: boolean;
  gen_taxation_115baa?: boolean;
  gen_taxation_115bab?: boolean;
  gen_taxation_ay?: string;
  gen_taxation_ack_number?: string;
  
  gen_choosing_taxation?: string; // Yes/No
  gen_taxation_form_number?: string; // 10-IB/10-IC/10-ID
  gen_taxation_form_ack?: string;
  
  // (f) Whether total turnover/gross receipts exceeds 400 crores
  gen_turnover_exceeds_400cr?: string; // Yes/No
  
  // (g) Assessee resident of country with tax agreement
  gen_tax_agreement_country?: string; // Yes/No
  gen_tax_agreement_details?: string;
  
  // (h) Permanent Establishment (PE) in India
  gen_pe_in_india?: string; // Yes/No
  
  // (i) Significant Economic Presence (SEP) in India
  gen_sep_in_india?: string; // Yes/No
  gen_sep_payment_aggregate?: string; // Yes/No - Section 9(1)(i)
  gen_sep_users_in_india?: string; // Yes/No - Explanation 2A(b)
  
  // (j) Whether required registration under any law
  gen_registration_required?: string; // Yes/No
  gen_registration_details?: string;
  
  // Act under which registration required
  gen_registration_act?: string;
  gen_registration_date?: string; // DD/MM/YYYY
  gen_registration_number?: string;
  
  // (k) Financial statements compliance with Indian Accounting Standards
  gen_ind_accounting_standards?: string; // Yes/No
  gen_ifsc_centre?: string; // Yes/No
  gen_ifsc_convertible_foreign_exchange?: string; // Yes/No
  
  // (l) Whether under liquidation
  gen_under_liquidation?: string; // Yes/No
  
  // (m) Whether FII/FPI
  gen_is_fii_fpi?: string; // Yes/No
  gen_sebi_regn_no?: string;
  
  // (n) Whether producer company
  gen_producer_company?: string; // Yes/No
  
  // (o) Whether representative assessee
  gen_representative_assessee?: string; // Yes/No
  gen_rep_assessee_name?: string;
  gen_rep_assessee_capacity?: string;
  gen_rep_assessee_address?: string;
  gen_rep_assessee_pan_aadhaar?: string;
  
  // (q) Start-up recognition by DPIIT
  gen_startup_dpiit?: string; // Yes/No
  gen_startup_recognition_number?: string;
  gen_startup_certificate_received?: string; // Yes/No
  gen_startup_certification_number?: string;
  gen_startup_form2_declaration?: string; // Yes/No - para 5 of DPIIT
  gen_startup_form2_date?: string;
  
  // (r) Legal Entity Identifier (LEI) details
  gen_lei_number?: string;
  gen_lei_valid_upto?: string;
  
  // (s) Whether recognized as MSME
  gen_msme_recognized?: string; // Yes/No
  gen_msme_registration_number?: string;
  
  // Additional compliance fields
  gen_accounting_standards_followed?: string; // Yes/No
  gen_fii_fpi?: string; // Yes/No
  gen_exemption_first_schedule?: string; // Yes/No
  gen_startup_exemption?: string; // Yes/No
  gen_startup_certificate_number?: string;
  gen_startup_certificate_date?: string;
  gen_lei_obtained?: string; // Yes/No
  gen_msme_status?: string; // Yes/No
  
  // AUDIT INFORMATION
  
  // (a1) Liable to maintain accounts as per section 44AA
  gen_accounts_44aa?: string; // Yes/No
  
  // (a2) Whether declaring income only under specific sections
  gen_income_only_44ae_44bb_etc?: string; // Yes/No
  gen_total_sales_turnover_exceeds_1cr?: string; // Yes/No
  gen_turnover_exceeds_1cr_not_exceed_10cr?: string; // Yes/No
  
  // (a2i) Aggregate of amounts received
  gen_aggregate_amounts_received?: string; // Yes/No
  gen_aggregate_amounts_received_five_percent?: string; // Yes/No
  
  // (a2ii) Aggregate of payments made
  gen_aggregate_payments_made?: string; // Yes/No
  gen_aggregate_payments_exceeds_five_percent?: string; // Yes/No
  
  // (a2iii) Aggregate of payments for expenditure
  gen_aggregate_expenditure_payments?: string; // Yes/No
  gen_expenditure_exceeds_five_percent?: string; // Yes/No
  
  // (b) Liable for audit under section 44AB
  gen_audit_44ab?: string; // Yes/No
  gen_audit_automatic_yes?: boolean;
  
  // (bi) Conditions for audit
  gen_audit_sales_turnover_exceeds?: string; // Yes/No
  gen_audit_44bb_presumptive?: string; // Yes/No
  gen_audit_44bbb_presumptive?: string; // Yes/No
  gen_audit_44bba_presumptive?: string; // Yes/No
  gen_audit_others?: string; // Yes/No
  
  // (c) Whether accounts audited by accountant
  gen_accounts_audited?: string; // Yes/No
  
  // Audit details
  gen_audit_report_date?: string; // DD/MM/YYYY
  gen_auditor_name?: string;
  gen_auditor_membership_no?: string;
  gen_auditor_proprietorship_name?: string;
  gen_auditor_firm_regn_no?: string;
  gen_auditor_pan_aadhaar?: string;
  gen_audit_report_date_2?: string;
  gen_audit_permanent_account_number?: string;
  gen_audit_ack_number?: string;
  gen_audit_udin?: string;
  
  // (di) Liable for Audit u/s 92E
  gen_audit_92e?: string; // Yes/No
  
  // (dii) If audited u/s 92E
  gen_audit_92e_conducted?: string; // Yes/No
  gen_audit_92e_report_date?: string; // DD/MM/YYYY
  gen_audit_92e_ack_number?: string;
  
  // (diii) Liable to furnish other audit report
  gen_other_audit_report?: string; // Yes/No
  gen_other_audit_sl_no?: string;
  gen_other_audit_section_code?: string;
  gen_other_audit_date?: string; // DD/MM/YYYY
  gen_other_audit_ack_number?: string;
  
  // (e) Mention Act, section and date
  gen_other_act_name?: string;
  gen_other_act_section?: string;
  gen_other_act_date?: string;
  gen_other_act_registration_number?: string;
  
  // HOLDING STATUS
  
  // (a) Nature of company
  gen_nature_holding?: 'holding' | 'subsidiary' | 'both' | 'any_other';
  
  // (b) Holding company details
  gen_holding_company_pan?: string;
  gen_holding_company_name?: string;
  gen_holding_company_address?: string;
  gen_holding_company_percentage?: number;
  
  // (c) Subsidiary company details
  gen_subsidiary_company_pan?: string;
  gen_subsidiary_company_name?: string;
  gen_subsidiary_company_address?: string;
  gen_subsidiary_company_percentage?: number;
  
  // BUSINESS REORGANISATION
  
  // (a) Amalgamating company details
  gen_amalgamating_company_pan?: string;
  gen_amalgamating_company_name?: string;
  gen_amalgamating_company_address?: string;
  gen_amalgamating_date?: string;
  
  // (b) Amalgamated company details
  gen_amalgamated_company_pan?: string;
  gen_amalgamated_company_name?: string;
  gen_amalgamated_company_address?: string;
  gen_amalgamated_date?: string;
  
  // (c) Demerged company - resulting company
  gen_demerged_resulting_pan?: string;
  gen_demerged_resulting_name?: string;
  gen_demerged_resulting_address?: string;
  gen_demerged_resulting_date?: string;
  
  // (d) Resulting company - demerged company
  gen_resulting_demerged_pan?: string;
  gen_resulting_demerged_name?: string;
  gen_resulting_demerged_address?: string;
  gen_resulting_demerged_date?: string;
  
  // KEY PERSONS
  
  // Managing Director, Directors, Secretary details
  gen_director_1_name?: string;
  gen_director_1_designation?: string;
  gen_director_1_address?: string;
  gen_director_1_pan_aadhaar?: string;
  gen_director_1_din?: string;
  
  gen_director_2_name?: string;
  gen_director_2_designation?: string;
  gen_director_2_address?: string;
  gen_director_2_pan_aadhaar?: string;
  gen_director_2_din?: string;
  
  gen_director_3_name?: string;
  gen_director_3_designation?: string;
  gen_director_3_address?: string;
  gen_director_3_pan_aadhaar?: string;
  gen_director_3_din?: string;
  
  // SHAREHOLDERS INFORMATION
  
  // Persons holding less than 10% voting power
  gen_shareholder_1_name_address?: string;
  gen_shareholder_1_percentage?: number;
  gen_shareholder_1_pan?: string;
  
  gen_shareholder_2_name_address?: string;
  gen_shareholder_2_percentage?: number;
  gen_shareholder_2_pan?: string;
  
  // OWNERSHIP INFORMATION (Unlisted company)
  
  // Ultimate beneficial owners (10% voting power)
  gen_ubo_1_name?: string;
  gen_ubo_1_address?: string;
  gen_ubo_1_percentage?: number;
  gen_ubo_1_pan_aadhaar?: string;
  
  gen_ubo_2_name?: string;
  gen_ubo_2_address?: string;
  gen_ubo_2_percentage?: number;
  gen_ubo_2_pan_aadhaar?: string;
  
  // Foreign company - immediate parent
  gen_foreign_immediate_parent_name?: string;
  gen_foreign_immediate_parent_address?: string;
  gen_foreign_immediate_parent_country?: string;
  gen_foreign_immediate_parent_pan?: string;
  gen_foreign_immediate_parent_taxpayer_id?: string;
  
  // Foreign company - ultimate parent
  gen_foreign_ultimate_parent_name?: string;
  gen_foreign_ultimate_parent_address?: string;
  gen_foreign_ultimate_parent_country?: string;
  gen_foreign_ultimate_parent_pan?: string;
  gen_foreign_ultimate_parent_taxpayer_id?: string;
  
  // NATURE OF COMPANY/BUSINESS
  
  // Whether public sector company
  gen_public_sector_company?: string; // Yes/No
  
  // Whether owned by Reserve Bank of India
  gen_owned_by_rbi?: string; // Yes/No
  
  // Whether shares held by Reserve Bank or PSU
  gen_shares_held_by_rbi_psu?: string; // Yes/No
  
  // Whether banking company
  gen_banking_company?: string; // Yes/No
  
  // Whether scheduled bank
  gen_scheduled_bank?: string; // Yes/No
  
  // Whether registered with Insurance authority
  gen_insurance_registered?: string; // Yes/No
  
  // Whether non-banking Financial Institution
  gen_nbfi?: string; // Yes/No
  
  // Whether company is unlisted
  gen_unlisted_company?: string; // Yes/No
  gen_schedule_sh1_al1?: string; // Fill SH-1 and Schedule AL-1
  
  // Nature of business or profession
  gen_business_code_1?: string;
  gen_business_description_1?: string;
  
  gen_business_code_2?: string;
  gen_business_description_2?: string;
  
  gen_business_code_3?: string;
  gen_business_description_3?: string;
}

export interface ITR7Step {
  id: number;
  title: string;
  caption?: string;
}

export interface ITR7SummarySection {
  id: string;
  title: string;
  description: string;
  statusText?: string;
  status: 'pending' | 'in-progress' | 'completed';
  amountLabel?: string;
  amountValue?: string;
}

export type StepStatus = 'pending' | 'in-progress' | 'completed';
