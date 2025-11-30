
export interface ITR7ScheduleCGData {
    stcg: {
        land_building: {
            date_purchase?: string; // DD/MM/YYYY
            date_sale?: string; // DD/MM/YYYY
            full_value_consideration?: number; // ai
            value_property_stamp_authority?: number; // aii
            full_value_consideration_adopted?: number; // aiii
            deductions_sec_48: {
                cost_acquisition?: number; // bi
                cost_improvement?: number; // bii
                expenditure_transfer?: number; // biii
                total?: number; // biv
            };
            balance?: number; // 1c
            deduction_sec_54?: number; // 1d
            stcg_immovable_property?: number; // 1e
            buyer_details?: {
                name?: string;
                pan_aadhaar?: string;
                percentage_share?: number;
                amount?: number;
                address?: string;
                pin_code?: string;
                state?: string;
            }[];
        }[];
        slump_sale: {
            fair_market_value_11uae2?: number; // 2ai
            fair_market_value_11uae3?: number; // 2aii
            full_value_consideration?: number; // 2aiii
            net_worth?: number; // 2b
            stcg_slump_sale?: number; // 2c
        };
        equity_shares_units_stt: {
            full_value_consideration?: number; // 3a
            deductions_sec_48: {
                cost_acquisition?: number; // bi
                cost_improvement?: number; // bii
                expenditure_transfer?: number; // biii
                total?: number; // biv
            };
            balance?: number; // 3c
            loss_disallowed_94_7_8?: number; // 3d
            stcg_equity_shares?: number; // 3e
        };
        non_resident_shares: {
            stcg_111a?: number; // 4a
            stcg_other_shares?: number; // 4b
        };
        non_resident_fii_securities: {
            full_value_consideration_quoted?: number; // 5ai
            fair_market_value_unquoted?: number; // 5aib
            full_value_consideration_unquoted?: number; // 5aic
            full_value_consideration_other?: number; // 5aii
            total_consideration?: number; // 5aiii
            deductions_sec_48: {
                cost_acquisition?: number; // bi
                cost_improvement?: number; // bii
                expenditure_transfer?: number; // biii
                total?: number; // biv
            };
            balance?: number; // 5c
            loss_disallowed_94_7_8?: number; // 5d
            stcg_securities_fii?: number; // 5e
        };
        other_assets: {
            full_value_consideration_unquoted?: number; // 6aia
            fair_market_value_unquoted?: number; // 6aib
            full_value_consideration_adopted?: number; // 6aic
            full_value_consideration_other?: number; // 6aii
            total_consideration?: number; // 6aiii
            deductions_sec_48: {
                cost_acquisition?: number; // bi
                cost_improvement?: number; // bii
                expenditure_transfer?: number; // biii
                total?: number; // biv
            };
            balance?: number; // 6c
            loss_disallowed_94_7_8?: number; // 6d
            deemed_stcg_depreciable?: number; // 6e
            deduction_sec_54?: number; // 6f
            stcg_other_assets?: number; // 6g
        };
        amount_deemed_stcg: {
            unutilized_capital_gain?: {
                year?: string;
                section?: string;
                amount_not_used?: number;
            }[];
            amount_deemed_stcg_other?: number; // 7b
        };
        pass_through_income: {
            stcg_15_percent?: number; // 8ai
            stcg_20_percent?: number; // 8aii
            stcg_30_percent?: number; // 8b
            stcg_applicable_rate?: number; // 8c
        };
        stcg_not_chargeable_dta: {
            total_stcg_not_chargeable?: number; // 9a
            total_stcg_chargeable_special_rates?: number; // 9b
        };
        buy_back_shares?: number; // A(A)
        total_stcg?: number; // 10
    };
    ltcg: {
        land_building: {
            date_purchase?: string; // DD/MM/YYYY
            date_sale?: string; // DD/MM/YYYY
            full_value_consideration?: number; // 1ai
            value_property_stamp_authority?: number; // 1aii
            full_value_consideration_adopted?: number; // 1aiii
            deductions_sec_48: {
                cost_acquisition?: number; // bi
                cost_acquisition_indexation?: number; // biia
                cost_improvement?: number; // biib
                cost_improvement_indexation?: number; // biib(a)
                expenditure_transfer?: number; // biii
                total?: number; // biv
            };
            balance?: number; // 1c
            deduction_sec_54?: number; // 1d
            ltcg_immovable_property?: number; // 1e
            buyer_details?: {
                name?: string;
                pan_aadhaar?: string;
                percentage_share?: number;
                amount?: number;
                address?: string;
                pin_code?: string;
                state?: string;
            }[];
        }[];
        slump_sale: {
            fair_market_value_11uae2?: number; // 2ai
            fair_market_value_11uae3?: number; // 2aii
            full_value_consideration?: number; // 2aiii
            net_worth?: number; // 2b
            balance?: number; // 2c
            deduction_sec_54ec?: number; // 2d
            ltcg_slump_sale?: number; // 2e
        };
        unlisted_bonds: {
            full_value_consideration?: number; // 3a
            deductions_sec_48: {
                cost_acquisition?: number; // bi
                cost_improvement?: number; // bii
                expenditure_transfer?: number; // biii
                total?: number; // biv
            };
            ltcg_bonds?: number; // 3c
        };
        listed_securities: {
            full_value_consideration?: number; // 4a
            deductions_sec_48: {
                cost_acquisition?: number; // bi
                cost_acquisition_grandfathered?: number; // bia
                cost_improvement?: number; // bii
                cost_improvement_grandfathered?: number; // biia
                expenditure_transfer?: number; // biii
                total?: number; // biv
                total_grandfathered?: number; // biva
            };
            ltcg_securities_before_23_july?: number; // 4c
            ltcg_securities_after_23_july?: number; // 4ca
        };
        other_assets: {
            full_value_consideration?: number; // 5a
            deductions_sec_48: {
                cost_acquisition?: number; // bi
                cost_improvement?: number; // bii
                expenditure_transfer?: number; // biii
                total?: number; // biv
            };
            balance?: number; // 5c
            loss_disallowed_94_7_8?: number; // 5d
            ltcg_other_assets?: number; // 5e
        };
        amount_deemed_ltcg: {
            unutilized_capital_gain?: {
                year?: string;
                section?: string;
                amount_not_used?: number;
            }[];
            amount_deemed_ltcg_other?: number; // 6b
        };
        pass_through_income: {
            ltcg_10_percent?: number; // 7a
            ltcg_20_percent?: number; // 7b
            ltcg_applicable_rate?: number; // 7c
        };
        ltcg_not_chargeable_dta: {
            total_ltcg_not_chargeable?: number; // 8a
            total_ltcg_chargeable_special_rates?: number; // 8b
        };
        total_ltcg?: number; // 9
    };
    set_off_losses: {
        gain_current_year?: number;
        stcg_loss_15?: number;
        stcg_loss_20?: number;
        stcg_loss_30?: number;
        stcg_loss_applicable?: number;
        stcg_loss_dtaa?: number;
        ltcg_loss_10?: number;
        ltcg_loss_12_5?: number;
        ltcg_loss_20?: number;
        ltcg_loss_dtaa?: number;
        gain_remaining?: number;
    }[];
    accrual_info: {
        upto_15_6?: number;
        upto_15_9?: number;
        upto_15_12?: number;
        upto_15_3?: number;
        upto_31_3?: number;
    }[];
}
