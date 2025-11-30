
export interface ITR7PartAOIData {
    method_of_accounting: 'mercantile' | 'cash';
    change_in_method_of_accounting: boolean;
    icds_deviation_increase_profit?: number;
    icds_deviation_decrease_profit?: number;
    closing_stock_valuation_method: {
        raw_material: '1' | '2' | '3';
        finished_goods: '1' | '2' | '3';
        change_in_method: boolean;
        increase_profit_deviation?: number;
        decrease_profit_deviation?: number;
    };
    amounts_not_credited_to_pl: {
        section_28_items?: number;
        proforma_credits?: number;
        escalation_claims?: number;
        other_income?: number;
        capital_receipt?: number;
        total?: number;
    };
    amounts_debited_to_pl_disallowable_u_s_36: {
        insurance_premium_stock?: number;
        insurance_premium_health?: number;
        bonus_commission_employees?: number;
        interest_borrowed_capital?: number;
        discount_zero_coupon_bond?: number;
        pf_contribution?: number;
        superannuation_fund_contribution?: number;
        pension_scheme_contribution?: number;
        gratuity_fund_contribution?: number;
        other_fund_contribution?: number;
        employee_contribution_pf_superannuation?: number;
        bad_doubtful_debts?: number;
        provision_bad_doubtful_debts?: number;
        transfer_special_reserve?: number;
        family_planning_expenditure?: number;
        securities_transaction_tax?: number;
        marked_to_market_loss?: number;
        other_disallowance?: number;
        total?: number;
        total_employees?: {
            deployed_in_india?: number;
            deployed_outside_india?: number;
            total?: number;
        };
    };
    amounts_debited_to_pl_disallowable_u_s_37: {
        capital_expenditure?: number;
        personal_expenditure?: number;
        non_business_expenditure?: number;
        political_party_advertisement?: number;
        penalty_fine_violation_law?: number;
        other_penalty_fine?: number;
        offence_prohibited_law_expenditure?: number;
        csr_expenditure?: number;
        contingent_liability?: number;
        other_amount?: number;
        total?: number;
    };
    amounts_debited_to_pl_disallowable_u_s_40: {
        non_compliance_xvii_b_40_a_i?: number;
        non_compliance_xvii_b_40_a_ia?: number;
        non_compliance_viii_finance_act_2016?: number;
        non_compliance_xvii_b_40_a_iii?: number;
        tax_on_profits?: number;
        wealth_tax?: number;
        royalty_license_fee?: number;
        salary_interest_partner?: number;
        other_disallowance?: number;
        total?: number;
    };
    disallowed_u_s_40_preceding_year_allowable?: number;
    amounts_debited_to_pl_disallowable_u_s_40a: {
        payment_to_specified_persons?: number;
        payment_otherwise_than_account_payee?: number;
        provision_gratuity?: number;
        contribution_fund_trust?: number;
        other_disallowance?: number;
        total?: number;
    };
    disallowed_u_s_43b_preceding_year_allowable: {
        tax_duty_cess?: number;
        contribution_pf_superannuation_gratuity?: number;
        bonus_commission_employees?: number;
        interest_loan_public_financial_institution?: number;
        interest_loan_nbfc?: number;
        interest_loan_scheduled_bank?: number;
        leave_encashment?: number;
        payment_railways?: number;
        payment_msme?: number;
        total?: number;
    };
    debited_to_pl_disallowable_u_s_43b: {
        tax_duty_cess?: number;
        contribution_pf_superannuation_gratuity?: number;
        bonus_commission_employees?: number;
        interest_loan_public_financial_institution?: number;
        interest_loan_nbfc?: number;
        interest_loan_scheduled_bank?: number;
        leave_encashment?: number;
        payment_railways?: number;
        payment_msme?: number;
        total?: number;
    };
    credit_outstanding: {
        union_excise_duty?: number;
        service_tax?: number;
        vat_sales_tax?: number;
        cgst?: number;
        sgst?: number;
        igst?: number;
        utgst?: number;
        other_tax?: number;
        total?: number;
    };
    deemed_profits_u_s_33ab_33aba_33ac?: number;
    profit_chargeable_u_s_41?: number;
    prior_period_income_expenditure?: number;
    expenditure_disallowed_u_s_14a?: number;
    exercising_option_u_s_92ce?: boolean;
}
