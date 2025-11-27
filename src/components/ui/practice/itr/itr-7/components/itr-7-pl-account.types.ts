// ITR-7: Profit and Loss Account (Ind-AS) for Financial Year 2024-25
// Comprehensive P&L Account with detailed expense categories, provisions, and OCI items

export interface ITR7PLAccountData {
  // Row 13: Gross profit transferred from Trading Account
  gross_profit_transferred: number;
  
  // Row 14: Other Income
  // i. Rent
  other_income_rent: number;
  // ii. Commission
  other_income_commission: number;
  // iii. Dividend income
  other_income_dividend: number;
  // iv. Interest income
  other_income_interest: number;
  // v. Profit on sale of fixed assets
  other_income_profit_fixed_assets: number;
  // vi. Profit on sale of investment being securities chargeable to Securities Transaction Tax (STT)
  other_income_profit_sale_investment: number;
  // vii. Profit on sale of other investment
  other_income_profit_other_investment: number;
  // viii. Gain (loss) on account of foreign exchange fluctuation in's 43AA / Fair Market Value of inventory as on the date of conversion
  other_income_forex_gain_loss: number;
  // ix. Agricultural income
  other_income_agricultural: number;
  // x. Any other income (specify nature and amount)
  other_income_any_other_a: number;
  other_income_any_other_b: number;
  // xic: Total (xia + xib)
  other_income_total: number;
  
  // Row 15: Total of credits to profit and loss account (13+14xii)
  total_credits_pl_account: number;
  
  // Row 16: Freight outward
  freight_outward: number;
  
  // Row 17: Consumption of stores and spare parts
  consumption_stores_spare_parts: number;
  
  // Row 18: Power and fuel
  power_and_fuel: number;
  
  // Row 19: Rents
  rents: number;
  
  // Row 20: Repairs to building
  repairs_building: number;
  
  // Row 21: Repairs to machinery
  repairs_machinery: number;
  
  // Row 22: Compensation to employees
  // i. Salaries and wages (22i)
  compensation_salaries_wages: number;
  // ii. Bonus
  compensation_bonus: number;
  // iii. Reimbursement of medical expenses
  compensation_medical_reimbursement: number;
  // iv. Leave encashment
  compensation_leave_encashment: number;
  // v. Leave travel benefits
  compensation_leave_travel_benefits: number;
  // vi. Contribution to approved superannuation fund
  compensation_superannuation: number;
  // vii. Contribution to recognised provident fund
  compensation_provident_fund: number;
  // viii. Contribution to recognised gratuity fund
  compensation_gratuity_fund: number;
  // ix. Contribution to any other fund
  compensation_other_fund: number;
  // x. Any other benefit to employees in respect of which an expenditure has been incurred
  compensation_other_benefits: number;
  // xi. Total compensation to employees (total of 22i to 22x)
  compensation_total: number;
  // xii. Whether any compensation, included in 22i, 22ii paid to non-residents / Whether any amount paid to non-residents (Yes/No)
  compensation_paid_non_residents: string;
  
  // Row 23: Insurance
  // i. Medical Insurance
  insurance_medical: number;
  // ii. Life Insurance
  insurance_life: number;
  // iii. Keyman's Insurance
  insurance_keyman: number;
  // iv. Other insurance including factory, office, car, goods, etc.
  insurance_other: number;
  // v. Total expenditure on insurance (23i + 23ii + 23iii + 23iv)
  insurance_total: number;
  
  // Row 24: Workmen and staff welfare expenses
  workmen_staff_welfare: number;
  
  // Row 25: Entertainment
  entertainment: number;
  
  // Row 26: Hospitality
  hospitality: number;
  
  // Row 27: Conference
  conference: number;
  
  // Row 28: Sales promotion including publicity (other than advertisement)
  sales_promotion: number;
  
  // Row 29: Advertisement
  advertisement: number;
  
  // Row 30: Commission
  // i. Paid outside India, or paid in India to a non-resident other than a company or a foreign company
  commission_outside_india: number;
  // ii. To others
  commission_to_others: number;
  // iii. Total (i + ii)
  commission_total: number;
  
  // Row 31: Royalty
  // i. Paid outside India, or paid in India to a non-resident other than a company or a foreign company
  royalty_outside_india: number;
  // ii. To others
  royalty_to_others: number;
  // iii. Total (i + ii)
  royalty_total: number;
  
  // Row 32: Professional/Consultancy fees/Fee for technical services
  // i. Paid outside India, or paid in India to a non-resident other than a company or a foreign company
  professional_fees_outside_india: number;
  // ii. To others
  professional_fees_to_others: number;
  // iii. Total (i + ii)
  professional_fees_total: number;
  
  // Row 33: Hotel, boarding and Lodging
  hotel_boarding_lodging: number;
  
  // Row 34: Traveling expenses other than on foreign traveling
  traveling_expenses_domestic: number;
  
  // Row 35: Foreign travelling expenses
  foreign_travelling_expenses: number;
  
  // Row 36: Conveyance expenses
  conveyance_expenses: number;
  
  // Row 37: Telephone expenses
  telephone_expenses: number;
  
  // Row 38: Guest House expenses
  guest_house_expenses: number;
  
  // Row 39: Club expenses
  club_expenses: number;
  
  // Row 40: Festival celebration expenses
  festival_celebration_expenses: number;
  
  // Row 41: Scholarship
  scholarship: number;
  
  // Row 42: Gift
  gift: number;
  
  // Row 43: Donation
  donation: number;
  
  // Row 44: Rates and taxes, paid or payable to Government or any local body (excluding taxes on income)
  // i. Union excise duty
  rates_taxes_excise: number;
  // ii. Service tax
  rates_taxes_service: number;
  // iii. VAT/Sales tax
  rates_taxes_vat: number;
  // iv. Cess
  rates_taxes_cess: number;
  // v. Central Goods & Service Tax (CGST)
  rates_taxes_cgst: number;
  // vi. State Goods & Services Tax (SGST)
  rates_taxes_sgst: number;
  // vii. Integrated Goods & Services Tax (IGST)
  rates_taxes_igst: number;
  // viii. Union Territory Goods & Services Tax (UTGST)
  rates_taxes_utgst: number;
  // ix. Any other rate, tax, duty or cess not STT and E-TT
  rates_taxes_other: number;
  // x. Total rates and taxes paid or payable (44i + 44ii + 44iii + 44iv + 44v + 44vi + 44vii + 44viii + 44ix)
  rates_taxes_total: number;
  
  // Row 45: Audit fee
  audit_fee: number;
  
  // Row 46: Other expenses (specify nature and amount)
  // i
  other_expenses_a: number;
  // ii
  other_expenses_b: number;
  // iii. Total (i + ii)
  other_expenses_total: number;
  
  // Row 47: Bad debts (specify PAN/Aadhaar No. of the person, if available, for whom Bad Debt for amount of Rs. lakhs or more is claimed and amount)
  // i(1), i(2), i(3) = total of bad debts for three entries
  bad_debts_47i: number;
  // ii. Others (more than Rs. 1 lakh) where PAN/Aadhaar No. is not available
  bad_debts_47ii: number;
  // iii. Others (amounts less than Rs. 1 lakh)
  bad_debts_47iii: number;
  // iv. Total Bad Debt (47i + 47ii + 47iii)
  bad_debts_total: number;
  
  // Row 48: Provision for bad and doubtful debts
  provision_bad_doubtful_debts: number;
  
  // Row 49: Other provisions
  other_provisions: number;
  
  // Row 50: Profit before interest, depreciation and taxes (15 – 16 to 21 + 22xi + 23 + 24 to 29 + 30iii + 31iii + 32iii + 33 to 43 + 44x + 45 + 46iii + 47iv + 48 + 49)
  profit_before_interest_depreciation_taxes: number;
  
  // Row 51: Interest
  // i. Paid outside India, or paid in India to a non-resident other than a company or a foreign company
  interest_outside_india: number;
  // ii. To others
  interest_to_others: number;
  // iii. Total (i + ii)
  interest_total: number;
  
  // Row 52: Depreciation and amortisation
  depreciation_amortisation: number;
  
  // Row 53: Net profit before taxes (50 – 51iii – 52)
  net_profit_before_taxes: number;
  
  // Row 54: Provision for current tax
  provision_current_tax: number;
  
  // Row 55: Provision for Deferred Tax
  provision_deferred_tax: number;
  
  // Row 56: Profit after tax (53 - 54 - 55)
  profit_after_tax: number;
  
  // Row 57: Balance brought forward from previous year
  balance_brought_forward: number;
  
  // Row 58: Amount available for appropriation (56 + 57)
  amount_available_appropriation: number;
  
  // APPROPRIATIONS SECTION
  // Row 59: Appropriations
  // i. Transfer to reserves and surplus (59i)
  appropriation_reserves_surplus: number;
  // ii. Proposed dividend/Interim dividend (59ii)
  appropriation_dividend: number;
  // iii. Tax on dividend/Tax on dividend for earlier years (59iii)
  appropriation_tax_dividend: number;
  // iv. Appropriation towards Corporate Social Responsibility (CSR) activities (in case of companies covered under section 135 of Companies Act, 2013) (59iv)
  appropriation_csr: number;
  // v. Any other appropriation (59v)
  appropriation_other: number;
  // vi. Total (59i + 59ii + 59iii + 59iv + 59v)
  appropriation_total: number;
  
  // Row 60: Balance carried to balance sheet (58 – 59vi)
  balance_carried_to_bs: number;
  
  // Row 61: Items that will not be reclassified to P&L
  // A. Items that will not be reclassified to P&L
  // i. Changes in revaluation surplus
  oci_not_reclassified_revaluation: number;
  // ii. Re-measurements of the defined benefit plans
  oci_not_reclassified_defined_benefit: number;
  // iii. Equity instruments through OCI
  oci_not_reclassified_equity_instruments: number;
  
  // Row 61: Items that will be reclassified to P&L
  // B. Items that will be reclassified to P&L
  // i. Exchange differences in translating the financial statements of a foreign operation
  oci_reclassified_exchange_differences: number;
  // ii. Debt instruments through OCI
  oci_reclassified_debt_instruments: number;
  // iii. The effective portion of gain or loss on hedging instruments in a cash flow hedge
  oci_reclassified_cash_flow_hedge: number;
  // iv. Share of OCI in associates and joint ventures, to the extent not to be classified into P&L
  oci_reclassified_associates_jv: number;
  // v. Others (Specify nature)
  oci_reclassified_others: number;
  // vi. Income tax relating to items that will be reclassified to P&L
  oci_reclassified_income_tax: number;
  // vii. total
  oci_reclassified_total: number;
  
  // Row 62: Total Comprehensive Income (56 + 61A + 61B)
  total_comprehensive_income: number;
}
