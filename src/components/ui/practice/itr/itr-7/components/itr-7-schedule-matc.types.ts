
export interface ITR7ScheduleMATCData {
    scheduleMATc: {
        tax_115jb_2025_26: number; // 1
        tax_other_provisions_2025_26: number; // 2
        amount_tax_credit_available: number; // 3

        // Section 4: MAT Credit Utilization Table
        mat_credit_years: {
            assessment_year: string;
            mat_credit_b1: number;
            set_off_earlier_years_b2: number;
            balance_brought_forward_b3: number;
            mat_credit_utilized_current_year_c: number;
            balance_mat_credit_carried_forward_d: number;
        }[];

        // Section 5 & 6
        amount_tax_credit_115jaa_utilized: number; // 5
        amount_mat_liability_available_credit: number; // 6
    };
}
