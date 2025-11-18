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
  bs_share_capital_authorised?: string;
  bs_share_capital_issued?: string;
  bs_share_capital_subscribed?: string;

  // Balance Sheet - Reserves and Surplus (Part A-BS Section I.1.B)
  bs_capital_reserve?: string;
  bs_capital_redemption_reserve?: string;
  bs_securities_premium_reserve?: string;
  bs_debenture_redemption_reserve?: string;
  bs_revaluation_reserve?: string;
  bs_share_options_outstanding?: string;
  bs_other_reserve_a?: string;
  bs_other_reserve_b?: string;
  bs_surplus_profit_loss?: string;

  // Balance Sheet - Share Application Money (Part A-BS Section I.2)
  bs_share_application_pending_1yr?: string;
  bs_share_application_pending_over1yr?: string;
  bs_share_application_less_1year?: string;
  bs_share_application_more_1year?: string;

  // Balance Sheet - Non-current Liabilities (Part A-BS Section I.3)
  bs_bonds_foreign_currency?: string;
  bs_bonds_rupees?: string;
  bs_term_loans_banks?: string;
  bs_term_loans_others?: string;
  bs_deferred_payment_liabilities?: string;
  bs_deposits_related_parties?: string;
  bs_other_deposits?: string;
  bs_loans_advances_related?: string;
  bs_other_loans_advances?: string;
  bs_finance_lease_obligations?: string;

  // Balance Sheet - Current Liabilities (Part A-BS Section I.4)
  bs_current_liabilities_borrowings?: string;
  bs_current_liabilities_trade_payables?: string;
  bs_current_liabilities_other_payables?: string;

  // Balance Sheet - Non-current Assets (Part A-BS Section II.1)
  bs_fixed_assets_gross?: string;
  bs_fixed_assets_gross_block?: string;
  bs_fixed_assets_depreciation?: string;
  bs_goodwill_intangibles?: string;
  bs_other_noncurrent_assets?: string;

  // Balance Sheet - Current Assets (Part A-BS Section II.2)
  bs_inventories?: string;
  bs_trade_receivables?: string;
  bs_cash_equivalents?: string;
  bs_other_current_assets?: string;
  
  // Balance Sheet - Surplus and other fields
  bs_surplus_balance?: string;

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
}

export interface ITR7Step {
  id: string;
  label: string;
  step: number;
}
