// Profit and Loss Account Types for ITR-7
// For the financial year 2024-25

export interface ITR7ProfitLossAccountData {
  // 13. Gross profit transferred from Trading Account (12+12b)
  pla_gross_profit_transferred_13: number;
  
  // 14. Other Income
  pla_other_income_rent_i: number;
  pla_other_income_commission_ii: number;
  pla_other_income_dividend_income_iii: number;
  pla_other_income_interest_income_iv: number;
  pla_other_income_profit_fixed_assets_v: number;
  pla_other_income_profit_securities_stt_vi: number;
  pla_other_income_profit_other_investment_vii: number;
  pla_other_income_gain_forex_fluctuation_viii: number;
  pla_other_income_profit_conversion_inventory_capital_ix: number;
  pla_other_income_agricultural_income_x: number;
  
  // Other operating revenues (specify nature and amount)
  pla_other_income_other_a_xiia: number;
  pla_other_income_other_b_xiib: number;
  pla_other_income_other_total_xiic: number;
  
  pla_other_income_total_xii: number; // Total of other income (i + ii + iii + iv + v + vi + vii + viii + ix + x + xiic)
  
  // 15. Total of credits to profit and loss account (13+14xii)
  pla_total_credits_15: number;
  
  // 16. Freight outward
  pla_freight_outward_16: number;
  
  // 17. Consumption of stores and spare parts
  pla_consumption_stores_spare_parts_17: number;
  
  // 18. Power and fuel
  pla_power_fuel_18: number;
  
  // 19. Rents
  pla_rents_19: number;
  
  // 20. Repairs to building
  pla_repairs_building_20: number;
  
  // 21. Repairs to machinery
  pla_repairs_machinery_21: number;
  
  // 22. Compensation to employees
  pla_compensation_employees_salaries_wages_i: number;
  pla_compensation_employees_bonus_ii: number;
  pla_compensation_employees_reimbursement_medical_iii: number;
  pla_compensation_employees_leave_encashment_iv: number;
  pla_compensation_employees_leave_travel_benefits_v: number;
  pla_compensation_employees_contribution_superannuation_vi: number;
  pla_compensation_employees_contribution_provident_vii: number;
  pla_compensation_employees_contribution_gratuity_viii: number;
  pla_compensation_employees_contribution_other_fund_ix: number;
  pla_compensation_employees_other_benefit_x: number;
  pla_compensation_employees_total_xxi: number;
  
  pla_compensation_non_residents_xiia: string; // Yes/No
  pla_compensation_non_residents_amount_xiib: number;
  
  // 23. Insurance
  pla_insurance_medical_i: number;
  pla_insurance_life_ii: number;
  pla_insurance_keyman_iii: number;
  pla_insurance_other_iv: number;
  pla_insurance_total_23: number;
  
  // 24. Workmen and staff welfare expenses
  pla_workmen_staff_welfare_24: number;
  
  // 25. Entertainment
  pla_entertainment_25: number;
  
  // 26. Hospitality
  pla_hospitality_26: number;
  
  // 27. Conference
  pla_conference_27: number;
  
  // 28. Sales promotion including publicity
  pla_sales_promotion_publicity_28: number;
  
  // 29. Advertisement
  pla_advertisement_29: number;
  
  // 30. Commission
  pla_commission_outside_india_i: number;
  pla_commission_to_others_ii: number;
  pla_commission_total_xxxiii: number;
  
  // 31. Royalty
  pla_royalty_outside_india_i: number;
  pla_royalty_to_others_ii: number;
  pla_royalty_total_xxxiii: number;
  
  // 32. Professional/Consultancy fees
  pla_professional_fees_outside_india_i: number;
  pla_professional_fees_to_others_ii: number;
  pla_professional_fees_total_xxxii: number;
  
  // 33. Hotel, boarding and Lodging
  pla_hotel_boarding_lodging_33: number;
  
  // 34. Traveling expenses other than on foreign traveling
  pla_traveling_expenses_34: number;
  
  // 35. Foreign travelling expenses
  pla_foreign_travelling_expenses_35: number;
  
  // 36. Conveyance expenses
  pla_conveyance_expenses_36: number;
  
  // 37. Telephone expenses
  pla_telephone_expenses_37: number;
  
  // 38. Guest House expenses
  pla_guest_house_expenses_38: number;
  
  // 39. Club expenses
  pla_club_expenses_39: number;
  
  // 40. Festival celebration expenses
  pla_festival_celebration_expenses_40: number;
  
  // 41. Scholarship
  pla_scholarship_41: number;
  
  // 42. Gift
  pla_gift_42: number;
  
  // 43. Donation
  pla_donation_43: number;
  
  // 44. Rates and taxes, paid or payable to Government
  pla_rates_taxes_union_excise_duty_i: number;
  pla_rates_taxes_service_tax_ii: number;
  pla_rates_taxes_vat_sales_tax_iii: number;
  pla_rates_taxes_cess_iv: number;
  pla_rates_taxes_cgst_v: number;
  pla_rates_taxes_sgst_vi: number;
  pla_rates_taxes_igst_vii: number;
  pla_rates_taxes_utgst_viii: number;
  pla_rates_taxes_other_duty_tax_stt_ix: number;
  pla_rates_taxes_total_44x: number;
  
  // 45. Audit fee
  pla_audit_fee_45: number;
  
  // 46. Other expenses (specify nature and amount)
  pla_other_expenses_i: number;
  pla_other_expenses_ii: number;
  pla_other_expenses_total_46iii: number;
  
  // 47. Bad debts (specify PAN/Aadhaar No.)
  pla_bad_debts_total_47i: number;
  pla_bad_debts_others_47ii: number;
  pla_bad_debts_total_47iii: number;
  
  // 48. Provision for bad and doubtful debts
  pla_provision_bad_doubtful_debts_48: number;
  
  // 49. Other provisions
  pla_other_provisions_49: number;
  
  // 50. Profit before interest, depreciation and taxes
  pla_profit_before_interest_depreciation_taxes_50: number;
  
  // 51. Interest
  pla_interest_outside_india_i: number;
  pla_interest_to_others_ii: number;
  pla_interest_total_51iii: number;
  
  // 52. Depreciation and amortization
  pla_depreciation_amortization_52: number;
  
  // 53. Net profit before taxes (50 - 51iii - 52)
  pla_net_profit_before_taxes_53: number;
  
  // 54. Provision for current tax
  pla_provision_current_tax_54: number;
  
  // 55. Provision for Deferred Tax
  pla_provision_deferred_tax_55: number;
  
  // 56. Profit after tax (53 - 54 - 55)
  pla_profit_after_tax_56: number;
  
  // 57. Balance brought forward from previous year
  pla_balance_brought_forward_57: number;
  
  // 58. Amount available for appropriation (56 + 57)
  pla_amount_available_appropriation_58: number;
  
  // 59. Appropriations
  pla_appropriations_transfer_reserves_surplus_i: number;
  pla_appropriations_proposed_dividend_ii: number;
  pla_appropriations_tax_dividend_iii: number;
  pla_appropriations_csr_iv: number;
  pla_appropriations_other_v: number;
  pla_appropriations_total_59vi: number;
  
  // 60. Balance carried to balance sheet (58 - 59vi)
  pla_balance_carried_balance_sheet_60: number;
  
  // 61. COMPUTATION OF PRESUMPTIVE INCOME FROM GOODS CARRIAGES
  pla_presumptive_income_goods_carriage_total_61ii: number;
  
  // 62. Foreign Company
  pla_foreign_company_gross_receipts_62a: number;
  pla_foreign_company_net_profit_62b: number;
}
