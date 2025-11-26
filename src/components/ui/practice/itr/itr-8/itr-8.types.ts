export interface ITR8FormData {
  // Part A-GEN: General Information - Personal Information
  gen_name?: string;
  gen_pan?: string;
  gen_name_change?: string;
  gen_old_name?: string;
  gen_flat_door_block?: string;
  gen_premises_building?: string;
  gen_road_street_post?: string;
  gen_area_locality?: string;
  gen_town_city_district?: string;
  gen_state?: string;
  gen_pin_code?: string;
  gen_country?: string;
  gen_office_phone_std?: string;
  gen_office_phone_mobile?: string;
  gen_mobile_2?: string;
  gen_email_1?: string;
  gen_email_2?: string;
  gen_aadhaar?: string;

  // HUF Details
  gen_huf_identifier?: string;
  gen_huf_formation_date?: string;
  gen_karta_name?: string;
  gen_karta_pan?: string;

  // Filing Details
  gen_due_date?: string;
  gen_filing_date?: string;
  gen_filed_us?: string;
  gen_139_1_checkbox?: boolean;
  gen_139_4_checkbox?: boolean;
  gen_139_5_checkbox?: boolean;
  gen_92cd_checkbox?: boolean;
  gen_119_2b_checkbox?: boolean;
  gen_92e_checkbox?: boolean;

  // Return Type
  gen_original_return?: boolean;
  gen_revised_return?: boolean;
  gen_defective_modified?: boolean;
  gen_receipt_number?: string;
  gen_acknowledgement_number?: string;

  // Response to Notice
  gen_response_to_notice?: string;
  gen_unique_number?: string;

  // Residential Status
  gen_residential_status?: string;

  // Bank Details
  gen_bank_name?: string;
  gen_account_number?: string;
  gen_account_type?: string;
  gen_ifsc_code?: string;
  gen_micr_code?: string;

  // Income Sources Indicators
  gen_has_house_property?: boolean;
  gen_has_business_profession?: boolean;
  gen_has_capital_gains?: boolean;
  gen_has_other_sources?: boolean;
  gen_has_agricultural_income?: boolean;

  // Schedule HP: House Property Income Details
  hp_property_1_address?: string;
  hp_property_1_city?: string;
  hp_property_1_state?: string;
  hp_property_1_country?: string;
  hp_property_1_pincode?: string;
  hp_property_1_gross_rent?: number;
  hp_property_1_rent_not_realised?: number;
  hp_property_1_tax_local_authorities?: number;
  hp_property_1_total_deduction?: number;
  hp_property_1_annual_value?: number;
  hp_property_1_annual_value_owned?: number;
  hp_property_1_thirty_percent?: number;
  hp_property_1_interest_borrowed?: number;
  hp_property_1_deduction?: number;
  hp_property_1_arrears_unrealised?: number;
  hp_property_1_income_property?: number;
  hp_property_1_passthrough_loss?: number;
  hp_property_1_total_income_property?: number;

  hp_property_2_address?: string;
  hp_property_2_city?: string;
  hp_property_2_state?: string;
  hp_property_2_country?: string;
  hp_property_2_pincode?: string;
  hp_property_2_gross_rent?: number;
  hp_property_2_rent_not_realised?: number;
  hp_property_2_tax_local_authorities?: number;
  hp_property_2_total_deduction?: number;
  hp_property_2_annual_value?: number;
  hp_property_2_annual_value_owned?: number;
  hp_property_2_thirty_percent?: number;
  hp_property_2_interest_borrowed?: number;
  hp_property_2_deduction?: number;
  hp_property_2_arrears_unrealised?: number;
  hp_property_2_income_property?: number;
  hp_property_2_passthrough_loss?: number;
  hp_property_2_total_income_property?: number;

  // Schedule BP: Computation of income from business or profession
  bp_profit_before_tax?: number;
  bp_speculative_profit_included?: number;
  
  // Income credited to P&L considered under other heads
  bp_house_property_income?: number;
  bp_capital_gains_income?: number;
  bp_other_sources_income?: number;
  bp_dividend_income?: number;
  bp_other_than_dividend_income?: number;
  bp_115bbf_income?: number;
  bp_115bbg_income?: number;
  bp_115bbh_income?: number;
  bp_115bbh_cost_acquisition?: number;

  // Exempt income credited to P&L
  bp_share_income_firm?: number;
  bp_share_income_aop_boi?: number;
  bp_other_exempt_income_nature?: string;
  bp_other_exempt_income_amount?: number;
  bp_total_exempt_income?: number;

  bp_balance_6?: number;

  // Expenses debited to P&L considered under other heads
  bp_exp_house_property?: number;
  bp_exp_capital_gains?: number;
  bp_exp_other_sources?: number;
  bp_exp_115bbf?: number;
  bp_exp_115bbg?: number;
  bp_exp_115bbh?: number;
  
  bp_exp_exempt_income?: number;
  bp_exp_exempt_income_disallowed_14a?: number;
  
  bp_total_7_8?: number;
  bp_adjusted_profit_loss_10?: number;

  bp_depreciation_debited?: number;
  bp_depreciation_allowable_32_1_ii?: number;
  bp_depreciation_allowable_32_1_i?: number;
  bp_total_depreciation_allowable?: number;
  
  bp_profit_loss_after_depreciation_13?: number;

  // Disallowances
  bp_disallowance_36?: number;
  bp_disallowance_37?: number;
  bp_disallowance_40?: number;
  bp_disallowance_40a?: number;
  bp_disallowance_43b?: number;
  bp_disallowance_23_msme?: number;
  
  bp_deemed_income_41?: number;
  bp_deemed_income_32ac_etc?: number;
  bp_deemed_income_43ca?: number;
  bp_other_additions_28_to_44db?: number;
  bp_other_income_not_included?: number;
  bp_icds_adjustments_increase?: number;
  
  bp_total_additions?: number;

  // Deductions
  bp_deduction_32_1_iii?: number;
  bp_deduction_32ac?: number;
  bp_deduction_35_excess?: number;
  bp_disallowed_40_allowable?: number;
  bp_disallowed_43b_allowable?: number;
  bp_other_deductions_allowable?: number;
  bp_icds_adjustments_decrease?: number;
  
  bp_total_deductions?: number;
  
  bp_income_business_profession_35?: number;

  // Deemed Profit
  bp_deemed_profit_44ae?: number;
  bp_deemed_profit_44b?: number;
  bp_deemed_profit_44bb?: number;
  bp_deemed_profit_44bba?: number;
  bp_deemed_profit_44bbb?: number;
  bp_deemed_profit_44bbc?: number;
  bp_deemed_profit_44d?: number;
  bp_deemed_profit_44da?: number;
  bp_deemed_profit_chapter_xii_g?: number;
  bp_deemed_profit_first_schedule?: number;
  bp_total_deemed_profit?: number;

  bp_net_profit_business_profession_37?: number;
  bp_net_profit_business_profession_38?: number;
  bp_income_chargeable_rule_7?: number;
  bp_deemed_income_rule_7a?: number;
  bp_deemed_income_rule_7b1?: number;
  bp_deemed_income_rule_7b1a?: number;
  bp_deemed_income_rule_8?: number;
  bp_income_other_than_rule_7_8?: number;
  bp_balance_income_deemed_agriculture?: number;

  // Speculative Business
  bp_speculative_net_profit?: number;
  bp_speculative_additions?: number;
  bp_speculative_deductions?: number;
  bp_speculative_income?: number;

  // Intra head set off
  bp_loss_to_be_set_off?: number;
  bp_income_speculative_set_off?: number;
  bp_income_life_insurance_set_off?: number;
  bp_income_foreign_company_set_off?: number;
  bp_total_loss_set_off?: number;
  bp_loss_remaining?: number;

  // Schedule CG: Capital Gains
  cg_stcg_gross?: number;
  cg_stcg_deductions?: number;
  cg_stcg_income?: number;
  cg_ltcg_gross?: number;
  cg_ltcg_deductions?: number;
  cg_ltcg_income?: number;
  cg_total_capital_gains?: number;
  cg_vda_income?: number;

  // Schedule CG: Deductions
  cg_deduct_54_amount?: number;
  cg_deduct_54b_amount?: number;
  cg_deduct_54d_amount?: number;
  cg_deduct_54ec_amount?: number;
  cg_deduct_54f_amount?: number;
  cg_deduct_54g_amount?: number;
  cg_deduct_54ga_amount?: number;
  cg_deduct_54gb_amount?: number;
  cg_deduct_115f_amount?: number;
  cg_deduct_total?: number;

  // Schedule CG: Set-off
  cg_setoff_stcg_loss?: number;
  cg_setoff_ltcg_loss?: number;
  cg_setoff_total_loss?: number;

  // Schedule OS: Income from Other Sources
  os_dividend_gross?: number;
  os_dividend_applicable?: number;
  os_dividend_section_94?: number;
  os_interest_gross?: number;
  os_interest_category?: string;
  os_rental_machinery?: number;
  os_56_2_x_total?: number;
  os_special_rate_total?: number;
  os_other_income_total?: number;

  // Schedule CVLA: Details of Income after Set-off
  cvla_loss_to_setoff?: number;
  cvla_house_property_income?: number;
  cvla_business_income_amt?: number;
  cvla_insurance_income_amt?: number;
  cvla_speculation_income_amt?: number;
  cvla_stcg_15_amt?: number;
  cvla_stcg_20_amt?: number;
  cvla_stcg_30_amt?: number;
  cvla_ltcg_10_amt?: number;
  cvla_ltcg_12_5_amt?: number;
  cvla_ltcg_20_amt?: number;
  cvla_os_normal_amt?: number;
  cvla_os_special_amt?: number;
  cvla_total_loss_setoff?: number;
  cvla_loss_remaining?: number;

  // Schedule BF1A: Set-off of Brought Forward Losses
  bf1a_house_property_income?: number;
  bf1a_business_income?: number;
  bf1a_insurance_income?: number;
  bf1a_speculation_income?: number;
  bf1a_stcg_15_income?: number;
  bf1a_stcg_20_income?: number;
  bf1a_stcg_30_income?: number;
  bf1a_ltcg_10_income?: number;
  bf1a_ltcg_12_5_income?: number;
  bf1a_ltcg_20_income?: number;
  bf1a_os_normal_income?: number;
  bf1a_os_special_income?: number;
  bf1a_total_bfl_setoff?: number;
  bf1a_total_remaining_income?: number;

  // Schedule CFL: Losses to be carried forward
  cfl_hp_current?: number;
  cfl_business_current?: number;
  cfl_depreciation_current?: number;
  cfl_speculative_current?: number;
  cfl_insurance_current?: number;
  cfl_stcl_current?: number;
  cfl_ltcl_current?: number;

  // Schedule DEP: Depreciation Summary
  dep_pm_15?: number;
  dep_pm_30?: number;
  dep_pm_40?: number;
  dep_pm_45?: number;
  dep_total_pm?: number;
  dep_bldg_5?: number;
  dep_bldg_10?: number;
  dep_bldg_40?: number;
  dep_total_bldg?: number;
  dep_furniture?: number;
  dep_intangible?: number;
  dep_ships?: number;
  dep_total?: number;

  // Schedule 80G: Donations
  donation_80g_section_a?: number;
  donation_80g_section_b?: number;
  donation_80g_section_c?: number;
  donation_80g_total?: number;

  // Schedule 80GGA
  donation_80gga_total?: number;

  // Schedule 80GGCC
  political_80ggcc_total?: number;

  // Schedule 80JAC
  startup_80jac_total?: number;

  // Schedule 80L
  nps_80l_eligible_deduction?: number;

  // Schedule 80-IA
  infra_80ia_total?: number;

  // Schedule 80-IB
  housing_80ib_total?: number;

  // Schedule 80-IE
  northeast_80ie_total?: number;

  // Schedule VI-A: Chapter VI-A Deductions
  chap6_80g?: number;
  chap6_80ggb?: number;
  chap6_80gga?: number;
  chap6_80ggc?: number;
  chap6_80ia?: number;
  chap6_80iab?: number;
  chap6_80ib?: number;
  chap6_80ie?: number;
  chap6_80jja?: number;
  chap6_80lla?: number;
  chap6_80pa?: number;

  // Schedule EI: Exempt Income
  exempt_ei_gross_agri_receipts?: number;
  exempt_ei_agri_expenditure?: number;
  exempt_ei_net_agri_income?: number;
  exempt_ei_other_total?: number;
  exempt_ei_total_exempt?: number;

  // Agricultural Income Details
  ag_income_gross_receipts?: number;
  ag_income_seeds_manures?: number;
  ag_income_wages?: number;
  ag_income_bullock_hire?: number;
  ag_income_other_expenses?: number;
  ag_income_net?: number;

  // Income Summary
  summary_house_property?: number;
  summary_business_profession?: number;
  summary_capital_gains?: number;
  summary_other_sources?: number;
  summary_agricultural_income?: number;
  summary_gross_total?: number;
  summary_gross_total_income?: number;

  // Schedule Chapter VI-A (Complete computation)
  ch6_80g_amount?: number;
  ch6_80ggb_amount?: number;
  ch6_80gga_amount?: number;
  ch6_80ggc_amount?: number;
  ch6_80ia_amount?: number;
  ch6_80iab_amount?: number;
  ch6_80ib_amount?: number;
  ch6_80ie_amount?: number;
  ch6_80jja_amount?: number;
  ch6_80lla_amount?: number;
  ch6_80pa_amount?: number;
  ch6_80gcc_amount?: number;
  ch6_80gge_amount?: number;
  ch6_80ggc_donation_amount?: number;
  ch6_80gcd_amount?: number;
  ch6_80u_amount?: number;
  ch6_80ac_amount?: number;
  ch6_80aa_amount?: number;
  ch6_80aca_amount?: number;
  ch6_80d_amount?: number;
  ch6_80dd_amount?: number;
  ch6_80ddb_amount?: number;
  ch6_80e_amount?: number;
  ch6_80eb_amount?: number;
  ch6_80eea_amount?: number;
  ch6_80eeb_amount?: number;
  ch6_80ec_amount?: number;
  ch6_80ed_amount?: number;
  ch6_80ee_amount?: number;
  ch6_80eem_amount?: number;
  ch6_80ef_amount?: number;
  ch6_80eg_amount?: number;
  ch6_80ega_amount?: number;
  ch6_80egb_amount?: number;
  ch6_80egc_amount?: number;
  ch6_80egd_amount?: number;
  ch6_80ege_amount?: number;
  ch6_80f_amount?: number;
  ch6_80qqa_amount?: number;
  ch6_80qqb_amount?: number;
  ch6_80qqc_amount?: number;
  ch6_80qpb_amount?: number;
  ch6_80ttt_amount?: number;
  ch6_80uaa_amount?: number;
  ch6_80uab_amount?: number;

  ch6_total_deductions?: number;
  ch6_taxable_income?: number;

  // Tax Calculation Fields
  tax_normal_rate?: number;
  tax_surcharge?: number;
  tax_cess?: number;
  tax_total?: number;
  tax_relief?: number;
  tax_payable?: number;

  // Advanced Fields (expanded from ITR-7)
  adv_section_68_cash?: number;
  adv_section_69_property?: number;
  adv_section_69a_unexplained_investment?: number;
  adv_section_69d_unexplained_money?: number;
  adv_reopening_case?: string;
  adv_pending_dispute?: string;

  // Schedule AL - Assets and Liabilities
  // Section A - Residential House Property
  al_reshouse_address_1?: string;
  al_reshouse_pin_1?: string;
  al_reshouse_date_1?: string;
  al_reshouse_cost_1?: number;
  al_reshouse_purpose_1?: string;

  // Section B - Non-Residential House Property
  al_nonreshouse_address_1?: string;
  al_nonreshouse_pin_1?: string;
  al_nonreshouse_date_1?: string;
  al_nonreshouse_cost_1?: number;
  al_nonreshouse_purpose_1?: string;

  // Section C - Listed Equity Shares
  al_equity_open_qty?: number;
  al_equity_open_type?: string;
  al_equity_open_cost?: number;
  al_equity_acq_qty?: number;
  al_equity_acq_type?: string;
  al_equity_acq_cost?: number;
  al_equity_trans_qty?: number;
  al_equity_trans_type?: string;
  al_equity_trans_sale?: number;
  al_equity_close_qty?: number;
  al_equity_close_type?: string;
  al_equity_close_cost?: number;

  // Section D - Unlisted Equity Shares
  al_unlisted_company_1?: string;
  al_unlisted_pan_1?: string;
  al_unlisted_open_qty_1?: number;
  al_unlisted_open_cost_1?: number;
  al_unlisted_issue_qty_1?: number;
  al_unlisted_issue_date_1?: string;
  al_unlisted_face_value_1?: number;
  al_unlisted_issue_price_1?: number;
  al_unlisted_purchase_price_1?: number;
  al_unlisted_trans_qty_1?: number;
  al_unlisted_sale_consid_1?: number;
  al_unlisted_close_qty_1?: number;
  al_unlisted_close_cost_1?: number;

  // Section E - Other Securities
  al_security_type_1?: string;
  al_security_listed_1?: string;
  al_security_open_qty_1?: number;
  al_security_open_cost_1?: number;
  al_security_acq_qty_1?: number;
  al_security_acq_cost_1?: number;
  al_security_trans_qty_1?: number;
  al_security_trans_sale_1?: number;
  al_security_close_qty_1?: number;
  al_security_close_cost_1?: number;

  // Section F - Capital Contribution
  al_capital_entity_1?: string;
  al_capital_pan_1?: string;
  al_capital_open_1?: number;
  al_capital_contrib_1?: number;
  al_capital_withdraw_1?: number;
  al_capital_profit_1?: number;
  al_capital_close_1?: number;

  // Section G - Loans & Advances
  al_loan_person_1?: string;
  al_loan_pan_1?: string;
  al_loan_open_1?: number;
  al_loan_received_1?: number;
  al_loan_paid_1?: number;
  al_loan_interest_1?: number;
  al_loan_close_1?: number;
  al_loan_rate_1?: number;

  // Section H - Motor Vehicles
  al_vehicle_particulars_1?: string;
  al_vehicle_reg_1?: string;
  al_vehicle_cost_1?: number;
  al_vehicle_date_1?: string;
  al_vehicle_purpose_1?: string;

  // Section I - Jewellery & Art
  al_jewel_particulars_1?: string;
  al_jewel_qty_1?: string;
  al_jewel_cost_1?: number;
  al_jewel_date_1?: string;
  al_jewel_purpose_1?: string;

  // Section J - Liabilities
  al_liab_person_1?: string;
  al_liab_pan_1?: string;
  al_liab_open_1?: number;
  al_liab_received_1?: number;
  al_liab_paid_1?: number;
  al_liab_interest_1?: number;
  al_liab_close_1?: number;
  al_liab_rate_1?: number;

  // Schedule AL (Startup) - Assets and Liabilities for Startups
  // Section A - Residential Properties
  al_startup_res_address_1?: string;
  al_startup_res_pin_1?: string;
  al_startup_res_date_1?: string;
  al_startup_res_cost_1?: number;
  al_startup_res_purpose_1?: string;
  al_startup_res_transferred_1?: string;
  al_startup_res_address_2?: string;
  al_startup_res_pin_2?: string;
  al_startup_res_date_2?: string;
  al_startup_res_cost_2?: number;
  al_startup_res_purpose_2?: string;
  al_startup_res_transferred_2?: string;
  al_startup_res_address_3?: string;
  al_startup_res_pin_3?: string;
  al_startup_res_date_3?: string;
  al_startup_res_cost_3?: number;
  al_startup_res_purpose_3?: string;
  al_startup_res_transferred_3?: string;

  // Section B - Non-Residential Properties
  al_startup_nonres_address_1?: string;
  al_startup_nonres_pin_1?: string;
  al_startup_nonres_date_1?: string;
  al_startup_nonres_cost_1?: number;
  al_startup_nonres_purpose_1?: string;
  al_startup_nonres_transferred_1?: string;
  al_startup_nonres_address_2?: string;
  al_startup_nonres_pin_2?: string;
  al_startup_nonres_date_2?: string;
  al_startup_nonres_cost_2?: number;
  al_startup_nonres_purpose_2?: string;
  al_startup_nonres_transferred_2?: string;

  // Section C - Loans & Advances (Startup)
  al_startup_loan_name_1?: string;
  al_startup_loan_pan_1?: string;
  al_startup_loan_date_1?: string;
  al_startup_loan_amount_1?: number;
  al_startup_loan_repaid_1?: number;
  al_startup_loan_prev_repaid_1?: string;
  al_startup_loan_closing_1?: number;
  al_startup_loan_rate_1?: number;
  al_startup_loan_name_2?: string;
  al_startup_loan_pan_2?: string;
  al_startup_loan_date_2?: string;
  al_startup_loan_amount_2?: number;
  al_startup_loan_repaid_2?: number;
  al_startup_loan_prev_repaid_2?: string;
  al_startup_loan_closing_2?: number;
  al_startup_loan_rate_2?: number;

  // Section D - Capital Contribution (Startup)
  al_startup_capital_entity_1?: string;
  al_startup_capital_pan_1?: string;
  al_startup_capital_date_1?: string;
  al_startup_capital_contrib_1?: number;
  al_startup_capital_withdraw_1?: number;
  al_startup_capital_profit_1?: number;
  al_startup_capital_closing_1?: number;

  // Section E - Shares & Securities (Startup)
  al_startup_shares_company_1?: string;
  al_startup_shares_pan_1?: string;
  al_startup_shares_type_1?: string;
  al_startup_shares_qty_1?: number;
  al_startup_shares_cost_1?: number;
  al_startup_shares_date_1?: string;
  al_startup_shares_transferred_1?: string;
  al_startup_shares_closing_1?: number;

  // Section F - Motor Vehicles (Startup)
  al_startup_vehicle_particulars_1?: string;
  al_startup_vehicle_reg_1?: string;
  al_startup_vehicle_cost_1?: number;
  al_startup_vehicle_date_1?: string;
  al_startup_vehicle_purpose_1?: string;
  al_startup_vehicle_transferred_1?: string;

  // Section G - Art & Archaeological (Startup)
  al_startup_art_particulars_1?: string;
  al_startup_art_qty_1?: string;
  al_startup_art_cost_1?: number;
  al_startup_art_date_1?: string;
  al_startup_art_purpose_1?: string;
  al_startup_art_transferred_1?: string;
  al_startup_art_closing_1?: number;

  // Section H - Liabilities (Startup)
  al_startup_liab_name_1?: string;
  al_startup_liab_pan_1?: string;
  al_startup_liab_open_1?: number;
  al_startup_liab_received_1?: number;
  al_startup_liab_paid_1?: number;
  al_startup_liab_interest_1?: number;
  al_startup_liab_closing_1?: number;
  al_startup_liab_rate_1?: number;

  // Schedule GST - GST Information
  gst_gstin_1?: string;
  gst_turnover_1?: number;
  gst_gstin_2?: string;
  gst_turnover_2?: number;
  gst_gstin_3?: string;
  gst_turnover_3?: number;

  // Schedule FD - Foreign Currency Transactions
  // Capital Account Payments
  fd_cap_payment_desc_1?: string;
  fd_cap_payment_amount_1?: number;
  fd_cap_payment_desc_2?: string;
  fd_cap_payment_amount_2?: number;
  fd_cap_payment_desc_3?: string;
  fd_cap_payment_amount_3?: number;

  // Revenue Account Payments
  fd_rev_payment_desc_1?: string;
  fd_rev_payment_amount_1?: number;
  fd_rev_payment_desc_2?: string;
  fd_rev_payment_amount_2?: number;
  fd_rev_payment_desc_3?: string;
  fd_rev_payment_amount_3?: number;
  fd_rev_payment_desc_4?: string;
  fd_rev_payment_amount_4?: number;

  // Capital Account Receipts
  fd_cap_receipt_desc_1?: string;
  fd_cap_receipt_amount_1?: number;
  fd_cap_receipt_desc_2?: string;
  fd_cap_receipt_amount_2?: number;

  // Revenue Account Receipts
  fd_rev_receipt_desc_1?: string;
  fd_rev_receipt_amount_1?: number;
  fd_rev_receipt_desc_2?: string;
  fd_rev_receipt_amount_2?: number;
  fd_rev_receipt_desc_3?: string;
  fd_rev_receipt_amount_3?: number;
  fd_rev_receipt_desc_4?: string;
  fd_rev_receipt_amount_4?: number;

  // Part B-TI - Computation of Total Income
  // 1. Income from house property
  ti_house_property?: number;

  // 2. Profits and gains from business or profession
  ti_business_speculative?: number; // 2i
  ti_foreign_company_diamonds?: number; // 2ia
  ti_business_other_speculative?: number; // 2ii
  ti_business_specified?: number; // 2iii
  ti_business_special_rates?: number; // 2iv
  ti_business_total?: number; // 2v

  // 3. Capital gains
  // 3a - Short term
  ti_cg_short_term_15?: number; // 3aii
  ti_cg_short_term_20?: number; // 3aib
  ti_cg_short_term_30?: number; // 3aii
  ti_cg_short_term_applicable?: number; // 3aiii
  ti_cg_short_term_special_dtaa?: number; // 3aiv
  ti_cg_short_term_total?: number; // 3av

  // 3b - Long term
  ti_cg_long_term_10?: number; // 3bia
  ti_cg_long_term_12_5?: number; // 3bib
  ti_cg_long_term_20?: number; // 3bii
  ti_cg_long_term_special_dtaa?: number; // 3biii
  ti_cg_long_term_total?: number; // 3biv

  // 3c - Sum of short/long term
  ti_cg_total_short_long?: number; // 3c

  // 3d - Capital gain at 30% u/s 115BBH
  ti_cg_30_115bbh?: number; // 3d

  // 3e - Total capital gains
  ti_cg_total?: number; // 3e

  // 4. Income from other sources
  ti_other_sources_normal?: number; // 4a
  ti_other_sources_special?: number; // 4b
  ti_other_sources_race_horses?: number; // 4c
  ti_other_sources_total?: number; // 4d

  // 5. Total of head wise income
  ti_total_head_wise?: number; // 5

  // 6. Losses of current year to be set off
  ti_losses_current_year?: number; // 6

  // 7. Balance after set off
  ti_balance_after_setoff?: number; // 7

  // 8. Brought forward losses
  ti_brought_forward_losses?: number; // 8

  // 9. Gross total income
  ti_gross_total_income?: number; // 9

  // 10. Income chargeable at special rates
  ti_income_special_rates?: number; // 10

  // 11. Deductions under Chapter VI-A
  ti_deduction_part_b?: number; // 11a
  ti_deduction_part_c?: number; // 11b
  ti_deduction_total?: number; // 11c

  // 12. Deduction u/s 10AA
  ti_deduction_10aa?: number; // 12

  // 13. Total income
  ti_total_income?: number; // 13

  // 14. Income at special rates
  ti_income_special_rates_14?: number; // 14

  // 15. Income at normal rates
  ti_income_normal_rates?: number; // 15

  // 16. Net agricultural income
  ti_net_agricultural_income?: number; // 16

  // 17. Losses carried forward
  ti_losses_carried_forward?: number; // 17

  // 18. Deemed total income u/s 115JB
  ti_deemed_income_115jb?: number; // 18

  // Part B-TTI - Computation of Tax Liability
  // 1. Tax Payable on deemed total income
  tti_tax_115jb?: number; // 1a
  tti_surcharge_115jb?: number; // 1b
  tti_health_edu_cess_115jb?: number; // 1c
  tti_total_tax_115jb?: number; // 1d

  // 2. Tax payable on total income
  tti_tax_normal_rates?: number; // 2a
  tti_tax_special_rates?: number; // 2b
  tti_tax_total_income?: number; // 2c

  // 2d - Surcharge
  tti_surcharge_16ii?: number; // 2di
  tti_surcharge_16iii?: number; // 2dii
  tti_surcharge_total?: number; // 2diii

  // 2e - Health and Education Cess
  tti_health_edu_cess?: number; // 2e

  // 2f - Gross tax liability
  tti_gross_tax_liability?: number; // 2f

  // 3. Gross tax payable
  tti_gross_tax_payable?: number; // 3

  // 4. Credit u/s 115JAA
  tti_credit_115jaa?: number; // 4

  // 5. Tax payable after credit
  tti_tax_after_credit?: number; // 5

  // 6. Tax relief
  tti_relief_90_90a?: number; // 6a
  tti_relief_91?: number; // 6b
  tti_total_relief?: number; // 6c

  // 7. Net tax liability
  tti_net_tax_liability?: number; // 7

  // 8. Interest and fee payable
  tti_interest_234a?: number; // 8a
  tti_interest_234b?: number; // 8b
  tti_interest_234c?: number; // 8c
  tti_fee_234f?: number; // 8d
  tti_total_interest_fee?: number; // 8e

  // 9. Aggregate liability
  tti_aggregate_liability?: number; // 9

  // 10. Taxes Paid
  tti_advance_tax?: number; // 10a
  tti_tds?: number; // 10b
  tti_tcs?: number; // 10c
  tti_self_assessment_tax?: number; // 10d
  tti_total_taxes_paid?: number; // 10e

  // 11. Amount payable
  tti_amount_payable?: number; // 11

  // 12. Refund
  tti_refund?: number; // 12

  // 13. Net tax payable on 115TD
  tti_net_tax_115td?: number; // 13

  // 14. Tax payable u/s 115TD after adjustment
  tti_tax_115td_adjusted?: number; // 14

  // 15. Net refund after adjustment
  tti_net_refund_adjusted?: number; // 15

  // 16. Bank account question
  tti_have_bank_account?: string; // Yes/No

  // Bank Account Details (2 accounts)
  bank_ifsc_1?: string;
  bank_name_1?: string;
  bank_account_number_1?: string;
  bank_account_type_1?: string; // Savings/Current
  bank_refund_account_1?: boolean;

  bank_ifsc_2?: string;
  bank_name_2?: string;
  bank_account_number_2?: string;
  bank_account_type_2?: string;
  bank_refund_account_2?: boolean;

  // Foreign Bank Account
  foreign_swift_code?: string;
  foreign_bank_name?: string;
  foreign_bank_country?: string;
  foreign_bank_iban?: string;

  // 17. Foreign Assets/Income
  foreign_assets_held?: string; // Yes/No
  foreign_financial_interest?: string; // Yes/No
  foreign_bank_account?: string; // Yes/No
  foreign_income?: string; // Yes/No

  // 18. Tax Payments - Advance Tax (3 rows)
  advance_tax_bsr_1?: string;
  advance_tax_date_1?: string;
  advance_tax_serial_1?: string;
  advance_tax_amount_1?: number;

  advance_tax_bsr_2?: string;
  advance_tax_date_2?: string;
  advance_tax_serial_2?: string;
  advance_tax_amount_2?: number;

  advance_tax_bsr_3?: string;
  advance_tax_date_3?: string;
  advance_tax_serial_3?: string;
  advance_tax_amount_3?: number;

  // TDS Details (1 row example)
  tds_credit_self?: string;
  tds_deduction_tax?: string;
  tds_account_number?: string;
  tds_pan_other?: string;
  tds_unclaimed?: string;
  tds_fin_year?: string;
  tds_amount_bf?: number;
  tds_deducted_own?: number;
  tds_deducted_other?: number;
  tds_claimed_other?: number;
  tds_gross_amount?: number;
  tds_head_income?: string;
  tds_credit_carried?: number;
  tds_pan_aadhaar?: string;

  // TCS Details (1 row example)
  tcs_credit_self?: string;
  tcs_deduction_tax?: string;
  tcs_account_number?: string;
  tcs_pan_other?: string;
  tcs_unclaimed?: string;
  tcs_fin_year?: string;
  tcs_amount_bf?: number;
  tcs_collected_own?: number;
  tcs_collected_other?: number;
  tcs_claimed_this_year?: number;
  tcs_claimed_other?: number;
  tcs_credit_carried?: number;
  tcs_pan?: string;

  // Verification
  verification_son_daughter_of?: string;
  verification_capacity?: string;
  verification_account_number?: string;
  verification_date?: string;
  verification_place?: string;
}

export interface ITR8Step {
  id: string;
  label: string;
  step: number;
}
