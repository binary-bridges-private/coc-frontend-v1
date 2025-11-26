import { z } from "zod";

// PAN validation regex
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

// Aadhaar validation regex
const AADHAAR_REGEX = /^\d{12}$/;

// Date validation helper (DD/MM/YYYY)
const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

// PIN Code validation
const PIN_CODE_REGEX = /^\d{6}$/;

// Email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// IFSC Code validation
const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export const itr8ValidationSchema = z.object({
  // Basic HUF Information
  gen_name: z.string().min(3, "HUF name must be at least 3 characters").optional(),
  gen_pan: z.string().regex(PAN_REGEX, "Invalid PAN format (e.g., ABCDE1234F)").optional(),
  gen_aadhaar: z.string().regex(AADHAAR_REGEX, "Invalid Aadhaar format (12 digits)").optional().or(z.literal("")),
  
  // Name Change
  gen_name_change: z.string().optional(),
  gen_old_name: z.string().optional(),
  
  // Address Details
  gen_flat_door_block: z.string().optional(),
  gen_premises_building: z.string().optional(),
  gen_road_street_post: z.string().optional(),
  gen_area_locality: z.string().optional(),
  gen_town_city_district: z.string().optional(),
  gen_state: z.string().optional(),
  gen_pin_code: z.string().regex(PIN_CODE_REGEX, "Invalid PIN code (must be 6 digits)").optional().or(z.literal("")),
  gen_country: z.string().optional(),
  
  // Date validations
  gen_filing_date: z.string().regex(DATE_REGEX, "Date must be in DD/MM/YYYY format").optional().or(z.literal("")),
  gen_due_date: z.string().optional(),
  gen_huf_formation_date: z.string().regex(DATE_REGEX, "Date must be in DD/MM/YYYY format").optional().or(z.literal("")),
  
  // Contact Information
  gen_office_phone_std: z.string().regex(/^\d*$/, "STD code must contain only digits").optional().or(z.literal("")),
  gen_office_phone_mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits").optional().or(z.literal("")),
  gen_mobile_2: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits").optional().or(z.literal("")),
  gen_email_1: z.string().regex(EMAIL_REGEX, "Invalid email format").optional().or(z.literal("")),
  gen_email_2: z.string().regex(EMAIL_REGEX, "Invalid email format").optional().or(z.literal("")),
  
  // HUF Specific
  gen_karta_name: z.string().optional(),
  gen_karta_pan: z.string().regex(PAN_REGEX, "Invalid PAN format").optional().or(z.literal("")),
  gen_huf_identifier: z.string().optional(),
  
  // Bank Details
  gen_bank_name: z.string().optional(),
  gen_account_number: z.string().regex(/^\d+$/, "Account number must contain only digits").optional().or(z.literal("")),
  gen_account_type: z.string().optional(),
  gen_ifsc_code: z.string().regex(IFSC_REGEX, "Invalid IFSC code format").optional().or(z.literal("")),
  gen_micr_code: z.string().regex(/^\d{9}$/, "MICR code must be 9 digits").optional().or(z.literal("")),

  // Return Type
  gen_original_return: z.boolean().optional(),
  gen_revised_return: z.boolean().optional(),
  gen_defective_modified: z.boolean().optional(),
  gen_receipt_number: z.string().optional(),
  gen_acknowledgement_number: z.string().optional(),

  // Residential Status
  gen_residential_status: z.string().optional(),

  // Filing Status
  gen_139_1_checkbox: z.boolean().optional(),
  gen_139_4_checkbox: z.boolean().optional(),
  gen_139_5_checkbox: z.boolean().optional(),
  gen_92cd_checkbox: z.boolean().optional(),
  gen_119_2b_checkbox: z.boolean().optional(),
  gen_92e_checkbox: z.boolean().optional(),

  // Income indicators
  gen_has_house_property: z.boolean().optional(),
  gen_has_business_profession: z.boolean().optional(),
  gen_has_capital_gains: z.boolean().optional(),
  gen_has_other_sources: z.boolean().optional(),
  gen_has_agricultural_income: z.boolean().optional(),

  // Numeric fields - House Property
  hp_property_1_address: z.string().optional(),
  hp_property_1_city: z.string().optional(),
  hp_property_1_state: z.string().optional(),
  hp_property_1_country: z.string().optional(),
  hp_property_1_pincode: z.string().regex(PIN_CODE_REGEX, "Invalid PIN code").optional().or(z.literal("")),
  hp_property_1_gross_rent: z.number().min(0, "Amount must be positive").optional(),
  hp_property_1_rent_not_realised: z.number().min(0).optional(),
  hp_property_1_tax_local_authorities: z.number().min(0).optional(),
  hp_property_1_total_deduction: z.number().min(0).optional(),
  hp_property_1_annual_value: z.number().min(0).optional(),
  hp_property_1_annual_value_owned: z.number().min(0).optional(),
  hp_property_1_thirty_percent: z.number().min(0).optional(),
  hp_property_1_interest_borrowed: z.number().min(0).optional(),
  hp_property_1_deduction: z.number().min(0).optional(),
  hp_property_1_arrears_unrealised: z.number().min(0).optional(),
  hp_property_1_income_property: z.number().optional(),
  hp_property_1_passthrough_loss: z.number().optional(),
  hp_property_1_total_income_property: z.number().optional(),

  // Property 2 fields
  hp_property_2_address: z.string().optional(),
  hp_property_2_city: z.string().optional(),
  hp_property_2_state: z.string().optional(),
  hp_property_2_country: z.string().optional(),
  hp_property_2_pincode: z.string().optional().or(z.literal("")),
  hp_property_2_gross_rent: z.number().min(0).optional(),
  hp_property_2_rent_not_realised: z.number().min(0).optional(),
  hp_property_2_tax_local_authorities: z.number().min(0).optional(),
  hp_property_2_total_deduction: z.number().min(0).optional(),
  hp_property_2_annual_value: z.number().min(0).optional(),
  hp_property_2_annual_value_owned: z.number().min(0).optional(),
  hp_property_2_thirty_percent: z.number().min(0).optional(),
  hp_property_2_interest_borrowed: z.number().min(0).optional(),
  hp_property_2_deduction: z.number().min(0).optional(),
  hp_property_2_arrears_unrealised: z.number().min(0).optional(),
  hp_property_2_income_property: z.number().optional(),
  hp_property_2_passthrough_loss: z.number().optional(),
  hp_property_2_total_income_property: z.number().optional(),

  // Business and Profession fields
  bp_profit_before_tax: z.number().optional(),
  bp_speculative_profit_included: z.number().min(0).optional(),
  bp_house_property_income: z.number().optional(),
  bp_capital_gains_income: z.number().optional(),
  bp_other_sources_income: z.number().optional(),
  bp_dividend_income: z.number().min(0).optional(),
  bp_other_than_dividend_income: z.number().min(0).optional(),
  bp_total_exempt_income: z.number().min(0).optional(),
  bp_balance_6: z.number().optional(),
  bp_exp_house_property: z.number().min(0).optional(),
  bp_exp_capital_gains: z.number().min(0).optional(),
  bp_exp_other_sources: z.number().min(0).optional(),
  bp_total_7_8: z.number().optional(),
  bp_adjusted_profit_loss_10: z.number().optional(),
  bp_depreciation_debited: z.number().min(0).optional(),
  bp_depreciation_allowable_32_1_ii: z.number().min(0).optional(),
  bp_depreciation_allowable_32_1_i: z.number().min(0).optional(),
  bp_total_depreciation_allowable: z.number().min(0).optional(),
  bp_profit_loss_after_depreciation_13: z.number().optional(),
  bp_disallowance_36: z.number().min(0).optional(),
  bp_disallowance_37: z.number().min(0).optional(),
  bp_disallowance_40: z.number().min(0).optional(),
  bp_disallowance_40a: z.number().min(0).optional(),
  bp_disallowance_43b: z.number().min(0).optional(),
  bp_disallowance_23_msme: z.number().min(0).optional(),
  bp_deemed_income_41: z.number().min(0).optional(),
  bp_deemed_income_32ac_etc: z.number().min(0).optional(),
  bp_deemed_income_43ca: z.number().min(0).optional(),
  bp_other_additions_28_to_44db: z.number().min(0).optional(),
  bp_other_income_not_included: z.number().min(0).optional(),
  bp_icds_adjustments_increase: z.number().min(0).optional(),
  bp_total_additions: z.number().min(0).optional(),
  bp_deduction_32_1_iii: z.number().min(0).optional(),
  bp_deduction_32ac: z.number().min(0).optional(),
  bp_deduction_35_excess: z.number().min(0).optional(),
  bp_disallowed_40_allowable: z.number().min(0).optional(),
  bp_disallowed_43b_allowable: z.number().min(0).optional(),
  bp_other_deductions_allowable: z.number().min(0).optional(),
  bp_icds_adjustments_decrease: z.number().min(0).optional(),
  bp_total_deductions: z.number().min(0).optional(),
  bp_income_business_profession_35: z.number().optional(),
  
  // Deemed Profit Fields
  bp_deemed_profit_44ae: z.number().min(0).optional(),
  bp_deemed_profit_44b: z.number().min(0).optional(),
  bp_deemed_profit_44bb: z.number().min(0).optional(),
  bp_deemed_profit_44bba: z.number().min(0).optional(),
  bp_deemed_profit_44bbb: z.number().min(0).optional(),
  bp_deemed_profit_44bbc: z.number().min(0).optional(),
  bp_deemed_profit_44d: z.number().min(0).optional(),
  bp_deemed_profit_44da: z.number().min(0).optional(),
  bp_deemed_profit_chapter_xii_g: z.number().min(0).optional(),
  bp_deemed_profit_first_schedule: z.number().min(0).optional(),
  bp_total_deemed_profit: z.number().min(0).optional(),

  bp_net_profit_business_profession_37: z.number().optional(),
  bp_net_profit_business_profession_38: z.number().optional(),
  bp_income_chargeable_rule_7: z.number().optional(),
  bp_speculative_net_profit: z.number().optional(),
  bp_speculative_additions: z.number().min(0).optional(),
  bp_speculative_deductions: z.number().min(0).optional(),
  bp_speculative_income: z.number().optional(),

  // Capital Gains
  cg_stcg_gross: z.number().optional(),
  cg_stcg_deductions: z.number().min(0).optional(),
  cg_stcg_income: z.number().optional(),
  cg_ltcg_gross: z.number().optional(),
  cg_ltcg_deductions: z.number().min(0).optional(),
  cg_ltcg_income: z.number().optional(),
  cg_total_capital_gains: z.number().optional(),
  cg_vda_income: z.number().optional(),

  // Other Sources
  os_dividend_gross: z.number().min(0).optional(),
  os_interest_gross: z.number().min(0).optional(),
  os_56_2_x_total: z.number().min(0).optional(),
  os_special_rate_total: z.number().min(0).optional(),
  os_other_income_total: z.number().min(0).optional(),

  // Agricultural Income
  ag_income_gross_receipts: z.number().min(0).optional(),
  ag_income_seeds_manures: z.number().min(0).optional(),
  ag_income_wages: z.number().min(0).optional(),
  ag_income_bullock_hire: z.number().min(0).optional(),
  ag_income_other_expenses: z.number().min(0).optional(),
  ag_income_net: z.number().optional(),

  // Income Summary
  summary_house_property: z.number().optional(),
  summary_business_profession: z.number().optional(),
  summary_capital_gains: z.number().optional(),
  summary_other_sources: z.number().optional(),
  summary_agricultural_income: z.number().optional(),
  summary_gross_total: z.number().optional(),
  summary_gross_total_income: z.number().optional(),

  // Tax Calculation
  tax_normal_rate: z.number().min(0).optional(),
  tax_surcharge: z.number().min(0).optional(),
  tax_cess: z.number().min(0).optional(),
  tax_total: z.number().min(0).optional(),
  tax_relief: z.number().min(0).optional(),
  tax_payable: z.number().min(0).optional(),

  // Deductions under Chapter VI-A
  ch6_80g_amount: z.number().min(0).optional(),
  ch6_80ggb_amount: z.number().min(0).optional(),
  ch6_80gga_amount: z.number().min(0).optional(),
  ch6_80ggc_amount: z.number().min(0).optional(),
  ch6_80ia_amount: z.number().min(0).optional(),
  ch6_80iab_amount: z.number().min(0).optional(),
  ch6_80ib_amount: z.number().min(0).optional(),
  ch6_80ie_amount: z.number().min(0).optional(),
  ch6_80jja_amount: z.number().min(0).optional(),
  ch6_80lla_amount: z.number().min(0).optional(),
  ch6_80pa_amount: z.number().min(0).optional(),
  ch6_80gcc_amount: z.number().min(0).optional(),
  ch6_80gge_amount: z.number().min(0).optional(),
  ch6_80ggc_donation_amount: z.number().min(0).optional(),
  ch6_80gcd_amount: z.number().min(0).optional(),
  ch6_80u_amount: z.number().min(0).optional(),
  ch6_80ac_amount: z.number().min(0).optional(),
  ch6_80aa_amount: z.number().min(0).optional(),
  ch6_80aca_amount: z.number().min(0).optional(),
  ch6_80d_amount: z.number().min(0).optional(),
  ch6_80dd_amount: z.number().min(0).optional(),
  ch6_80ddb_amount: z.number().min(0).optional(),
  ch6_80e_amount: z.number().min(0).optional(),
  ch6_80eb_amount: z.number().min(0).optional(),
  ch6_80eea_amount: z.number().min(0).optional(),
  ch6_80eeb_amount: z.number().min(0).optional(),
  ch6_80ec_amount: z.number().min(0).optional(),
  ch6_80ed_amount: z.number().min(0).optional(),
  ch6_80ee_amount: z.number().min(0).optional(),
  ch6_80eem_amount: z.number().min(0).optional(),
  ch6_80ef_amount: z.number().min(0).optional(),
  ch6_80eg_amount: z.number().min(0).optional(),
  ch6_80ega_amount: z.number().min(0).optional(),
  ch6_80egb_amount: z.number().min(0).optional(),
  ch6_80egc_amount: z.number().min(0).optional(),
  ch6_80egd_amount: z.number().min(0).optional(),
  ch6_80ege_amount: z.number().min(0).optional(),
  ch6_80f_amount: z.number().min(0).optional(),
  ch6_80qqa_amount: z.number().min(0).optional(),
  ch6_80qqb_amount: z.number().min(0).optional(),
  ch6_80qqc_amount: z.number().min(0).optional(),
  ch6_80qpb_amount: z.number().min(0).optional(),
  ch6_80ttt_amount: z.number().min(0).optional(),
  ch6_80uaa_amount: z.number().min(0).optional(),
  ch6_80uab_amount: z.number().min(0).optional(),
  ch6_total_deductions: z.number().min(0).optional(),
  ch6_taxable_income: z.number().optional(),

  // Additional fields
  adv_section_68_cash: z.number().min(0).optional(),
  adv_section_69_property: z.number().min(0).optional(),
  adv_section_69a_unexplained_investment: z.number().min(0).optional(),
  adv_section_69d_unexplained_money: z.number().min(0).optional(),
});
