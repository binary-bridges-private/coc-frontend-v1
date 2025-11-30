
export interface ITR7Schedule115ADData {
    schedule115ad: {
        details: {
            share_acquired_date?: string; // Col 1a
            share_transferred_date?: string; // Col 1b
            isin_code?: string; // Col 2
            name_share_unit?: string; // Col 3
            no_of_shares?: number; // Col 4
            sale_price_per_share?: number; // Col 5
            full_value_consideration?: number; // Col 6
            cost_acquisition_without_indexation?: number; // Col 7
            cost_acquisition?: number; // Col 8
            lower_of_11_and_6?: number; // Col 9
            fair_market_value_per_share?: number; // Col 10
            total_fair_market_value?: number; // Col 11
            expenditure_transfer?: number; // Col 12
            total_deductions?: number; // Col 13
            balance?: number; // Col 14
        }[];
        total_transfer_before_23_july?: number; // i
        total_transfer_after_23_july?: number; // ii
        total_ltcg_115ad?: number; // iii
    };
}
