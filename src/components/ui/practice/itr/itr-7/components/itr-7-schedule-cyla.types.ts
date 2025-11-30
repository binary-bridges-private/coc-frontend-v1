
export interface ITR7ScheduleCYLAData {
    scheduleCYLA: {
        loss_to_be_set_off: {
            house_property_loss: number; // 3 of Schedule HP
            business_loss: number; // A38 of Schedule BP
            other_sources_loss: number; // 6 of Schedule OS
        };
        current_year_income: {
            house_property: {
                income_current_year: number; // 1
                hp_loss_set_off: number; // 2
                business_loss_set_off: number; // 3
                os_loss_set_off: number; // 4
                current_year_income_remaining: number; // 5
            };
            business_excluding_speculation: {
                income_current_year: number;
                hp_loss_set_off: number;
                business_loss_set_off: number;
                os_loss_set_off: number;
                current_year_income_remaining: number;
            };
            speculation_income: {
                income_current_year: number;
                hp_loss_set_off: number;
                business_loss_set_off: number;
                os_loss_set_off: number;
                current_year_income_remaining: number;
            };
            specified_business_income: {
                income_current_year: number;
                hp_loss_set_off: number;
                business_loss_set_off: number;
                os_loss_set_off: number;
                current_year_income_remaining: number;
            };
            stcg_15: {
                income_current_year: number;
                hp_loss_set_off: number;
                business_loss_set_off: number;
                os_loss_set_off: number;
                current_year_income_remaining: number;
            };
            stcg_20: {
                income_current_year: number;
                hp_loss_set_off: number;
                business_loss_set_off: number;
                os_loss_set_off: number;
                current_year_income_remaining: number;
            };
            stcg_30: {
                income_current_year: number;
                hp_loss_set_off: number;
                business_loss_set_off: number;
                os_loss_set_off: number;
                current_year_income_remaining: number;
            };
            stcg_applicable: {
                income_current_year: number;
                hp_loss_set_off: number;
                business_loss_set_off: number;
                os_loss_set_off: number;
                current_year_income_remaining: number;
            };
            stcg_special_dtaa: {
                income_current_year: number;
                hp_loss_set_off: number;
                business_loss_set_off: number;
                os_loss_set_off: number;
                current_year_income_remaining: number;
            };
            ltcg_10: {
                income_current_year: number;
                hp_loss_set_off: number;
                business_loss_set_off: number;
                os_loss_set_off: number;
                current_year_income_remaining: number;
            };
            ltcg_12_5: {
                income_current_year: number;
                hp_loss_set_off: number;
                business_loss_set_off: number;
                os_loss_set_off: number;
                current_year_income_remaining: number;
            };
            ltcg_20: {
                income_current_year: number;
                hp_loss_set_off: number;
                business_loss_set_off: number;
                os_loss_set_off: number;
                current_year_income_remaining: number;
            };
            ltcg_special_dtaa: {
                income_current_year: number;
                hp_loss_set_off: number;
                business_loss_set_off: number;
                os_loss_set_off: number;
                current_year_income_remaining: number;
            };
            os_normal: {
                income_current_year: number;
                hp_loss_set_off: number;
                business_loss_set_off: number;
                os_loss_set_off: number;
                current_year_income_remaining: number;
            };
            race_horses: {
                income_current_year: number;
                hp_loss_set_off: number;
                business_loss_set_off: number;
                os_loss_set_off: number;
                current_year_income_remaining: number;
            };
            os_special_dtaa: {
                income_current_year: number;
                hp_loss_set_off: number;
                business_loss_set_off: number;
                os_loss_set_off: number;
                current_year_income_remaining: number;
            };
        };
        total_loss_set_off: {
            hp_loss_set_off: number;
            business_loss_set_off: number;
            os_loss_set_off: number;
        };
        loss_remaining_after_set_off: {
            house_property_loss: number;
            business_loss: number;
            other_sources_loss: number;
        };
    };
}
