
export interface ITR7ScheduleMATData {
    scheduleMAT: {
        // Section 1-3: Basic Information
        profit_loss_account_prepared_part_ii: 'Yes' | 'No';
        profit_loss_prepared_per_act: 'Yes' | 'No';
        accounting_policies_followed: 'Yes' | 'No';
        profit_before_tax: number; // 4

        // Section 5: Additions
        additions: {
            income_tax_provision: number; // 5a
            reserve_except_33ac: number; // 5b
            provisions_unascertained_liability: number; // 5c
            provisions_losses_subsidiary: number; // 5d
            dividend_paid_proposed: number; // 5e
            expenditure_exempt_income: number; // 5f
            expenditure_aop_boi_section_86: number; // 5g
            expenditure_foreign_company_115jb: number; // 5h
            notional_loss_capital_assets_115jb: number; // 5i
            expenditure_royalty_115bbf: number; // 5j
            depreciation_revaluation: number; // 5k
            gain_transfer_units_115jb: number; // 5l
            others_additions: number; // 5m
            total_additions: number; // 5n
        };

        // Section 6: Deductions
        deductions: {
            amount_withdrawn_reserve: number; // 6a
            income_exempt_10_11_12: number; // 6b
            amount_withdrawn_revaluation: number; // 6c
            share_income_aop_boi_section_86: number; // 6d
            income_foreign_company_115jb: number; // 6e
            notional_gain_capital_assets_115jb: number; // 6f
            loss_transfer_units_115jb: number; // 6g
            income_royalty_115jb: number; // 6h
            loss_brought_forward_depreciation: number; // 6i
            profit_sick_company: number; // 6j
            others_deductions: number; // 6k
            total_deductions: number; // 6l
        };

        book_profit_115jb: number; // 7

        // Section 8: Indian Accounting Standards
        ind_as_compliance: 'Yes' | 'No';
        ind_as_details: {
            // A. Additions
            additions: {
                amounts_credited_comprehensive_income: number; // 8a
                amounts_debited_non_cash_assets: number; // 8b
                one_fifth_transition_amount: number; // 8c
                others_additions: number; // 8d
                total_additions: number; // 8e
            };
            // B. Deductions
            deductions: {
                amounts_debited_comprehensive_income: number; // 8f
                amounts_credited_non_cash_assets: number; // 8g
                one_fifth_transition_amount_deduction: number; // 8h
                others_deductions: number; // 8i
                total_deductions: number; // 8j
            };
        };

        deemed_total_income_115jb: number; // 9
        deemed_income_ifsc_units: number; // 9a
        deemed_income_other_units: number; // 9b
        tax_payable_115jb: number; // 10
    };
}
