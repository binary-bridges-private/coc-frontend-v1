
export interface ITR7ScheduleICDSData {
    scheduleICDS: {
        accounting_policies: { increase: number; decrease: number; net_effect: number };
        valuation_of_inventories: { increase: number; decrease: number; net_effect: number };
        construction_contracts: { increase: number; decrease: number; net_effect: number };
        revenue_recognition: { increase: number; decrease: number; net_effect: number };
        tangible_fixed_assets: { increase: number; decrease: number; net_effect: number };
        changes_in_forex_rates: { increase: number; decrease: number; net_effect: number };
        government_grants: { increase: number; decrease: number; net_effect: number };
        securities: { increase: number; decrease: number; net_effect: number };
        borrowing_costs: { increase: number; decrease: number; net_effect: number };
        provisions_contingent_liabilities: { increase: number; decrease: number; net_effect: number };
        total_effect: { increase: number; decrease: number; net_effect: number };
    };
}
