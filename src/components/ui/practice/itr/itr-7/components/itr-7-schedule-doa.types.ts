
export interface ITR7ScheduleDOAData {
    other_assets: {
        land: DOAColumn;
        building_5: DOAColumn;
        building_10: DOAColumn;
        building_40: DOAColumn;
        furniture_10: DOAColumn;
        intangible_25: DOAColumn;
        ships_20: DOAColumn;
    };
}

export interface DOAColumn {
    wdv_first_day_previous_year?: number; // 3
    additions_180_days_or_more?: number; // 4
    consideration_realization_out_of_3_or_4?: number; // 5
    amount_depreciation_full_rate?: number; // 6
    additions_less_than_180_days?: number; // 7
    consideration_realization_out_of_7?: number; // 8
    amount_depreciation_half_rate?: number; // 9
    depreciation_full_rate?: number; // 10
    depreciation_half_rate?: number; // 11
    total_depreciation?: number; // 12
    depreciation_disallowed_sec_38_2?: number; // 13
    net_aggregate_depreciation?: number; // 14
    proportionate_aggregate_depreciation?: number; // 15
    expenditure_transfer_asset?: number; // 16
    capital_gains_loss_sec_50?: number; // 17
    wdv_last_day_previous_year?: number; // 18
}
