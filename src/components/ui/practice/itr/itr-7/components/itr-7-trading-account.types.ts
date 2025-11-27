// Trading Account Types for ITR-7
// For the financial year 2024-25

export interface ITR7TradingAccountData {
  // 4. Revenue from operations
  
  // A. Sales/Gross receipts of business (net of returns and refunds and duty or tax, if any)
  ta_sales_gross_receipts_sale_of_goods_i: number;
  ta_sales_gross_receipts_sale_of_services_ii: number;
  
  // Other operating revenues (specify nature and amount)
  ta_other_operating_revenues_a_iiia: number;
  ta_other_operating_revenues_b_iiib: number;
  ta_other_operating_revenues_c_total_iiic: number; // Total (iiia + iiib)
  
  ta_sales_gross_receipts_total_aiv: number; // Total (i + ii + iiic)
  
  // B. Gross receipts from Profession
  ta_gross_receipts_profession_b: number;
  
  // C. Duties, taxes and cess received or receivable in respect of goods and services sold or supplied
  ta_duties_union_excise_duties_i: number;
  ta_duties_service_tax_ii: number;
  ta_duties_vat_sales_tax_iii: number;
  ta_duties_cgst_iv: number;
  ta_duties_sgst_v: number;
  ta_duties_igst_vi: number;
  ta_duties_utgst_vii: number;
  ta_duties_other_duty_tax_cess_viii: number;
  ta_duties_taxes_cess_total_cix: number; // Total (i + ii + iii + iv + v + vi + vii + viii)
  
  // D. Total Revenue from operations (Aiv + B + Cix)
  ta_total_revenue_operations_4d: number;
  
  // 5. Closing Stock of Finished Goods
  ta_closing_stock_finished_goods_5: number;
}
