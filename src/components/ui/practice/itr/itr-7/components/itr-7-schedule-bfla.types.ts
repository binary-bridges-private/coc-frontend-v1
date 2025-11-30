
export interface ITR7ScheduleBFLAData {
    scheduleBFLA: {
        details: {
            house_property: {
                income_after_cyla: number; // 1
                bf_loss_set_off: number; // 2
                current_year_income_remaining: number; // 5
            };
            business_excluding_speculation: {
                income_after_cyla: number;
                bf_loss_set_off: number;
                bf_depreciation_set_off: number; // 3
                current_year_income_remaining: number;
            };
            life_insurance_business: {
                income_after_cyla: number;
                bf_loss_set_off: number;
                current_year_income_remaining: number;
            };
            speculation_income: {
                income_after_cyla: number;
                bf_loss_set_off: number;
                current_year_income_remaining: number;
            };
            specified_business_income: {
                income_after_cyla: number;
                bf_loss_set_off: number;
                current_year_income_remaining: number;
            };
            stcg_15: {
                income_after_cyla: number;
                bf_loss_set_off: number;
                current_year_income_remaining: number;
            };
            stcg_20: {
                income_after_cyla: number;
                bf_loss_set_off: number;
                current_year_income_remaining: number;
            };
            stcg_30: {
                income_after_cyla: number;
                bf_loss_set_off: number;
                current_year_income_remaining: number;
            };
            stcg_applicable: {
                income_after_cyla: number;
                bf_loss_set_off: number;
                current_year_income_remaining: number;
            };
            stcg_special_dtaa: {
                income_after_cyla: number;
                bf_loss_set_off: number;
                current_year_income_remaining: number;
            };
            ltcg_10: {
                income_after_cyla: number;
                bf_loss_set_off: number;
                current_year_income_remaining: number;
            };
            ltcg_12_5: {
                income_after_cyla: number;
                bf_loss_set_off: number;
                current_year_income_remaining: number;
            };
            ltcg_20: {
                income_after_cyla: number;
                bf_loss_set_off: number;
                current_year_income_remaining: number;
            };
            ltcg_special_dtaa: {
                income_after_cyla: number;
                bf_loss_set_off: number;
                current_year_income_remaining: number;
            };
            os_normal: {
                income_after_cyla: number;
                bf_allowance_35_4_set_off: number; // 4
                current_year_income_remaining: number;
            };
            race_horses: {
                income_after_cyla: number;
                bf_loss_set_off: number;
                current_year_income_remaining: number;
            };
            os_special_dtaa: {
                income_after_cyla: number;
                current_year_income_remaining: number;
            };
        };
        total_bf_loss_set_off: number; // xvi
        total_current_year_income_remaining: number; // xvii
    };
}
