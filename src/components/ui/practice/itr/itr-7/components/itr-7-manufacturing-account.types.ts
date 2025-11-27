
export interface ITR7ManufacturingAccountData {
  // 1. Debits to Manufacturing Account
  
  // A. Opening Inventory
  ma_opening_raw_material_i: number;
  ma_opening_work_in_progress_ii: number;
  ma_opening_inventory_total_iii: number; // Total (i + ii)
  
  // B. Purchases (net of refunds and duty or tax, if any)
  ma_purchases_net_b: number;
  
  // C. Direct wages
  ma_direct_wages_c: number;
  
  // D. Direct expenses (Di + Dii + Diii)
  ma_direct_expenses_carriage_inward_i: number;
  ma_direct_expenses_power_fuel_ii: number;
  ma_direct_expenses_other_iii: number;
  ma_direct_expenses_total_d: number; // Total (Di + Dii + Diii)
  
  // E. Factory Overheads
  ma_factory_overheads_indirect_wages_i: number;
  ma_factory_overheads_factory_rent_rates_ii: number;
  ma_factory_overheads_factory_insurance_iii: number;
  ma_factory_overheads_factory_fuel_power_iv: number;
  ma_factory_overheads_factory_general_expenses_v: number;
  ma_factory_overheads_depreciation_machinery_vi: number;
  ma_factory_overheads_total_evii: number; // Total (F+ii+iii+iv+v+vi)
  
  // F. Total of Debits to Manufacturing Account (Aiii+B+C+D+Evii)
  ma_total_debits_1f: number;
  
  // 2. Closing Stock
  ma_closing_raw_material_2i: number;
  ma_closing_work_in_progress_2ii: number;
  ma_closing_stock_total_2: number; // Total (2i + 2ii)
  
  // 3. Cost of Goods Produced - transferred to Trading Account (1F - 2)
  ma_cost_of_goods_produced_3: number;
}
