// ITR-7: Income Statement (Ind-AS) for Financial Year 2024-25
// Trading Account for companies with Ind-AS compliant financial statements

export interface ITR7IncomeStatementData {
  // A. Revenue from Operations Section
  // I. Sales/Gross receipts of business (net of returns and refunds and duty or tax, if any)
  sale_of_goods: number;
  sale_of_services: number;
  other_operating_revenues_a: number;
  other_operating_revenues_b: number;
  other_operating_revenues_total: number; // iiic: Total (iiia + iiib)
  
  // IV. Total (I + II + IIIc)
  total_gross_receipts_from_business: number; // IVi (row A)
  
  // B. Gross receipts from Profession
  gross_receipts_from_profession: number;
  
  // C. Duties, taxes and cess received or receivable in respect of goods and services sold or supplied
  union_excise_duties: number;
  service_tax: number;
  vat_sales_tax: number;
  central_goods_service_tax_cgst: number;
  state_goods_services_tax_sgst: number;
  integrated_goods_services_tax_igst: number;
  union_territory_goods_services_tax_utgst: number;
  any_other_duty_tax_and_cess: number;
  total_duties_taxes_cess: number; // Cix: Total (i+ii+iii+iv+v+vi+vii+viii)
  
  // D. Total Revenue from operations (Aic + B + C)
  total_revenue_from_operations: number;
  
  // 5. Closing Stock of Finished Goods
  closing_stock_finished_goods: number;
  
  // 6. Total of credits to Trading Account (4D + 5)
  total_credits_trading_account: number;
  
  // 7. Opening Stock of Finished Goods
  opening_stock_finished_goods: number;
  
  // 8. Purchases (net of refunds and duty or tax, if any)
  purchases_net: number;
  
  // 9. Direct Expenses
  // i. Carriage inward
  carriage_inward: number;
  // ii. Power and fuel
  power_and_fuel: number;
  // iii. Other direct expenses (Note: Row can be added as per the nature of Direct Expenses)
  other_direct_expenses_iii: number;
  
  // 10. Duties and taxes, paid or payable, in respect of goods and services purchased
  // i. Custom duty
  custom_duty_purchased: number;
  // ii. Counter vailing duty
  counter_vailing_duty: number;
  // iii. Special additional duty
  special_additional_duty: number;
  // iv. Union excise duty
  union_excise_duty_purchased: number;
  // v. Service tax
  service_tax_purchased: number;
  // vi. VAT/Sales tax
  vat_sales_tax_purchased: number;
  // vii. Central Goods & Service Tax (CGST)
  cgst_purchased: number;
  // viii. State Goods & Services Tax (SGST)
  sgst_purchased: number;
  // ix. Integrated Goods & Services Tax (IGST)
  igst_purchased: number;
  // x. Union Territory Goods & Services Tax (UTGST)
  utgst_purchased: number;
  // xi. Any other tax, paid or payable
  any_other_tax_purchased: number;
  // xii. Total (10i + 10ii + 10iii + 10iv + 10v + 10vi + 10vii + 10viii + 10ix + 10x + 10xi)
  total_duties_taxes_purchased: number;
  
  // 11. Cost of goods produced - Transferred from Manufacturing Account
  cost_of_goods_produced_manufacturing: number;
  
  // 12. Gross Profit from Business/Profession - transferred to Profit and Loss account (6-7-8-9-10a-11)
  gross_profit_business_profession: number;
  
  // 12a. Turnover from Intraday Trading
  turnover_intraday_trading: number;
  
  // 12b. Income from Intraday Trading - transferred to Profit and Loss account
  income_from_intraday_trading: number;
}
