
export interface ITR7ScheduleDPMData {
    plant_machinery: {
        rate_15: DPMColumn;
        rate_30: DPMColumn;
        rate_40: DPMColumn;
        rate_45: DPMColumn;
    };
}

export interface DPMColumn {
    wdv_first_day_previous_year?: number; // 3
    additions_180_days_or_more?: number; // 4
    consideration_realization_out_of_3_or_4?: number; // 5
    amount_depreciation_full_rate?: number; // 6
    additions_less_than_180_days?: number; // 7
    consideration_realization_out_of_7?: number; // 8
    amount_depreciation_half_rate?: number; // 9
    depreciation_full_rate?: number; // 10
    depreciation_half_rate?: number; // 11
    additional_depreciation_on_4?: number; // 12
    additional_depreciation_on_7?: number; // 13
    additional_depreciation_preceding_year?: number; // 14
    total_depreciation?: number; // 15
    depreciation_disallowed_sec_38_2?: number; // 16
    net_aggregate_depreciation?: number; // 17
    proportionate_aggregate_depreciation?: number; // 18
    expenditure_transfer_asset?: number; // 19
    capital_gains_loss_sec_50?: number; // 20
    wdv_last_day_previous_year?: number; // 21
}
