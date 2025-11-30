
export interface ITR7ScheduleBPData {
    business_profession_other_than_speculative_specified: {
        profit_before_tax?: number;
        net_profit_loss_speculative_included?: number;
        net_profit_loss_specified_included?: number;
        income_credited_pl_other_heads: {
            house_property?: number;
            capital_gains?: number;
            other_sources?: number;
            dividend_income?: number;
            other_than_dividend?: number;
            u_s_115bbf?: number;
            u_s_115bbg?: number;
            u_s_115bbh?: number;
        };
        profit_included_referred_sections?: number;
        profit_life_insurance_business?: number;
        profit_activities_rule_7_8?: number;
        profit_selling_raw_diamonds?: number;
        exempt_income_credited_pl: {
            share_from_firm?: number;
            share_from_aop_boi?: number;
            other_exempt_income?: {
                i: { nature: string; amount: number };
                ii: { nature: string; amount: number };
                total: number;
            };
            total_exempt_income?: number;
        };
        balance_after_adjustments?: number;
        expenses_debited_pl_other_heads: {
            house_property?: number;
            capital_gains?: number;
            other_sources?: number;
            u_s_115bbf?: number;
            u_s_115bbg?: number;
            u_s_115bbh?: number;
        };
        expenses_related_exempt_income?: number;
        expenses_related_exempt_income_disallowed_14a?: number;
        total_expenses_other_heads?: number;
        adjusted_profit_loss?: number;
        depreciation_debited_pl?: number;
        depreciation_allowable_it_act: {
            section_32_1_ii_iia?: number;
            section_32_1_i?: number;
            total?: number;
        };
        profit_loss_after_depreciation_adjustment?: number;
        amounts_debited_pl_disallowable: {
            section_36?: number;
            section_37?: number;
            section_40?: number;
            section_40a?: number;
            section_43b?: number;
        };
        interest_disallowable_msme?: number;
        deemed_income_section_41?: number;
        deemed_income_section_32ac_etc?: number;
        deemed_income_section_43ca?: number;
        any_other_item_addition_28_to_44db?: number;
        any_other_income_not_included_pl?: number;
        increase_profit_icds?: number;
        total_additions?: number;
        deductions_allowable: {
            section_32_1_iii?: number;
            section_32ac?: number;
            section_35_35ccc_35ccd_excess?: number;
            section_40_preceding_year?: number;
            section_43b_preceding_year?: number;
            any_other_amount?: number;
            decrease_profit_icds?: number;
            total_deductions?: number;
        };
        income_business_profession?: number;
        profits_gains_deemed_under_sections: {
            section_44ae?: number;
            section_44b?: number;
            section_44bb?: number;
            section_44bba?: number;
            section_44bbb?: number;
            section_44bbc?: number;
            section_44d?: number;
            section_44da?: number;
            chapter_xii_g?: number;
            first_schedule_other_than_115b?: number;
            total?: number;
        };
        net_profit_loss_business_profession?: number;
    };
    speculative_business: {
        net_profit_loss_speculative?: number;
        income_chargeable_rule_7_etc?: {
            income_chargeable?: number;
            deemed_income_rule_7a?: number;
            deemed_income_rule_7b_1?: number;
            deemed_income_rule_7b_1a?: number;
            deemed_income_rule_8?: number;
            income_other_than_rule_7a_etc?: number;
        };
        balance_income_deemed_agriculture?: number;
        net_profit_loss_speculative_business?: number;
        additions_accordance_28_to_44db?: number;
        deductions_accordance_28_to_44db?: number;
        income_speculative_business?: number;
    };
    specified_business: {
        net_profit_loss_specified?: number;
        additions_accordance_28_to_44db?: number;
        deductions_accordance_28_to_44db_other_than_35ad?: number;
        profit_loss_specified_business?: number;
        deductions_accordance_35ad_1?: number;
        income_specified_business?: number;
        relevant_clause_35ad_5?: string;
    };
    income_chargeable_head_profits_gains?: number;
    intra_head_set_off: {
        speculative_income: {
            loss_set_off?: number;
            income_remaining?: number;
        };
        specified_income: {
            loss_set_off?: number;
            income_remaining?: number;
        };
        life_insurance_income: {
            loss_set_off?: number;
            income_remaining?: number;
        };
        foreign_company_income: {
            loss_set_off?: number;
            income_remaining?: number;
        };
        total_loss_set_off?: number;
        loss_remaining_after_set_off?: number;
    };
}
