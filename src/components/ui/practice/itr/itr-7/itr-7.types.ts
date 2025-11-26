export interface ITR7FormData {
  // Part A-GEN: General Information - Personal Information
  gen_name?: string;
  gen_pan?: string;
  gen_name_change?: string;
  gen_old_name?: string;
  gen_cin?: string;
  gen_flat_door_block?: string;
  gen_premises_building?: string;
  gen_incorporation_date?: string;
  gen_business_commencement_date?: string;
  gen_road_street_post?: string;
  gen_area_locality?: string;
  gen_company_type?: string;
  gen_domestic_company_checkbox?: boolean;
  gen_foreign_company_checkbox?: boolean;
  gen_public_company_write_6?: string;
  gen_private_company_write_7?: string;
  gen_town_city_district?: string;
  gen_state?: string;
  gen_pin_code?: string;
  gen_country?: string;
  gen_office_phone_std?: string;
  gen_office_phone_mobile?: string;
  gen_mobile_2?: string;
  gen_email_1?: string;
  gen_email_2?: string;

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

  // Taxation Sections
  gen_taxation_under_115ba?: string;
  gen_taxation_option_exercised?: string;
  gen_relevant_form_date?: string;
  gen_acknowledgement_num?: string;

  // Total Turnover Questions
  gen_total_turnover_exceeds_400cr?: string;

  // Country Agreement Questions (Section 90)
  gen_country_agreement_90?: string;
  gen_country_agreement_90a?: string;

  // Permanent Establishment
  gen_permanent_establishment?: string;
  
  // Significant Economic Presence
  gen_significant_economic_presence?: string;

  // Transaction Details (Section 92)
  gen_transaction_provisions?: string;
  gen_transaction_explanation?: string;

  // Cross-reference Details
  gen_cross_reference?: string;
  gen_cross_reference_explanation?: string;

  // Registration Under Law
  gen_registration_under_law?: string;
  gen_registration_details?: string;
  gen_registration_date?: string;
  gen_registration_number?: string;

  // Financial Statements Compliance
  gen_financial_statements_compliance?: string;

  // International Financial Services Centre
  gen_ifsc_unit?: string;

  // Foreign Exchange
  gen_foreign_exchange?: string;

  // Liquidation Status
  gen_under_liquidation?: string;

  // FII/FPI Status
  gen_fii_fpi?: string;
  gen_sebi_registration?: string;

  // Producer Company
  gen_producer_company?: string;

  // Representative Assessee
  gen_representative_assessee?: string;
  gen_representative_name?: string;
  gen_representative_capacity?: string;
  gen_representative_address?: string;
  gen_representative_pan_aadhaar?: string;

  // Start-up Recognition
  gen_startup_recognition?: string;
  gen_dpiit_startup_number?: string;
  gen_inter_ministerial_certificate?: string;
  gen_certificate_number?: string;
  gen_dpiit_para5_declaration?: string;
  gen_form2_filing_date?: string;

  // Legal Entity Identifier
  gen_lei_number?: string;
  gen_lei_valid_date?: string;

  // MSME Recognition
  gen_msme_recognition?: string;
  gen_msme_registration?: string;

  // Accounts Maintenance
  gen_maintain_accounts_44aa?: string;

  // Income Declaration (Sections 44BB/44BBB/44BBA)
  gen_income_declaration_44bb?: string;

  // Sales/Turnover Exceeds 1 Crore
  gen_sales_exceeds_1cr?: string;
  gen_sales_exceeds_option?: string;
  gen_building_amount?: string;
  gen_cash_bank_amount?: string;

  // Aggregate Payments
  gen_aggregate_payments?: string;
  gen_aggregate_cash_bank?: string;

  // Audit Liability
  gen_audit_liable_44ab?: string;
  gen_audit_condition?: string;

  // Audit Report Details
  gen_audit_accounts_audited?: string;
  gen_audit_report_date?: string;
  gen_auditor_name?: string;
  gen_auditor_membership?: string;
  gen_auditor_firm_name?: string;
  gen_auditor_registration?: string;
  gen_auditor_pan?: string;
  gen_audit_date?: string;
  gen_audit_acknowledgement?: string;
  gen_udin?: string;

  // Audit Liability 92E
  gen_audit_liable_92e?: string;
  gen_accounts_audited_92e?: string;
  gen_furnishing_date_92e?: string;
  gen_acknowledgement_92e?: string;

  // Other Audit Reports
  gen_other_audit_report?: string;
  gen_other_audit_details?: string;

  // Act, section and furnishing date
  gen_other_act?: string;
  gen_other_section?: string;
  gen_other_furnishing_date?: string;

  // Balance Sheet - Share Capital (Part A-BS Section I.1.A)
  bs_share_capital_authorised?: number;
  bs_share_capital_issued?: number;
  bs_share_capital_subscribed?: number;

  // Balance Sheet - Reserves and Surplus (Part A-BS Section I.1.B)
  bs_capital_reserve?: number;
  bs_capital_redemption_reserve?: number;
  bs_securities_premium_reserve?: number;
  bs_debenture_redemption_reserve?: number;
  bs_revaluation_reserve?: number;
  bs_share_options_outstanding?: number;
  bs_other_reserve_a?: number;
  bs_other_reserve_b?: number;
  bs_surplus_profit_loss?: number;

  // Balance Sheet - Share Application Money (Part A-BS Section I.2)
  bs_share_application_pending_1yr?: number;
  bs_share_application_pending_over1yr?: number;
  bs_share_application_less_1year?: number;
  bs_share_application_more_1_year?: number;

  // Balance Sheet - Non-current Liabilities (Part A-BS Section I.3)
  bs_bonds_foreign_currency?: number;
  bs_bonds_rupees?: number;
  bs_term_loans_banks?: number;
  bs_term_loans_others?: number;
  bs_deferred_payment_liabilities?: number;
  bs_deposits_related_parties?: number;
  bs_other_deposits?: number;
  bs_loans_advances_related?: number;
  bs_other_loans_advances?: number;
  bs_finance_lease_obligations?: number;

  // Balance Sheet - Current Liabilities (Part A-BS Section I.4)
  bs_current_liabilities_borrowings?: number;
  bs_current_liabilities_trade_payables?: number;
  bs_current_liabilities_other_payables?: number;

  // Balance Sheet - Non-current Assets (Part A-BS Section II.1)
  bs_fixed_assets_gross?: number;
  bs_fixed_assets_gross_block?: number;
  bs_fixed_assets_depreciation?: number;
  bs_goodwill_intangibles?: number;
  bs_other_noncurrent_assets?: number;

  // Balance Sheet - Current Assets (Part A-BS Section II.2)
  bs_inventories?: number;
  bs_trade_receivables?: number;
  bs_cash_equivalents?: number;
  bs_other_current_assets?: number;
  
  // Balance Sheet - Surplus and other fields
  bs_surplus_balance?: number;

  // Part A-TS: Trading Statement
  // Section I: Cost of Materials Consumed
  ts_opening_stock?: number;
  ts_purchases?: number;
  ts_carriage_inbound?: number;
  ts_purchase_returns?: number;
  ts_import_duty?: number;
  ts_octroi?: number;
  ts_other_materials?: number;
  ts_closing_stock?: number;
  
  // Section II: Manufacturing Expenses (Direct Expenses)
  ts_labour?: number;
  ts_power_fuel?: number;
  ts_freight_cartage?: number;
  ts_manufacturing_overheads?: number;
  ts_other_direct_expenses?: number;
  ts_other_manufacturing_expenses?: number;
  
  // Section III: Work in Progress
  ts_opening_wip?: number;
  ts_closing_wip?: number;
  
  // Section IV: Semi-Finished Goods
  ts_opening_semifinished?: number;
  ts_closing_semifinished?: number;
  
  // Section V: Cost of Goods Sold
  ts_opening_finished_goods?: number;
  ts_closing_finished_goods?: number;
  
  // Section VI: Revenue from Operations
  ts_sales?: number;
  ts_sales_returns?: number;
  ts_excise_duty?: number;
  ts_trade_discount?: number;
  ts_freight_outbound?: number;
  ts_packaging?: number;
  ts_other_revenue?: number;
  
  // Part A-P&L: Profit & Loss Statement
  // Operating Expenses
  ts_employee_benefits?: number;
  ts_finance_costs?: number;
  ts_depreciation?: number;
  ts_amortization?: number;
  ts_research_development?: number;
  ts_administrative_expenses?: number;
  ts_selling_distribution?: number;
  ts_other_operating_expenses?: number;
  
  // Other Income & Items
  ts_other_income?: number;
  ts_exceptional_items?: number;
  ts_prior_period_adjustments?: number;
  ts_tax_expense?: number;

  // Part A-TS: Additional Asset Schedules (Part II from Balance Sheet)
  // Current Assets - Inventories
  ts_inv_raw_materials?: number;
  ts_inv_work_in_progress?: number;
  ts_inv_finished_goods?: number;
  ts_inv_stock_in_trade?: number;
  ts_inv_stores_spares?: number;
  ts_inv_loose_tools?: number;
  ts_inv_other_inventory?: number;

  // Current Assets - Financial Assets - Investments
  ts_inv_listed_equities?: number;
  ts_inv_unlisted_equities?: number;
  ts_inv_preference_shares?: number;
  ts_inv_government_securities?: number;
  ts_inv_debentures_bonds?: number;
  ts_inv_mutual_funds?: number;
  ts_inv_partnership_firms?: number;
  ts_inv_other_investments?: number;

  // Current Assets - Trade Receivables
  ts_tr_secured_good?: number;
  ts_tr_unsecured_good?: number;
  ts_tr_doubtful?: number;

  // Current Assets - Cash & Cash Equivalents
  ts_cash_bank_balances?: number;
  ts_cash_cheques_drafts?: number;
  ts_cash_on_hand?: number;
  ts_cash_others?: number;

  // Current Assets - Bank Balances
  ts_bank_balances_other?: number;

  // Current Assets - Loans
  ts_loans_security_deposits?: number;
  ts_loans_related_parties?: number;
  ts_loans_other?: number;

  // Current Assets - Loans Included in V above
  ts_loans_business_profession?: number;
  ts_loans_shareholder_benefit?: number;

  // Current Assets - Other Financial Assets
  ts_financial_assets_other?: number;

  // Current Assets - Others
  ts_current_assets_advances?: number;
  ts_current_assets_other?: number;

  // MANUFACTURING ACCOUNT FIELDS
  // A. Opening Inventory
  mfg_opening_raw_materials?: number;
  mfg_opening_wip?: number;

  // B. Purchases
  mfg_purchases?: number;
  mfg_purchase_returns?: number;
  mfg_carriage_inward?: number;
  mfg_import_duty?: number;
  mfg_octroi?: number;
  mfg_other_materials_consumed?: number;

  // C. Direct Wages
  mfg_direct_wages?: number;

  // D. Direct Expenses
  mfg_direct_expenses_carriage?: number;
  mfg_power_and_fuel?: number;
  mfg_other_direct_expenses?: number;

  // E. Factory Overheads
  mfg_indirect_wages?: number;
  mfg_factory_rent_and_rates?: number;
  mfg_factory_insurance?: number;
  mfg_factory_fuel_and_power?: number;
  mfg_factory_general_expenses?: number;
  mfg_depreciation_factory_machinery?: number;

  // Closing Stock
  mfg_closing_raw_materials?: number;
  mfg_closing_wip?: number;
  mfg_closing_finished_goods?: number;

  // TRADING ACCOUNT FIELDS
  // Revenue from Operations
  trd_sale_of_goods?: number;
  trd_sale_of_services?: number;
  trd_other_operating_revenues_a?: number;
  trd_other_operating_revenues_b?: number;

  // Gross receipts from Profession
  trd_gross_receipts_profession?: number;

  // Duties, taxes and cess
  trd_custom_duty?: number;
  trd_counter_velling_duty?: number;
  trd_services_tax?: number;
  trd_vat_sales_tax?: number;
  trd_cgst?: number;
  trd_sgst?: number;
  trd_igst?: number;
  trd_utgst?: number;

  // Cost of Goods Sold
  trd_closing_stock_finished_goods?: number;
  trd_total_credits_trading_account?: number;
  trd_opening_stock_finished_goods?: number;
  trd_purchases_net_of_refunds?: number;
  trd_carriage_inward_trading?: number;
  trd_power_and_fuel_trading?: number;
  trd_other_direct_expenses_trading?: number;

  // PROFIT & LOSS ACCOUNT FIELDS
  // 13. Gross Profit
  pl_gross_profit?: number;

  // 14. Other Income
  pl_rent?: number;
  pl_commission?: number;
  pl_dividend_income?: number;
  pl_interest_income?: number;
  pl_profit_sale_fixed_assets?: number;
  pl_profit_securities_transaction?: number;
  pl_profit_other_investment?: number;
  pl_gain_foreign_exchange?: number;
  pl_profit_inventory_conversion?: number;
  pl_agricultural_income?: number;
  pl_other_income_a?: number;
  pl_other_income_b?: number;
  pl_other_income_c?: number;

  // 15-46. Operating and Other Expenses
  // 16-21
  pl_freight_outward?: number;
  pl_consumption_stores?: number;
  pl_power_fuel?: number;
  pl_rents?: number;
  pl_repairs_building?: number;
  pl_repairs_machinery?: number;
  pl_compensation_employees?: number;

  // 22. Compensation to employees
  pl_salaries_wages?: number;
  pl_bonus?: number;
  pl_medical_expenses?: number;
  pl_leave_encashment?: number;
  pl_leave_travel?: number;
  pl_approved_welfare?: number;
  pl_recognised_provident?: number;
  pl_recognised_gratuity?: number;
  pl_contribution_other_fund?: number;
  pl_other_benefit_employees?: number;

  // 23. Insurance
  pl_medical_insurance?: number;
  pl_life_insurance?: number;
  pl_keyman_insurance?: number;
  pl_other_insurance?: number;

  // 24-43
  pl_workmen_staff?: number;
  pl_entertainment?: number;
  pl_hospitality?: number;
  pl_conference?: number;
  pl_sales_promotion?: number;
  pl_advertisement?: number;

  // 30. Commission
  pl_commission_paid_i?: number;
  pl_commission_paid_ii?: number;

  // 31. Royalty
  pl_royalty_paid_i?: number;
  pl_royalty_paid_ii?: number;

  // 32. Professional Fees
  pl_professional_fees_i?: number;
  pl_professional_fees_ii?: number;

  // 33-43. Travel and other expenses
  pl_hotel_boarding?: number;
  pl_travelling_expenses?: number;
  pl_foreign_travelling?: number;
  pl_conveyance_expenses?: number;
  pl_telephone_expenses?: number;
  pl_guest_house_expenses?: number;
  pl_club_expenses?: number;
  pl_festival_celebration?: number;
  pl_scholarship?: number;
  pl_gift?: number;
  pl_donation?: number;

  // 44. Rates and taxes
  pl_union_excise_duty?: number;
  pl_services_tax?: number;
  pl_vat_sales_tax?: number;
  pl_cgst?: number;
  pl_sgst?: number;
  pl_igst?: number;
  pl_utgst?: number;
  pl_other_tax?: number;

  // 45-46
  pl_audit_fee?: number;
  pl_other_expenses_i?: number;
  pl_other_expenses_ii?: number;

  // Part A-PL: Updated Profit & Loss (Complete Form)
  pl_new_gross_profit?: number;
  pl_new_rent?: number;
  pl_new_commission?: number;
  pl_new_dividend_income?: number;
  pl_new_interest_income?: number;
  pl_new_profit_fixed_assets?: number;
  pl_new_profit_securities?: number;
  pl_new_profit_other_investment?: number;
  pl_new_foreign_exchange_gain?: number;
  pl_new_inventory_conversion?: number;
  pl_new_agricultural_income?: number;
  pl_new_other_income_a?: number;
  pl_new_other_income_b?: number;
  pl_new_other_income_c?: number;
  pl_new_freight_outward?: number;
  pl_new_consumption_stores?: number;
  pl_new_power_fuel?: number;
  pl_new_rents?: number;
  pl_new_repairs_building?: number;
  pl_new_repairs_machinery?: number;
  pl_new_compensation_employees?: number;
  pl_new_medical_insurance?: number;
  pl_new_workmen_welfare?: number;
  pl_new_entertainment?: number;
  pl_new_hospitality?: number;
  pl_new_conference?: number;
  pl_new_sales_promotion?: number;
  pl_new_advertisement?: number;
  pl_new_royalty?: number;
  pl_new_professional_fees?: number;
  pl_new_hotel_boarding?: number;
  pl_new_travelling_expenses?: number;
  pl_new_foreign_travelling?: number;
  pl_new_conveyance?: number;
  pl_new_telephone?: number;
  pl_new_guest_house?: number;
  pl_new_club_expenses?: number;
  pl_new_festival_celebration?: number;
  pl_new_scholarship?: number;
  pl_new_gift?: number;
  pl_new_donation?: number;
  pl_new_rates_taxes?: number;
  pl_new_audit_fee?: number;
  pl_new_other_expenses?: number;
  pl_new_bad_debts_over_1lakh?: number;
  pl_new_bad_debts_under_1lakh?: number;
  pl_new_provision_bad_debts?: number;
  pl_new_other_provisions?: number;
  pl_new_interest_outside?: number;
  pl_new_interest_others?: number;
  pl_new_depreciation_amortization?: number;
  pl_new_current_tax_provision?: number;
  pl_new_deferred_tax_provision?: number;
  pl_new_balance_previous_year?: number;
  pl_new_transfer_reserves?: number;
  pl_new_dividend?: number;
  pl_new_tax_dividend?: number;
  pl_new_csr_appropriation?: number;
  pl_new_other_appropriation?: number;
  pl_new_remeasurement_changes?: number;
  pl_new_equity_changes?: number;
  pl_new_exchange_differences?: number;
  pl_new_hedging_gains?: number;

  // Part A-OI: Other Information
  oi_accounting_method_prev?: string;
  oi_accounting_method_change?: string;
  oi_accounting_change_details?: string;
  oi_stock_valuation_method?: string;
  oi_finished_goods_method?: number;
  oi_stock_valuation_change?: string;
  oi_profit_increase_icds?: number;
  oi_profit_decrease_valuation?: number;
  oi_closing_stock_valuation?: string;
  oi_items_section_28?: number;
  oi_proforma_credits?: number;
  oi_escalation_claims?: number;
  oi_other_income_item?: number;
  oi_capital_receipt?: number;
  oi_insurance_premium?: number;
  oi_health_insurance_premium?: number;
  oi_employee_bonus_commission?: number;
  oi_interest_borrowed_capital?: number;
  oi_provident_fund_contribution?: number;
  oi_pension_contribution?: number;
  oi_gratuity_fund_contribution?: number;
  oi_other_fund_contribution?: number;
  oi_bad_debts_allowance?: number;
  oi_bad_debts_provision?: number;
  oi_special_reserve_transfer?: number;
  oi_family_planning_expenditure?: number;
  oi_capital_expenditure_disallow?: number;
  oi_personal_expenditure_disallow?: number;
  oi_npl_expenditure_disallow?: number;
  oi_penalty_fine_disallow?: number;
  oi_offence_purpose_disallow?: number;
  oi_csr_expenditure_disallow?: number;
  oi_contingent_liability_disallow?: number;
  oi_other_disallow?: number;

  // Part A-QD: Quantitative Details
  // Trading Concern
  qd_trading_opening_stock?: number;
  qd_trading_opening_stock_unit?: string;
  qd_trading_purchase?: number;
  qd_trading_purchase_unit?: string;
  qd_trading_sales?: number;
  qd_trading_sales_unit?: string;
  qd_trading_closing_stock?: number;
  qd_trading_closing_stock_unit?: string;
  qd_trading_shortage_excess?: number;
  qd_trading_shortage_excess_unit?: string;

  // Manufacturing Concern - Raw Materials
  qd_mfg_raw_opening?: number;
  qd_mfg_raw_opening_unit?: string;
  qd_mfg_raw_purchase?: number;
  qd_mfg_raw_purchase_unit?: string;
  qd_mfg_raw_consumption?: number;
  qd_mfg_raw_consumption_unit?: string;
  qd_mfg_raw_closing?: number;
  qd_mfg_raw_closing_unit?: string;
  qd_mfg_raw_shortage?: number;
  qd_mfg_raw_shortage_unit?: string;

  // Manufacturing Concern - Finished Products
  qd_mfg_fp_opening?: number;
  qd_mfg_fp_opening_unit?: string;
  qd_mfg_fp_manufactured?: number;
  qd_mfg_fp_manufactured_unit?: string;
  qd_mfg_fp_sales?: number;
  qd_mfg_fp_sales_unit?: string;
  qd_mfg_fp_closing?: number;
  qd_mfg_fp_closing_unit?: string;
  qd_mfg_fp_shortage?: number;
  qd_mfg_fp_shortage_unit?: string;

  // Manufacturing Concern - By-products
  qd_mfg_byp_opening?: number;
  qd_mfg_byp_opening_unit?: string;
  qd_mfg_byp_purchase?: number;
  qd_mfg_byp_purchase_unit?: string;
  qd_mfg_byp_manufactured?: number;
  qd_mfg_byp_manufactured_unit?: string;
  qd_mfg_byp_sales?: number;
  qd_mfg_byp_sales_unit?: string;
  qd_mfg_byp_closing?: number;
  qd_mfg_byp_closing_unit?: string;
  qd_mfg_byp_shortage?: number;
  qd_mfg_byp_shortage_unit?: string;

  // Part A-OL: Receipt and Payment Account
  rpa_opening_cash?: number;
  rpa_opening_bank?: number;
  rpa_receipt_interest?: number;
  rpa_receipt_dividend?: number;
  rpa_receipt_sale_assets_a?: number;
  rpa_receipt_sale_assets_b?: number;
  rpa_receipt_sale_assets_c?: number;
  rpa_receipt_sale_assets_total?: number;
  rpa_receipt_realization_debtors?: number;
  rpa_receipt_others_a?: number;
  rpa_receipt_others_b?: number;
  rpa_receipt_others_total?: number;
  rpa_payment_repayment_secured?: number;
  rpa_payment_repayment_unsecured?: number;
  rpa_payment_repayment_creditors?: number;
  rpa_payment_commission?: number;
  rpa_payment_others_a?: number;
  rpa_payment_others_b?: number;
  rpa_payment_others_total?: number;
  rpa_closing_cash?: number;
  rpa_closing_bank?: number;

  // Schedule HP: House Property Income Details
  // Dynamic property fields - up to 5 properties
  hp_property_1_address?: string;
  hp_property_1_city?: string;
  hp_property_1_state?: string;
  hp_property_1_country?: string;
  hp_property_1_pincode?: string;
  hp_property_1_coowned?: string;
  hp_property_1_ownership_percentage?: number;
  hp_property_1_coowner_1_name?: string;
  hp_property_1_coowner_1_pan?: string;
  hp_property_1_coowner_1_share?: number;
  hp_property_1_coowner_2_name?: string;
  hp_property_1_coowner_2_pan?: string;
  hp_property_1_coowner_2_share?: number;
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
  hp_property_2_coowned?: string;
  hp_property_2_ownership_percentage?: number;
  hp_property_2_coowner_1_name?: string;
  hp_property_2_coowner_1_pan?: string;
  hp_property_2_coowner_1_share?: number;
  hp_property_2_coowner_2_name?: string;
  hp_property_2_coowner_2_pan?: string;
  hp_property_2_coowner_2_share?: number;
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

  hp_property_3_address?: string;
  hp_property_3_city?: string;
  hp_property_3_state?: string;
  hp_property_3_country?: string;
  hp_property_3_pincode?: string;
  hp_property_3_coowned?: string;
  hp_property_3_ownership_percentage?: number;
  hp_property_3_coowner_1_name?: string;
  hp_property_3_coowner_1_pan?: string;
  hp_property_3_coowner_1_share?: number;
  hp_property_3_coowner_2_name?: string;
  hp_property_3_coowner_2_pan?: string;
  hp_property_3_coowner_2_share?: number;
  hp_property_3_gross_rent?: number;
  hp_property_3_rent_not_realised?: number;
  hp_property_3_tax_local_authorities?: number;
  hp_property_3_total_deduction?: number;
  hp_property_3_annual_value?: number;
  hp_property_3_annual_value_owned?: number;
  hp_property_3_thirty_percent?: number;
  hp_property_3_interest_borrowed?: number;
  hp_property_3_deduction?: number;
  hp_property_3_arrears_unrealised?: number;
  hp_property_3_income_property?: number;
  hp_property_3_passthrough_loss?: number;
  hp_property_3_total_income_property?: number;

  hp_property_4_address?: string;
  hp_property_4_city?: string;
  hp_property_4_state?: string;
  hp_property_4_country?: string;
  hp_property_4_pincode?: string;
  hp_property_4_coowned?: string;
  hp_property_4_ownership_percentage?: number;
  hp_property_4_coowner_1_name?: string;
  hp_property_4_coowner_1_pan?: string;
  hp_property_4_coowner_1_share?: number;
  hp_property_4_coowner_2_name?: string;
  hp_property_4_coowner_2_pan?: string;
  hp_property_4_coowner_2_share?: number;
  hp_property_4_gross_rent?: number;
  hp_property_4_rent_not_realised?: number;
  hp_property_4_tax_local_authorities?: number;
  hp_property_4_total_deduction?: number;
  hp_property_4_annual_value?: number;
  hp_property_4_annual_value_owned?: number;
  hp_property_4_thirty_percent?: number;
  hp_property_4_interest_borrowed?: number;
  hp_property_4_deduction?: number;
  hp_property_4_arrears_unrealised?: number;
  hp_property_4_income_property?: number;
  hp_property_4_passthrough_loss?: number;
  hp_property_4_total_income_property?: number;

  hp_property_5_address?: string;
  hp_property_5_city?: string;
  hp_property_5_state?: string;
  hp_property_5_country?: string;
  hp_property_5_pincode?: string;
  hp_property_5_coowned?: string;
  hp_property_5_ownership_percentage?: number;
  hp_property_5_coowner_1_name?: string;
  hp_property_5_coowner_1_pan?: string;
  hp_property_5_coowner_1_share?: number;
  hp_property_5_coowner_2_name?: string;
  hp_property_5_coowner_2_pan?: string;
  hp_property_5_coowner_2_share?: number;
  hp_property_5_gross_rent?: number;
  hp_property_5_rent_not_realised?: number;
  hp_property_5_tax_local_authorities?: number;
  hp_property_5_total_deduction?: number;
  hp_property_5_annual_value?: number;
  hp_property_5_annual_value_owned?: number;
  hp_property_5_thirty_percent?: number;
  hp_property_5_interest_borrowed?: number;
  hp_property_5_deduction?: number;
  hp_property_5_arrears_unrealised?: number;
  hp_property_5_income_property?: number;
  hp_property_5_passthrough_loss?: number;
  hp_property_5_total_income_property?: number;

  // Part A-CF: Cash Flow Statement
  cf_net_profit_loss?: number;
  cf_depreciation?: number;
  cf_amortization?: number;
  cf_impairment_loss?: number;
  cf_finance_costs?: number;
  cf_foreign_exchange_loss?: number;
  cf_profit_loss_on_assets?: number;
  cf_trade_receivables_decrease?: number;
  cf_inventories_decrease?: number;
  cf_trade_payables_increase?: number;
  cf_other_payables_increase?: number;
  cf_current_assets_decrease?: number;
  cf_current_liabilities_increase?: number;
  cf_capital_work_purchase?: number;
  cf_capital_work_sale?: number;
  cf_investments_purchase?: number;
  cf_investments_sale?: number;
  cf_loans_advance_given?: number;
  cf_loans_advance_received?: number;
  cf_equity_share_issued?: number;
  cf_borrowings_taken?: number;
  cf_borrowings_repaid?: number;
  cf_dividend_paid?: number;
  cf_interest_paid?: number;

  // Part A-NT: Notes to Accounts
  nt_contingent_liability_1?: number;
  nt_contingent_liability_2?: number;
  nt_contingent_liability_3?: number;
  nt_contingent_liability_4?: number;
  nt_contingent_liability_5?: number;
  nt_contingent_liability_desc_1?: string;
  nt_contingent_liability_desc_2?: string;
  nt_contingent_liability_desc_3?: string;
  nt_contingent_liability_desc_4?: string;
  nt_contingent_liability_desc_5?: string;
  nt_capital_commitments_not_authorized?: number;
  nt_capital_commitments_authorized?: number;
  nt_contingent_asset_1?: number;
  nt_contingent_asset_2?: number;
  nt_contingent_asset_3?: number;
  nt_contingent_asset_desc_1?: string;
  nt_contingent_asset_desc_2?: string;
  nt_contingent_asset_desc_3?: string;
  nt_related_party_1?: number;
  nt_related_party_2?: number;
  nt_related_party_3?: number;
  nt_related_party_4?: number;
  nt_related_party_desc_1?: string;
  nt_related_party_desc_2?: string;
  nt_related_party_desc_3?: string;
  nt_related_party_desc_4?: string;
  nt_post_events?: string;
  nt_restructuring_events?: string;
  nt_regulatory_events?: string;
  nt_num_employees?: number;
  nt_employee_benefits?: string;
  nt_rd_activities?: string;
  nt_csr_activities?: string;
  nt_other_disclosures?: string;

  // Part A-CI: Comprehensive Income Statement
  ci_profit_before_interest_depreciation?: number;
  ci_finance_costs?: number;
  ci_depreciation_amortization?: number;
  ci_bad_debts_pan?: string;
  ci_bad_debts_total?: number;
  ci_bad_debts_others?: number;
  ci_provision_bad_doubtful_debts?: number;
  ci_provision_current_tax?: number;
  ci_provision_deferred_tax?: number;
  ci_transfer_reserves_surplus?: number;
  ci_proposed_dividend?: number;
  ci_tax_on_dividend?: number;
  ci_csr_appropriation?: number;
  ci_other_appropriation?: number;
  ci_remeasurement_pension_changes?: number;
  ci_remeasurement_deferred_benefit?: number;
  ci_equity_instruments_changes?: number;
  ci_own_credit_risk_changes?: number;
  ci_share_other_comprehensive_income?: number;
  ci_other_not_reclassified_nature?: number;
  ci_exchange_differences_translation?: number;
  ci_effective_portion_cash_flow_hedge?: number;
  ci_gains_losses_hedging_instruments?: number;
  ci_oci_associates_joint_ventures?: number;
  ci_other_reclassified_nature?: number;

  // Schedule BP - Computation of income from business or profession
  bp_profit_before_tax?: number;
  bp_speculative_profit_included?: number;
  bp_specified_business_profit_included?: number;
  
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

  // Profit included in 1 referred to in section 44B etc
  bp_profit_44b_etc?: number;
  bp_profit_life_insurance_115b?: number;
  bp_profit_rule_7_etc?: number;
  bp_profit_raw_diamonds?: number;

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

  // Specified Business
  bp_specified_net_profit?: number;
  bp_specified_additions?: number;
  bp_specified_deductions?: number;
  bp_specified_profit_loss?: number;
  bp_specified_deductions_35ad?: number;
  bp_specified_income?: number;
  bp_specified_section_35ad_clause?: string;

  // Intra head set off
  bp_loss_to_be_set_off?: number;
  bp_income_speculative_set_off?: number;
  bp_income_specified_set_off?: number;
  bp_income_life_insurance_set_off?: number;
  bp_income_foreign_company_set_off?: number;
  bp_total_loss_set_off?: number;
  bp_loss_remaining?: number;

  // Schedule DPM - Depreciation on Plant and Machinery
  dpm_wdv_3_15?: number;
  dpm_wdv_3_30?: number;
  dpm_wdv_3_40?: number;
  dpm_wdv_3_45?: number;
  dpm_add_180_15?: number;
  dpm_add_180_30?: number;
  dpm_add_180_40?: number;
  dpm_add_180_45?: number;
  dpm_cons_5_15?: number;
  dpm_cons_5_30?: number;
  dpm_cons_5_40?: number;
  dpm_cons_5_45?: number;
  dpm_amt_full_6_15?: number;
  dpm_amt_full_6_30?: number;
  dpm_amt_full_6_40?: number;
  dpm_amt_full_6_45?: number;
  dpm_add_less180_7_15?: number;
  dpm_add_less180_7_30?: number;
  dpm_add_less180_7_40?: number;
  dpm_add_less180_7_45?: number;
  dpm_cons_8_15?: number;
  dpm_cons_8_30?: number;
  dpm_cons_8_40?: number;
  dpm_cons_8_45?: number;
  dpm_amt_half_9_15?: number;
  dpm_amt_half_9_30?: number;
  dpm_amt_half_9_40?: number;
  dpm_amt_half_9_45?: number;
  dpm_depr_full_10_15?: number;
  dpm_depr_full_10_30?: number;
  dpm_depr_full_10_40?: number;
  dpm_depr_full_10_45?: number;
  dpm_depr_half_11_15?: number;
  dpm_depr_half_11_30?: number;
  dpm_depr_half_11_40?: number;
  dpm_depr_half_11_45?: number;
  dpm_add_depr_12_15?: number;
  dpm_add_depr_12_30?: number;
  dpm_add_depr_12_40?: number;
  dpm_add_depr_12_45?: number;
  dpm_add_depr_13_15?: number;
  dpm_add_depr_13_30?: number;
  dpm_add_depr_13_40?: number;
  dpm_add_depr_13_45?: number;
  dpm_add_depr_14_15?: number;
  dpm_add_depr_14_30?: number;
  dpm_add_depr_14_40?: number;
  dpm_add_depr_14_45?: number;
  dpm_total_depr_15_15?: number;
  dpm_total_depr_15_30?: number;
  dpm_total_depr_15_40?: number;
  dpm_total_depr_15_45?: number;
  dpm_disallowed_16_15?: number;
  dpm_disallowed_16_30?: number;
  dpm_disallowed_16_40?: number;
  dpm_disallowed_16_45?: number;
  dpm_net_depr_17_15?: number;
  dpm_net_depr_17_30?: number;
  dpm_net_depr_17_40?: number;
  dpm_net_depr_17_45?: number;
  dpm_prorata_18_15?: number;
  dpm_prorata_18_30?: number;
  dpm_prorata_18_40?: number;
  dpm_prorata_18_45?: number;
  dpm_exp_transfer_19_15?: number;
  dpm_exp_transfer_19_30?: number;
  dpm_exp_transfer_19_40?: number;
  dpm_exp_transfer_19_45?: number;
  dpm_capital_gains_20_15?: number;
  dpm_capital_gains_20_30?: number;
  dpm_capital_gains_20_40?: number;
  dpm_capital_gains_20_45?: number;
  dpm_wdv_last_21_15?: number;
  dpm_wdv_last_21_30?: number;
  dpm_wdv_last_21_40?: number;
  dpm_wdv_last_21_45?: number;

  // Schedule DOA - Depreciation on Other Assets
  doa_wdv_3_land?: number;
  doa_wdv_3_bldg?: number;
  doa_wdv_3_furn?: number;
  doa_wdv_3_intang?: number;
  doa_wdv_3_ships?: number;
  doa_add_180_4_land?: number;
  doa_add_180_4_bldg?: number;
  doa_add_180_4_furn?: number;
  doa_add_180_4_intang?: number;
  doa_add_180_4_ships?: number;
  doa_cons_5_land?: number;
  doa_cons_5_bldg?: number;
  doa_cons_5_furn?: number;
  doa_cons_5_intang?: number;
  doa_cons_5_ships?: number;
  doa_amt_full_6_land?: number;
  doa_amt_full_6_bldg?: number;
  doa_amt_full_6_furn?: number;
  doa_amt_full_6_intang?: number;
  doa_amt_full_6_ships?: number;
  doa_add_less180_7_land?: number;
  doa_add_less180_7_bldg?: number;
  doa_add_less180_7_furn?: number;
  doa_add_less180_7_intang?: number;
  doa_add_less180_7_ships?: number;
  doa_cons_8_land?: number;
  doa_cons_8_bldg?: number;
  doa_cons_8_furn?: number;
  doa_cons_8_intang?: number;
  doa_cons_8_ships?: number;
  doa_amt_half_9_land?: number;
  doa_amt_half_9_bldg?: number;
  doa_amt_half_9_furn?: number;
  doa_amt_half_9_intang?: number;
  doa_amt_half_9_ships?: number;
  doa_depr_full_10_land?: number;
  doa_depr_full_10_bldg?: number;
  doa_depr_full_10_furn?: number;
  doa_depr_full_10_intang?: number;
  doa_depr_full_10_ships?: number;
  doa_depr_half_11_land?: number;
  doa_depr_half_11_bldg?: number;
  doa_depr_half_11_furn?: number;
  doa_depr_half_11_intang?: number;
  doa_depr_half_11_ships?: number;
  doa_total_depr_12_land?: number;
  doa_total_depr_12_bldg?: number;
  doa_total_depr_12_furn?: number;
  doa_total_depr_12_intang?: number;
  doa_total_depr_12_ships?: number;
  doa_disallowed_13_land?: number;
  doa_disallowed_13_bldg?: number;
  doa_disallowed_13_furn?: number;
  doa_disallowed_13_intang?: number;
  doa_disallowed_13_ships?: number;
  doa_net_depr_14_land?: number;
  doa_net_depr_14_bldg?: number;
  doa_net_depr_14_furn?: number;
  doa_net_depr_14_intang?: number;
  doa_net_depr_14_ships?: number;
  doa_prorata_15_land?: number;
  doa_prorata_15_bldg?: number;
  doa_prorata_15_furn?: number;
  doa_prorata_15_intang?: number;
  doa_prorata_15_ships?: number;
  doa_exp_transfer_16_land?: number;
  doa_exp_transfer_16_bldg?: number;
  doa_exp_transfer_16_furn?: number;
  doa_exp_transfer_16_intang?: number;
  doa_exp_transfer_16_ships?: number;
  doa_capital_gains_17_land?: number;
  doa_capital_gains_17_bldg?: number;
  doa_capital_gains_17_furn?: number;
  doa_capital_gains_17_intang?: number;
  doa_capital_gains_17_ships?: number;
  doa_wdv_last_18_land?: number;
  doa_wdv_last_18_bldg?: number;
  doa_wdv_last_18_furn?: number;
  doa_wdv_last_18_intang?: number;
  doa_wdv_last_18_ships?: number;

  // Schedule DEP - Summary of Depreciation
  dep_pm_15_1a?: number;
  dep_pm_30_1b?: number;
  dep_pm_40_1c?: number;
  dep_pm_45_1d?: number;
  dep_total_pm_1e?: number;
  dep_bldg_5_2a?: number;
  dep_bldg_10_2b?: number;
  dep_bldg_40_2c?: number;
  dep_total_bldg_2d?: number;
  dep_furniture_3?: number;
  dep_intangible_4?: number;
  dep_ships_5?: number;
  dep_total_6?: number;

  // Schedule DCG - Deemed Capital Gains
  dcg_pm_15_1a?: number;
  dcg_pm_30_1b?: number;
  dcg_pm_40_1c?: number;
  dcg_pm_45_1d?: number;
  dcg_total_pm_1e?: number;
  dcg_bldg_5_2a?: number;
  dcg_bldg_10_2b?: number;
  dcg_bldg_40_2c?: number;
  dcg_total_bldg_2d?: number;
  dcg_furniture_3?: number;
  dcg_intangible_4?: number;
  dcg_ships_5?: number;
  dcg_total_6?: number;

  // Schedule ESR - Expenditure on Scientific Research
  esr_35_1_i_debited?: number;
  esr_35_1_i_allowable?: number;
  esr_35_1_i_excess?: number;
  esr_35_1_ii_debited?: number;
  esr_35_1_ii_allowable?: number;
  esr_35_1_ii_excess?: number;
  esr_35_1_iii_debited?: number;
  esr_35_1_iii_allowable?: number;
  esr_35_1_iii_excess?: number;
  esr_35_1_iv_debited?: number;
  esr_35_1_iv_allowable?: number;
  esr_35_1_iv_excess?: number;
  esr_35_1_v_debited?: number;
  esr_35_1_v_allowable?: number;
  esr_35_1_v_excess?: number;
  esr_35_2aa_debited?: number;
  esr_35_2aa_allowable?: number;
  esr_35_2aa_excess?: number;
  esr_35_2ab_debited?: number;
  esr_35_2ab_allowable?: number;
  esr_35_2ab_excess?: number;
  esr_35ccc_debited?: number;
  esr_35ccc_allowable?: number;
  esr_35ccc_excess?: number;
  esr_35ccd_debited?: number;
  esr_35ccd_allowable?: number;
  esr_35ccd_excess?: number;
  esr_total_debited?: number;
  esr_total_allowable?: number;
  esr_total_excess?: number;

  // Schedule CG: Capital Gains - SHORT-TERM CAPITAL GAINS (STCG)
  cg_stcg_1_date_acq?: string;
  cg_stcg_1_date_sale?: string;
  cg_stcg_1a_i_fvoc?: number;
  cg_stcg_1a_ii_stamp?: number;
  cg_stcg_1a_iii_adopted?: number;
  cg_stcg_1b_i_coa_ni?: number;
  cg_stcg_1b_ii_coi_ni?: number;
  cg_stcg_1b_iii_expl_trans?: number;
  cg_stcg_1b_iv_total?: number;
  cg_stcg_1c_balance?: number;
  cg_stcg_1d_deduction?: number;
  cg_stcg_1e_stcg_immov?: number;
  cg_stcg_2a_fmv_rule2?: number;
  cg_stcg_2b_fmv_rule3?: number;
  cg_stcg_2c_fvoc_higher?: number;
  cg_stcg_2d_networth?: number;
  cg_stcg_2e_stcg_stump?: number;
  cg_stcg_3a_fvoc?: number;
  cg_stcg_3b_i_coa_ni?: number;
  cg_stcg_3b_ii_coi_ni?: number;
  cg_stcg_3b_iii_expl?: number;
  cg_stcg_3b_iv_total?: number;
  cg_stcg_3c_balance?: number;
  cg_stcg_3d_loss?: number;
  cg_stcg_3e_stcg_equity?: number;
  cg_stcg_4a_tcs?: number;
  cg_stcg_4b_other?: number;
  cg_stcg_5i_a_fvoc?: number;
  cg_stcg_5i_b_fmv?: number;
  cg_stcg_5i_c_adopted?: number;
  cg_stcg_5i_ii_other?: number;
  cg_stcg_5i_iii_total?: number;
  cg_stcg_5ii_deduction?: number;
  cg_stcg_5c_balance?: number;
  cg_stcg_6a_i_fvoc?: number;
  cg_stcg_6a_ii_fmv?: number;
  cg_stcg_6a_iii_adopted?: number;
  cg_stcg_6b_deduction?: number;
  cg_stcg_6c_balance?: number;
  cg_stcg_7_deemed?: number;
  cg_stcg_8a_passthrough_15?: number;
  cg_stcg_8b_passthrough_20?: number;
  cg_stcg_8c_passthrough_30?: number;
  cg_stcg_9a_dtaa_not_claimed?: number;
  cg_stcg_9b_special_rates?: number;
  cg_stcg_10_total?: number;

  // Schedule CG: Capital Gains - LONG-TERM CAPITAL GAINS (LTCG)
  cg_ltcg_1_date_acq?: string;
  cg_ltcg_1_date_sale?: string;
  cg_ltcg_1a_i_fvoc?: number;
  cg_ltcg_1a_ii_stamp?: number;
  cg_ltcg_1a_iii_adopted?: number;
  cg_ltcg_1b_i_coa_ni?: number;
  cg_ltcg_1b_iia_coa_indexed?: number;
  cg_ltcg_1b_iib_coi_total?: number;
  cg_ltcg_1b_iib_a_coi_ni?: number;
  cg_ltcg_1b_iib_b_coi_indexed?: number;
  cg_ltcg_1b_iib_c_coi_indexed_23jul?: number;
  cg_ltcg_1b_iii_expl?: number;
  cg_ltcg_1b_iv_total?: number;
  cg_ltcg_1c_balance?: number;
  cg_ltcg_1d_deduction?: number;
  cg_ltcg_1e_ltcg_immov?: number;
  cg_ltcg_2a_fmv_rule2?: number;
  cg_ltcg_2b_fmv_rule3?: number;
  cg_ltcg_2c_ei?: number;
  cg_ltcg_2c_eii?: number;
  cg_ltcg_2c_e?: number;
  cg_ltcg_3a_fvoc?: number;
  cg_ltcg_3b_deduction?: number;
  cg_ltcg_3c_balance?: number;
  cg_ltcg_4a_fvoc?: number;
  cg_ltcg_4b_i_coa_ni?: number;
  cg_ltcg_4b_ia_coa_ni_23jul?: number;
  cg_ltcg_4b_ii_coi_ni?: number;
  cg_ltcg_4b_iia_coi_ni_23jul?: number;
  cg_ltcg_4b_iii_expl?: number;
  cg_ltcg_4b_iv_total?: number;
  cg_ltcg_4b_iva_total_23jul?: number;
  cg_ltcg_4c_balance?: number;
  cg_ltcg_5a_fvoc?: number;
  cg_ltcg_5b_deduction?: number;
  cg_ltcg_5c_balance?: number;
  cg_ltcg_5d_col_14?: number;
  cg_ltcg_5e_col_14_23jul?: number;
  cg_ltcg_6a_ni_before_23jul?: number;
  cg_ltcg_6b_deb_before_23jul?: number;
  cg_ltcg_6c_ni_after_23jul?: number;
  cg_ltcg_6d_deb_after_23jul?: number;
  cg_ltcg_7_unlisted?: number;
  cg_ltcg_8_fii_stpt?: number;
  cg_ltcg_9_cap_gains_immov?: number;
  cg_ltcg_10a_passthrough_10?: number;
  cg_ltcg_10b_passthrough_12_5?: number;
  cg_ltcg_10c_passthrough_20?: number;
  cg_ltcg_11a_not_claimed?: number;
  cg_ltcg_11b_special_rates?: number;
  cg_ltcg_13_total?: number;
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

  // Schedule CG: Accrual
  cg_accrual_stcg_15_6?: number;
  cg_accrual_stcg_16_9?: number;
  cg_accrual_stcg_16_12?: number;
  cg_accrual_stcg_16_3?: number;
  cg_accrual_stcg_31_3?: number;
  cg_accrual_ltcg_15_6?: number;
  cg_accrual_ltcg_16_9?: number;
  cg_accrual_ltcg_16_12?: number;
  cg_accrual_ltcg_16_3?: number;
  cg_accrual_ltcg_31_3?: number;

  cg_income_chargeable?: number;

  // Schedule ITA: Equity share transactions
  ita_1_isin?: string;
  ita_1_trans?: string;
  ita_1_is?: string;
  ita_1_name?: string;
  ita_1_no_shares?: number;
  ita_1_sale_price?: number;
  ita_1_fvoc?: number;
  ita_1_cost?: number;
  ita_1_fmv_31jan?: number;
  ita_1_fmv_esc?: number;
  ita_1_expenditure?: number;
  ita_1_balance?: number;
  ita_1_loss_itr_section?: string;
  ita_1_total_add_ltcg?: number;

  ita_2_isin?: string;
  ita_2_trans?: string;
  ita_2_is?: string;
  ita_2_name?: string;
  ita_2_no_shares?: number;
  ita_2_sale_price?: number;
  ita_2_fvoc?: number;
  ita_2_cost?: number;
  ita_2_fmv_31jan?: number;
  ita_2_fmv_esc?: number;
  ita_2_expenditure?: number;
  ita_2_balance?: number;
  ita_2_loss_itr_section?: string;
  ita_2_total_add_ltcg?: number;

  // Schedule ITA Summary
  ita_item1_total_before_23jul?: number;
  ita_item2_total_on_after_23jul?: number;
  ita_item3_total_ltcg_112a?: number;

  // Schedule VDA: Virtual Digital Assets
  vda_1_date_acquisition?: string;
  vda_1_date_transfer?: string;
  vda_1_income_head?: string;
  vda_1_cost_acquisition?: number;
  vda_1_consideration_received?: number;
  vda_1_income_from_transfer?: number;

  vda_2_date_acquisition?: string;
  vda_2_date_transfer?: string;
  vda_2_income_head?: string;
  vda_2_cost_acquisition?: number;
  vda_2_consideration_received?: number;
  vda_2_income_from_transfer?: number;

  vda_total_business_income?: number;
  vda_total_capital_gain?: number;

  // Income Summary
  summary_business_income?: number;
  summary_capital_gain?: number;

  // Schedule OS: Income from Other Sources
  // Part 1a - Dividends
  os_dividend_other_than_iii?: number;
  os_dividend_2_22_c?: number;
  os_dividend_2_22_f?: number;
  os_dividends_gross?: number;

  // Part 1b - Interest
  os_interest_savings?: number;
  os_interest_deposits?: number;
  os_interest_tax_refund?: number;
  os_interest_pass_through?: number;
  os_interest_others?: number;
  os_interest_gross?: number;

  // Part 1c - Rental Income
  os_rental_machinery?: number;

  // Part 1d - Income u/s 56(2)(x)
  os_56_2_x_aggregate?: number;
  os_56_2_x_immovable_no_consideration?: number;
  os_56_2_x_immovable_inadequate?: number;
  os_56_2_x_other_property_no_consideration?: number;
  os_56_2_x_other_property_inadequate?: number;
  os_56_2_x_total?: number;

  // Part 1e - Any other income
  os_other_income_nature_1?: string;
  os_other_income_amount_1?: number;

  // Part 2 - Income at special rates
  os_special_rate_2ai?: number;
  os_special_rate_2aii?: number;
  os_special_rate_2b?: number;
  os_special_rate_2bi?: number;
  os_special_rate_2bii?: number;
  os_special_rate_2biii?: number;
  os_special_rate_2biv?: number;
  os_special_rate_2bv?: number;
  os_special_rate_2c?: number;
  os_special_rate_2_total?: number;

  // Part 3 - Deductions
  os_deductions_expenses?: number;
  os_deductions_depreciation?: number;
  os_deductions_interest?: number;
  os_deductions_eligible_interest?: number;

  // Schedule CVLA: Details of Income after Set-off of current year losses
  // Row i - Loss to be set off
  cvla_loss_to_setoff?: number;

  // Row ii - House property
  cvla_house_property_income?: number;
  cvla_house_property_setoff?: number;
  cvla_house_property?: number;

  // Row iii - Business Income
  cvla_business_income_amt?: number;
  cvla_business_hp_setoff?: number;
  cvla_business_bus_setoff?: number;
  cvla_business_other_setoff?: number;
  cvla_business_income?: number;

  // Row iv - Insurance income
  cvla_insurance_income_amt?: number;
  cvla_income_from_insurance?: number;

  // Row v - Speculation income
  cvla_speculation_income_amt?: number;
  cvla_speculation_income?: number;

  // Row vi - Specified business
  cvla_specified_business_amt?: number;
  cvla_specified_business?: number;

  // Rows vii-xi - STCG at different rates
  cvla_stcg_15_amt?: number;
  cvla_stcg_20_amt?: number;
  cvla_stcg_30_amt?: number;
  cvla_stcg_applicable_amt?: number;
  cvla_stcg_special_amt?: number;
  cvla_stcg_15pct?: number;
  cvla_stcg_20pct?: number;
  cvla_stcg_30pct?: number;
  cvla_stcg_applicable_rates?: number;
  cvla_stcg_special_rates_india?: number;

  // Rows xii-xv - LTCG at different rates
  cvla_ltcg_10_amt?: number;
  cvla_ltcg_12_5_amt?: number;
  cvla_ltcg_20_amt?: number;
  cvla_ltcg_special_amt?: number;
  cvla_ltcg_10pct?: number;
  cvla_ltcg_12_5pct?: number;
  cvla_ltcg_20pct?: number;
  cvla_ltcg_special_rates_india?: number;

  // Row xvi - Other sources at normal rates
  cvla_os_normal_amt?: number;
  cvla_os_normal_hp_setoff?: number;
  cvla_os_normal_bus_setoff?: number;
  cvla_os_normal_other_setoff?: number;
  cvla_os_normal_rates?: number;

  // Row xvii - Race horses income
  cvla_race_horses_amt?: number;
  cvla_race_horses_income?: number;

  // Row xviii - Other sources at special rates
  cvla_os_special_amt?: number;
  cvla_os_special_rates_india?: number;

  // Totals
  cvla_total_hp_setoff?: number;
  cvla_total_bus_setoff?: number;
  cvla_total_loss_setoff?: number;
  cvla_loss_remaining?: number;

  // Schedule BF1A: Details of Income after Set-off of Brought Forward Losses of earlier years
  // Row i - House property
  bf1a_house_property_income?: number;
  bf1a_house_property_bfl_setoff?: number;
  bf1a_house_property_fa_setoff?: number;
  bf1a_house_property_section_354?: number;
  bf1a_house_property_current?: number;

  // Row ii - Business
  bf1a_business_income?: number;
  bf1a_business_bfl_setoff?: number;
  bf1a_business_fa_setoff?: number;
  bf1a_business_section_354?: number;
  bf1a_business_current?: number;

  // Row iii - Insurance business
  bf1a_insurance_income?: number;
  bf1a_insurance_bfl_setoff?: number;
  bf1a_insurance_current?: number;

  // Row iv - Speculation income
  bf1a_speculation_income?: number;
  bf1a_speculation_bfl_setoff?: number;
  bf1a_speculation_current?: number;

  // Row v - Specified business
  bf1a_specified_income?: number;
  bf1a_specified_bfl_setoff?: number;
  bf1a_specified_current?: number;

  // Rows vi-x - STCG at different rates
  bf1a_stcg_15_income?: number;
  bf1a_stcg_20_income?: number;
  bf1a_stcg_30_income?: number;
  bf1a_stcg_applicable_income?: number;
  bf1a_stcg_special_income?: number;

  // Rows xi-xiv - LTCG at different rates
  bf1a_ltcg_10_income?: number;
  bf1a_ltcg_12_5_income?: number;
  bf1a_ltcg_20_income?: number;
  bf1a_ltcg_special_income?: number;

  // Row xv - Other sources at normal rates
  bf1a_os_normal_income?: number;
  bf1a_os_normal_bfl_setoff?: number;
  bf1a_os_normal_fa_setoff?: number;
  bf1a_os_normal_section_354?: number;
  bf1a_os_normal_current?: number;

  // Row xvi - Race horses income
  bf1a_race_horses_income?: number;
  bf1a_race_horses_bfl_setoff?: number;
  bf1a_race_horses_current?: number;

  // Row xvii - Other sources at special rates
  bf1a_os_special_income?: number;

  // Totals
  bf1a_total_bfl_setoff?: number;
  bf1a_total_fa_setoff?: number;
  bf1a_total_section_354?: number;
  bf1a_total_remaining_income?: number;

  // Schedule CFL: Details of Losses to be carried forward to future years
  // FY 2010-11 through 2024-25 (15 years)
  cfl_date_2010_11?: string;
  cfl_hp_2010_11?: number;
  cfl_business_2010_11?: number;
  cfl_depreciation_2010_11?: number;
  cfl_speculative_2010_11?: number;
  cfl_insurance_2010_11?: number;
  cfl_insurance_115b_2010_11?: number;
  cfl_stcl_2010_11?: number;
  cfl_ltcl_2010_11?: number;
  cfl_race_horses_2010_11?: number;

  cfl_date_2011_12?: string;
  cfl_hp_2011_12?: number;
  cfl_business_2011_12?: number;
  cfl_depreciation_2011_12?: number;
  cfl_speculative_2011_12?: number;
  cfl_insurance_2011_12?: number;
  cfl_insurance_115b_2011_12?: number;
  cfl_stcl_2011_12?: number;
  cfl_ltcl_2011_12?: number;
  cfl_race_horses_2011_12?: number;

  // 2012-13 through 2024-25
  cfl_date_2012_13?: string;
  cfl_hp_2012_13?: number;
  cfl_business_2012_13?: number;
  cfl_depreciation_2012_13?: number;
  cfl_speculative_2012_13?: number;
  cfl_insurance_2012_13?: number;
  cfl_insurance_115b_2012_13?: number;
  cfl_stcl_2012_13?: number;
  cfl_ltcl_2012_13?: number;
  cfl_race_horses_2012_13?: number;

  cfl_date_2013_14?: string;
  cfl_hp_2013_14?: number;
  cfl_business_2013_14?: number;
  cfl_depreciation_2013_14?: number;
  cfl_speculative_2013_14?: number;
  cfl_insurance_2013_14?: number;
  cfl_insurance_115b_2013_14?: number;
  cfl_stcl_2013_14?: number;
  cfl_ltcl_2013_14?: number;
  cfl_race_horses_2013_14?: number;

  cfl_date_2014_15?: string;
  cfl_hp_2014_15?: number;
  cfl_business_2014_15?: number;
  cfl_depreciation_2014_15?: number;
  cfl_speculative_2014_15?: number;
  cfl_insurance_2014_15?: number;
  cfl_insurance_115b_2014_15?: number;
  cfl_stcl_2014_15?: number;
  cfl_ltcl_2014_15?: number;
  cfl_race_horses_2014_15?: number;

  cfl_date_2015_16?: string;
  cfl_hp_2015_16?: number;
  cfl_business_2015_16?: number;
  cfl_depreciation_2015_16?: number;
  cfl_speculative_2015_16?: number;
  cfl_insurance_2015_16?: number;
  cfl_insurance_115b_2015_16?: number;
  cfl_stcl_2015_16?: number;
  cfl_ltcl_2015_16?: number;
  cfl_race_horses_2015_16?: number;

  cfl_date_2016_17?: string;
  cfl_hp_2016_17?: number;
  cfl_business_2016_17?: number;
  cfl_depreciation_2016_17?: number;
  cfl_speculative_2016_17?: number;
  cfl_insurance_2016_17?: number;
  cfl_insurance_115b_2016_17?: number;
  cfl_stcl_2016_17?: number;
  cfl_ltcl_2016_17?: number;
  cfl_race_horses_2016_17?: number;

  cfl_date_2017_18?: string;
  cfl_hp_2017_18?: number;
  cfl_business_2017_18?: number;
  cfl_depreciation_2017_18?: number;
  cfl_speculative_2017_18?: number;
  cfl_insurance_2017_18?: number;
  cfl_insurance_115b_2017_18?: number;
  cfl_stcl_2017_18?: number;
  cfl_ltcl_2017_18?: number;
  cfl_race_horses_2017_18?: number;

  cfl_date_2018_19?: string;
  cfl_hp_2018_19?: number;
  cfl_business_2018_19?: number;
  cfl_depreciation_2018_19?: number;
  cfl_speculative_2018_19?: number;
  cfl_insurance_2018_19?: number;
  cfl_insurance_115b_2018_19?: number;
  cfl_stcl_2018_19?: number;
  cfl_ltcl_2018_19?: number;
  cfl_race_horses_2018_19?: number;

  cfl_date_2019_20?: string;
  cfl_hp_2019_20?: number;
  cfl_business_2019_20?: number;
  cfl_depreciation_2019_20?: number;
  cfl_speculative_2019_20?: number;
  cfl_insurance_2019_20?: number;
  cfl_insurance_115b_2019_20?: number;
  cfl_stcl_2019_20?: number;
  cfl_ltcl_2019_20?: number;
  cfl_race_horses_2019_20?: number;

  cfl_date_2020_21?: string;
  cfl_hp_2020_21?: number;
  cfl_business_2020_21?: number;
  cfl_depreciation_2020_21?: number;
  cfl_speculative_2020_21?: number;
  cfl_insurance_2020_21?: number;
  cfl_insurance_115b_2020_21?: number;
  cfl_stcl_2020_21?: number;
  cfl_ltcl_2020_21?: number;
  cfl_race_horses_2020_21?: number;

  cfl_date_2021_22?: string;
  cfl_hp_2021_22?: number;
  cfl_business_2021_22?: number;
  cfl_depreciation_2021_22?: number;
  cfl_speculative_2021_22?: number;
  cfl_insurance_2021_22?: number;
  cfl_insurance_115b_2021_22?: number;
  cfl_stcl_2021_22?: number;
  cfl_ltcl_2021_22?: number;
  cfl_race_horses_2021_22?: number;

  cfl_date_2022_23?: string;
  cfl_hp_2022_23?: number;
  cfl_business_2022_23?: number;
  cfl_depreciation_2022_23?: number;
  cfl_speculative_2022_23?: number;
  cfl_insurance_2022_23?: number;
  cfl_insurance_115b_2022_23?: number;
  cfl_stcl_2022_23?: number;
  cfl_ltcl_2022_23?: number;
  cfl_race_horses_2022_23?: number;

  cfl_date_2023_24?: string;
  cfl_hp_2023_24?: number;
  cfl_business_2023_24?: number;
  cfl_depreciation_2023_24?: number;
  cfl_speculative_2023_24?: number;
  cfl_insurance_2023_24?: number;
  cfl_insurance_115b_2023_24?: number;
  cfl_stcl_2023_24?: number;
  cfl_ltcl_2023_24?: number;
  cfl_race_horses_2023_24?: number;

  cfl_date_2024_25?: string;
  cfl_hp_2024_25?: number;
  cfl_business_2024_25?: number;
  cfl_depreciation_2024_25?: number;
  cfl_speculative_2024_25?: number;
  cfl_insurance_2024_25?: number;
  cfl_insurance_115b_2024_25?: number;
  cfl_stcl_2024_25?: number;
  cfl_ltcl_2024_25?: number;
  cfl_race_horses_2024_25?: number;

  // CFL Totals
  cfl_total_earlier_years?: number;
  cfl_total_hp?: number;
  cfl_total_business?: number;
  cfl_total_depreciation?: number;
  cfl_total_speculative?: number;
  cfl_total_insurance?: number;
  cfl_total_insurance_115b?: number;
  cfl_total_stcl?: number;
  cfl_total_ltcl?: number;
  cfl_total_race_horses?: number;

  // Schedule UD: Unabsorbed depreciation and allowance under section 35(4)
  ud_assessment_year_ii?: string;
  ud_assessment_year_iii?: string;
  ud_assessment_year_iv?: string;

  // Current Assessment Year - Depreciation
  ud_dep_bf_current?: number;
  ud_dep_adjusted_current?: number;
  ud_dep_setoff_current?: number;
  ud_dep_balance_current?: number;

  // Current Assessment Year - Allowance
  ud_allow_bf_current?: number;
  ud_allow_setoff_current?: number;
  ud_allow_unabsorbed_current?: number;
  ud_allow_balance_current?: number;

  // Previous years - Depreciation (ii, iii, iv)
  ud_dep_bf_ii?: number;
  ud_dep_adjusted_ii?: number;
  ud_dep_setoff_ii?: number;
  ud_dep_balance_ii?: number;

  ud_dep_bf_iii?: number;
  ud_dep_adjusted_iii?: number;
  ud_dep_setoff_iii?: number;
  ud_dep_balance_iii?: number;

  ud_dep_bf_iv?: number;
  ud_dep_adjusted_iv?: number;
  ud_dep_setoff_iv?: number;
  ud_dep_balance_iv?: number;

  // Previous years - Allowance (ii, iii, iv)
  ud_allow_bf_ii?: number;
  ud_allow_setoff_ii?: number;
  ud_allow_unabsorbed_ii?: number;
  ud_allow_balance_ii?: number;

  ud_allow_bf_iii?: number;
  ud_allow_setoff_iii?: number;
  ud_allow_unabsorbed_iii?: number;
  ud_allow_balance_iii?: number;

  ud_allow_bf_iv?: number;
  ud_allow_setoff_iv?: number;
  ud_allow_unabsorbed_iv?: number;
  ud_allow_balance_iv?: number;

  // UD Totals - Depreciation
  ud_total_dep_bf?: number;
  ud_total_dep_adjusted?: number;
  ud_total_dep_setoff?: number;
  ud_total_dep_balance?: number;

  // UD Totals - Allowance
  ud_total_allow_bf?: number;
  ud_total_allow_setoff?: number;
  ud_total_allow_unabsorbed?: number;
  ud_total_allow_balance?: number;

  // Schedule ICDS: Income Computation Disclosure Standards
  icds_accounting_policies_increase?: number;
  icds_accounting_policies_decrease?: number;
  icds_accounting_policies_net?: number;

  icds_inventories_increase?: number;
  icds_inventories_decrease?: number;
  icds_inventories_net?: number;

  icds_construction_contracts_increase?: number;
  icds_construction_contracts_decrease?: number;
  icds_construction_contracts_net?: number;

  icds_revenue_recognition_increase?: number;
  icds_revenue_recognition_decrease?: number;
  icds_revenue_recognition_net?: number;

  icds_borrowing_costs_increase?: number;
  icds_borrowing_costs_decrease?: number;
  icds_borrowing_costs_net?: number;

  icds_lease_agreements_increase?: number;
  icds_lease_agreements_decrease?: number;
  icds_lease_agreements_net?: number;

  icds_foreign_currency_increase?: number;
  icds_foreign_currency_decrease?: number;
  icds_foreign_currency_net?: number;

  icds_financial_instruments_increase?: number;
  icds_financial_instruments_decrease?: number;
  icds_financial_instruments_net?: number;

  icds_biological_assets_increase?: number;
  icds_biological_assets_decrease?: number;
  icds_biological_assets_net?: number;

  icds_retirement_benefits_increase?: number;
  icds_retirement_benefits_decrease?: number;
  icds_retirement_benefits_net?: number;

  icds_investments_increase?: number;
  icds_investments_decrease?: number;
  icds_investments_net?: number;

  icds_other_matters_increase?: number;
  icds_other_matters_decrease?: number;
  icds_other_matters_net?: number;

  // Schedule 10AA: Special Economic Zone Deduction
  sez_10aa_ay_1?: string;
  sez_10aa_deduction_1?: number;
  sez_10aa_ay_2?: string;
  sez_10aa_deduction_2?: number;
  sez_10aa_ay_3?: string;
  sez_10aa_deduction_3?: number;
  sez_10aa_total?: number;

  // Schedule 80G: Donations
  donation_80g_a_name_1?: string;
  donation_80g_a_pan_1?: string;
  donation_80g_a_cash_1?: number;
  donation_80g_a_other_1?: number;
  donation_80g_a_total_1?: number;
  donation_80g_a_eligible_1?: number;

  donation_80g_a_name_2?: string;
  donation_80g_a_pan_2?: string;
  donation_80g_a_cash_2?: number;
  donation_80g_a_other_2?: number;
  donation_80g_a_total_2?: number;
  donation_80g_a_eligible_2?: number;

  donation_80g_a_name_3?: string;
  donation_80g_a_pan_3?: string;
  donation_80g_a_cash_3?: number;
  donation_80g_a_other_3?: number;
  donation_80g_a_total_3?: number;
  donation_80g_a_eligible_3?: number;

  donation_80g_a_section_total?: number;

  donation_80g_b_name_1?: string;
  donation_80g_b_pan_1?: string;
  donation_80g_b_cash_1?: number;
  donation_80g_b_other_1?: number;
  donation_80g_b_total_1?: number;
  donation_80g_b_eligible_1?: number;

  donation_80g_b_name_2?: string;
  donation_80g_b_pan_2?: string;
  donation_80g_b_cash_2?: number;
  donation_80g_b_other_2?: number;
  donation_80g_b_total_2?: number;
  donation_80g_b_eligible_2?: number;

  donation_80g_b_name_3?: string;
  donation_80g_b_pan_3?: string;
  donation_80g_b_cash_3?: number;
  donation_80g_b_other_3?: number;
  donation_80g_b_total_3?: number;
  donation_80g_b_eligible_3?: number;

  donation_80g_b_section_total?: number;

  donation_80g_c_name_1?: string;
  donation_80g_c_pan_1?: string;
  donation_80g_c_cash_1?: number;
  donation_80g_c_other_1?: number;
  donation_80g_c_total_1?: number;
  donation_80g_c_eligible_1?: number;

  donation_80g_c_name_2?: string;
  donation_80g_c_pan_2?: string;
  donation_80g_c_cash_2?: number;
  donation_80g_c_other_2?: number;
  donation_80g_c_total_2?: number;
  donation_80g_c_eligible_2?: number;

  donation_80g_c_name_3?: string;
  donation_80g_c_pan_3?: string;
  donation_80g_c_cash_3?: number;
  donation_80g_c_other_3?: number;
  donation_80g_c_total_3?: number;
  donation_80g_c_eligible_3?: number;

  donation_80g_c_section_total?: number;
  donation_80g_total?: number;

  // Schedule 80GGA: Scientific Research and Rural Development
  donation_80gga_reduction_type_1?: string;
  donation_80gga_name_1?: string;
  donation_80gga_pan_1?: string;
  donation_80gga_cash_1?: number;
  donation_80gga_other_1?: number;
  donation_80gga_total_1?: number;
  donation_80gga_eligible_1?: number;

  donation_80gga_reduction_type_2?: string;
  donation_80gga_name_2?: string;
  donation_80gga_pan_2?: string;
  donation_80gga_cash_2?: number;
  donation_80gga_other_2?: number;
  donation_80gga_total_2?: number;
  donation_80gga_eligible_2?: number;

  donation_80gga_reduction_type_3?: string;
  donation_80gga_name_3?: string;
  donation_80gga_pan_3?: string;
  donation_80gga_cash_3?: number;
  donation_80gga_other_3?: number;
  donation_80gga_total_3?: number;
  donation_80gga_eligible_3?: number;

  donation_80gga_total?: number;

  // Schedule 80GGCC: Political Contributions
  political_80ggcc_date_1?: string;
  political_80ggcc_party_1?: string;
  political_80ggcc_cash_1?: number;
  political_80ggcc_other_1?: number;
  political_80ggcc_total_1?: number;
  political_80ggcc_eligible_1?: number;
  political_80ggcc_txref_1?: string;
  political_80ggcc_ifs_1?: string;

  political_80ggcc_date_2?: string;
  political_80ggcc_party_2?: string;
  political_80ggcc_cash_2?: number;
  political_80ggcc_other_2?: number;
  political_80ggcc_total_2?: number;
  political_80ggcc_eligible_2?: number;
  political_80ggcc_txref_2?: string;
  political_80ggcc_ifs_2?: string;

  political_80ggcc_date_3?: string;
  political_80ggcc_party_3?: string;
  political_80ggcc_cash_3?: number;
  political_80ggcc_other_3?: number;
  political_80ggcc_total_3?: number;
  political_80ggcc_eligible_3?: number;
  political_80ggcc_txref_3?: string;
  political_80ggcc_ifs_3?: string;

  political_80ggcc_total?: number;

  // Schedule 80JAC: Start-up Deduction
  startup_80jac_date_1?: string;
  startup_80jac_nature_1?: string;
  startup_80jac_cert_1?: string;
  startup_80jac_first_ay_1?: string;
  startup_80jac_deduction_1?: number;

  startup_80jac_date_2?: string;
  startup_80jac_nature_2?: string;
  startup_80jac_cert_2?: string;
  startup_80jac_first_ay_2?: string;
  startup_80jac_deduction_2?: number;

  startup_80jac_date_3?: string;
  startup_80jac_nature_3?: string;
  startup_80jac_cert_3?: string;
  startup_80jac_first_ay_3?: string;
  startup_80jac_deduction_3?: number;

  startup_80jac_total?: number;

  // Schedule 80JJA: IFSC Banking Unit Deduction
  ifsc_80jja_name_1?: string;
  ifsc_80jja_date_1?: string;
  ifsc_80jja_reg_1?: string;
  ifsc_80jja_first_ay_1?: string;
  ifsc_80jja_deduction_1?: number;

  ifsc_80jja_name_2?: string;
  ifsc_80jja_date_2?: string;
  ifsc_80jja_reg_2?: string;
  ifsc_80jja_first_ay_2?: string;
  ifsc_80jja_deduction_2?: number;

  ifsc_80jja_name_3?: string;
  ifsc_80jja_date_3?: string;
  ifsc_80jja_reg_3?: string;
  ifsc_80jja_first_ay_3?: string;
  ifsc_80jja_deduction_3?: number;

  ifsc_80jja_total?: number;

  // Schedule 80L: NPS Contribution Deduction
  nps_80l_committed_amount?: number;
  nps_80l_actual_amount?: number;
  nps_80l_details?: string;
  nps_80l_eligible_deduction?: number;

  // Schedule FDI: Foreign Direct Investment
  fdi_total_received?: number;
  fdi_deployed_india?: number;
  fdi_source_countries?: string;
  fdi_inward_remittances?: number;
  fdi_outward_remittances?: number;
  fdi_trade_partners?: string;
  fdi_foreign_assets?: number;
  fdi_foreign_liabilities?: number;
  fdi_overseas_locations?: string;
  fdi_has_pe?: string;
  fdi_related_party_details?: string;
  fdi_tp_study_filed?: string;

  // Schedule RA: Research Association Donations
  donation_ra_name_1?: string;
  donation_ra_pan_1?: string;
  donation_ra_cash_1?: number;
  donation_ra_other_1?: number;
  donation_ra_total_1?: number;
  donation_ra_eligible_1?: number;

  donation_ra_name_2?: string;
  donation_ra_pan_2?: string;
  donation_ra_cash_2?: number;
  donation_ra_other_2?: number;
  donation_ra_total_2?: number;
  donation_ra_eligible_2?: number;

  donation_ra_name_3?: string;
  donation_ra_pan_3?: string;
  donation_ra_cash_3?: number;
  donation_ra_other_3?: number;
  donation_ra_total_3?: number;
  donation_ra_eligible_3?: number;

  donation_ra_total?: number;

  // Schedule 80-IA: Infrastructure Development
  infra_80ia_name_1?: string;
  infra_80ia_nature_1?: string;
  infra_80ia_first_ay_1?: string;
  infra_80ia_profits_1?: number;

  infra_80ia_name_2?: string;
  infra_80ia_nature_2?: string;
  infra_80ia_first_ay_2?: string;
  infra_80ia_profits_2?: number;

  // Schedule 80-IB: Building Housing Project
  housing_80ib_a1_1?: string;
  housing_80ib_a1_2?: string;
  housing_80ib_a2_1?: string;
  housing_80ib_a2_2?: string;

  housing_80ib_b1_1?: string;
  housing_80ib_b1_2?: string;
  housing_80ib_b2_1?: string;
  housing_80ib_b2_2?: string;

  housing_80ib_total?: number;

  // Schedule 80-IE: North-East Region Deduction
  northeast_80ie_assam_1?: string;
  northeast_80ie_assam_2?: string;
  northeast_80ie_arunachal_1?: string;
  northeast_80ie_arunachal_2?: string;
  northeast_80ie_manipur_1?: string;
  northeast_80ie_manipur_2?: string;
  northeast_80ie_mizoram_1?: string;
  northeast_80ie_mizoram_2?: string;
  northeast_80ie_meghalaya_1?: string;
  northeast_80ie_meghalaya_2?: string;
  northeast_80ie_nagaland_1?: string;
  northeast_80ie_nagaland_2?: string;
  northeast_80ie_tripura_1?: string;
  northeast_80ie_tripura_2?: string;
  northeast_80ie_sikkim_1?: string;
  northeast_80ie_sikkim_2?: string;

  northeast_80ie_total?: number;
  northeast_80ie_final_total?: number;
  northeast_80ie_summary_total?: number;

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

  // Schedule SI: Income Chargeable at Special Rates
  special_si_1a_income?: number;
  special_si_1b_income?: number;
  special_si_2_income?: number;
  special_si_3a_income?: number;
  special_si_3b_income?: number;
  special_si_4a_income?: number;
  special_si_4b_income?: number;
  special_si_5a_income?: number;
  special_si_5b_income?: number;
  special_si_6a_income?: number;
  special_si_6b_income?: number;
  special_si_7_income?: number;
  special_si_8a_income?: number;
  special_si_8b_income?: number;
  special_si_9a_income?: number;
  special_si_9b_income?: number;
  special_si_10_income?: number;
  special_si_11_income?: number;
  special_si_12_income?: number;
  special_si_13a_income?: number;
  special_si_13b_income?: number;
  special_si_14_income?: number;
  special_si_15_income?: number;
  special_si_16_income?: number;
  special_si_17_income?: number;
  special_si_18_income?: number;
  special_si_19_income?: number;
  special_si_20_income?: number;
  special_si_22a_income?: number;
  special_si_22b_income?: number;
  special_si_23_income?: number;
  special_si_24a_income?: number;
  special_si_24b_income?: number;
  special_si_25_income?: number;
  special_si_26a_income?: number;
  special_si_26b_income?: number;
  special_si_27_income?: number;
  special_si_28_income?: number;
  special_si_29_income?: number;
  special_si_30_income?: number;

  // Schedule IF: Investment in Unincorporated Entities
  investment_if_entity_name_1?: string;
  investment_if_entity_type_1?: string;
  investment_if_pan_1?: string;
  investment_if_liable_audit_1?: string;
  investment_if_section_92e_1?: string;
  investment_if_percentage_share_1?: number;
  investment_if_amount_share_1?: number;
  investment_if_capital_balance_1?: number;

  investment_if_entity_name_2?: string;
  investment_if_entity_type_2?: string;
  investment_if_pan_2?: string;
  investment_if_liable_audit_2?: string;
  investment_if_section_92e_2?: string;
  investment_if_percentage_share_2?: number;
  investment_if_amount_share_2?: number;
  investment_if_capital_balance_2?: number;

  investment_if_entity_name_3?: string;
  investment_if_entity_type_3?: string;
  investment_if_pan_3?: string;
  investment_if_liable_audit_3?: string;
  investment_if_section_92e_3?: string;
  investment_if_percentage_share_3?: number;
  investment_if_amount_share_3?: number;
  investment_if_capital_balance_3?: number;

  investment_if_total_entities?: number;
  investment_if_total_profits?: number;

  // Schedule EI: Exempt Income
  exempt_ei_gross_agri_receipts?: number;
  exempt_ei_agri_expenditure?: number;
  exempt_ei_unabsorbed_loss?: number;
  exempt_ei_agri_rule_portion?: number;
  exempt_ei_net_agri_income?: number;

  // Other Exempt Income details
  exempt_ei_other_1_nature?: string;
  exempt_ei_other_1_amount?: number;
  exempt_ei_other_1_section?: string;
  exempt_ei_other_1_ackowledgement?: string;
  exempt_ei_other_1_date?: string;

  exempt_ei_other_2_nature?: string;
  exempt_ei_other_2_amount?: number;
  exempt_ei_other_2_section?: string;
  exempt_ei_other_2_ackowledgement?: string;
  exempt_ei_other_2_date?: string;

  exempt_ei_other_3_nature?: string;
  exempt_ei_other_3_amount?: number;
  exempt_ei_other_3_section?: string;
  exempt_ei_other_3_ackowledgement?: string;
  exempt_ei_other_3_date?: string;

  // Income not chargeable as per DTAA
  exempt_ei_dtaa_1_sl_no?: string;
  exempt_ei_dtaa_1_amount?: number;
  exempt_ei_dtaa_1_nature?: string;
  exempt_ei_dtaa_1_country?: string;
  exempt_ei_dtaa_1_article?: string;
  exempt_ei_dtaa_1_hoi?: string;
  exempt_ei_dtaa_1_trc_obtained?: string;

  exempt_ei_dtaa_2_sl_no?: string;
  exempt_ei_dtaa_2_amount?: number;
  exempt_ei_dtaa_2_nature?: string;
  exempt_ei_dtaa_2_country?: string;
  exempt_ei_dtaa_2_article?: string;
  exempt_ei_dtaa_2_hoi?: string;
  exempt_ei_dtaa_2_trc_obtained?: string;

  exempt_ei_dtaa_3_sl_no?: string;
  exempt_ei_dtaa_3_amount?: number;
  exempt_ei_dtaa_3_nature?: string;
  exempt_ei_dtaa_3_country?: string;
  exempt_ei_dtaa_3_article?: string;
  exempt_ei_dtaa_3_hoi?: string;
  exempt_ei_dtaa_3_trc_obtained?: string;

  // Pass through income as not chargeable to tax
  exempt_ei_pti_1_sl_no?: string;
  exempt_ei_pti_1_amount?: number;
  exempt_ei_pti_1_nature?: string;
  exempt_ei_pti_1_country?: string;
  exempt_ei_pti_1_article?: string;
  exempt_ei_pti_1_hoi?: string;
  exempt_ei_pti_1_trc_obtained?: string;

  exempt_ei_pti_2_sl_no?: string;
  exempt_ei_pti_2_amount?: number;
  exempt_ei_pti_2_nature?: string;
  exempt_ei_pti_2_country?: string;
  exempt_ei_pti_2_article?: string;
  exempt_ei_pti_2_hoi?: string;
  exempt_ei_pti_2_trc_obtained?: string;

  exempt_ei_total_exempt?: number;

  // Schedule PTI: Pass Through Income Details
  pti_row_1_section?: string;
  pti_row_1_name?: string;
  pti_row_1_pan?: string;
  pti_row_1_sl_no?: string;
  pti_row_1_current_year_income?: number;
  pti_row_1_prior_year_income?: number;
  pti_row_1_house_property?: number;
  pti_row_1_st_capital_gain?: number;
  pti_row_1_st_capital_section_111a?: number;
  pti_row_1_st_capital_others?: number;
  pti_row_1_lt_capital_gain?: number;
  pti_row_1_lt_capital_section_112a?: number;
  pti_row_1_lt_capital_section_other?: number;
  pti_row_1_other_sources_dividend?: number;
  pti_row_1_other_sources_others?: number;
  pti_row_1_income_exempt?: number;

  pti_row_2_section?: string;
  pti_row_2_name?: string;
  pti_row_2_pan?: string;
  pti_row_2_sl_no?: string;
  pti_row_2_current_year_income?: number;
  pti_row_2_prior_year_income?: number;
  pti_row_2_house_property?: number;
  pti_row_2_st_capital_gain?: number;
  pti_row_2_st_capital_section_111a?: number;
  pti_row_2_st_capital_others?: number;
  pti_row_2_lt_capital_gain?: number;
  pti_row_2_lt_capital_section_112a?: number;
  pti_row_2_lt_capital_section_other?: number;
  pti_row_2_other_sources_dividend?: number;
  pti_row_2_other_sources_others?: number;
  pti_row_2_income_exempt?: number;

  pti_row_3_section?: string;
  pti_row_3_name?: string;
  pti_row_3_pan?: string;
  pti_row_3_sl_no?: string;
  pti_row_3_current_year_income?: number;
  pti_row_3_prior_year_income?: number;
  pti_row_3_house_property?: number;
  pti_row_3_st_capital_gain?: number;
  pti_row_3_st_capital_section_111a?: number;
  pti_row_3_st_capital_others?: number;
  pti_row_3_lt_capital_gain?: number;
  pti_row_3_lt_capital_section_112a?: number;
  pti_row_3_lt_capital_section_other?: number;
  pti_row_3_other_sources_dividend?: number;
  pti_row_3_other_sources_others?: number;
  pti_row_3_income_exempt?: number;

  pti_total_sections?: number;
  pti_total_current_year_income?: number;
  pti_total_house_property?: number;
  pti_total_st_capital_gain?: number;
  pti_total_lt_capital_gain?: number;
  pti_total_other_sources?: number;
  pti_total_income_exempt?: number;

  // Schedule MAT: Computation of Minimum Alternate Tax payable under section 115JB
  mat_profit_loss_prepared?: string;
  mat_pla_prepared?: string;
  mat_accounting_policies?: string;
  mat_profit_after_tax?: number;
  
  // Additions (if debited in P&L)
  mat_income_tax_paid?: number;
  mat_reserve_33ac?: number;
  mat_provisions_liability?: number;
  mat_subsidiary_losses?: number;
  mat_dividend_paid?: number;
  mat_exempt_income_exp?: number;
  mat_aop_boi_exp?: number;
  mat_foreign_company_exp?: number;
  mat_notional_loss_capital?: number;
  mat_royalty_expenditure?: number;
  mat_depreciation_revaluation?: number;
  mat_transfer_units_gain?: number;
  mat_others_additions?: number;
  mat_total_additions?: number;

  // Deductions (if credited to P&L)
  mat_reserve_withdrawal?: number;
  mat_income_exempt_10_11_12?: number;
  mat_revaluation_withdrawal?: number;
  mat_aop_boi_share?: number;
  mat_foreign_company_income?: number;
  mat_notional_gain_capital?: number;
  mat_transfer_units_loss?: number;
  mat_royalty_income?: number;
  mat_depreciation_loss?: number;
  mat_industrial_profit?: number;
  mat_others_deductions?: number;
  mat_total_deductions?: number;

  // Book Profit
  mat_book_profit_115jb?: number;

  // Additions sub-section 2A to 2C (for 115JB(2))
  mat_add_comprehensive_income?: number;
  mat_add_distribution_non_cash?: number;
  mat_add_transition_amount?: number;
  mat_add_others?: number;
  mat_add_total?: number;

  // Deductions from book profit (for 115JB(2))
  mat_ded_comprehensive_income?: number;
  mat_ded_credited_distribution?: number;
  mat_ded_transition_amount?: number;
  mat_ded_others?: number;
  mat_ded_total?: number;

  // Deemed total income
  mat_deemed_total_income_115jb?: number;
  mat_deemed_income_ifsc_unit?: number;
  mat_deemed_income_other_unit?: number;

  // Tax calculation
  mat_tax_115jb?: number;
  mat_financial_statements_ias?: string;

  // Schedule MATC: MAT Credit Utilization under section 115JAA
  matc_tax_2025_26?: number;
  matc_tax_2025_26_part_b?: number;
  matc_amount_against_credit?: number;

  // MAT Credit rows (AY 2009-10 to 2025-26)
  matc_row_2009_10_gross?: number;
  matc_row_2009_10_setoff?: number;
  matc_row_2009_10_balance?: number;
  matc_row_2009_10_credit_utilized?: number;
  matc_row_2009_10_balance_carried?: number;

  matc_row_2010_11_gross?: number;
  matc_row_2010_11_setoff?: number;
  matc_row_2010_11_balance?: number;
  matc_row_2010_11_credit_utilized?: number;
  matc_row_2010_11_balance_carried?: number;

  matc_row_2011_12_gross?: number;
  matc_row_2011_12_setoff?: number;
  matc_row_2011_12_balance?: number;
  matc_row_2011_12_credit_utilized?: number;
  matc_row_2011_12_balance_carried?: number;

  matc_row_2012_13_gross?: number;
  matc_row_2012_13_setoff?: number;
  matc_row_2012_13_balance?: number;
  matc_row_2012_13_credit_utilized?: number;
  matc_row_2012_13_balance_carried?: number;

  matc_row_2013_14_gross?: number;
  matc_row_2013_14_setoff?: number;
  matc_row_2013_14_balance?: number;
  matc_row_2013_14_credit_utilized?: number;
  matc_row_2013_14_balance_carried?: number;

  matc_row_2014_15_gross?: number;
  matc_row_2014_15_setoff?: number;
  matc_row_2014_15_balance?: number;
  matc_row_2014_15_credit_utilized?: number;
  matc_row_2014_15_balance_carried?: number;

  matc_row_2015_16_gross?: number;
  matc_row_2015_16_setoff?: number;
  matc_row_2015_16_balance?: number;
  matc_row_2015_16_credit_utilized?: number;
  matc_row_2015_16_balance_carried?: number;

  matc_row_2016_17_gross?: number;
  matc_row_2016_17_setoff?: number;
  matc_row_2016_17_balance?: number;
  matc_row_2016_17_credit_utilized?: number;
  matc_row_2016_17_balance_carried?: number;

  matc_row_2017_18_gross?: number;
  matc_row_2017_18_setoff?: number;
  matc_row_2017_18_balance?: number;
  matc_row_2017_18_credit_utilized?: number;
  matc_row_2017_18_balance_carried?: number;

  matc_row_2018_19_gross?: number;
  matc_row_2018_19_setoff?: number;
  matc_row_2018_19_balance?: number;
  matc_row_2018_19_credit_utilized?: number;
  matc_row_2018_19_balance_carried?: number;

  matc_row_2019_20_gross?: number;
  matc_row_2019_20_setoff?: number;
  matc_row_2019_20_balance?: number;
  matc_row_2019_20_credit_utilized?: number;
  matc_row_2019_20_balance_carried?: number;

  matc_row_2020_21_gross?: number;
  matc_row_2020_21_setoff?: number;
  matc_row_2020_21_balance?: number;
  matc_row_2020_21_credit_utilized?: number;
  matc_row_2020_21_balance_carried?: number;

  matc_row_2021_22_gross?: number;
  matc_row_2021_22_setoff?: number;
  matc_row_2021_22_balance?: number;
  matc_row_2021_22_credit_utilized?: number;
  matc_row_2021_22_balance_carried?: number;

  matc_row_2022_23_gross?: number;
  matc_row_2022_23_setoff?: number;
  matc_row_2022_23_balance?: number;
  matc_row_2022_23_credit_utilized?: number;
  matc_row_2022_23_balance_carried?: number;

  matc_row_2023_24_gross?: number;
  matc_row_2023_24_setoff?: number;
  matc_row_2023_24_balance?: number;
  matc_row_2023_24_credit_utilized?: number;
  matc_row_2023_24_balance_carried?: number;

  matc_row_2024_25_gross?: number;
  matc_row_2024_25_setoff?: number;
  matc_row_2024_25_balance?: number;
  matc_row_2024_25_credit_utilized?: number;
  matc_row_2024_25_balance_carried?: number;

  matc_row_2025_26_gross?: number;
  matc_row_2025_26_setoff?: number;
  matc_row_2025_26_balance?: number;

  matc_total_mat_utilized?: number;
  matc_total_liability?: number;

  // Schedule TDS: Tax on Distributed Income of Domestic Company on Buy-back of Shares
  tds_date_buyback_1?: string;
  tds_date_buyback_2?: string;
  tds_date_buyback_3?: string;
  tds_date_buyback_4?: string;
  tds_date_buyback_5?: string;
  tds_date_buyback_6?: string;

  tds_company_name_1?: string;
  tds_company_name_2?: string;
  tds_company_name_3?: string;
  tds_company_name_4?: string;
  tds_company_name_5?: string;
  tds_company_name_6?: string;

  tds_pan_company_1?: string;
  tds_pan_company_2?: string;
  tds_pan_company_3?: string;
  tds_pan_company_4?: string;
  tds_pan_company_5?: string;
  tds_pan_company_6?: string;

  tds_isin_code_1?: string;
  tds_isin_code_2?: string;
  tds_isin_code_3?: string;
  tds_isin_code_4?: string;
  tds_isin_code_5?: string;
  tds_isin_code_6?: string;

  tds_serial_number_1?: string;
  tds_serial_number_2?: string;
  tds_serial_number_3?: string;
  tds_serial_number_4?: string;
  tds_serial_number_5?: string;
  tds_serial_number_6?: string;

  tds_amount_deposited_1?: number;
  tds_amount_deposited_2?: number;
  tds_amount_deposited_3?: number;
  tds_amount_deposited_4?: number;
  tds_amount_deposited_5?: number;
  tds_amount_deposited_6?: number;

  tds_income_115bbdh?: number;
  tds_tax_interest_payable?: number;
  tds_tax_interest_115bac?: number;

  // Schedule 115A1CA: Tax on Distributable Income Adjustments per section 115A(1)(2A)
  sched_115a1ca_primary_adj?: number;
  sched_115a1ca_tax_rate?: number;
  sched_115a1ca_surcharge_12?: number;
  sched_115a1ca_cess_health?: number;

  sched_115a1ca_deposit_date_1?: string;
  sched_115a1ca_deposit_date_2?: string;
  sched_115a1ca_deposit_date_3?: string;
  sched_115a1ca_deposit_date_4?: string;
  sched_115a1ca_deposit_date_5?: string;
  sched_115a1ca_deposit_date_6?: string;

  sched_115a1ca_bsr_1?: string;
  sched_115a1ca_bsr_2?: string;
  sched_115a1ca_bsr_3?: string;
  sched_115a1ca_bsr_4?: string;
  sched_115a1ca_bsr_5?: string;
  sched_115a1ca_bsr_6?: string;

  sched_115a1ca_amount_1?: number;
  sched_115a1ca_amount_2?: number;
  sched_115a1ca_amount_3?: number;
  sched_115a1ca_amount_4?: number;
  sched_115a1ca_amount_5?: number;
  sched_115a1ca_amount_6?: number;

  // Schedule 115D: Taxable Income under section 115D (Unexplained Income)
  sched_115d_fmv_real_assets?: number;
  sched_115d_total_liability?: number;
  sched_115d_fmv_section68?: number;
  sched_115d_fmv_section69?: number;
  sched_115d_fmv_transferred?: number;
  sched_115d_liability_assets?: number;
  sched_115d_deemed_income?: number;
  sched_115d_addl_tax?: number;
  sched_115d_income_tax_payable?: number;
  sched_115d_specified_due?: string;
  sched_115d_interest_payable?: number;

  sched_115d_deposit_date_1?: string;
  sched_115d_deposit_date_2?: string;
  sched_115d_deposit_date_3?: string;

  sched_115d_bank_name_1?: string;
  sched_115d_bank_name_2?: string;
  sched_115d_bank_name_3?: string;

  sched_115d_bsr_code_1?: string;
  sched_115d_bsr_code_2?: string;
  sched_115d_bsr_code_3?: string;

  sched_115d_challan_serial_1?: string;
  sched_115d_challan_serial_2?: string;
  sched_115d_challan_serial_3?: string;

  sched_115d_amount_deposit_1?: number;
  sched_115d_amount_deposit_2?: number;
  sched_115d_amount_deposit_3?: number;

  // Schedule FSI: Details of Income from Outside India and Tax Relief
  // Residential Section
  fsi_res_country_0?: string;
  fsi_res_country_1?: string;
  fsi_res_country_2?: string;
  fsi_res_country_3?: string;
  fsi_res_country_4?: string;

  fsi_res_nature_0?: string;
  fsi_res_nature_1?: string;
  fsi_res_nature_2?: string;
  fsi_res_nature_3?: string;
  fsi_res_nature_4?: string;

  fsi_res_period_0?: string;
  fsi_res_period_1?: string;
  fsi_res_period_2?: string;
  fsi_res_period_3?: string;
  fsi_res_period_4?: string;

  fsi_res_head_0?: string;
  fsi_res_head_1?: string;
  fsi_res_head_2?: string;
  fsi_res_head_3?: string;
  fsi_res_head_4?: string;

  fsi_res_income_0?: number;
  fsi_res_income_1?: number;
  fsi_res_income_2?: number;
  fsi_res_income_3?: number;
  fsi_res_income_4?: number;

  fsi_res_tax_paid_0?: number;
  fsi_res_tax_paid_1?: number;
  fsi_res_tax_paid_2?: number;
  fsi_res_tax_paid_3?: number;
  fsi_res_tax_paid_4?: number;

  fsi_res_tax_160161_0?: number;
  fsi_res_tax_160161_1?: number;
  fsi_res_tax_160161_2?: number;
  fsi_res_tax_160161_3?: number;
  fsi_res_tax_160161_4?: number;

  fsi_res_relief_91_0?: number;
  fsi_res_relief_91_1?: number;
  fsi_res_relief_91_2?: number;
  fsi_res_relief_91_3?: number;
  fsi_res_relief_91_4?: number;

  // Non-Residential Section
  fsi_nonres_country_0?: string;
  fsi_nonres_country_1?: string;
  fsi_nonres_country_2?: string;
  fsi_nonres_country_3?: string;
  fsi_nonres_country_4?: string;

  fsi_nonres_nature_0?: string;
  fsi_nonres_nature_1?: string;
  fsi_nonres_nature_2?: string;
  fsi_nonres_nature_3?: string;
  fsi_nonres_nature_4?: string;

  fsi_nonres_period_0?: string;
  fsi_nonres_period_1?: string;
  fsi_nonres_period_2?: string;
  fsi_nonres_period_3?: string;
  fsi_nonres_period_4?: string;

  fsi_nonres_head_0?: string;
  fsi_nonres_head_1?: string;
  fsi_nonres_head_2?: string;
  fsi_nonres_head_3?: string;
  fsi_nonres_head_4?: string;

  fsi_nonres_income_0?: number;
  fsi_nonres_income_1?: number;
  fsi_nonres_income_2?: number;
  fsi_nonres_income_3?: number;
  fsi_nonres_income_4?: number;

  fsi_nonres_tax_160161_0?: number;
  fsi_nonres_tax_160161_1?: number;
  fsi_nonres_tax_160161_2?: number;
  fsi_nonres_tax_160161_3?: number;
  fsi_nonres_tax_160161_4?: number;

  fsi_nonres_relief_91_0?: number;
  fsi_nonres_relief_91_1?: number;
  fsi_nonres_relief_91_2?: number;
  fsi_nonres_relief_91_3?: number;
  fsi_nonres_relief_91_4?: number;

  // Schedule TR: Summary of Tax Relief for Foreign Taxes Paid
  tr_country_code_0?: string;
  tr_country_code_1?: string;
  tr_country_code_2?: string;
  tr_country_code_3?: string;
  tr_country_code_4?: string;

  tr_tin_0?: string;
  tr_tin_1?: string;
  tr_tin_2?: string;
  tr_tin_3?: string;
  tr_tin_4?: string;

  tr_total_tax_paid_0?: number;
  tr_total_tax_paid_1?: number;
  tr_total_tax_paid_2?: number;
  tr_total_tax_paid_3?: number;
  tr_total_tax_paid_4?: number;

  tr_total_relief_available_0?: number;
  tr_total_relief_available_1?: number;
  tr_total_relief_available_2?: number;
  tr_total_relief_available_3?: number;
  tr_total_relief_available_4?: number;

  tr_relief_section_0?: string;
  tr_relief_section_1?: string;
  tr_relief_section_2?: string;
  tr_relief_section_3?: string;
  tr_relief_section_4?: string;

  tr_dtaa_relief_available?: number;
  tr_section91_relief_available?: number;
  tr_refund_claimed?: string;
  tr_refund_amount?: number;
  tr_refund_country?: string;

  // Schedule FA: Details of Foreign Assets

  // Section A: Foreign Bank Accounts (12 columns × 5 rows)
  fa_bank_country_0?: string;
  fa_bank_country_1?: string;
  fa_bank_country_2?: string;
  fa_bank_country_3?: string;
  fa_bank_country_4?: string;

  fa_bank_country_code_0?: string;
  fa_bank_country_code_1?: string;
  fa_bank_country_code_2?: string;
  fa_bank_country_code_3?: string;
  fa_bank_country_code_4?: string;

  fa_bank_name_0?: string;
  fa_bank_name_1?: string;
  fa_bank_name_2?: string;
  fa_bank_name_3?: string;
  fa_bank_name_4?: string;

  fa_bank_address_0?: string;
  fa_bank_address_1?: string;
  fa_bank_address_2?: string;
  fa_bank_address_3?: string;
  fa_bank_address_4?: string;

  fa_bank_zip_0?: string;
  fa_bank_zip_1?: string;
  fa_bank_zip_2?: string;
  fa_bank_zip_3?: string;
  fa_bank_zip_4?: string;

  fa_bank_account_0?: string;
  fa_bank_account_1?: string;
  fa_bank_account_2?: string;
  fa_bank_account_3?: string;
  fa_bank_account_4?: string;

  fa_bank_status_0?: string;
  fa_bank_status_1?: string;
  fa_bank_status_2?: string;
  fa_bank_status_3?: string;
  fa_bank_status_4?: string;

  fa_bank_opening_date_0?: string;
  fa_bank_opening_date_1?: string;
  fa_bank_opening_date_2?: string;
  fa_bank_opening_date_3?: string;
  fa_bank_opening_date_4?: string;

  fa_bank_peak_balance_0?: number;
  fa_bank_peak_balance_1?: number;
  fa_bank_peak_balance_2?: number;
  fa_bank_peak_balance_3?: number;
  fa_bank_peak_balance_4?: number;

  fa_bank_closing_balance_0?: number;
  fa_bank_closing_balance_1?: number;
  fa_bank_closing_balance_2?: number;
  fa_bank_closing_balance_3?: number;
  fa_bank_closing_balance_4?: number;

  fa_bank_interest_0?: number;
  fa_bank_interest_1?: number;
  fa_bank_interest_2?: number;
  fa_bank_interest_3?: number;
  fa_bank_interest_4?: number;

  // Section B: Foreign Custodial Accounts (12 columns × 5 rows)
  fa_custodial_country_0?: string;
  fa_custodial_country_1?: string;
  fa_custodial_country_2?: string;
  fa_custodial_country_3?: string;
  fa_custodial_country_4?: string;

  fa_custodial_country_code_0?: string;
  fa_custodial_country_code_1?: string;
  fa_custodial_country_code_2?: string;
  fa_custodial_country_code_3?: string;
  fa_custodial_country_code_4?: string;

  fa_custodial_name_0?: string;
  fa_custodial_name_1?: string;
  fa_custodial_name_2?: string;
  fa_custodial_name_3?: string;
  fa_custodial_name_4?: string;

  fa_custodial_address_0?: string;
  fa_custodial_address_1?: string;
  fa_custodial_address_2?: string;
  fa_custodial_address_3?: string;
  fa_custodial_address_4?: string;

  fa_custodial_zip_0?: string;
  fa_custodial_zip_1?: string;
  fa_custodial_zip_2?: string;
  fa_custodial_zip_3?: string;
  fa_custodial_zip_4?: string;

  fa_custodial_account_0?: string;
  fa_custodial_account_1?: string;
  fa_custodial_account_2?: string;
  fa_custodial_account_3?: string;
  fa_custodial_account_4?: string;

  fa_custodial_status_0?: string;
  fa_custodial_status_1?: string;
  fa_custodial_status_2?: string;
  fa_custodial_status_3?: string;
  fa_custodial_status_4?: string;

  fa_custodial_opening_date_0?: string;
  fa_custodial_opening_date_1?: string;
  fa_custodial_opening_date_2?: string;
  fa_custodial_opening_date_3?: string;
  fa_custodial_opening_date_4?: string;

  fa_custodial_peak_balance_0?: number;
  fa_custodial_peak_balance_1?: number;
  fa_custodial_peak_balance_2?: number;
  fa_custodial_peak_balance_3?: number;
  fa_custodial_peak_balance_4?: number;

  fa_custodial_closing_balance_0?: number;
  fa_custodial_closing_balance_1?: number;
  fa_custodial_closing_balance_2?: number;
  fa_custodial_closing_balance_3?: number;
  fa_custodial_closing_balance_4?: number;

  fa_custodial_income_credited_0?: number;
  fa_custodial_income_credited_1?: number;
  fa_custodial_income_credited_2?: number;
  fa_custodial_income_credited_3?: number;
  fa_custodial_income_credited_4?: number;

  // Section C: Foreign Equity and Debt Interest (13 columns × 5 rows)
  fa_equity_country_0?: string;
  fa_equity_country_1?: string;
  fa_equity_country_2?: string;
  fa_equity_country_3?: string;
  fa_equity_country_4?: string;

  fa_equity_country_code_0?: string;
  fa_equity_country_code_1?: string;
  fa_equity_country_code_2?: string;
  fa_equity_country_code_3?: string;
  fa_equity_country_code_4?: string;

  fa_equity_entity_name_0?: string;
  fa_equity_entity_name_1?: string;
  fa_equity_entity_name_2?: string;
  fa_equity_entity_name_3?: string;
  fa_equity_entity_name_4?: string;

  fa_equity_address_0?: string;
  fa_equity_address_1?: string;
  fa_equity_address_2?: string;
  fa_equity_address_3?: string;
  fa_equity_address_4?: string;

  fa_equity_zip_0?: string;
  fa_equity_zip_1?: string;
  fa_equity_zip_2?: string;
  fa_equity_zip_3?: string;
  fa_equity_zip_4?: string;

  fa_equity_nature_0?: string;
  fa_equity_nature_1?: string;
  fa_equity_nature_2?: string;
  fa_equity_nature_3?: string;
  fa_equity_nature_4?: string;

  fa_equity_acquisition_date_0?: string;
  fa_equity_acquisition_date_1?: string;
  fa_equity_acquisition_date_2?: string;
  fa_equity_acquisition_date_3?: string;
  fa_equity_acquisition_date_4?: string;

  fa_equity_initial_value_0?: number;
  fa_equity_initial_value_1?: number;
  fa_equity_initial_value_2?: number;
  fa_equity_initial_value_3?: number;
  fa_equity_initial_value_4?: number;

  fa_equity_peak_value_0?: number;
  fa_equity_peak_value_1?: number;
  fa_equity_peak_value_2?: number;
  fa_equity_peak_value_3?: number;
  fa_equity_peak_value_4?: number;

  fa_equity_closing_value_0?: number;
  fa_equity_closing_value_1?: number;
  fa_equity_closing_value_2?: number;
  fa_equity_closing_value_3?: number;
  fa_equity_closing_value_4?: number;

  fa_equity_gross_amount_0?: number;
  fa_equity_gross_amount_1?: number;
  fa_equity_gross_amount_2?: number;
  fa_equity_gross_amount_3?: number;
  fa_equity_gross_amount_4?: number;

  fa_equity_gross_proceeds_0?: number;
  fa_equity_gross_proceeds_1?: number;
  fa_equity_gross_proceeds_2?: number;
  fa_equity_gross_proceeds_3?: number;
  fa_equity_gross_proceeds_4?: number;

  // Section D: Foreign Insurance Contract (9 columns × 5 rows)
  fa_insurance_country_0?: string;
  fa_insurance_country_1?: string;
  fa_insurance_country_2?: string;
  fa_insurance_country_3?: string;
  fa_insurance_country_4?: string;

  fa_insurance_country_code_0?: string;
  fa_insurance_country_code_1?: string;
  fa_insurance_country_code_2?: string;
  fa_insurance_country_code_3?: string;
  fa_insurance_country_code_4?: string;

  fa_insurance_institution_0?: string;
  fa_insurance_institution_1?: string;
  fa_insurance_institution_2?: string;
  fa_insurance_institution_3?: string;
  fa_insurance_institution_4?: string;

  fa_insurance_address_0?: string;
  fa_insurance_address_1?: string;
  fa_insurance_address_2?: string;
  fa_insurance_address_3?: string;
  fa_insurance_address_4?: string;

  fa_insurance_zip_0?: string;
  fa_insurance_zip_1?: string;
  fa_insurance_zip_2?: string;
  fa_insurance_zip_3?: string;
  fa_insurance_zip_4?: string;

  fa_insurance_contract_date_0?: string;
  fa_insurance_contract_date_1?: string;
  fa_insurance_contract_date_2?: string;
  fa_insurance_contract_date_3?: string;
  fa_insurance_contract_date_4?: string;

  fa_insurance_cash_value_0?: number;
  fa_insurance_cash_value_1?: number;
  fa_insurance_cash_value_2?: number;
  fa_insurance_cash_value_3?: number;
  fa_insurance_cash_value_4?: number;

  fa_insurance_gross_amount_0?: number;
  fa_insurance_gross_amount_1?: number;
  fa_insurance_gross_amount_2?: number;
  fa_insurance_gross_amount_3?: number;
  fa_insurance_gross_amount_4?: number;

  // Section E: Financial Interest in Entity (13 columns × 5 rows)
  fa_interest_institution_0?: string;
  fa_interest_institution_1?: string;
  fa_interest_institution_2?: string;
  fa_interest_institution_3?: string;
  fa_interest_institution_4?: string;

  fa_interest_address_0?: string;
  fa_interest_address_1?: string;
  fa_interest_address_2?: string;
  fa_interest_address_3?: string;
  fa_interest_address_4?: string;

  fa_interest_zip_0?: string;
  fa_interest_zip_1?: string;
  fa_interest_zip_2?: string;
  fa_interest_zip_3?: string;
  fa_interest_zip_4?: string;

  fa_interest_nature_0?: string;
  fa_interest_nature_1?: string;
  fa_interest_nature_2?: string;
  fa_interest_nature_3?: string;
  fa_interest_nature_4?: string;

  fa_interest_account_0?: string;
  fa_interest_account_1?: string;
  fa_interest_account_2?: string;
  fa_interest_account_3?: string;
  fa_interest_account_4?: string;

  fa_interest_peak_balance_0?: number;
  fa_interest_peak_balance_1?: number;
  fa_interest_peak_balance_2?: number;
  fa_interest_peak_balance_3?: number;
  fa_interest_peak_balance_4?: number;

  fa_interest_dividend_0?: string;
  fa_interest_dividend_1?: string;
  fa_interest_dividend_2?: string;
  fa_interest_dividend_3?: string;
  fa_interest_dividend_4?: string;

  fa_interest_income_nature_0?: string;
  fa_interest_income_nature_1?: string;
  fa_interest_income_nature_2?: string;
  fa_interest_income_nature_3?: string;
  fa_interest_income_nature_4?: string;

  fa_interest_income_accrued_0?: number;
  fa_interest_income_accrued_1?: number;
  fa_interest_income_accrued_2?: number;
  fa_interest_income_accrued_3?: number;
  fa_interest_income_accrued_4?: number;

  fa_interest_amount_0?: number;
  fa_interest_amount_1?: number;
  fa_interest_amount_2?: number;
  fa_interest_amount_3?: number;
  fa_interest_amount_4?: number;

  fa_interest_schedule_0?: string;
  fa_interest_schedule_1?: string;
  fa_interest_schedule_2?: string;
  fa_interest_schedule_3?: string;
  fa_interest_schedule_4?: string;

  fa_interest_item_number_0?: string;
  fa_interest_item_number_1?: string;
  fa_interest_item_number_2?: string;
  fa_interest_item_number_3?: string;
  fa_interest_item_number_4?: string;

  // Section F: Immovable Property (12 columns × 5 rows)
  fa_property_country_0?: string;
  fa_property_country_1?: string;
  fa_property_country_2?: string;
  fa_property_country_3?: string;
  fa_property_country_4?: string;

  fa_property_zip_0?: string;
  fa_property_zip_1?: string;
  fa_property_zip_2?: string;
  fa_property_zip_3?: string;
  fa_property_zip_4?: string;

  fa_property_address_0?: string;
  fa_property_address_1?: string;
  fa_property_address_2?: string;
  fa_property_address_3?: string;
  fa_property_address_4?: string;

  fa_property_ownership_0?: string;
  fa_property_ownership_1?: string;
  fa_property_ownership_2?: string;
  fa_property_ownership_3?: string;
  fa_property_ownership_4?: string;

  fa_property_acquisition_date_0?: string;
  fa_property_acquisition_date_1?: string;
  fa_property_acquisition_date_2?: string;
  fa_property_acquisition_date_3?: string;
  fa_property_acquisition_date_4?: string;

  fa_property_investment_0?: number;
  fa_property_investment_1?: number;
  fa_property_investment_2?: number;
  fa_property_investment_3?: number;
  fa_property_investment_4?: number;

  fa_property_income_derived_0?: number;
  fa_property_income_derived_1?: number;
  fa_property_income_derived_2?: number;
  fa_property_income_derived_3?: number;
  fa_property_income_derived_4?: number;

  fa_property_income_nature_0?: string;
  fa_property_income_nature_1?: string;
  fa_property_income_nature_2?: string;
  fa_property_income_nature_3?: string;
  fa_property_income_nature_4?: string;

  fa_property_amount_0?: number;
  fa_property_amount_1?: number;
  fa_property_amount_2?: number;
  fa_property_amount_3?: number;
  fa_property_amount_4?: number;

  fa_property_schedule_0?: string;
  fa_property_schedule_1?: string;
  fa_property_schedule_2?: string;
  fa_property_schedule_3?: string;
  fa_property_schedule_4?: string;

  fa_property_item_number_0?: string;
  fa_property_item_number_1?: string;
  fa_property_item_number_2?: string;
  fa_property_item_number_3?: string;
  fa_property_item_number_4?: string;

  // Section G: Other Capital Assets (12 columns × 5 rows)
  fa_capital_country_zip_0?: string;
  fa_capital_country_zip_1?: string;
  fa_capital_country_zip_2?: string;
  fa_capital_country_zip_3?: string;
  fa_capital_country_zip_4?: string;

  fa_capital_name_code_0?: string;
  fa_capital_name_code_1?: string;
  fa_capital_name_code_2?: string;
  fa_capital_name_code_3?: string;
  fa_capital_name_code_4?: string;

  fa_capital_nature_0?: string;
  fa_capital_nature_1?: string;
  fa_capital_nature_2?: string;
  fa_capital_nature_3?: string;
  fa_capital_nature_4?: string;

  fa_capital_ownership_0?: string;
  fa_capital_ownership_1?: string;
  fa_capital_ownership_2?: string;
  fa_capital_ownership_3?: string;
  fa_capital_ownership_4?: string;

  fa_capital_acquisition_date_0?: string;
  fa_capital_acquisition_date_1?: string;
  fa_capital_acquisition_date_2?: string;
  fa_capital_acquisition_date_3?: string;
  fa_capital_acquisition_date_4?: string;

  fa_capital_investment_0?: number;
  fa_capital_investment_1?: number;
  fa_capital_investment_2?: number;
  fa_capital_investment_3?: number;
  fa_capital_investment_4?: number;

  fa_capital_income_derived_0?: number;
  fa_capital_income_derived_1?: number;
  fa_capital_income_derived_2?: number;
  fa_capital_income_derived_3?: number;
  fa_capital_income_derived_4?: number;

  fa_capital_income_nature_0?: string;
  fa_capital_income_nature_1?: string;
  fa_capital_income_nature_2?: string;
  fa_capital_income_nature_3?: string;
  fa_capital_income_nature_4?: string;

  fa_capital_amount_0?: number;
  fa_capital_amount_1?: number;
  fa_capital_amount_2?: number;
  fa_capital_amount_3?: number;
  fa_capital_amount_4?: number;

  fa_capital_schedule_0?: string;
  fa_capital_schedule_1?: string;
  fa_capital_schedule_2?: string;
  fa_capital_schedule_3?: string;
  fa_capital_schedule_4?: string;

  fa_capital_item_number_0?: string;
  fa_capital_item_number_1?: string;
  fa_capital_item_number_2?: string;
  fa_capital_item_number_3?: string;
  fa_capital_item_number_4?: string;

  // Schedule SH-1: Shareholding of Unlisted Company

  // Section A: Details of shareholding at end of previous year (10 columns × 5 rows)
  sh1_prev_shareholder_name_0?: string;
  sh1_prev_shareholder_name_1?: string;
  sh1_prev_shareholder_name_2?: string;
  sh1_prev_shareholder_name_3?: string;
  sh1_prev_shareholder_name_4?: string;

  sh1_prev_residential_status_0?: string;
  sh1_prev_residential_status_1?: string;
  sh1_prev_residential_status_2?: string;
  sh1_prev_residential_status_3?: string;
  sh1_prev_residential_status_4?: string;

  sh1_prev_share_type_0?: string;
  sh1_prev_share_type_1?: string;
  sh1_prev_share_type_2?: string;
  sh1_prev_share_type_3?: string;
  sh1_prev_share_type_4?: string;

  sh1_prev_pan_0?: string;
  sh1_prev_pan_1?: string;
  sh1_prev_pan_2?: string;
  sh1_prev_pan_3?: string;
  sh1_prev_pan_4?: string;

  sh1_prev_allotment_date_0?: string;
  sh1_prev_allotment_date_1?: string;
  sh1_prev_allotment_date_2?: string;
  sh1_prev_allotment_date_3?: string;
  sh1_prev_allotment_date_4?: string;

  sh1_prev_shares_held_0?: number;
  sh1_prev_shares_held_1?: number;
  sh1_prev_shares_held_2?: number;
  sh1_prev_shares_held_3?: number;
  sh1_prev_shares_held_4?: number;

  sh1_prev_face_value_0?: number;
  sh1_prev_face_value_1?: number;
  sh1_prev_face_value_2?: number;
  sh1_prev_face_value_3?: number;
  sh1_prev_face_value_4?: number;

  sh1_prev_issue_price_0?: number;
  sh1_prev_issue_price_1?: number;
  sh1_prev_issue_price_2?: number;
  sh1_prev_issue_price_3?: number;
  sh1_prev_issue_price_4?: number;

  sh1_prev_amount_received_0?: number;
  sh1_prev_amount_received_1?: number;
  sh1_prev_amount_received_2?: number;
  sh1_prev_amount_received_3?: number;
  sh1_prev_amount_received_4?: number;

  // Section B: Equity share application money pending allotment (10 columns × 5 rows)
  sh1_app_applicant_name_0?: string;
  sh1_app_applicant_name_1?: string;
  sh1_app_applicant_name_2?: string;
  sh1_app_applicant_name_3?: string;
  sh1_app_applicant_name_4?: string;

  sh1_app_residential_status_0?: string;
  sh1_app_residential_status_1?: string;
  sh1_app_residential_status_2?: string;
  sh1_app_residential_status_3?: string;
  sh1_app_residential_status_4?: string;

  sh1_app_share_type_0?: string;
  sh1_app_share_type_1?: string;
  sh1_app_share_type_2?: string;
  sh1_app_share_type_3?: string;
  sh1_app_share_type_4?: string;

  sh1_app_pan_0?: string;
  sh1_app_pan_1?: string;
  sh1_app_pan_2?: string;
  sh1_app_pan_3?: string;
  sh1_app_pan_4?: string;

  sh1_app_application_date_0?: string;
  sh1_app_application_date_1?: string;
  sh1_app_application_date_2?: string;
  sh1_app_application_date_3?: string;
  sh1_app_application_date_4?: string;

  sh1_app_shares_applied_0?: number;
  sh1_app_shares_applied_1?: number;
  sh1_app_shares_applied_2?: number;
  sh1_app_shares_applied_3?: number;
  sh1_app_shares_applied_4?: number;

  sh1_app_money_received_0?: number;
  sh1_app_money_received_1?: number;
  sh1_app_money_received_2?: number;
  sh1_app_money_received_3?: number;
  sh1_app_money_received_4?: number;

  sh1_app_face_value_0?: number;
  sh1_app_face_value_1?: number;
  sh1_app_face_value_2?: number;
  sh1_app_face_value_3?: number;
  sh1_app_face_value_4?: number;

  sh1_app_proposed_price_0?: number;
  sh1_app_proposed_price_1?: number;
  sh1_app_proposed_price_2?: number;
  sh1_app_proposed_price_3?: number;
  sh1_app_proposed_price_4?: number;

  // Section C: Share application details (10 columns × 5 rows)
  sh1_share_applicant_name_0?: string;
  sh1_share_applicant_name_1?: string;
  sh1_share_applicant_name_2?: string;
  sh1_share_applicant_name_3?: string;
  sh1_share_applicant_name_4?: string;

  sh1_share_residential_status_0?: string;
  sh1_share_residential_status_1?: string;
  sh1_share_residential_status_2?: string;
  sh1_share_residential_status_3?: string;
  sh1_share_residential_status_4?: string;

  sh1_share_share_type_0?: string;
  sh1_share_share_type_1?: string;
  sh1_share_share_type_2?: string;
  sh1_share_share_type_3?: string;
  sh1_share_share_type_4?: string;

  sh1_share_pan_0?: string;
  sh1_share_pan_1?: string;
  sh1_share_pan_2?: string;
  sh1_share_pan_3?: string;
  sh1_share_pan_4?: string;

  sh1_share_application_date_0?: string;
  sh1_share_application_date_1?: string;
  sh1_share_application_date_2?: string;
  sh1_share_application_date_3?: string;
  sh1_share_application_date_4?: string;

  sh1_share_shares_applied_0?: number;
  sh1_share_shares_applied_1?: number;
  sh1_share_shares_applied_2?: number;
  sh1_share_shares_applied_3?: number;
  sh1_share_shares_applied_4?: number;

  sh1_share_money_received_0?: number;
  sh1_share_money_received_1?: number;
  sh1_share_money_received_2?: number;
  sh1_share_money_received_3?: number;
  sh1_share_money_received_4?: number;

  sh1_share_face_value_0?: number;
  sh1_share_face_value_1?: number;
  sh1_share_face_value_2?: number;
  sh1_share_face_value_3?: number;
  sh1_share_face_value_4?: number;

  sh1_share_proposed_price_0?: number;
  sh1_share_proposed_price_1?: number;
  sh1_share_proposed_price_2?: number;
  sh1_share_proposed_price_3?: number;
  sh1_share_proposed_price_4?: number;

  // Section D: Shareholders who ceased to be shareholders (13 columns × 5 rows)
  sh1_ceased_shareholder_name_0?: string;
  sh1_ceased_shareholder_name_1?: string;
  sh1_ceased_shareholder_name_2?: string;
  sh1_ceased_shareholder_name_3?: string;
  sh1_ceased_shareholder_name_4?: string;

  sh1_ceased_residential_status_0?: string;
  sh1_ceased_residential_status_1?: string;
  sh1_ceased_residential_status_2?: string;
  sh1_ceased_residential_status_3?: string;
  sh1_ceased_residential_status_4?: string;

  sh1_ceased_share_type_0?: string;
  sh1_ceased_share_type_1?: string;
  sh1_ceased_share_type_2?: string;
  sh1_ceased_share_type_3?: string;
  sh1_ceased_share_type_4?: string;

  sh1_ceased_pan_0?: string;
  sh1_ceased_pan_1?: string;
  sh1_ceased_pan_2?: string;
  sh1_ceased_pan_3?: string;
  sh1_ceased_pan_4?: string;

  sh1_ceased_shares_held_0?: number;
  sh1_ceased_shares_held_1?: number;
  sh1_ceased_shares_held_2?: number;
  sh1_ceased_shares_held_3?: number;
  sh1_ceased_shares_held_4?: number;

  sh1_ceased_face_value_0?: number;
  sh1_ceased_face_value_1?: number;
  sh1_ceased_face_value_2?: number;
  sh1_ceased_face_value_3?: number;
  sh1_ceased_face_value_4?: number;

  sh1_ceased_issue_price_0?: number;
  sh1_ceased_issue_price_1?: number;
  sh1_ceased_issue_price_2?: number;
  sh1_ceased_issue_price_3?: number;
  sh1_ceased_issue_price_4?: number;

  sh1_ceased_amount_received_0?: number;
  sh1_ceased_amount_received_1?: number;
  sh1_ceased_amount_received_2?: number;
  sh1_ceased_amount_received_3?: number;
  sh1_ceased_amount_received_4?: number;

  sh1_ceased_allotment_date_0?: string;
  sh1_ceased_allotment_date_1?: string;
  sh1_ceased_allotment_date_2?: string;
  sh1_ceased_allotment_date_3?: string;
  sh1_ceased_allotment_date_4?: string;

  sh1_ceased_cessation_date_0?: string;
  sh1_ceased_cessation_date_1?: string;
  sh1_ceased_cessation_date_2?: string;
  sh1_ceased_cessation_date_3?: string;
  sh1_ceased_cessation_date_4?: string;

  sh1_ceased_mode_of_cessation_0?: string;
  sh1_ceased_mode_of_cessation_1?: string;
  sh1_ceased_mode_of_cessation_2?: string;
  sh1_ceased_mode_of_cessation_3?: string;
  sh1_ceased_mode_of_cessation_4?: string;

  sh1_ceased_transfer_pan_0?: string;
  sh1_ceased_transfer_pan_1?: string;
  sh1_ceased_transfer_pan_2?: string;
  sh1_ceased_transfer_pan_3?: string;
  sh1_ceased_transfer_pan_4?: string;

  // Schedule SH-2: Shareholding of Start-ups

  // Section A: Details of shareholding at end of previous year (11 columns × 5 rows)
  sh2_prev_shareholder_name_0?: string;
  sh2_prev_shareholder_name_1?: string;
  sh2_prev_shareholder_name_2?: string;
  sh2_prev_shareholder_name_3?: string;
  sh2_prev_shareholder_name_4?: string;

  sh2_prev_category_0?: string;
  sh2_prev_category_1?: string;
  sh2_prev_category_2?: string;
  sh2_prev_category_3?: string;
  sh2_prev_category_4?: string;

  sh2_prev_share_type_0?: string;
  sh2_prev_share_type_1?: string;
  sh2_prev_share_type_2?: string;
  sh2_prev_share_type_3?: string;
  sh2_prev_share_type_4?: string;

  sh2_prev_pan_0?: string;
  sh2_prev_pan_1?: string;
  sh2_prev_pan_2?: string;
  sh2_prev_pan_3?: string;
  sh2_prev_pan_4?: string;

  sh2_prev_allotment_date_0?: string;
  sh2_prev_allotment_date_1?: string;
  sh2_prev_allotment_date_2?: string;
  sh2_prev_allotment_date_3?: string;
  sh2_prev_allotment_date_4?: string;

  sh2_prev_shares_held_0?: number;
  sh2_prev_shares_held_1?: number;
  sh2_prev_shares_held_2?: number;
  sh2_prev_shares_held_3?: number;
  sh2_prev_shares_held_4?: number;

  sh2_prev_face_value_0?: number;
  sh2_prev_face_value_1?: number;
  sh2_prev_face_value_2?: number;
  sh2_prev_face_value_3?: number;
  sh2_prev_face_value_4?: number;

  sh2_prev_issue_price_0?: number;
  sh2_prev_issue_price_1?: number;
  sh2_prev_issue_price_2?: number;
  sh2_prev_issue_price_3?: number;
  sh2_prev_issue_price_4?: number;

  sh2_prev_paid_up_value_0?: number;
  sh2_prev_paid_up_value_1?: number;
  sh2_prev_paid_up_value_2?: number;
  sh2_prev_paid_up_value_3?: number;
  sh2_prev_paid_up_value_4?: number;

  sh2_prev_share_premium_0?: number;
  sh2_prev_share_premium_1?: number;
  sh2_prev_share_premium_2?: number;
  sh2_prev_share_premium_3?: number;
  sh2_prev_share_premium_4?: number;

  // Section B: Share application money pending allotment (11 columns × 5 rows)
  sh2_app_applicant_name_0?: string;
  sh2_app_applicant_name_1?: string;
  sh2_app_applicant_name_2?: string;
  sh2_app_applicant_name_3?: string;
  sh2_app_applicant_name_4?: string;

  sh2_app_category_0?: string;
  sh2_app_category_1?: string;
  sh2_app_category_2?: string;
  sh2_app_category_3?: string;
  sh2_app_category_4?: string;

  sh2_app_share_type_0?: string;
  sh2_app_share_type_1?: string;
  sh2_app_share_type_2?: string;
  sh2_app_share_type_3?: string;
  sh2_app_share_type_4?: string;

  sh2_app_pan_0?: string;
  sh2_app_pan_1?: string;
  sh2_app_pan_2?: string;
  sh2_app_pan_3?: string;
  sh2_app_pan_4?: string;

  sh2_app_application_date_0?: string;
  sh2_app_application_date_1?: string;
  sh2_app_application_date_2?: string;
  sh2_app_application_date_3?: string;
  sh2_app_application_date_4?: string;

  sh2_app_shares_applied_0?: number;
  sh2_app_shares_applied_1?: number;
  sh2_app_shares_applied_2?: number;
  sh2_app_shares_applied_3?: number;
  sh2_app_shares_applied_4?: number;

  sh2_app_face_value_0?: number;
  sh2_app_face_value_1?: number;
  sh2_app_face_value_2?: number;
  sh2_app_face_value_3?: number;
  sh2_app_face_value_4?: number;

  sh2_app_proposed_price_0?: number;
  sh2_app_proposed_price_1?: number;
  sh2_app_proposed_price_2?: number;
  sh2_app_proposed_price_3?: number;
  sh2_app_proposed_price_4?: number;

  sh2_app_money_0?: number;
  sh2_app_money_1?: number;
  sh2_app_money_2?: number;
  sh2_app_money_3?: number;
  sh2_app_money_4?: number;

  sh2_app_premium_0?: number;
  sh2_app_premium_1?: number;
  sh2_app_premium_2?: number;
  sh2_app_premium_3?: number;
  sh2_app_premium_4?: number;

  // Section C: Shareholders who ceased to be shareholders (13 columns × 5 rows)
  sh2_ceased_shareholder_name_0?: string;
  sh2_ceased_shareholder_name_1?: string;
  sh2_ceased_shareholder_name_2?: string;
  sh2_ceased_shareholder_name_3?: string;
  sh2_ceased_shareholder_name_4?: string;

  sh2_ceased_category_0?: string;
  sh2_ceased_category_1?: string;
  sh2_ceased_category_2?: string;
  sh2_ceased_category_3?: string;
  sh2_ceased_category_4?: string;

  sh2_ceased_share_type_0?: string;
  sh2_ceased_share_type_1?: string;
  sh2_ceased_share_type_2?: string;
  sh2_ceased_share_type_3?: string;
  sh2_ceased_share_type_4?: string;

  sh2_ceased_pan_0?: string;
  sh2_ceased_pan_1?: string;
  sh2_ceased_pan_2?: string;
  sh2_ceased_pan_3?: string;
  sh2_ceased_pan_4?: string;

  sh2_ceased_allotment_date_0?: string;
  sh2_ceased_allotment_date_1?: string;
  sh2_ceased_allotment_date_2?: string;
  sh2_ceased_allotment_date_3?: string;
  sh2_ceased_allotment_date_4?: string;

  sh2_ceased_shares_held_0?: number;
  sh2_ceased_shares_held_1?: number;
  sh2_ceased_shares_held_2?: number;
  sh2_ceased_shares_held_3?: number;
  sh2_ceased_shares_held_4?: number;

  sh2_ceased_face_value_0?: number;
  sh2_ceased_face_value_1?: number;
  sh2_ceased_face_value_2?: number;
  sh2_ceased_face_value_3?: number;
  sh2_ceased_face_value_4?: number;

  sh2_ceased_issue_price_0?: number;
  sh2_ceased_issue_price_1?: number;
  sh2_ceased_issue_price_2?: number;
  sh2_ceased_issue_price_3?: number;
  sh2_ceased_issue_price_4?: number;

  sh2_ceased_paid_up_value_0?: number;
  sh2_ceased_paid_up_value_1?: number;
  sh2_ceased_paid_up_value_2?: number;
  sh2_ceased_paid_up_value_3?: number;
  sh2_ceased_paid_up_value_4?: number;

  sh2_ceased_cessation_date_0?: string;
  sh2_ceased_cessation_date_1?: string;
  sh2_ceased_cessation_date_2?: string;
  sh2_ceased_cessation_date_3?: string;
  sh2_ceased_cessation_date_4?: string;

  sh2_ceased_mode_of_cessation_0?: string;
  sh2_ceased_mode_of_cessation_1?: string;
  sh2_ceased_mode_of_cessation_2?: string;
  sh2_ceased_mode_of_cessation_3?: string;
  sh2_ceased_mode_of_cessation_4?: string;

  sh2_ceased_transfer_pan_0?: string;
  sh2_ceased_transfer_pan_1?: string;
  sh2_ceased_transfer_pan_2?: string;
  sh2_ceased_transfer_pan_3?: string;
  sh2_ceased_transfer_pan_4?: string;
}

export interface ITR7Step {
  id: string;
  label: string;
  step: number;
}
