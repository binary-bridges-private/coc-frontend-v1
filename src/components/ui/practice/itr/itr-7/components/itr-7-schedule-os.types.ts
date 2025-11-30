
export interface ITR7ScheduleOSData {
    scheduleOS: {
        gross_income_normal: { // 1
            dividends_gross: { // 1a
                other_dividends: number; // ai
                dividend_2_22_e: number; // aii
                dividend_2_22_f: number; // aiii
                total: number; // 1a
            };
            interest_gross: { // 1b
                savings_bank: number; // bi
                deposits: number; // bii
                income_tax_refund: number; // biii
                pass_through_income: number; // biv
                others: number; // bv
                total: number; // 1b
            };
            rental_income_machinery: number; // 1c
            income_56_2_x: { // 1d
                money_without_consideration: number; // di
                immovable_property_without_consideration: number; // dii
                immovable_property_inadequate_consideration: number; // diii
                other_property_without_consideration: number; // div
                other_property_inadequate_consideration: number; // dv
                total: number; // 1d
            };
            any_other_income: { // 1e
                details: { nature: string; amount: number }[];
                total: number;
            };
            total_gross_income: number; // 1
        };
        income_special_rates: { // 2
            winnings_lottery_115bb: number; // 2ai
            winnings_online_games_115bbj: number; // 2aii
            income_115bbe: { // 2b
                cash_credits_68: number; // bi
                unexplained_investments_69: number; // bii
                unexplained_money_69a: number; // biii
                undisclosed_investments_69b: number; // biv
                unexplained_expenditure_69c: number; // bv
                hundi_69d: number; // bvi
                total: number; // 2b
            };
            other_income_special_rate: { // 2c
                details: {
                    nature: string; // e.g., ci, cia, cii...
                    amount: number;
                }[];
                total: number; // 2c
            };
            pass_through_income_special: number; // 2d
            dtaa_income: { // 2e
                details: {
                    sl_no: number;
                    amount_income: number;
                    item_no: string;
                    country_name_code: string;
                    article_dtaa: string;
                    rate_as_per_treaty: number;
                    whether_trc_obtained: string;
                    section_it_act: string;
                    rate_as_per_it_act: number;
                    applicable_rate: number;
                }[];
                total: number; // 2e
            };
            total_special_income: number; // 2
        };
        deductions_57: { // 3
            expenses_other: number; // 3a
            depreciation: number; // 3b
            interest_expenditure_dividend: number; // 3c
            eligible_interest_expenditure: number; // 3ci
            total: number; // 3d
        };
        amounts_not_deductible_58: number; // 4
        profits_chargeable_59: number; // 5
        net_income_other_sources: number; // 6
        income_other_sources_excluding_race_horses: number; // 7
        income_race_horses: { // 8
            receipts: number; // 8a
            deductions_57: number; // 8b
            amounts_not_deductible_58: number; // 8c
            profits_chargeable_59: number; // 8d
            balance: number; // 8e
        };
        income_under_head_other_sources: number; // 9
        accrual_info: { // 10
            details: {
                s_no: number;
                other_source_income: string;
                upto_15_6: number;
                from_16_6_to_15_9: number;
                from_16_9_to_15_12: number;
                from_16_12_to_15_3: number;
                from_16_3_to_31_3: number;
            }[];
        };
    };
}
