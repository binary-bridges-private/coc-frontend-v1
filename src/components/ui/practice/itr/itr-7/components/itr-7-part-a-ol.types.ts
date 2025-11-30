
export interface ITR7PartAOLData {
    opening_balance: {
        cash_in_hand?: number;
        bank?: number;
        total?: number;
    };
    receipts: {
        interest?: number;
        dividend?: number;
        sale_of_assets: {
            nature_amount_a?: { nature: string; amount: number };
            nature_amount_b?: { nature: string; amount: number };
            nature_amount_c?: { nature: string; amount: number };
            total?: number;
        };
        realisation_of_dues?: number;
        others: {
            nature_amount_a?: { nature: string; amount: number };
            nature_amount_b?: { nature: string; amount: number };
            total?: number;
        };
        total_receipts?: number;
    };
    total_opening_balance_receipts?: number;
    payments: {
        repayment_secured_loan?: number;
        repayment_unsecured_loan?: number;
        repayment_creditors?: number;
        commission?: number;
        others: {
            nature_amount_a?: { nature: string; amount: number };
            nature_amount_b?: { nature: string; amount: number };
            total?: number;
        };
        total_payments?: number;
    };
    closing_balance: {
        cash_in_hand?: number;
        bank?: number;
        total?: number;
    };
    total_closing_balance_payments?: number;
}
